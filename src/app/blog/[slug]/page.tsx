import { Metadata } from 'next';
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostServer from '@/components/BlogPostServer';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { client } from '@/lib/sanity';
import { BLOG_POST_BY_SLUG_QUERY } from '@/lib/queries';

// 動的レンダリングを強制
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug });

    if (!post) {
      return {
        title: 'ページが見つかりません - Cafe Kinesi',
        description: '記事が見つかりませんでした',
      };
    }

    return {
      title: `${post.title} - Cafe Kinesi Blog`,
      description: post.excerpt || `${post.title}に関する記事です。`,
      openGraph: {
        title: post.title,
        description: post.excerpt || `${post.title}に関する記事です。`,
        type: 'article',
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

    // Sanityから記事データを取得
    const post = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug });

    if (!post) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <ArticleJsonLd
            title={post.title || 'Blog Post'}
            description={post.excerpt || `${post.title}に関する記事です。`}
            publishedAt={post.publishedAt || new Date().toISOString()}
            author={post.author?.name}
            url={`https://cafe-kinesi.com/blog/${post.slug}`}
          />
          <BlogPostServer post={post} />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('ブログページ生成エラー:', error);
    notFound();
  }
}