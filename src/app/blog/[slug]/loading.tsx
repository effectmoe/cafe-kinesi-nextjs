import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* ヘッダー部分 */}
        <header className="mb-8">
          {/* カテゴリ */}
          <Skeleton className="h-4 w-24 mb-4" />

          {/* タイトル */}
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-3/4 mb-6" />

          {/* メタ情報 */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </header>

        {/* アイキャッチ画像 */}
        <Skeleton className="h-96 w-full rounded-lg mb-8" />

        {/* 本文 */}
        <div className="prose prose-lg max-w-none">
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-5/6 mb-6" />

          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-4/5 mb-6" />

          <Skeleton className="h-6 w-48 mb-4" />

          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-3/4 mb-6" />
        </div>

        {/* ソーシャルシェア */}
        <div className="mt-12 pt-8 border-t">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="flex space-x-3">
            <Skeleton className="h-10 w-10 rounded" />
            <Skeleton className="h-10 w-10 rounded" />
            <Skeleton className="h-10 w-10 rounded" />
          </div>
        </div>
      </article>
    </div>
  );
}