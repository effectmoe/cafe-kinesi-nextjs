import { client } from '@/lib/sanity';
import { NextResponse } from 'next/server';

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  environment: string;
  checks: {
    database: {
      status: boolean;
      latency?: number;
      error?: string;
    };
    memory: {
      heapUsed: number;
      heapTotal: number;
      percentage: number;
    };
    performance: {
      uptime: number;
      responseTime: number;
    };
  };
}

export async function GET() {
  const startTime = Date.now();
  const issues: string[] = [];

  try {
    // 1. データベース（Sanity）チェック
    const dbStart = Date.now();
    let dbStatus = false;
    let dbLatency = 0;
    let dbError: string | undefined;

    try {
      const testQuery = await client.fetch(
        `count(*[_type == "blogPost"])`,
        {},
        { cache: 'no-store' }
      );
      dbStatus = typeof testQuery === 'number';
      dbLatency = Date.now() - dbStart;

      if (dbLatency > 3000) {
        issues.push(`Database latency high: ${dbLatency}ms`);
      }
    } catch (error) {
      dbError = error instanceof Error ? error.message : 'Database connection failed';
      issues.push(`Database error: ${dbError}`);
    }

    // 2. メモリチェック（簡易版）
    const memoryUsage = process.memoryUsage();
    const memoryLimit = 512 * 1024 * 1024; // 512MB
    const memoryPercentage = Math.round((memoryUsage.heapUsed / memoryLimit) * 100);

    if (memoryPercentage > 85) {
      issues.push(`Memory usage high: ${memoryPercentage}%`);
    }

    // 3. パフォーマンスメトリクス
    const uptime = process.uptime();
    const responseTime = Date.now() - startTime;

    if (responseTime > 3000) {
      issues.push(`Slow response time: ${responseTime}ms`);
    }

    // 全体のステータス判定
    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

    if (!dbStatus || memoryPercentage > 90) {
      overallStatus = 'unhealthy';
    } else if (issues.length > 0) {
      overallStatus = 'degraded';
    }

    const healthStatus: HealthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database: {
          status: dbStatus,
          latency: dbLatency,
          error: dbError
        },
        memory: {
          heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
          heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
          percentage: memoryPercentage
        },
        performance: {
          uptime: Math.round(uptime),
          responseTime
        }
      }
    };

    return NextResponse.json(
      {
        ...healthStatus,
        issues: issues.length > 0 ? issues : undefined
      },
      {
        status: overallStatus === 'unhealthy' ? 503 : 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Response-Time': `${responseTime}ms`,
          'X-Health-Status': overallStatus
        }
      }
    );
  } catch (error) {
    console.error('Health check error:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        responseTime: Date.now() - startTime
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Health-Status': 'unhealthy'
        }
      }
    );
  }
}