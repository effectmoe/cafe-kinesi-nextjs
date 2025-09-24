module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/about',
        'http://localhost:3000/blog',
      ],
      startServerCommand: 'npm run build && npm start',
      numberOfRuns: 3,
      settings: {
        // エミュレーション設定
        preset: 'desktop',
        // モバイル測定も可能
        // formFactor: 'mobile',
        // screenEmulation: {
        //   mobile: true,
        //   width: 375,
        //   height: 667,
        //   deviceScaleFactor: 2,
        // },
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
      },
    },
    assert: {
      assertions: {
        // パフォーマンススコア
        'categories:performance': ['warn', { minScore: 0.9 }],
        // アクセシビリティスコア
        'categories:accessibility': ['error', { minScore: 0.9 }],
        // ベストプラクティススコア
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        // SEOスコア
        'categories:seo': ['error', { minScore: 0.9 }],
        // 個別メトリクス
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        'interactive': ['warn', { maxNumericValue: 3800 }],
        'speed-index': ['warn', { maxNumericValue: 4300 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};