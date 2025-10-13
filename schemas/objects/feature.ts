export default {
  name: 'feature',
  type: 'object',
  title: '機能・特徴セクション',
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
      name: 'image',
      type: 'customImage',
      title: '画像'
    },
    {
      name: 'icon',
      type: 'string',
      title: 'アイコン',
      description: 'Font Awesomeのクラス名またはemoji'
    },
    {
      name: 'features',
      type: 'array',
      title: '機能一覧',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'タイトル',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              type: 'text',
              title: '説明',
              rows: 2
            },
            {
              name: 'icon',
              type: 'string',
              title: 'アイコン'
            },
            {
              name: 'image',
              type: 'customImage',
              title: '画像'
            }
          ]
        }
      ]
    },
    {
      name: 'layout',
      type: 'string',
      title: 'レイアウト',
      options: {
        list: [
          { title: 'グリッド（3列）', value: 'grid-3' },
          { title: 'グリッド（2列）', value: 'grid-2' },
          { title: 'グリッド（4列）', value: 'grid-4' },
          { title: '左右分割', value: 'split' },
          { title: '縦一列', value: 'vertical' }
        ]
      },
      initialValue: 'grid-3'
    },
    {
      name: 'alignment',
      type: 'string',
      title: 'テキスト配置',
      options: {
        list: [
          { title: '左寄せ', value: 'left' },
          { title: '中央', value: 'center' },
          { title: '右寄せ', value: 'right' }
        ]
      },
      initialValue: 'center'
    },
    {
      name: 'backgroundColor',
      type: 'string',
      title: '背景色',
      options: {
        list: [
          { title: '透明', value: 'transparent' },
          { title: '白', value: 'white' },
          { title: 'グレー', value: 'gray' },
          { title: 'プライマリー', value: 'primary' }
        ]
      },
      initialValue: 'transparent'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image'
    }
  }
}