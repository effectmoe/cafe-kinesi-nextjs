import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

interface BlogPostProps {
  post: any;
}

const BlogPostServer = ({ post }: BlogPostProps) => {
  // 画像URLの安全な生成
  const getImageSrc = (image: any) => {
    if (!image) return '/placeholder.svg';
    try {
      const url = urlFor(image).width(800).height(400).url();
      return url || '/placeholder.svg';
    } catch (error) {
      console.warn('Error generating image URL:', error);
      return '/placeholder.svg';
    }
  };
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">記事が見つかりません</h1>
          <p>指定された記事は存在しません。</p>
        </div>
      </div>
    );
  }

  return (
    <article className="py-16 pt-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {post.mainImage && (
                <div className="mb-8">
                  <Image
                    src={getImageSrc(post.mainImage)}
                    alt={post.title || 'Blog post image'}
                    width={800}
                    height={400}
                    className="w-full rounded-lg"
                    priority
                  />
                </div>
              )}

              <header className="mb-8">
                <h1 className="font-noto-serif text-4xl font-bold mb-4">
                  {post.title}
                </h1>
                <time className="text-gray-500">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('ja-JP')
                    : '日付不明'}
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
                {post.tags && post.tags !== null && (
                  Array.isArray(post.tags) && post.tags.length > 0
                    ? post.tags.map((tag: string, index: number) => (
                        <span key={`${tag}-${index}`} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {tag}
                        </span>
                      ))
                    : typeof post.tags === 'string' && post.tags.trim() !== ''
                    ? (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {post.tags}
                        </span>
                      )
                    : null
                )}
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
                    {typeof post.keyPoint === 'object' && post.keyPoint.title
                      ? post.keyPoint.title
                      : '重要なポイント'}
                  </h2>
                  <p className="text-gray-700">
                    {typeof post.keyPoint === 'string'
                      ? post.keyPoint
                      : (typeof post.keyPoint === 'object' && post.keyPoint.content
                          ? post.keyPoint.content
                          : '')}
                  </p>
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
              {post.faq && Array.isArray(post.faq) && post.faq.length > 0 && (
                <section className="mb-8 p-6 bg-gray-50 border-l-4 border-gray-400 rounded-r-lg">
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">よくある質問</h2>
                  <div className="space-y-4">
                    {post.faq.map((item: any, index: number) => {
                      if (!item || typeof item !== 'object') return null;
                      return (
                        <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                          <h3 className="font-medium text-gray-800 mb-2">
                            Q: {item.question || '質問'}
                          </h3>
                          <p className="text-gray-600">
                            A: {item.answer || '回答'}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          </div>
        </article>
  );
};

export default BlogPostServer;