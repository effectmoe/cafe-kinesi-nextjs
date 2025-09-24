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
      mainImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-breathing-placeholder'
        }
      },
      content: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'h2',
          children: [
            {
              _type: 'span',
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
              text: '• 血圧の低下\n• 心拍数の安定\n• ストレスホルモンの減少\n• 集中力の向上\n• 不安感の軽減',
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
              text: '1. 快適な姿勢で座るか横になります\n2. 片手を胸に、もう片手をお腹に置きます\n3. 鼻からゆっくりと息を吸い、お腹を膨らませます（4秒）\n4. 少し息を止めます（2秒）\n5. 口からゆっくりと息を吐き、お腹をへこませます（6秒）',
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
              text: 'アンドリュー・ワイル博士が推奨する4-7-8呼吸法は、不安やストレスを素早く軽減するのに効果的です：',
              marks: []
            }
          ],
          markDefs: []
        },
        {
          _type: 'block',
          _key: 'block10',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: '1. 完全に息を吐き切ります\n2. 鼻から静かに息を吸います（4秒）\n3. 息を止めます（7秒）\n4. 口から「フー」と音を立てて息を吐きます（8秒）\n5. これを3〜4回繰り返します',
              marks: []
            }
          ],
          markDefs: []
        }
      ],
      keyPoint: {
        title: '毎日5分から始めましょう',
        content: '呼吸法は継続することで効果を発揮します。まずは1日5分から始め、徐々に時間を延ばしていきましょう。朝起きた時、昼休み、就寝前など、決まった時間に実践することで習慣化しやすくなります。'
      },
      summary: '呼吸法は誰でも簡単に実践できる、効果的なストレス管理ツールです。腹式呼吸や4-7-8呼吸法などの基本的なテクニックを身につけることで、日常生活の質を大きく改善できます。今日から始めて、心身の健康を手に入れましょう。',
      faq: [
        {
          question: '呼吸法はいつ行うのが最も効果的ですか？',
          answer: '朝起きた直後と就寝前が特におすすめです。また、ストレスを感じた時にすぐに実践することで、即座にリラックス効果を得られます。'
        },
        {
          question: '呼吸法をしていると眠くなってしまいます。これは正常ですか？',
          answer: 'はい、正常な反応です。深い呼吸は副交感神経を活性化し、リラックス状態を促進するため、眠気を感じることがあります。日中に行う場合は、時間を短めにすると良いでしょう。'
        },
        {
          question: '呼吸法の効果はどのくらいで感じられますか？',
          answer: '個人差はありますが、多くの人は実践直後から心拍数の低下や気分の改善を感じます。継続的な効果は、2〜3週間の定期的な練習後に現れることが多いです。'
        }
      ],
      publishedAt: new Date().toISOString(),
      category: 'ウェルネス',
      tags: ['呼吸法', 'ストレス解消', 'リラックス', '瞑想'],
      featured: true,
      author: {
        _ref: 'author-1',
        _type: 'reference'
      }
    };

    // 記事を作成または更新
    const result = await client.createOrReplace(breathingPost);
    console.log('✅ 記事を更新しました:', result._id);
    console.log('スラッグ:', result.slug.current);
    
  } catch (error) {
    console.error('エラー:', error);
  }
}

updateBlogPost();
