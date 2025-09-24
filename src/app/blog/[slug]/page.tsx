import { Metadata } from 'next';
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPost from '@/components/pages/BlogPost';
import { localArticles } from '@/components/pages/BlogPost.data';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { client } from '@/lib/sanity';

// ISR（Incremental Static Regeneration）設定
// 1時間ごとにページを再生成
export const revalidate = 3600;

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // まずローカルの記事スラッグを取得
  const localSlugs = Object.keys(localArticles).map((slug) => ({
    slug,
  }));

  // Sanityから記事スラッグを取得（可能な場合）
  try {
    const posts = await client.fetch(`
      *[_type == "blogPost" && defined(slug.current)]{
        "slug": slug.current
      }
    `);

    const sanitySlugs = posts.map((post: any) => ({
      slug: post.slug,
    }));

    // ローカルとSanityのスラッグをマージ（重複を除去）
    const allSlugs = new Map();
    [...localSlugs, ...sanitySlugs].forEach(item => {
      allSlugs.set(item.slug, item);
    });

    return Array.from(allSlugs.values());
  } catch (error) {
    console.log('Sanityデータ取得をスキップ:', error);
    // Sanityエラー時はローカルデータのみ返す
    return localSlugs;
  }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;

    // まずローカルデータから取得を試みる
    const article = localArticles[slug];

    if (!article) {
      // Sanityから取得を試みる（将来的な実装用）
      // const post = await client.fetch(`
      //   *[_type == "blogPost" && slug.current == $slug][0]{
      //     title,
      //     excerpt,
      //     "image": mainImage.asset->url,
      //     publishedAt,
      //     author->{name},
      //     categories[]->{title}
      //   }
      // `, { slug });

      return {
        title: 'ページが見つかりません - Cafe Kinesi',
        description: '記事が見つかりませんでした',
      };
    }

    // カテゴリーの取得（ローカルデータ用に簡易化）
    const categories = article.category ? [article.category] : [];

    return {
      title: `${article.title} - Cafe Kinesi Blog`,
      description: article.excerpt || `${article.title}に関する記事です。`,
      keywords: [
        article.title,
        'カフェキネシ',
        'アロマテラピー',
        '瞑想',
        'ヨガ',
        ...categories
      ],
      authors: [{ name: article.author?.name || 'Cafe Kinesi' }],
      publishedTime: article.publishedAt,
      openGraph: {
        title: article.title,
        description: article.excerpt || `${article.title}に関する記事です。`,
        type: 'article',
        publishedTime: article.publishedAt,
        authors: [article.author?.name || 'Cafe Kinesi'],
        images: article.image ? [
          {
            url: article.image,
            width: 1200,
            height: 630,
            alt: article.title,
          }
        ] : ['/og-image.jpg'],
        siteName: 'Cafe Kinesi',
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt || `${article.title}に関する記事です。`,
        images: article.image ? [article.image] : ['/og-image.jpg'],
      },
      alternates: {
        canonical: `https://cafe-kinesi.com/blog/${slug}`,
      },
    };
  } catch (error) {
    console.error('メタデータ生成エラー:', error);
    return {
      title: 'エラー - Cafe Kinesi',
      description: 'ページの読み込み中にエラーが発生しました',
    };
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  // 記事が存在しない場合は404を表示
  if (!localArticles[slug]) {
    notFound();
  }

  const article = localArticles[slug];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ArticleJsonLd
          title={article.title}
          description={article.excerpt}
          image={article.image}
          publishedAt={article.publishedAt}
          author={article.author?.name}
          url={`https://cafe-kinesi.com/blog/${slug}`}
        />
        <BlogPost slug={slug} />
      </main>
      <Footer />
    </div>
  );
}