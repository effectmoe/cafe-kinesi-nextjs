import { Metadata } from 'next';
import Header from "@/components/Header";
import AlbumGrid from "@/components/AlbumGrid";
import BlogSection from "@/components/BlogSection";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";

// ISR（Incremental Static Regeneration）設定
// 30分ごとにホームページを再生成
export const revalidate = 1800;

export const metadata: Metadata = {
  title: 'Cafe Kinesi - キネシオロジーとアロマのセラピー',
  description: 'カフェキネシ - 心と身体を整えるキネシオロジーとアロマを使った健康法。誰でもどこでも簡単にできる新しいセラピーの世界。',
  openGraph: {
    title: 'Cafe Kinesi',
    description: '心と身体を整えるキネシオロジーとアロマを使った健康法',
    images: ['/og-image.jpg'],
    type: 'website',
  },
};

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative">
        <AlbumGrid />
        <BlogSection />
      </main>
      <SocialLinks />
      <Footer />
    </div>
  );
}