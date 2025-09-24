import { sanityFetch } from '@/lib/sanity';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

const NEWS_QUERY = `*[_type == "news" && slug.current == $slug][0] {
  _id,
  title,
  titleEn,
  slug,
  content,
  contentEn,
  publishedAt,
  category,
  image
}`;

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();

  const news = await sanityFetch({
    query: NEWS_QUERY,
    params: { slug },
    isDraftMode: isDraft,
  });

  console.log(`News Detail: Fetched news for slug ${slug}, draft mode: ${isDraft}, found: ${!!news}`);

  if (!news) {
    notFound();
  }

  return (
    <article className="w-full max-w-4xl mx-auto px-6 py-12">
      {isDraft && (
        <div className="bg-orange-100 border border-orange-300 text-orange-800 px-4 py-2 rounded mb-6">
          🔍 プレビューモード - このページはドラフト状態です
        </div>
      )}

      <header className="mb-8">
        <div className="text-sm text-gray-500 mb-2">
          {new Date(news.publishedAt).toLocaleDateString('ja-JP')} • {news.category}
        </div>
        <h1 className="font-noto-serif text-3xl md:text-4xl font-medium text-[hsl(var(--text-primary))] mb-4">
          {news.title}
        </h1>
        {news.titleEn && (
          <p className="text-lg text-[hsl(var(--text-secondary))] italic">
            {news.titleEn}
          </p>
        )}
      </header>

      {news.image && (
        <div className="mb-8">
          <div className="h-96 bg-gray-200 rounded-lg">
            {/* 画像コンポーネントは後で実装 */}
          </div>
        </div>
      )}

      <div className="prose max-w-none">
        {/* content配列の表示は後で実装 */}
        <div className="text-[hsl(var(--text-primary))]">
          {news.content && news.content.length > 0 ? (
            <div>コンテンツあり（詳細表示は後で実装）</div>
          ) : (
            <p>コンテンツなし</p>
          )}
        </div>
      </div>
    </article>
  );
}