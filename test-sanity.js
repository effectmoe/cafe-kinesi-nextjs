const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'e4aqw590',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});

async function testBlogPost() {
  try {
    const query = `*[_type == "blogPost" && slug.current == "breathing-stress-relief"][0]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      tldr,
      content,
      keyPoint,
      summary,
      faq,
      publishedAt,
      category,
      tags
    }`;
    
    const result = await client.fetch(query);
    console.log('Blog post data:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error fetching blog post:', error);
  }
}

testBlogPost();