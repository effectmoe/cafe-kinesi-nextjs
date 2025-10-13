import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'representative',
  title: '代表者',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '名前',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'englishName',
      title: '英語名',
      type: 'string',
    }),
    defineField({
      name: 'birthName',
      title: '本名',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: '役職',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: '所在地',
      type: 'string',
    }),
    defineField({
      name: 'biography',
      title: '経歴・プロフィール',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'qualifications',
      title: '資格・認定',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'services',
      title: '提供サービス',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'achievements',
      title: '実績・功績',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'philosophy',
      title: '理念・哲学',
      type: 'text',
    }),
    defineField({
      name: 'message',
      title: 'メッセージ',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'プロフィール画像',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socialLinks',
      title: 'ソーシャルリンク',
      type: 'object',
      fields: [
        {
          name: 'website',
          title: 'ウェブサイト',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: '公開日',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
})