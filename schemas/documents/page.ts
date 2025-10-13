export default {
  name: 'page',
  type: 'document',
  title: 'ページ',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'ページタイトル',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'スラッグ',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'pageBuilder',
      type: 'array',
      title: 'ページビルダー',
      of: [
        { type: 'hero' },
        { type: 'feature' },
        { type: 'cta' },
        { type: 'testimonial' }
        // { type: 'reference', to: [{ type: 'globalWidget' }] } // globalWidgetは未実装
      ]
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO設定'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current'
    }
  }
}