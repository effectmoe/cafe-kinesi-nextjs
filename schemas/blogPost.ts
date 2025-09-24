export default {
  name: 'blogPost',
  title: 'ブログ記事',
  type: 'document',

  // パブリッシュ機能を明示的に有効化
  liveEdit: false, // ドラフト機能を使用
  fields: [
    {
      name: 'title',
      title: 'タイトル',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      description: '記事のURL用の識別子です。タイトルから自動生成されます。',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: '抜粋',
      type: 'text',
      rows: 3,
      description: '記事一覧・SNSシェア用の短い説明文（トップページやSNSでの表示に使用）',
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'mainImage',
      title: 'メイン画像',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'ギャラリー画像',
      type: 'array',
      description: '複数の画像を追加できます（スライドショー表示用）',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette', 'dimensions'],
          },
          fields: [
            {
              name: 'caption',
              title: 'キャプション',
              type: 'string',
              description: '画像の説明（オプション）',
            },
            {
              name: 'alt',
              title: '代替テキスト',
              type: 'string',
              description: 'SEOとアクセシビリティのための説明',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
    {
      name: 'ogImage',
      title: 'OGP画像',
      type: 'image',
      description: 'SNSシェア時に表示される画像（1200x630px推奨）',
      options: {
        hotspot: false,
        accept: 'image/png,image/jpeg,image/webp',
      },
    },
    {
      name: 'tldr',
      title: 'TL;DR（要約）',
      type: 'text',
      rows: 3,
      description: '記事内容の3行まとめ（忙しい読者向けに記事詳細ページの冒頭に表示）',
      validation: (Rule: any) => Rule.max(300),
    },
    {
      name: 'additionalImages',
      title: '追加画像（シンプル）',
      type: 'array',
      description: 'シンプルに画像を追加（説明不要の場合）',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'content',
      title: '本文',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: '通常', value: 'normal'},
            {title: '見出し2', value: 'h2'},
            {title: '見出し3', value: 'h3'},
            {title: '見出し4', value: 'h4'},
            {title: '引用', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: '太字', value: 'strong'},
              {title: '斜体', value: 'em'},
              {title: '下線', value: 'underline'},
              {title: 'マーカー', value: 'highlight'},
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'keyPoint',
      title: '重要なポイント',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'タイトル',
          type: 'string',
          initialValue: '重要なポイント',
        },
        {
          name: 'content',
          title: '内容',
          type: 'text',
          rows: 3,
          description: '記事の重要ポイントを強調して説明',
        },
      ],
    },
    {
      name: 'summary',
      title: 'まとめ',
      type: 'text',
      rows: 4,
      description: '記事の締めくくりとなるまとめの文章',
    },
    {
      name: 'faq',
      title: 'FAQ（よくある質問）',
      type: 'array',
      description: 'この記事に関するよくある質問と回答',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: '質問',
              type: 'string',
              validation: (Rule: any) => Rule.required().min(1).max(200),
            },
            {
              name: 'answer',
              title: '回答',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required().min(1).max(1000),
            },
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer'
            }
          }
        }
      ]
    },
    {
      name: 'contentOrder',
      title: 'コンテンツ表示順序',
      type: 'array',
      description: 'ページ上でのコンテンツの表示順序を設定（ドラッグで並び替え可能）',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'TL;DR（要約）', value: 'tldr'},
              {title: '目次', value: 'toc'},
              {title: '本文', value: 'content'},
              {title: 'FAQ', value: 'faq'},
              {title: '重要ポイント', value: 'keyPoint'},
              {title: 'まとめ', value: 'summary'},
              {title: '関連記事', value: 'related'}
            ]
          }
        }
      ],
      initialValue: ['tldr', 'toc', 'content', 'keyPoint', 'summary', 'faq', 'related']
    },
    {
      name: 'category',
      title: 'カテゴリー',
      type: 'string',
      options: {
        list: [
          {title: 'ウェルネス', value: 'wellness'},
          {title: '食と健康', value: 'food_health'},
          {title: 'ライフスタイル', value: 'lifestyle'},
          {title: 'メディテーション', value: 'meditation'},
          {title: 'ヨガ', value: 'yoga'},
          {title: 'アロマテラピー', value: 'aromatherapy'},
          {title: 'スキンケア', value: 'skincare'},
          {title: '自然', value: 'nature'},
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'タグ',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'publishedAt',
      title: '公開日',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'featured',
      title: '注目記事',
      type: 'boolean',
      description: 'トップページで目立つように表示する',
      initialValue: false,
    },
    {
      name: 'author',
      title: '著者',
      type: 'reference',
      to: [{type: 'author'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare(selection: any) {
      const {title, author, media, date} = selection;
      const dateFormatted = date ? new Date(date).toLocaleDateString('ja-JP') : '未公開';
      return {
        title,
        subtitle: `${dateFormatted} ${author ? `・${author}` : ''}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: '公開日（新しい順）',
      name: 'publishedDateDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    }
  ],
}