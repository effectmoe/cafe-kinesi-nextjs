import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/studio/',
          '/private/',
          '/*.json$',
        ],
      },
      {
        // Googlebot専用の詳細設定
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/studio/',
          '/private/',
        ],
        crawlDelay: 0,
      },
      {
        // 画像検索ボット用
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: [
          '/private/',
        ],
      },
    ],
    sitemap: 'https://cafe-kinesi.com/sitemap.xml',
    host: 'https://cafe-kinesi.com',
  };
}