export default {
  name: 'news',
  title: 'お知らせ',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'タイトル',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titleEn',
      title: 'タイトル（英語）',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
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
      name: 'content',
      title: '内容',
      type: 'array',
      of: [
        {
          type: 'block',
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
      name: 'contentEn',
      title: '内容（英語）',
      type: 'array',
      of: [
        {
          type: 'block',
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
      name: 'publishedAt',
      title: '公開日',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'category',
      title: 'カテゴリー',
      type: 'string',
      options: {
        list: [
          {title: 'お知らせ', value: 'news'},
          {title: 'イベント', value: 'event'},
          {title: 'キャンペーン', value: 'campaign'},
          {title: '新商品', value: 'new_product'},
          {title: 'その他', value: 'other'},
        ],
      },
    },
    {
      name: 'image',
      title: 'メイン画像',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      date: 'publishedAt',
      media: 'image',
    },
    prepare(selection: any) {
      const {title, slug, date, media} = selection || {};
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
        subtitle: dateFormatted,
        media: media || undefined,
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