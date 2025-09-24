'use client';

import BlogCard from "@/components/BlogCard";
import { useSanityData } from '@/hooks/useSanityData';
import { BLOG_POSTS_QUERY } from '@/lib/queries';

const BlogList = () => {
  const { data: blogPosts, isLoading } = useSanityData(
    BLOG_POSTS_QUERY,
    'blogPosts'
  );

  if (isLoading) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-6 py-12">
        <div className="text-center">読み込み中...</div>
      </div>
    );
  }

  const posts = blogPosts || [];

  return (
    <div className="w-full max-w-screen-xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="font-noto-serif text-3xl md:text-4xl font-medium text-[hsl(var(--text-primary))] text-center mb-4">
          ブログ
        </h1>
        <p className="text-[hsl(var(--text-secondary))] text-center max-w-2xl mx-auto">
          カフェキネシからの最新情報、キネシオロジーとアロマテラピーに関する記事、
          健康とウェルネスに関するヒントをお届けします。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <BlogCard
            key={post.slug}
            image={post.mainImage}
            title={post.title}
            excerpt={post.excerpt}
            date={new Date(post.publishedAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
            slug={post.slug}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[hsl(var(--text-secondary))]">
            現在、記事はありません。
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogList;