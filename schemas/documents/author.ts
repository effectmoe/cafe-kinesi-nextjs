export default {
  name: 'author',
  title: '著者',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '名前',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
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
      name: 'image',
      title: 'プロフィール画像',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: '紹介文',
      type: 'text',
      rows: 4,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}