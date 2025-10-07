export default {
  name: 'aiGuardrails',
  title: 'AIガードレール設定',
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
      name: 'systemPrompt',
      title: 'システムプロンプト',
      type: 'text',
      initialValue: 'あなたはCafe Kinesiの親切なAIアシスタントです。'
    },
    {
      name: 'rules',
      title: 'ルール設定',
      type: 'object',
      fields: [
        {
          name: 'maxResponseLength',
          title: '最大応答文字数',
          type: 'number',
          initialValue: 500
        },
        {
          name: 'temperature',
          title: 'Temperature',
          type: 'number',
          validation: (Rule: any) => Rule.min(0).max(1),
          initialValue: 0.7
        },
        {
          name: 'prohibitedWords',
          title: '禁止ワード',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'tone',
          title: 'トーン',
          type: 'string',
          options: {
            list: ['friendly', 'professional', 'casual']
          },
          initialValue: 'friendly'
        }
      ]
    }
  ]
}
