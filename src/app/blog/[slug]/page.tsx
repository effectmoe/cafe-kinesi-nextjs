import { Metadata } from 'next';
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostServer from '@/components/BlogPostServer';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { client } from '@/lib/sanity';
import { BLOG_POST_BY_SLUG_QUERY } from '@/lib/queries';

// 動的レンダリングを強制（ビルドエラー回避のため）
export const dynamic = 'force-dynamic';
// ISRは一時的に無効化
// export const revalidate = 3600;

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 一時的に静的生成を無効化
export async function generateStaticParams() {
  // 問題が解決するまで空配列を返して静的生成をスキップ
  console.log('Static generation disabled temporarily');
  return [];
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
  try {
    const { slug } = await params;

    // デバッグログ
    if (typeof window === 'undefined') {
      console.log(`Fetching blog post with slug: ${slug}`);
    }

    // Sanityから記事データを取得
    const post = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug }).catch((err) => {
      console.error('Sanity fetch error:', err);
      return null;
    });

    // 記事が存在しない場合は404を表示
    if (!post) {
      if (typeof window === 'undefined') {
        console.log(`Post not found for slug: ${slug}`);
      }
      notFound();
    }

    // デバッグ用に記事データの構造をログ出力
    if (typeof window === 'undefined' && slug === 'marker-test-post') {
      console.log('Post data structure:', JSON.stringify({
        hasKeyPoint: !!post.keyPoint,
        keyPointType: typeof post.keyPoint,
        keyPointValue: post.keyPoint,
        hasFaq: !!post.faq,
        faqType: typeof post.faq,
        faqIsArray: Array.isArray(post.faq),
        faqLength: Array.isArray(post.faq) ? post.faq.length : 0,
        tagsType: typeof post.tags,
        tagsIsArray: Array.isArray(post.tags),
        tagsValue: post.tags,
        tagsIsNull: post.tags === null,
        tagsIsUndefined: post.tags === undefined
      }, null, 2));
    }

    console.log('Starting data normalization for:', slug);

    // データの正規化と処理
    const processedPost = { ...post };

    // mainImageの処理
    console.log('Processing mainImage...');
    if (post.mainImage && typeof post.mainImage === 'object') {
      // mainImageが適切な形式か確認
      if (!post.mainImage._type || !post.mainImage.asset) {
        processedPost.mainImage = null;
      }
    }

    // tagsの正規化（オブジェクトの場合は配列に変換、nullの場合は空配列）
    console.log('Processing tags...');
    if (!processedPost.tags || processedPost.tags === null || processedPost.tags === undefined) {
      console.log('Tags is null/undefined, setting to empty array');
      processedPost.tags = [];
    } else if (!Array.isArray(processedPost.tags)) {
      if (typeof processedPost.tags === 'string') {
        processedPost.tags = [processedPost.tags];
      } else if (typeof processedPost.tags === 'object' && processedPost.tags !== null) {
        // オブジェクトの値を配列に変換（nullチェック済み）
        try {
          const values = Object.values(processedPost.tags).filter(tag => typeof tag === 'string');
          processedPost.tags = values.length > 0 ? values : [];
        } catch (e) {
          console.warn('Failed to convert tags object to array:', e);
          processedPost.tags = [];
        }
      } else {
        processedPost.tags = [];
      }
    }

    // faqの正規化
    console.log('Processing FAQ...');
    if (processedPost.faq && !Array.isArray(processedPost.faq)) {
      console.log('FAQ is not array, setting to empty array');
      processedPost.faq = [];
    }

    console.log('Data normalization complete for:', slug);

    try {
      console.log('Rendering components for:', slug);

      return (
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <ArticleJsonLd
              title={processedPost.title || 'Blog Post'}
              description={processedPost.excerpt || processedPost.tldr || ''}
              image={processedPost.mainImage ? undefined : undefined}
              publishedAt={processedPost.publishedAt || new Date().toISOString()}
              author={processedPost.author?.name}
              url={`https://cafe-kinesi.com/blog/${slug}`}
            />
            <BlogPostServer post={processedPost} />
          </main>
        <Footer />
      </div>
    );
    } catch (renderError) {
      console.error('Error during rendering:', renderError);
      throw renderError;
    }
  } catch (error) {
    console.error('ブログページ生成エラー:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    notFound();
  }
}