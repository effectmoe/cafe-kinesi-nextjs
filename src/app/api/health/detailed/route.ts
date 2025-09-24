import { client } from '@/lib/sanity';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface DetailedHealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  environment: string;
  checks: {
    database: {
      status: boolean;
      latency?: number;
      error?: string;
    };
    filesystem: {
      status: boolean;
      writable: boolean;
      error?: string;
    };
    memory: {
      status: boolean;
      heapUsed: number;
      heapTotal: number;
      external: number;
      rss: number;
      percentage: number;
    };
    performance: {
      uptime: number;
      loadAverage?: number[];
      responseTime: number;
    };
    dependencies: {
      next: string;
      react: string;
      sanity: string;
    };
    endpoints: {
      api: boolean;
      images: boolean;
      static: boolean;
    };
  };
}

export async function GET(request: Request) {
  // 認証チェック（本番環境では必須）
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.HEALTH_CHECK_TOKEN;

  if (process.env.NODE_ENV === 'production' && expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

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
        `count(*[_type in ["blogPost", "menuItem", "event", "news"]])`,
        {},
        { cache: 'no-store' }
      );
      dbStatus = typeof testQuery === 'number';
      dbLatency = Date.now() - dbStart;

      if (dbLatency > 2000) {
        issues.push(`Database latency high: ${dbLatency}ms`);
      }
    } catch (error) {
      dbError = error instanceof Error ? error.message : 'Database connection failed';
      issues.push(`Database error: ${dbError}`);
    }

    // 2. ファイルシステムチェック
    let fsStatus = false;
    let fsWritable = false;
    let fsError: string | undefined;

    try {
      const tempDir = path.join(process.cwd(), '.next', 'cache');
      fsStatus = fs.existsSync(tempDir);

      if (fsStatus) {
        const testFile = path.join(tempDir, `health-check-${Date.now()}.tmp`);
        try {
          fs.writeFileSync(testFile, 'test');
          fs.unlinkSync(testFile);
          fsWritable = true;
        } catch {
          fsWritable = false;
          issues.push('Filesystem not writable');
        }
      }
    } catch (error) {
      fsError = error instanceof Error ? error.message : 'Filesystem check failed';
      issues.push(`Filesystem error: ${fsError}`);
    }

    // 3. メモリチェック
    const memoryUsage = process.memoryUsage();
    const memoryLimit = 512 * 1024 * 1024; // 512MB
    const memoryPercentage = Math.round((memoryUsage.heapUsed / memoryLimit) * 100);
    const memoryStatus = memoryPercentage < 90;

    if (memoryPercentage > 80) {
      issues.push(`Memory usage high: ${memoryPercentage}%`);
    }

    // 4. パフォーマンスメトリクス
    const uptime = process.uptime();
    const responseTime = Date.now() - startTime;

    if (responseTime > 5000) {
      issues.push(`Slow response time: ${responseTime}ms`);
    }

    // 5. 依存関係バージョン
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
    );

    // 6. エンドポイントチェック
    const apiStatus = dbStatus;
    const imagesStatus = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    const staticStatus = fs.existsSync(path.join(process.cwd(), 'public'));

    // 全体のステータス判定
    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

    if (!dbStatus || !fsStatus || !memoryStatus) {
      overallStatus = 'unhealthy';
    } else if (issues.length > 0) {
      overallStatus = 'degraded';
    }

    const detailedStatus: DetailedHealthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: packageJson.version || '0.1.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database: {
          status: dbStatus,
          latency: dbLatency,
          error: dbError
        },
        filesystem: {
          status: fsStatus,
          writable: fsWritable,
          error: fsError
        },
        memory: {
          status: memoryStatus,
          heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
          heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
          external: Math.round(memoryUsage.external / 1024 / 1024),
          rss: Math.round(memoryUsage.rss / 1024 / 1024),
          percentage: memoryPercentage
        },
        performance: {
          uptime: Math.round(uptime),
          responseTime
        },
        dependencies: {
          next: packageJson.dependencies.next,
          react: packageJson.dependencies.react,
          sanity: packageJson.dependencies['@sanity/client']
        },
        endpoints: {
          api: apiStatus,
          images: imagesStatus,
          static: staticStatus
        }
      }
    };

    // 問題がある場合はログ出力
    if (issues.length > 0) {
      console.warn('Health check issues:', issues);
    }

    return NextResponse.json(
      {
        ...detailedStatus,
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
    console.error('Detailed health check error:', error);

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