'use client';

import Image from 'next/image';
import Link from 'next/link';

// 画像のインポート
import album1 from '@/assets/album-1.jpg';
import album2 from '@/assets/album-2.jpg';
import album3 from '@/assets/album-3.jpg';
import album4 from '@/assets/album-4.jpg';
import album5 from '@/assets/album-5.jpg';
import album6 from '@/assets/album-6.jpg';

// スクリーンショットに基づいた正確なデータ構造
const albums = [
  {
    id: 1,
    image: album1,
    title: "カフェキネシについて",
    subtitle: "ABOUT CAFE KINESI",
    bgColor: "bg-purple-100",
    href: "/about"
  },
  {
    id: 2,
    image: album2,
    title: "スクール",
    subtitle: "SCHOOL",
    bgColor: "bg-blue-100",
    href: "/school"
  },
  {
    id: 3,
    image: album3,
    title: "インストラクター",
    subtitle: "INSTRUCTOR",
    bgColor: "bg-gray-100",
    href: "/instructor"
  },
  {
    id: 4,
    image: album4,
    title: "ブログ",
    subtitle: "BLOG",
    bgColor: "bg-purple-200",
    href: "/blog"
  },
  {
    id: 5,
    image: album5,
    title: "アロマ",
    subtitle: "AROMA",
    bgColor: "bg-green-100",
    href: "/aroma"
  },
  {
    id: 6,
    image: album6,
    title: "メンバー",
    subtitle: "MEMBER",
    bgColor: "bg-yellow-100",
    href: "/member"
  }
];

const AlbumGrid = () => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map((album) => (
            <Link
              key={album.id}
              href={album.href}
              className="group block"
            >
              <div className={`relative h-64 lg:h-72 ${album.bgColor} rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                <div className="absolute inset-0 p-6 flex flex-col">
                  {/* 画像部分 */}
                  <div className="relative flex-1 mb-4">
                    <Image
                      src={album.image}
                      alt={album.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  {/* テキスト部分 */}
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-800 mb-1">
                      {album.title}
                    </h3>
                    <p className="text-xs text-gray-600 uppercase tracking-wider">
                      {album.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumGrid;