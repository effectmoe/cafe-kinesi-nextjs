import { Metadata } from 'next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: 'アロマ - Cafe Kinesi',
  description: 'カフェキネシのアロマテラピー',
};

export default function AromaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative">
        <div className="container mx-auto px-4 py-16">
          <h1 className="font-noto-serif text-3xl md:text-4xl font-medium text-center mb-8">
            アロマ
          </h1>
          <p className="text-center text-gray-600">
            Coming Soon
          </p>
        </div>
      </main>
      <SocialLinks />
      <Footer />
    </div>
  );
}