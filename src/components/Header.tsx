'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.jpeg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src={logo}
              alt="Cafe Kinesi Logo"
              width={40}
              height={40}
              priority
              className="rounded-full transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-noto-serif text-xl font-bold text-cafe-brown">
              Cafe Kinesi
            </span>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-text-primary hover:text-accent-gold transition-colors duration-300 font-medium"
            >
              ホーム
            </Link>
            <Link
              href="/about"
              className="text-text-primary hover:text-accent-gold transition-colors duration-300 font-medium"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-text-primary hover:text-accent-gold transition-colors duration-300 font-medium"
            >
              ブログ
            </Link>
          </nav>

          {/* モバイルメニューボタン */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-cafe-brown hover:text-accent-gold transition-colors"
            aria-label="メニューを開く"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg animate-fadeIn">
            <nav className="py-4 space-y-4">
              <Link
                href="/"
                className="block px-4 py-2 text-text-primary hover:text-accent-gold hover:bg-cafe-cream/30 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                ホーム
              </Link>
              <Link
                href="/about"
                className="block px-4 py-2 text-text-primary hover:text-accent-gold hover:bg-cafe-cream/30 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/blog"
                className="block px-4 py-2 text-text-primary hover:text-accent-gold hover:bg-cafe-cream/30 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                ブログ
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;