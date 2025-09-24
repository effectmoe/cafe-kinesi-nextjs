'use client';

import AlbumCard from './AlbumCard';

// 画像のインポート
import album1 from '@/assets/album-1.jpg';
import album2 from '@/assets/album-2.jpg';
import album3 from '@/assets/album-3.jpg';
import album4 from '@/assets/album-4.jpg';
import album5 from '@/assets/album-5.jpg';
import album6 from '@/assets/album-6.jpg';

const albums = [
  {
    id: 1,
    image: album1,
    title: "アロマテラピー",
    description: "天然精油を使った心身のケア"
  },
  {
    id: 2,
    image: album2,
    title: "瞑想セッション",
    description: "内なる平静を見つける時間"
  },
  {
    id: 3,
    image: album3,
    title: "ヨガクラス",
    description: "身体と心のバランスを整える"
  },
  {
    id: 4,
    image: album4,
    title: "ハーブティー",
    description: "季節の恵みを感じるひととき"
  },
  {
    id: 5,
    image: album5,
    title: "リフレクソロジー",
    description: "足裏から全身の調和を促す"
  },
  {
    id: 6,
    image: album6,
    title: "アートセラピー",
    description: "創作を通じた自己表現の場"
  }
];

const AlbumGrid = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-cafe-cream/20">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="font-noto-serif text-4xl font-bold text-cafe-brown mb-4">
            サービス一覧
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            心と身体を整えるための多彩なサービスをご用意しています。
            あなたに最適なプログラムを見つけてください。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album, index) => (
            <div
              key={album.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AlbumCard
                image={album.image}
                title={album.title}
                description={album.description}
                className="card-cafe"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlbumGrid;