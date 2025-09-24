'use client';

import { useSanityData } from '@/hooks/useSanityData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';

interface BlogPostProps {
  slug: string;
}

const BlogPost = ({ slug }: BlogPostProps) => {
  const { data: post, isLoading } = useSanityData(
    `*[_type == "blogPost" && slug.current == "${slug}"][0]`,
    `blogPost-${slug}`
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">読み込み中...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">記事が見つかりません</h1>
              <p>指定された記事は存在しません。</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt || post.title}
        image={post.image}
        publishedAt={post.publishedAt}
        modifiedAt={post.modifiedAt}
        author={post.author?.name}
        url={`https://cafe-kinesi.com/blog/${slug}`}
      />
      <Header />
      <main className="pt-16">
        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {post.image && (
                <div className="mb-8">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full rounded-lg"
                  />
                </div>
              )}

              <header className="mb-8">
                <h1 className="font-noto-serif text-4xl font-bold mb-4">
                  {post.title}
                </h1>
                <time className="text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                </time>
              </header>

              <div className="prose prose-lg max-w-none">
                {/* PortableText コンテンツの表示 */}
                {post.body && (
                  <div className="space-y-4">
                    {/* 簡単なテキスト表示 - 後でPortableTextに置換 */}
                    <p>{post.excerpt || 'コンテンツを読み込み中...'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;