import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 画像最適化
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1年
  },

  // パフォーマンス設定
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // セキュリティヘッダー
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // キャッシュ設定
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },

  // パッケージインポートの最適化
  transpilePackages: ['lucide-react'],

  // 実験的機能
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Vercel Serverless Function最適化
  output: 'standalone',

  // バンドルサイズ最適化
  webpack: (config, { isServer }) => {
    // サーバーサイド用の最適化
    if (isServer) {
      config.externals = [...(config.externals || []), {
        '@sanity/client': 'commonjs @sanity/client',
        'next-sanity': 'commonjs next-sanity'
      }];
    }

    // チャンク分割の最適化
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      cacheGroups: {
        ...config.optimization.splitChunks?.cacheGroups,
        sanity: {
          test: /[\\/]node_modules[\\/](@sanity|next-sanity)[\\/]/,
          name: 'sanity',
          chunks: 'all',
          priority: 30,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: 20,
        },
      },
    };

    return config;
  },

  // リンクプリロードの最適化
  async redirects() {
    return [];
  },

  // バンドル分析（開発時のみ）
  // ...(process.env.ANALYZE === 'true' && {
  //   webpack: async (config, { isServer }) => {
  //     if (!isServer) {
  //       const BundleAnalyzer = await import('@next/bundle-analyzer');
  //       const BundleAnalyzerPlugin = BundleAnalyzer.default({
  //         enabled: true,
  //       });
  //       config.plugins.push(new BundleAnalyzerPlugin());
  //     }
  //     return config;
  //   },
  // }),
};

export default nextConfig;
