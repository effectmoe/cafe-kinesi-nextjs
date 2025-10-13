import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'schemaOrg',
  type: 'object',
  title: 'Schema.org設定',
  fields: [
    defineField({
      name: 'enabled',
      type: 'boolean',
      title: 'Schema.org構造化データを有効化',
      initialValue: false
    })
  ]
})