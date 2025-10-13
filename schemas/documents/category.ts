export default {
  name: 'category',
  title: 'カテゴリー',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'カテゴリー名',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'nameEn',
      title: 'カテゴリー名（英語）',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: '説明',
      type: 'text',
    },
    {
      name: 'image',
      title: 'イメージ画像',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      media: 'image',
    },
  },
}