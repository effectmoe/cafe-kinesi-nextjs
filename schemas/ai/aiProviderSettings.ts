export default {
  name: 'aiProviderSettings',
  title: 'AIプロバイダー設定',
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
      name: 'provider',
      title: '使用するAIプロバイダー',
      type: 'string',
      options: {
        list: [
          { title: 'DeepSeek', value: 'deepseek' },
          { title: 'Google Gemini', value: 'gemini' },
          { title: 'OpenAI ChatGPT', value: 'openai' },
          { title: 'Anthropic Claude', value: 'claude' }
        ]
      },
      initialValue: 'deepseek'
    },
    {
      name: 'fallbackProviders',
      title: 'フォールバックプロバイダー',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      provider: 'provider',
      active: 'active'
    },
    prepare({title, provider, active}: {title: string, provider: string, active: boolean}) {
      return {
        title: title,
        subtitle: `${provider} - ${active ? '有効' : '無効'}`
      }
    }
  }
}