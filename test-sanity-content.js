const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'e4aqw590',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});

const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    tldr,
    mainImage,
    content,
    keyPoint,
    summary,
    faq,
    contentOrder,
    publishedAt,
    category,
    tags,
    "author": author->{
      name,
      bio,
      image
    }
  }
`;

async function testContent() {
  try {
    // まずは利用可能な記事一覧を取得
    const posts = await client.fetch('*[_type == "blogPost"][0...5]{title, "slug": slug.current, _id}');
    console.log('Available blog posts:');
    console.log(JSON.stringify(posts, null, 2));
    
    if (posts.length > 0) {
      const slug = posts[0].slug;
      console.log(`\nFetching details for post with slug: ${slug}`);
      
      const post = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug });
      
      console.log('\n=== Post Details ===');
      console.log('Title:', post.title);
      console.log('Has content:', !!post.content);
      console.log('Content type:', Array.isArray(post.content) ? 'array' : typeof post.content);
      
      if (post.content && post.content.length > 0) {
        console.log('First content block:', JSON.stringify(post.content[0], null, 2));
      }
      
      console.log('\nOther fields:');
      console.log('- excerpt:', post.excerpt ? post.excerpt.substring(0, 50) + '...' : 'null');
      console.log('- tldr:', post.tldr);
      console.log('- keyPoint:', JSON.stringify(post.keyPoint, null, 2));
      console.log('- summary:', post.summary);
      console.log('- faq:', Array.isArray(post.faq) ? `Array with ${post.faq.length} items` : post.faq);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testContent();
