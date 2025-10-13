export default {
  name: 'hero',
  type: 'object',
  title: 'ヒーローセクション',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'メインタイトル',
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
      name: 'backgroundImage',
      type: 'customImage',
      title: '背景画像'
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      title: 'オーバーレイの透明度',
      description: '0-1の範囲で設定（0が透明、1が不透明）',
      initialValue: 0.5,
      validation: (Rule: any) => Rule.min(0).max(1)
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
      name: 'buttons',
      type: 'array',
      title: 'ボタン',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'ボタンテキスト'
            },
            {
              name: 'link',
              type: 'string',
              title: 'リンク先'
            },
            {
              name: 'style',
              type: 'string',
              title: 'スタイル',
              options: {
                list: [
                  { title: 'プライマリー', value: 'primary' },
                  { title: 'セカンダリー', value: 'secondary' },
                  { title: 'アウトライン', value: 'outline' }
                ]
              },
              initialValue: 'primary'
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.max(2)
    },
    {
      name: 'alignment',
      type: 'string',
      title: '配置',
      options: {
        list: [
          { title: '左寄せ', value: 'left' },
          { title: '中央', value: 'center' },
          { title: '右寄せ', value: 'right' }
        ]
      },
      initialValue: 'center'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage'
    }
  }
}