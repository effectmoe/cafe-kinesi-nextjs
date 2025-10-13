import {defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: '検索結果に表示されるタイトル（60文字以内推奨）',
      validation: (Rule) => Rule.max(60).warning('60文字以内を推奨します'),
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: '検索結果に表示される説明文（160文字以内推奨）',
      validation: (Rule) => Rule.max(160).warning('160文字以内を推奨します'),
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'SEOキーワード（カンマ区切り）',
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'SNS共有時のサムネイル画像（1200x630px推奨）',
      options: {
        hotspot: true,
      },
    },
  ],
})