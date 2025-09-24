import BlogCard from './BlogCard';
import { sanityFetch, getImageUrl } from '@/lib/sanity';
import { BLOG_POSTS_QUERY } from '@/lib/queries';

// サーバーコンポーネントとしてデータを取得
const BlogSection = async () => {
  let posts = [];

  try {
    posts = await sanityFetch({
      query: BLOG_POSTS_QUERY,
      params: {},
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
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
          {posts && posts.length > 0 ? (
            posts.map((post: any, index: number) => (
              <BlogCard
                key={post.slug || index}
                image={post.mainImage ? (getImageUrl(post.mainImage) || '/placeholder.svg') : '/placeholder.svg'}
                title={post.title}
                excerpt={post.excerpt}
                date={post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                }) : ''}
                slug={post.slug}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">ブログ記事がありません</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;