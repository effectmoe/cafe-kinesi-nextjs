export default {
  name: 'menuItem',
  title: 'メニューアイテム',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '商品名',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'nameEn',
      title: '商品名（英語）',
      type: 'string',
    },
    {
      name: 'description',
      title: '説明',
      type: 'text',
    },
    {
      name: 'descriptionEn',
      title: '説明（英語）',
      type: 'text',
    },
    {
      name: 'price',
      title: '価格',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'category',
      title: 'カテゴリー',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'メイン画像',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gallery',
      title: '追加画像',
      type: 'array',
      description: '商品の詳細画像（複数可）',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip'],
          },
          fields: [
            {
              name: 'caption',
              title: 'キャプション',
              type: 'string',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
    {
      name: 'available',
      title: '販売中',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'featured',
      title: 'おすすめ',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: '表示順',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'image',
    },
  },
}