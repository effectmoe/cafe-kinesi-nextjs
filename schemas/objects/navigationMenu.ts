import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigationMenu',
  title: 'ナビゲーションメニュー',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'メニューラベル',
      type: 'string',
      validation: Rule => Rule.required().error('メニューラベルは必須です')
    }),
    defineField({
      name: 'link',
      title: 'リンク先',
      type: 'string',
      validation: Rule => Rule.required().error('リンク先は必須です'),
      description: '例: /#about-section, /school, /instructor など'
    }),
    defineField({
      name: 'order',
      title: '表示順',
      type: 'number',
      validation: Rule => Rule.required().min(1),
      description: '小さい数字ほど上に表示されます'
    }),
    defineField({
      name: 'isActive',
      title: '有効化',
      type: 'boolean',
      initialValue: true,
      description: 'OFFにするとメニューに表示されません'
    })
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'link',
      order: 'order'
    },
    prepare(selection) {
      return {
        title: `${selection.order}. ${selection.title}`,
        subtitle: selection.subtitle
      }
    }
  }
})
