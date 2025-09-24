// ローカル記事データ

export interface Article {
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  author: { name: string };
  content: Array<{ type?: string; text: string }>;
}

export const localArticles: { [key: string]: Article } = {
  "japanese-tea-time": {
    title: "日本茶の時間",
    excerpt: "忙しい日常から離れて、ゆっくりとお茶を楽しむ時間は、心と体を整える大切なひとときです。",
    image: "/blog-1.webp",
    publishedAt: "2024-12-15",
    author: { name: "Cafe Kinesi チーム" },
    content: [
      { text: "日本茶には、リラックス効果や健康維持に役立つ多くの効能があります。" }
    ]
  },
  "aromatherapy-basics": {
    title: "アロマテラピーの基本",
    excerpt: "心と身体を癒すアロマテラピーの基本的な使い方をご紹介します。",
    image: "/blog-2.webp",
    publishedAt: "2024-12-10",
    author: { name: "Cafe Kinesi チーム" },
    content: [
      { text: "アロマテラピーは、植物から抽出した精油を使用して、心と体のバランスを整える自然療法です。" }
    ]
  },
  "meditation-guide": {
    title: "初心者のための瞑想ガイド",
    excerpt: "瞑想を始めたい方へ、基本的な方法とコツをお伝えします。",
    image: "/blog-3.webp",
    publishedAt: "2024-12-05",
    author: { name: "Cafe Kinesi チーム" },
    content: [
      { text: "瞑想は、心を落ち着かせ、内なる平和を見つけるための古代からの実践です。" }
    ]
  }
};