import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    // 画像フォーマットの最適化
    formats: ['image/webp', 'image/avif'],
    // デバイスサイズの詳細設定
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // 画像サイズの詳細設定
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 画像の最小化
    minimumCacheTTL: 60,
  },
  // gzip/brotli圧縮を有効化
  compress: true,
  // X-Powered-Byヘッダーを削除
  poweredByHeader: false,
  // React Strict Modeを有効化
  reactStrictMode: true,
  // SWCによる最小化を有効化
  swcMinify: true,
  // パッケージインポートの最適化
  transpilePackages: ['lucide-react'],
  experimental: {
    // パフォーマンス最適化
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
