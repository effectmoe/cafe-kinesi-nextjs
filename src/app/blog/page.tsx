import { Metadata } from 'next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import BlogList from '@/components/pages/BlogList';

// ISR（Incremental Static Regeneration）設定
// 10分ごとにブログ一覧を再生成（新着記事の反映を早くするため）
export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Blog - Cafe Kinesi',
  description: 'カフェキネシブログ - キネシオロジーとアロマテラピーに関する記事、健康とウェルネスのヒントをお届けします。',
  openGraph: {
    title: 'Blog - Cafe Kinesi',
    description: 'キネシオロジーとアロマテラピーに関する記事',
    images: ['/og-image.jpg'],
    type: 'website',
  },
};

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative">
        <BlogList />
      </main>
      <SocialLinks />
      <Footer />
    </div>
  );
}