const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'e4aqw590',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skmH5807aTZkc80e9wXtUGh6YGxvS9fmTcsxwG0vDPy9XPJ3lTpX7wYmAXl5SKy1HEOllZf3NDEg1ULmn'
});

async function updateBlogPost() {
  try {
    // 呼吸法の記事を更新
    const breathingPost = {
      _type: 'blogPost',
      _id: 'breathing-stress-relief',
      title: '呼吸法で日常のストレスを解放',
      slug: { current: 'breathing-stress-relief' },
      excerpt: '深呼吸は最もシンプルで効果的なストレス解消法です。正しい呼吸法を身につけることで、心身のバランスを整えましょう。',
      tldr: '深呼吸と瞑想的な呼吸法を使って、日々のストレスを軽減し、心身のバランスを整える方法を紹介します。',
      content: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'なぜ呼吸法が効果的なのか',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: '私たちの呼吸は、自律神経系と密接に関連しています。深くゆったりとした呼吸は副交感神経を活性化し、リラックス状態を促進します。逆に、浅く速い呼吸は交感神経を刺激し、ストレス反応を引き起こします。',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block3',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span3',
              text: '意識的な呼吸法を実践することで、以下の効果が期待できます：',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block4',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span4',
              text: '• 血圧の低下',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block4a',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span4a',
              text: '• 心拍数の安定',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block4b',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span4b',
              text: '• ストレスホルモンの減少',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block4c',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span4c',
              text: '• 集中力の向上',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block4d',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span4d',
              text: '• 不安感の軽減',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block5',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span5',
              text: '基本的な腹式呼吸法',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block6',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span6',
              text: '腹式呼吸は最も基本的で効果的な呼吸法です。以下の手順で実践してみましょう：',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block7',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span7',
              text: '1. 快適な姿勢で座るか横になります',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block7a',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span7a',
              text: '2. 片手を胸に、もう片手をお腹に置きます',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block7b',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span7b',
              text: '3. 鼻からゆっくりと息を吸い、お腹を膨らませます（4秒）',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block7c',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span7c',
              text: '4. 少し息を止めます（2秒）',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block7d',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span7d',
              text: '5. 口からゆっくりと息を吐き、お腹をへこませます（6秒）',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block8',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span8',
              text: '4-7-8呼吸法',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block9',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span9',
              text: 'アンドリュー・ワイル博士が推奨する4-7-8呼吸法は、不安やストレスを素早く軽減するのに効果的です。',
              marks: []
            }
          ],
          markDefs: []
        }
      ],
      keyPoint: {
        title: '毎日5分から始めましょう',
        content: '呼吸法は継続することで効果を発揮します。まずは1日5分から始め、徐々に時間を延ばしていきましょう。'
      },
      summary: '呼吸法は誰でも簡単に実践できる、効果的なストレス管理ツールです。腹式呼吸や4-7-8呼吸法などの基本的なテクニックを身につけることで、日常生活の質を大きく改善できます。',
      faq: [
        {
          _key: 'faq1',
          question: '呼吸法はいつ行うのが最も効果的ですか？',
          answer: '朝起きた直後と就寝前が特におすすめです。また、ストレスを感じた時にすぐに実践することで、即座にリラックス効果を得られます。'
        },
        {
          _key: 'faq2',
          question: '呼吸法の効果はどのくらいで感じられますか？',
          answer: '個人差はありますが、多くの人は実践直後から心拍数の低下や気分の改善を感じます。'
        }
      ],
      publishedAt: new Date().toISOString(),
      category: 'ウェルネス',
      tags: ['呼吸法', 'ストレス解消', 'リラックス', '瞑想'],
      featured: true
    };

    // 記事を作成または更新
    const result = await client.createOrReplace(breathingPost);
    console.log('✅ 記事を更新しました:', result._id);
    console.log('スラッグ:', result.slug.current);
    console.log('URL: http://localhost:3002/blog/' + result.slug.current);
    
  } catch (error) {
    console.error('エラー:', error);
  }
}

updateBlogPost();
