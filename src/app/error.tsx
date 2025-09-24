'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーをログサービスに記録
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="text-center max-w-md">
          <h1 className="font-noto-serif text-4xl font-bold text-[hsl(var(--text-primary))] mb-4">
            エラーが発生しました
          </h1>
          <p className="text-[hsl(var(--text-secondary))] mb-8 leading-relaxed">
            申し訳ございません。予期しないエラーが発生しました。
            問題が解決しない場合は、お問い合わせください。
          </p>
          <div className="space-y-4">
            <button
              onClick={reset}
              className="inline-block px-6 py-3 bg-[hsl(var(--text-primary))] text-white rounded-md hover:opacity-90 transition-opacity mr-4"
            >
              もう一度試す
            </button>
            <Link
              href="/"
              className="inline-block px-6 py-3 border border-[hsl(var(--border))] text-[hsl(var(--text-primary))] rounded-md hover:bg-gray-50 transition-colors"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}