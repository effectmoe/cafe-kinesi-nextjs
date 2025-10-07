export default {
  name: 'ragConfiguration',
  title: 'RAG設定',
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
      name: 'vectorSearch',
      title: 'ベクトル検索設定',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: '有効',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'topK',
          title: '検索結果数',
          type: 'number',
          validation: (Rule: any) => Rule.min(1).max(10),
          initialValue: 5
        },
        {
          name: 'threshold',
          title: '類似度閾値',
          type: 'number',
          validation: (Rule: any) => Rule.min(0).max(1),
          initialValue: 0.75
        },
        {
          name: 'chunkSize',
          title: 'チャンクサイズ',
          type: 'number',
          initialValue: 300
        }
      ]
    },
    {
      name: 'webSearch',
      title: 'Web検索設定',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: '有効',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'maxResults',
          title: '最大結果数',
          type: 'number',
          validation: (Rule: any) => Rule.min(1).max(5),
          initialValue: 3
        },
        {
          name: 'provider',
          title: 'プロバイダー',
          type: 'string',
          options: {
            list: ['duckduckgo', 'google', 'bing']
          },
          initialValue: 'duckduckgo'
        }
      ]
    },
    {
      name: 'integration',
      title: '統合設定',
      type: 'object',
      fields: [
        {
          name: 'internalWeight',
          title: '内部情報の重み',
          type: 'number',
          validation: (Rule: any) => Rule.min(0).max(1),
          initialValue: 0.7
        },
        {
          name: 'externalWeight',
          title: '外部情報の重み',
          type: 'number',
          validation: (Rule: any) => Rule.min(0).max(1),
          initialValue: 0.3
        }
      ]
    }
  ]
}
