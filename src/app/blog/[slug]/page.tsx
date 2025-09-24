import { Metadata } from 'next';
import { notFound } from "next/navigation";
import { draftMode } from 'next/headers';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostServer from '@/components/BlogPostServer';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { sanityFetch } from '@/lib/sanity';
import { BLOG_POST_BY_SLUG_QUERY, BLOG_POST_PREVIEW_QUERY } from '@/lib/queries';

// 動的レンダリングを強制
export const dynamic = 'force-dynamic';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { isEnabled: isDraft } = await draftMode();

    // ドラフトモードの場合は専用クエリを使用
    const query = isDraft ? BLOG_POST_PREVIEW_QUERY : BLOG_POST_BY_SLUG_QUERY;
    const post = await sanityFetch({
      query,
      params: { slug },
      isDraftMode: isDraft
    });

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
    const { isEnabled: isDraft } = await draftMode();

    // ドラフトモードの場合は専用クエリを使用
    const query = isDraft ? BLOG_POST_PREVIEW_QUERY : BLOG_POST_BY_SLUG_QUERY;
    const post = await sanityFetch({
      query,
      params: { slug },
      isDraftMode: isDraft
    });

    if (!post) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-white">
        <Header />
        {isDraft && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 text-center">
            プレビューモード - 下書きコンテンツが表示されています
            <a href="/api/disable-draft" className="ml-2 underline">
              プレビューを終了
            </a>
          </div>
        )}
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