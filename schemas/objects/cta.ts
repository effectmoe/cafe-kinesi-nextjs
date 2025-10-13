export default {
  name: 'cta',
  type: 'object',
  title: 'Call to Action',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'タイトル',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'サブタイトル'
    },
    {
      name: 'description',
      type: 'text',
      title: '説明文',
      rows: 3
    },
    {
      name: 'buttonText',
      type: 'string',
      title: 'ボタンテキスト',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'buttonLink',
      type: 'string',
      title: 'ボタンリンク',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'buttonStyle',
      type: 'string',
      title: 'ボタンスタイル',
      options: {
        list: [
          { title: 'プライマリー', value: 'primary' },
          { title: 'セカンダリー', value: 'secondary' },
          { title: 'アウトライン', value: 'outline' }
        ]
      },
      initialValue: 'primary'
    },
    {
      name: 'backgroundImage',
      type: 'customImage',
      title: '背景画像'
    },
    {
      name: 'backgroundColor',
      type: 'string',
      title: '背景色',
      options: {
        list: [
          { title: 'プライマリー', value: 'primary' },
          { title: 'セカンダリー', value: 'secondary' },
          { title: 'グレー', value: 'gray' },
          { title: '白', value: 'white' },
          { title: 'カスタム', value: 'custom' }
        ]
      },
      initialValue: 'primary'
    },
    {
      name: 'customBackgroundColor',
      type: 'string',
      title: 'カスタム背景色',
      description: 'HEXコード（例: #FF0000）',
      hidden: ({ parent }: any) => parent?.backgroundColor !== 'custom'
    },
    {
      name: 'textColor',
      type: 'string',
      title: 'テキスト色',
      options: {
        list: [
          { title: '白', value: 'white' },
          { title: '黒', value: 'black' },
          { title: 'プライマリー', value: 'primary' }
        ]
      },
      initialValue: 'white'
    },
    {
      name: 'layout',
      type: 'string',
      title: 'レイアウト',
      options: {
        list: [
          { title: '中央揃え', value: 'center' },
          { title: '左右分割', value: 'split' },
          { title: '上下分割', value: 'stacked' }
        ]
      },
      initialValue: 'center'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'buttonText',
      media: 'backgroundImage'
    }
  }
}