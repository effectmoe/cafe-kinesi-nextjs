import { client } from '@/lib/sanity';
import { NextResponse } from 'next/server';

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  checks: {
    sanity: boolean;
    environment: boolean;
    memory: {
      used: number;
      limit: number;
      percentage: number;
    };
  };
  uptime: number;
}

export async function GET() {
  const startTime = Date.now();

  try {
    // 1. Sanityデータベース接続確認
    let sanityHealthy = false;
    try {
      await client.fetch(`*[_type == "shopInfo"][0]{_id}`, {}, {
        cache: 'no-store',
        next: { revalidate: 0 }
      });
      sanityHealthy = true;
    } catch (error) {
      console.error('Sanity health check failed:', error);
    }

    // 2. 環境変数チェック
    const envHealthy = Boolean(
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_DATASET
    );

    // 3. メモリ使用量チェック
    const memoryUsage = process.memoryUsage();
    const memoryLimit = 512 * 1024 * 1024; // 512MB (Vercelの制限)
    const memoryPercentage = Math.round((memoryUsage.heapUsed / memoryLimit) * 100);

    // 4. アップタイム
    const uptime = process.uptime();

    // 全体のステータス判定
    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

    if (!sanityHealthy || !envHealthy) {
      overallStatus = 'unhealthy';
    } else if (memoryPercentage > 80) {
      overallStatus = 'degraded';
    }

    const responseTime = Date.now() - startTime;

    const healthStatus: HealthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '0.1.0',
      checks: {
        sanity: sanityHealthy,
        environment: envHealthy,
        memory: {
          used: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
          limit: Math.round(memoryLimit / 1024 / 1024), // MB
          percentage: memoryPercentage
        }
      },
      uptime: Math.round(uptime)
    };

    // レスポンスタイムが遅い場合は警告
    if (responseTime > 3000) {
      console.warn(`Health check took ${responseTime}ms`);
    }

    return NextResponse.json(
      healthStatus,
      {
        status: overallStatus === 'unhealthy' ? 503 : 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Response-Time': `${responseTime}ms`
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
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    );
  }
}