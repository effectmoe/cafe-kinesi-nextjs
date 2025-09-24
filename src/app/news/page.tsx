import { sanityFetch } from '@/lib/sanity';
import { draftMode } from 'next/headers';

const NEWS_LIST_QUERY = `*[_type == "news"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  category,
  image
}`;

export default async function NewsPage() {
  const { isEnabled: isDraft } = await draftMode();

  let news = [];
  try {
    news = await sanityFetch({
      query: NEWS_LIST_QUERY,
      params: {},
      isDraftMode: isDraft,
    });
    console.log(`News List: Fetched ${news.length} news items, draft mode: ${isDraft}`);
  } catch (error) {
    console.error('Error fetching news:', error);
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="font-noto-serif text-3xl md:text-4xl font-medium text-[hsl(var(--text-primary))] text-center mb-4">
          お知らせ {isDraft && <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded ml-2">プレビュー</span>}
        </h1>
        <p className="text-[hsl(var(--text-secondary))] text-center max-w-2xl mx-auto">
          カフェキネシからの最新のお知らせ、イベント情報、キャンペーンなどをご案内いたします。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item: any) => (
          <div key={item.slug?.current || item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {item.image && (
              <div className="h-48 bg-gray-200">
                {/* 画像コンポーネントは後で実装 */}
              </div>
            )}
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">
                {new Date(item.publishedAt).toLocaleDateString('ja-JP')}
              </div>
              <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
              <div className="text-sm text-blue-600">
                {item.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[hsl(var(--text-secondary))]">
            現在、お知らせはありません。
          </p>
        </div>
      )}
    </div>
  );
}