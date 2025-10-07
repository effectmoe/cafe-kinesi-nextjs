export default {
  name: 'chatConfiguration',
  title: 'チャット設定',
  type: 'document',
  fields: [
    {
      name: 'name',
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
      name: 'chatUI',
      title: 'チャットUI設定',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'チャットタイトル',
          type: 'string',
          initialValue: 'AIチャットアシスタント'
        },
        {
          name: 'welcomeMessage',
          title: 'ウェルカムメッセージ',
          type: 'text',
          initialValue: 'こんにちは！Cafe Kinesiへようこそ☕'
        },
        {
          name: 'placeholder',
          title: '入力プレースホルダー',
          type: 'string',
          initialValue: 'メッセージを入力...'
        },
        {
          name: 'primaryColor',
          title: 'テーマカラー',
          type: 'string',
          initialValue: '#f59e0b'
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
            options: {
              list: [
                { title: '☕ コーヒー', value: 'coffee' },
                { title: '🕐 時計', value: 'clock' },
                { title: '📍 地図', value: 'map' },
                { title: '📅 カレンダー', value: 'calendar' }
              ]
            }
          },
          {
            name: 'label',
            title: 'ラベル',
            type: 'string'
          },
          {
            name: 'question',
            title: '質問文',
            type: 'text'
          }
        ]
      }]
    }
  ]
}
