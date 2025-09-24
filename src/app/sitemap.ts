import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';
import { localArticles } from '@/components/pages/BlogPost.data';

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
    // まずローカルの記事データから生成
    const localBlogPages: MetadataRoute.Sitemap = Object.entries(localArticles).map(([slug, post]) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Sanityからブログ記事を取得（もし利用可能なら）
    let sanityBlogPages: MetadataRoute.Sitemap = [];
    try {
      const blogPosts = await client.fetch(`
        *[_type == "blogPost" && defined(slug.current)]{
          "slug": slug.current,
          _updatedAt,
          publishedAt
        }
      `);

      if (blogPosts && blogPosts.length > 0) {
        sanityBlogPages = blogPosts.map((post: any) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post._updatedAt || post.publishedAt),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }));
      }
    } catch (sanityError) {
      // Sanityエラーは無視してローカルデータのみ使用
      console.log('Sanityデータ取得をスキップ:', sanityError);
    }

    // ローカルとSanityのデータをマージ（重複を除去）
    const allBlogUrls = new Set([
      ...localBlogPages.map(p => p.url),
      ...sanityBlogPages.map(p => p.url)
    ]);

    const mergedBlogPages: MetadataRoute.Sitemap = Array.from(allBlogUrls).map(url => {
      const localPage = localBlogPages.find(p => p.url === url);
      const sanityPage = sanityBlogPages.find(p => p.url === url);

      // Sanityのデータがあればそちらを優先、なければローカルデータを使用
      return sanityPage || localPage || {
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });

    return [...staticPages, ...mergedBlogPages];
  } catch (error) {
    console.error('サイトマップ生成エラー:', error);

    // エラー時は静的ページとローカル記事のみ返す
    const fallbackBlogPages: MetadataRoute.Sitemap = Object.entries(localArticles).map(([slug, post]) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...fallbackBlogPages];
  }
}