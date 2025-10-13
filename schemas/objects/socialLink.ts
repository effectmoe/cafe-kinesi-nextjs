import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'ソーシャルリンク',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'プラットフォーム',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Twitter', value: 'twitter' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Bandcamp', value: 'bandcamp' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'label',
      title: '表示テキスト',
      type: 'string',
      description: '未入力の場合はプラットフォーム名を使用'
    }),
    defineField({
      name: 'isActive',
      title: '表示する',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'order',
      title: '表示順',
      type: 'number',
      validation: Rule => Rule.min(1)
    })
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'url',
      order: 'order',
      isActive: 'isActive'
    },
    prepare(selection) {
      const orderPrefix = selection.order ? `${selection.order}. ` : ''
      return {
        title: `${orderPrefix}${selection.title}`,
        subtitle: selection.isActive ? selection.subtitle : '(非表示)'
      }
    }
  }
})