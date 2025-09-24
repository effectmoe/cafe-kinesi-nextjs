'use client';

import { useSanityData } from '@/hooks/useSanityData';
import { BLOG_POST_BY_SLUG_QUERY } from '@/lib/queries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';

interface BlogPostProps {
  slug: string;
}

const BlogPost = ({ slug }: BlogPostProps) => {
  const { data: post, isLoading } = useSanityData(
    BLOG_POST_BY_SLUG_QUERY,
    `blogPost-${slug}`,
    { slug }
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
        image={post.mainImage}
        publishedAt={post.publishedAt}
        modifiedAt={post.publishedAt}
        author={post.author?.name}
        url={`https://cafe-kinesi.com/blog/${slug}`}
      />
      <Header />
      <main className="pt-16">
        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {post.mainImage && (
                <div className="mb-8">
                  <Image
                    src={post.mainImage}
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

              {/* TL;DR セクション */}
              {post.tldr && (
                <section className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                  <h2 className="text-xl font-semibold mb-3 text-blue-700">TL;DR（要約）</h2>
                  <p className="text-gray-700">{post.tldr}</p>
                </section>
              )}

              {/* カテゴリー・タグ表示 */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.category && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                    {post.category}
                  </span>
                )}
                {post.tags && post.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* メインコンテンツ */}
              <div className="prose prose-lg max-w-none mb-12">
                {/* PortableText コンテンツの表示 */}
                {post.content && (
                  <div className="space-y-4">
                    {/* 簡単なテキスト表示 - 後でPortableTextに置換 */}
                    <p>{post.excerpt || 'コンテンツを読み込み中...'}</p>
                  </div>
                )}
              </div>

              {/* 重要なポイント */}
              {post.keyPoint && (
                <section className="mb-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                  <h2 className="text-xl font-semibold mb-3 text-yellow-700">
                    {post.keyPoint.title || '重要なポイント'}
                  </h2>
                  <p className="text-gray-700">{post.keyPoint.content}</p>
                </section>
              )}

              {/* まとめ */}
              {post.summary && (
                <section className="mb-8 p-6 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <h2 className="text-xl font-semibold mb-3 text-green-700">まとめ</h2>
                  <p className="text-gray-700">{post.summary}</p>
                </section>
              )}

              {/* FAQ */}
              {post.faq && post.faq.length > 0 && (
                <section className="mb-8 p-6 bg-gray-50 border-l-4 border-gray-400 rounded-r-lg">
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">よくある質問</h2>
                  <div className="space-y-4">
                    {post.faq.map((item: any, index: number) => (
                      <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                        <h3 className="font-medium text-gray-800 mb-2">Q: {item.question}</h3>
                        <p className="text-gray-600">A: {item.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;