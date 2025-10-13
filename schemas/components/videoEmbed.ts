export default {
  name: 'videoEmbed',
  type: 'object',
  title: '動画埋め込み',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'タイトル',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'url',
      type: 'url',
      title: '動画URL',
      description: 'YouTube、Vimeo、またはその他の動画プラットフォームのURL',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'aspectRatio',
      type: 'string',
      title: 'アスペクト比',
      options: {
        list: [
          { title: '16:9 (YouTube標準)', value: '16:9' },
          { title: '4:3', value: '4:3' },
          { title: '1:1 (正方形)', value: '1:1' },
          { title: '21:9 (ウルトラワイド)', value: '21:9' }
        ]
      },
      initialValue: '16:9'
    },
    {
      name: 'autoplay',
      type: 'boolean',
      title: '自動再生',
      description: '注意: 多くのブラウザで制限があります',
      initialValue: false
    },
    {
      name: 'controls',
      type: 'boolean',
      title: 'コントロール表示',
      initialValue: true
    },
    {
      name: 'muted',
      type: 'boolean',
      title: 'ミュート',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url'
    }
  }
}