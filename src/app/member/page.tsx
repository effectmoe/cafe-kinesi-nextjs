import { Metadata } from 'next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: 'メンバー - Cafe Kinesi',
  description: 'カフェキネシのメンバー情報',
};

export default function MemberPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative">
        <div className="container mx-auto px-4 py-16">
          <h1 className="font-noto-serif text-3xl md:text-4xl font-medium text-center mb-8">
            メンバー
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