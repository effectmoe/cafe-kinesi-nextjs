import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="text-center max-w-md">
          <h1 className="font-noto-serif text-6xl font-bold text-[hsl(var(--text-primary))] mb-4">
            404
          </h1>
          <h2 className="font-noto-serif text-2xl font-medium text-[hsl(var(--text-primary))] mb-6">
            ページが見つかりません
          </h2>
          <p className="text-[hsl(var(--text-secondary))] mb-8 leading-relaxed">
            お探しのページは存在しないか、移動した可能性があります。
            URLをご確認いただくか、下記のリンクからお探しください。
          </p>
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-[hsl(var(--text-primary))] text-white rounded-md hover:opacity-90 transition-opacity"
            >
              ホームに戻る
            </Link>
            <div className="flex justify-center space-x-6 mt-6">
              <Link
                href="/about"
                className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-colors text-sm"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-colors text-sm"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}