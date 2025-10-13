import { defineField, defineType } from 'sanity'

// AI-First: 統合サービスエンティティ
export default defineType({
  name: 'service',
  title: 'サービス',
  type: 'document',

  groups: [
    { name: 'ai', title: 'AI検索情報' },
    { name: 'basic', title: '基本情報' },
    { name: 'detail', title: '詳細情報' },
    { name: 'relations', title: '関連情報' }
  ],

  fields: [
    // ========== AI検索最適化 ==========
    defineField({
      name: 'aiSearchKeywords',
      title: 'AI検索キーワード',
      description: '「どんな講座がある？」「料金は？」などの質問に対応',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'ai',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'aiQuickAnswer',
      title: 'AIクイック回答',
      description: 'このサービスについての簡潔な説明（100文字以内）',
      type: 'text',
      group: 'ai',
      validation: Rule => Rule.max(100)
    }),

    defineField({
      name: 'aiFAQ',
      title: 'よくある質問と回答',
      type: 'array',
      group: 'ai',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: '質問' },
            { name: 'answer', type: 'text', title: '回答' }
          ]
        }
      ]
    }),

    // ========== 基本情報 ==========
    defineField({
      name: 'name',
      title: 'サービス名',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'serviceType',
      title: 'サービス種別',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: '講座・コース', value: 'course' },
          { title: 'セッション', value: 'session' },
          { title: 'セミナー', value: 'seminar' },
          { title: 'ワークショップ', value: 'workshop' },
          { title: '商品', value: 'product' }
        ]
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'category',
      title: 'カテゴリー',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'カフェキネシ', value: 'cafekinesi' },
          { title: 'ピーチタッチ', value: 'peachtouch' },
          { title: 'アロマ', value: 'aroma' },
          { title: 'キネシオロジー', value: 'kinesiology' }
        ]
      }
    }),

    // ========== 詳細情報 ==========
    defineField({
      name: 'description',
      title: '詳細説明',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'detail'
    }),

    defineField({
      name: 'targetAudience',
      title: '対象者',
      description: '誰向けのサービスか',
      type: 'text',
      group: 'detail'
    }),

    defineField({
      name: 'benefits',
      title: '得られる効果・メリット',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'detail'
    }),

    defineField({
      name: 'pricing',
      title: '料金情報',
      type: 'object',
      group: 'detail',
      fields: [
        { name: 'price', type: 'number', title: '価格' },
        { name: 'currency', type: 'string', title: '通貨', initialValue: 'JPY' },
        { name: 'unit', type: 'string', title: '単位（回、時間など）' },
        { name: 'notes', type: 'text', title: '補足（割引情報など）' }
      ]
    }),

    defineField({
      name: 'duration',
      title: '所要時間',
      type: 'object',
      group: 'detail',
      fields: [
        { name: 'hours', type: 'number', title: '時間' },
        { name: 'minutes', type: 'number', title: '分' },
        { name: 'sessions', type: 'number', title: '回数' }
      ]
    }),

    defineField({
      name: 'schedule',
      title: 'スケジュール',
      type: 'object',
      group: 'detail',
      fields: [
        { name: 'frequency', type: 'string', title: '頻度' },
        { name: 'nextDate', type: 'datetime', title: '次回開催日' },
        { name: 'isOnline', type: 'boolean', title: 'オンライン対応' },
        { name: 'location', type: 'string', title: '開催場所' }
      ]
    }),

    // ========== 関連情報 ==========
    defineField({
      name: 'instructor',
      title: 'インストラクター',
      type: 'reference',
      to: [{ type: 'person' }],
      group: 'relations'
    }),

    defineField({
      name: 'prerequisites',
      title: '前提条件',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'course' },
            { type: 'event' }
          ]
        }
      ],
      group: 'relations'
    }),

    defineField({
      name: 'relatedServices',
      title: '関連サービス',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'service' },
            { type: 'course' },
            { type: 'event' }
          ]
        }
      ],
      group: 'relations'
    }),

    // ========== メタデータ ==========
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    }),

    defineField({
      name: 'isActive',
      title: '有効',
      type: 'boolean',
      initialValue: true
    }),

    defineField({
      name: 'popularity',
      title: '人気度',
      type: 'number',
      validation: Rule => Rule.min(0).max(100),
      initialValue: 50
    })
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'serviceType',
      price: 'pricing.price',
      keywords: 'aiSearchKeywords'
    },
    prepare(selection) {
      const { title, subtitle, price, keywords } = selection
      return {
        title,
        subtitle: `${subtitle} | ¥${price || '価格未設定'} | AI: ${keywords?.slice(0, 2).join(', ') || 'キーワード未設定'}`
      }
    }
  }
})