import { defineType } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'ブログ記事',
  type: 'document',

  // パブリッシュ機能を明示的に有効化
  liveEdit: false, // ドラフト機能を使用

  // プレビュー設定
  __experimental_omnisearch_visibility: true,

  // プレビューURL設定
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare(selection: any) {
      const {title, slug, author, media, date} = selection || {};
      let dateFormatted = '未公開';

      if (date) {
        try {
          dateFormatted = new Date(date).toLocaleDateString('ja-JP');
        } catch (error) {
          dateFormatted = '日付エラー';
        }
      }

      return {
        title: String(title || 'タイトルなし'),
        subtitle: `${dateFormatted}${author ? ` ・ ${String(author)}` : ''}`,
        media: media || undefined,
      };
    },
  },
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
        slugify: (input: string) => {
          return input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
        }
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
        metadata: ['dimensions'], // メタデータを最小限に
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
            metadata: ['dimensions'], // メタデータを最小限に
          },
          fields: [
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
        layout: 'list', // grid → list で軽量化
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
    // 追加画像（軽量化のため削除）
    // {
    //   name: 'additionalImages',
    //   title: '追加画像（シンプル）',
    //   type: 'array',
    //   description: 'シンプルに画像を追加（説明不要の場合）',
    //   of: [
    //     {
    //       type: 'image',
    //       options: {
    //         hotspot: true,
    //       },
    //     },
    //   ],
    // },
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
              validation: (Rule: any) => Rule.required().max(200),
            },
            {
              name: 'answer',
              title: '回答',
              type: 'text',
              rows: 2, // 行数削減
              validation: (Rule: any) => Rule.required().max(500), // 文字数制限
            },
          ],
          preview: {
            select: {
              title: 'question'
            },
            prepare(selection: any) {
              const {title} = selection || {};
              return {
                title: String(title || 'FAQ項目'),
                subtitle: 'Q&A'
              }
            }
          }
        }
      ],
      options: {
        sortable: false // ソート機能無効化
      }
    },
    // コンテンツ表示順序（軽量化のためコメントアウト）
    // {
    //   name: 'contentOrder',
    //   title: 'コンテンツ表示順序',
    //   type: 'array',
    //   description: 'ページ上でのコンテンツの表示順序を設定（ドラッグで並び替え可能）',
    //   of: [
    //     {
    //       type: 'string',
    //       options: {
    //         list: [
    //           {title: 'TL;DR（要約）', value: 'tldr'},
    //           {title: '目次', value: 'toc'},
    //           {title: '本文', value: 'content'},
    //           {title: 'FAQ', value: 'faq'},
    //           {title: '重要ポイント', value: 'keyPoint'},
    //           {title: 'まとめ', value: 'summary'},
    //           {title: '関連記事', value: 'related'}
    //         ]
    //       }
    //     }
    //   ],
    //   initialValue: ['tldr', 'toc', 'content', 'keyPoint', 'summary', 'faq', 'related']
    // },
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
  orderings: [
    {
      title: '公開日（新しい順）',
      name: 'publishedDateDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    }
  ],
})