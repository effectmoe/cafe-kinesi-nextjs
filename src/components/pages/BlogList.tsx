import BlogCard from "@/components/BlogCard";
import { localArticles } from "./BlogPost.data";

const BlogList = () => {
  // 記事をリスト形式に変換して日付でソート
  const blogPosts = Object.entries(localArticles).map(([slug, article]) => ({
    slug,
    ...article
  })).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

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
        {blogPosts.map((post) => (
          <BlogCard
            key={post.slug}
            image={post.image}
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

      {blogPosts.length === 0 && (
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