import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client } from '@/lib/sanity';
import { BLOG_POST_BY_SLUG_QUERY } from '@/lib/queries';

// 動的レンダリングを強制
export const dynamic = 'force-dynamic';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  try {
    const { slug } = await params;
    console.log(`[DEBUG] Fetching blog post with slug: ${slug}`);

    // Sanityから記事データを取得
    const post = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug });

    if (!post) {
      console.log(`[DEBUG] Post not found for slug: ${slug}`);
      notFound();
    }

    console.log(`[DEBUG] Post found:`, {
      title: post.title,
      slug: post.slug,
      hasExcerpt: !!post.excerpt,
      hasContent: !!post.content
    });

    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">{post.title || 'No Title'}</h1>
          {post.excerpt && (
            <p className="text-gray-600 mb-8">{post.excerpt}</p>
          )}
          <div className="prose max-w-none">
            <p>Post slug: {post.slug}</p>
            <p>Content exists: {post.content ? 'Yes' : 'No'}</p>
            <p>Content type: {typeof post.content}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('[DEBUG] Error in BlogPage:', error);
    console.error('[DEBUG] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    notFound();
  }
}