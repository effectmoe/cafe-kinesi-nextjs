import { defineField, defineType } from 'sanity'

// AIチャットボット用の統合コンテンツスキーマ
export default defineType({
  name: 'aiContent',
  title: 'AI用コンテンツ',
  type: 'document',
  fields: [
    defineField({
      name: 'contentType',
      title: 'コンテンツタイプ',
      type: 'string',
      options: {
        list: [
          { title: '代表者', value: 'representative' },
          { title: 'インストラクター', value: 'instructor' },
          { title: 'コース', value: 'course' },
          { title: '会社情報', value: 'company' },
          { title: 'FAQ', value: 'faq' },
          { title: 'サービス', value: 'service' },
          { title: '料金', value: 'pricing' },
          { title: 'お知らせ', value: 'news' },
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'タイトル',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'searchKeywords',
      title: '検索キーワード',
      description: 'AIが検索する際のキーワード（カンマ区切り）',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'aiSummary',
      title: 'AI用要約',
      description: 'AIが理解しやすい形式の要約（100-200文字）',
      type: 'text',
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'structuredData',
      title: '構造化データ',
      description: 'AIが解析しやすい形式のデータ',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: '名前/名称',
          type: 'string'
        },
        {
          name: 'role',
          title: '役職/役割',
          type: 'string'
        },
        {
          name: 'location',
          title: '場所/所在地',
          type: 'string'
        },
        {
          name: 'description',
          title: '説明',
          type: 'text'
        },
        {
          name: 'features',
          title: '特徴',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'contact',
          title: '連絡先',
          type: 'string'
        },
        {
          name: 'price',
          title: '料金',
          type: 'string'
        },
        {
          name: 'schedule',
          title: 'スケジュール/営業時間',
          type: 'string'
        },
        {
          name: 'relatedLinks',
          title: '関連リンク',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'リンクタイトル' },
                { name: 'url', type: 'url', title: 'URL' }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'fullContent',
      title: '詳細内容',
      description: 'AIが回答する際の完全な内容',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'priority',
      title: '優先度',
      description: 'AI検索での優先度（1-10、10が最高）',
      type: 'number',
      validation: Rule => Rule.min(1).max(10),
      initialValue: 5
    }),
    defineField({
      name: 'relatedContent',
      title: '関連コンテンツ',
      description: '関連する他のコンテンツへの参照',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'aiContent' }]
        }
      ]
    }),
    defineField({
      name: 'isActive',
      title: '有効',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'lastVerified',
      title: '最終確認日',
      type: 'datetime'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'contentType',
      keywords: 'searchKeywords'
    },
    prepare(selection) {
      const { title, subtitle, keywords } = selection
      return {
        title,
        subtitle: `${subtitle} | キーワード: ${keywords?.slice(0, 3).join(', ') || '未設定'}`,
        media: null
      }
    }
  }
})