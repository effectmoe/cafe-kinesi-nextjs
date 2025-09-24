import type { Metadata } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider'
import { Analytics } from './analytics'
import { WebVitals } from './reportWebVitals'

// フォント最適化設定
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap', // フォント読み込みの最適化
  preload: true, // 重要フォントの先読み
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  variable: '--font-noto-serif-jp',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Cafe Kinesi - 心と身体を整える空間',
    template: '%s | Cafe Kinesi'
  },
  description: 'カフェキネシは、心と身体を整えるためのアロマテラピー、瞑想、ヨガを提供する特別な空間です。',
  keywords: ['カフェキネシ', 'キネシオロジー', 'アロマテラピー', '瞑想', 'ヨガ', 'ウェルネス'],
  authors: [{ name: 'Cafe Kinesi' }],
  openGraph: {
    title: 'Cafe Kinesi - 心と身体を整える空間',
    description: 'カフェキネシは、心と身体を整えるためのキネシオロジーとアロマテラピーを提供する特別な空間です。',
    type: 'website',
    images: ['/og-image.jpg'],
    siteName: 'Cafe Kinesi',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cafe Kinesi - 心と身体を整える空間',
    description: 'カフェキネシは、心と身体を整えるためのキネシオロジーとアロマテラピーを提供する特別な空間です。',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cafe Kinesi',
    description: 'カフェキネシは、心と身体を整えるためのアロマテラピー、瞑想、ヨガを提供する特別な空間です。',
    url: 'https://cafe-kinesi.com',
    logo: 'https://cafe-kinesi.com/logo.jpeg',
    image: 'https://cafe-kinesi.com/og-image.jpg',
    sameAs: [
      'https://www.instagram.com/cafekinesi',
      'https://twitter.com/cafekinesi',
      'https://www.facebook.com/cafekinesi',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+81-XX-XXXX-XXXX',
      contactType: 'Customer Service',
      availableLanguage: ['Japanese'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'あなたの住所',
      addressLocality: '市区町村',
      addressRegion: '都道府県',
      postalCode: '郵便番号',
      addressCountry: 'JP',
    },
    openingHours: 'Mo-Su 09:00-18:00',
    priceRange: '$',
  };

  return (
    <html lang="ja" className={`${notoSansJP.variable} ${notoSerifJP.variable} scroll-smooth`}>
      <head>
        {/* 重要画像のプリロード */}
        <link rel="preload" href="/logo.jpeg" as="image" />
        <link rel="preload" href="/og-image.jpg" as="image" />

        {/* DNS プリフェッチ */}
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* 重要なリソースの先読み */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ReactQueryProvider>
          <TooltipProvider>
            {children}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </ReactQueryProvider>
        <Analytics />
        <WebVitals />
      </body>
    </html>
  )
}