export default {
  name: 'chatConfiguration',
  title: 'チャット設定',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '設定名',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'active',
      title: '有効',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'config',
      title: 'チャット設定',
      type: 'object',
      fields: [
        {
          name: 'chatUI',
          title: 'チャットUI設定',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'チャットタイトル',
              type: 'string',
              initialValue: 'Cafe Kinesiサポート'
            },
            {
              name: 'welcomeMessage',
              title: 'ウェルカムメッセージ',
              type: 'text',
              initialValue: 'こんにちは！Cafe Kinesiのサポートチャットです。ウェルネス、瞑想、ヨガ、アロマテラピーなど、心と体の健康に関するご質問にお答えします。'
            },
            {
              name: 'placeholder',
              title: '入力プレースホルダー',
              type: 'string',
              initialValue: 'ご質問やご要望をお聞かせください...'
            },
            {
              name: 'primaryColor',
              title: 'テーマカラー',
              type: 'string',
              initialValue: '#8B5A3C'
            }
          ]
        },
        {
          name: 'quickQuestions',
          title: 'クイック質問',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'icon',
                title: 'アイコン',
                type: 'string',
                description: '絵文字またはアイコン文字'
              },
              {
                name: 'label',
                title: 'ラベル',
                type: 'string',
                validation: (Rule: any) => Rule.required()
              },
              {
                name: 'question',
                title: '質問文',
                type: 'text',
                validation: (Rule: any) => Rule.required()
              }
            ]
          }]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active'
    },
    prepare({title, active}: {title: string, active: boolean}) {
      return {
        title: title,
        subtitle: active ? '有効' : '無効'
      }
    }
  }
}