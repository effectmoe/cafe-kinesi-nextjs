const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'e4aqw590',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});

async function test() {
  const post = await client.fetch(
    '*[_type == "blogPost" && slug.current == "breathing-stress-relief"][0]'
  );
  
  if (post) {
    console.log('Title:', post.title);
    console.log('Has content:', !!post.content);
    console.log('Content blocks:', post.content ? post.content.length : 0);
  }
}

test();
