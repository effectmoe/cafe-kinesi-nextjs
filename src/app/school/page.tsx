import { Metadata } from 'next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import CalendarWidget from "@/components/calendar/CalendarWidget";

export const metadata: Metadata = {
  title: 'スクール - Cafe Kinesi',
  description: 'カフェキネシのスクール情報',
};

export default function SchoolPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative">
        <div className="container mx-auto px-4 py-16">
          <h1 className="font-noto-serif text-3xl md:text-4xl font-medium text-center mb-8">
            スクール
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* メインコンテンツ */}
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-6">
                  Cafe Kinesiでは、心と体の健康をサポートする様々な講座を開催しています。
                  初心者から上級者まで、レベルに合わせた講座をご用意しております。
                </p>

                <h2 className="text-2xl font-semibold mb-4">開催中の講座</h2>

                <div className="grid gap-6">
                  {/* 講座カード例 */}
                  <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-2">ピーチタッチ基礎講座</h3>
                    <p className="text-gray-600 mb-4">
                      ピーチタッチの基礎を学び、日常生活に活かせるテクニックを習得します。
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>👤 講師: 山田 花子</span>
                      <span>⏱️ 2時間</span>
                      <span>💰 ¥15,000</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-2">チャクラキネシ実践</h3>
                    <p className="text-gray-600 mb-4">
                      チャクラの理解を深め、実践的なテクニックを身につけます。
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>👤 講師: 佐藤 一郎</span>
                      <span>⏱️ 2時間</span>
                      <span>💰 ¥18,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1">
              <CalendarWidget className="mb-6" />

              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4">お知らせ</h3>
                <ul className="space-y-2 text-sm">
                  <li className="border-b pb-2">
                    <span className="text-gray-500">2025.10.01</span>
                    <p className="text-gray-700">新講座開講のお知らせ</p>
                  </li>
                  <li className="border-b pb-2">
                    <span className="text-gray-500">2025.09.15</span>
                    <p className="text-gray-700">講師紹介ページを更新しました</p>
                  </li>
                </ul>
              </div>

              <div className="bg-[#8B5A3C] text-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">お問い合わせ</h3>
                <p className="text-sm mb-4">講座に関するご質問はお気軽にお問い合わせください。</p>
                <button className="w-full bg-white text-[#8B5A3C] py-2 px-4 rounded hover:bg-gray-100 transition-colors">
                  お問い合わせ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SocialLinks />
      <Footer />
    </div>
  );
}