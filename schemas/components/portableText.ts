export default {
  name: 'portableText',
  type: 'array',
  title: 'リッチテキスト',
  of: [
    {
      type: 'block',
      styles: [
        { title: '標準', value: 'normal' },
        { title: '見出し1', value: 'h1' },
        { title: '見出し2', value: 'h2' },
        { title: '見出し3', value: 'h3' },
        { title: '見出し4', value: 'h4' },
        { title: '引用', value: 'blockquote' }
      ],
      lists: [
        { title: '箇条書き', value: 'bullet' },
        { title: '番号付きリスト', value: 'number' }
      ],
      marks: {
        decorators: [
          { title: '太字', value: 'strong' },
          { title: '斜体', value: 'em' },
          { title: 'アンダーライン', value: 'underline' },
          { title: '取り消し線', value: 'strike-through' },
          { title: 'コード', value: 'code' }
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'リンク',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL'
              },
              {
                name: 'blank',
                type: 'boolean',
                title: '新しいタブで開く',
                initialValue: false
              }
            ]
          },
          {
            name: 'internalLink',
            type: 'object',
            title: '内部リンク',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'ページ',
                to: [
                  { type: 'page' },
                  { type: 'blogPost' }
                ]
              }
            ]
          }
        ]
      }
    },
    {
      type: 'customImage',
      title: '画像'
    },
    {
      type: 'videoEmbed',
      title: '動画埋め込み'
    },
    {
      type: 'codeBlock',
      title: 'コードブロック'
    },
    {
      type: 'socialEmbed',
      title: 'SNS埋め込み'
    }
  ]
}