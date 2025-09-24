import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cafe-kinesi.com';

  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // ブログ記事の動的生成
  try {
    // Sanityからブログ記事を取得
    const blogPosts = await client.fetch(`
      *[_type == "blogPost" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt,
        publishedAt
      }
    `);

    const blogPages: MetadataRoute.Sitemap = blogPosts && blogPosts.length > 0
      ? blogPosts.map((post: any) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post._updatedAt || post.publishedAt),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
      : [];

    return [...staticPages, ...blogPages];
  } catch (error) {
    console.error('サイトマップ生成エラー:', error);
    // エラー時は静的ページのみ返す
    return staticPages;
  }
}