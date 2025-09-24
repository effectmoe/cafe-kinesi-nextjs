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

async function testAPI() {
  try {
    const post = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug: 'breathing-stress-relief' });
    
    if (post) {
      console.log('✅ 記事が見つかりました');
      console.log('タイトル:', post.title);
      console.log('コンテンツブロック数:', post.content ? post.content.length : 0);
      
      if (post.content && post.content.length > 0) {
        console.log('\n最初の3つのコンテンツブロック:');
        post.content.slice(0, 3).forEach((block, index) => {
          console.log(`\nブロック ${index + 1}:`, JSON.stringify(block, null, 2));
        });
      }
      
      // test-vercel.json に全体データを保存
      require('fs').writeFileSync('test-breathing-post.json', JSON.stringify(post, null, 2));
      console.log('\n✅ 完全なデータを test-breathing-post.json に保存しました');
    } else {
      console.log('❌ 記事が見つかりません');
    }
  } catch (error) {
    console.error('エラー:', error);
  }
}

testAPI();
