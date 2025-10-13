import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: '質問',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'answer',
      title: '回答',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'カテゴリー',
      type: 'string',
      options: {
        list: [
          {title: '料金について', value: 'pricing'},
          {title: 'サービスについて', value: 'service'},
          {title: 'アクセス', value: 'access'},
          {title: 'その他', value: 'other'}
        ]
      }
    }),
    defineField({
      name: 'order',
      title: '表示順',
      type: 'number',
      initialValue: 0
    })
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category'
    }
  }
})