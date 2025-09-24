'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* シンプルなロゴテキスト */}
          <Link href="/" className="text-2xl font-light text-gray-800 hover:text-gray-600 transition-colors">
            Cafe Kinesi
          </Link>

          {/* 右側のナビゲーション - ミニマル */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wider"
            >
              カフェキネシについて
            </Link>
            <Link
              href="/school"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wider"
            >
              スクール
            </Link>
            <Link
              href="/instructor"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wider"
            >
              インストラクター
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wider"
            >
              ブログ
            </Link>
            <Link
              href="/aroma"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wider"
            >
              アロマ
            </Link>
            <Link
              href="/member"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wider"
            >
              メンバー
            </Link>
          </nav>

          {/* モバイルメニューボタン */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="メニューを開く"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <nav className="py-4 space-y-2">
              <Link
                href="/about"
                className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                カフェキネシについて
              </Link>
              <Link
                href="/school"
                className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                スクール
              </Link>
              <Link
                href="/instructor"
                className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                インストラクター
              </Link>
              <Link
                href="/blog"
                className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                ブログ
              </Link>
              <Link
                href="/aroma"
                className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                アロマ
              </Link>
              <Link
                href="/member"
                className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                メンバー
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;