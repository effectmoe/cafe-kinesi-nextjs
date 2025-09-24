'use client';

import { useEffect } from 'react';
import { Button } from './ui/button';
import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
  message?: string;
}

export default function ErrorBoundary({
  error,
  reset,
  message = 'このセクションで問題が発生しました'
}: ErrorBoundaryProps) {
  useEffect(() => {
    // エラーログ送信
    console.error('Error boundary triggered:', error);

    // Analytics にエラーを送信
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      });
    }
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {message}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              問題が解決しない場合は、ページを更新するか、しばらくしてから再度お試しください。
            </p>

            {process.env.NODE_ENV === 'development' && (
              <details className="mb-4 text-xs">
                <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                  開発者向け情報
                </summary>
                <div className="mt-2 bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="font-mono text-red-600">{error.message}</p>
                  {error.digest && (
                    <p className="mt-1 text-gray-500">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              </details>
            )}

            <div className="flex space-x-3">
              <Button
                onClick={reset}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                再試行
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                ページを更新
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}