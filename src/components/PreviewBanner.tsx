'use client';

import { Eye, EyeOff, X } from 'lucide-react';
import { useState } from 'react';

interface PreviewBannerProps {
  onExitPreview: () => void;
}

export const PreviewBanner = ({ onExitPreview }: PreviewBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Eye className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">プレビューモード</span>
            <span className="text-sm opacity-90">
              このプレビューは下書き状態のコンテンツを表示しています
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onExitPreview}
              className="flex items-center space-x-2 px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <EyeOff className="h-4 w-4" />
              <span className="text-sm font-medium">プレビュー終了</span>
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="バナーを閉じる"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};