import { Metadata } from 'next';
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPost from '@/components/pages/BlogPost';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { client } from '@/lib/sanity';
import { BLOG_POST_BY_SLUG_QUERY, BLOG_POSTS_QUERY } from '@/lib/queries';

// ISR（Incremental Static Regeneration）設定
// 1時間ごとにページを再生成
export const revalidate = 3600;

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // Sanityから記事スラッグを取得
  try {
    const posts = await client.fetch(`
      *[_type == "blogPost" && defined(slug.current)]{
        "slug": slug.current
      }
    `);

    const sanitySlugs = posts.map((post: any) => ({
      slug: post.slug,
    }));

    return sanitySlugs;
  } catch (error) {
    console.log('Sanityデータ取得エラー:', error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;

    // Sanityから記事データを取得
    const post = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug });

    if (!post) {
      return {
        title: 'ページが見つかりません - Cafe Kinesi',
        description: '記事が見つかりませんでした',
      };
    }

    const categories = post.category ? [post.category] : [];
    const tags = post.tags || [];

    return {
      title: `${post.title} - Cafe Kinesi Blog`,
      description: post.excerpt || post.tldr || `${post.title}に関する記事です。`,
      keywords: [
        post.title,
        'カフェキネシ',
        'アロマテラピー',
        '瞑想',
        'ヨガ',
        ...categories,
        ...tags
      ],
      authors: [{ name: post.author?.name || 'Cafe Kinesi' }],
      openGraph: {
        title: post.title,
        description: post.excerpt || post.tldr || `${post.title}に関する記事です。`,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author?.name || 'Cafe Kinesi'],
        images: post.mainImage ? [
          {
            url: post.mainImage,
            width: 1200,
            height: 630,
            alt: post.title,
          }
        ] : ['/og-image.jpg'],
        siteName: 'Cafe Kinesi',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || post.tldr || `${post.title}に関する記事です。`,
        images: post.mainImage ? [post.mainImage] : ['/og-image.jpg'],
      },
      alternates: {
        canonical: `https://cafe-kinesi.com/blog/${slug}`,
      },
    };
  } catch (error) {
    console.error('メタデータ生成エラー:', error);
    return {
      title: 'エラー - Cafe Kinesi',
      description: 'ページの読み込み中にエラーが発生しました',
    };
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  try {
    // Sanityから記事データを取得
    const post = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug });

    // 記事が存在しない場合は404を表示
    if (!post) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <ArticleJsonLd
            title={post.title}
            description={post.excerpt || post.tldr}
            image={post.mainImage}
            publishedAt={post.publishedAt}
            author={post.author?.name}
            url={`https://cafe-kinesi.com/blog/${slug}`}
          />
          <BlogPost slug={slug} />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('ブログページ生成エラー:', error);
    notFound();
  }
}