'use client';

import ErrorBoundary from '@/components/ErrorBoundary';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      message="ブログ記事の読み込みに失敗しました"
    />
  );
}