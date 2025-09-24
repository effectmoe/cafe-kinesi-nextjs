'use client';

import BlogCard from './BlogCard';
import { useSanityData } from '@/hooks/useSanityData';
import { BLOG_POSTS_QUERY } from '@/lib/queries';

// フォールバックデータ
const defaultPosts = [
  {
    title: "アロマテラピーの基本",
    excerpt: "心と身体を癒すアロマテラピーの基本的な使い方をご紹介します。",
    image: "/blog-1.webp",
    date: "2024.03.15",
    slug: "aromatherapy-basics"
  },
  // ... 他のデフォルトデータ
];

const BlogSection = () => {
  const { data: posts, isLoading } = useSanityData(BLOG_POSTS_QUERY, 'blogPosts');

  const displayPosts = posts && posts.length > 0 ? posts : defaultPosts;

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">読み込み中...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-noto-serif text-3xl font-bold mb-4">ブログ</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            心と身体を整えるためのヒントやアロマテラピーの知識をシェアします。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post: any, index: number) => (
            <BlogCard
              key={post.slug || index}
              image={post.image}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;