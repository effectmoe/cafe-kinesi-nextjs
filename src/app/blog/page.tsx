import { Metadata } from 'next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import BlogList from '@/components/pages/BlogList';

// ISR（Incremental Static Regeneration）設定
// 1分ごとに再生成（開発中は短く設定）
export const revalidate = 60;

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

export default async function BlogListPage() {
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