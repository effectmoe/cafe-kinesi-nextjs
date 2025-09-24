import { Metadata } from 'next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import About from '@/components/pages/About';

// ISR（Incremental Static Regeneration）設定
// 1日ごとにAboutページを再生成（更新頻度が低いため）
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'About - Cafe Kinesi | 心と身体を整える空間について',
  description: 'カフェキネシは、アロマテラピー、瞑想、ヨガを通じて心と身体を整える特別な空間です。私たちの理念とサービスについて詳しくご紹介します。',
  keywords: [
    'カフェキネシ',
    'アロマテラピー',
    '瞑想',
    'ヨガ',
    'リラクゼーション',
    'ウェルネス',
    'ヒーリング',
    '心身調和'
  ],
  openGraph: {
    title: 'About - Cafe Kinesi | 心と身体を整える空間について',
    description: 'カフェキネシは、アロマテラピー、瞑想、ヨガを通じて心と身体を整える特別な空間です。',
    type: 'website',
    url: 'https://cafe-kinesi.com/about',
    images: [
      {
        url: '/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cafe Kinesi について',
      }
    ],
    siteName: 'Cafe Kinesi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About - Cafe Kinesi',
    description: 'カフェキネシは、アロマテラピー、瞑想、ヨガを通じて心と身体を整える特別な空間です。',
    images: ['/about-og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cafe-kinesi.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative">
        <About />
      </main>
      <SocialLinks />
      <Footer />
    </div>
  );
}