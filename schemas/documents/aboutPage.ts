import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'カフェキネシについて（Aboutページ）',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'ページタイトル',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'カフェキネシについて'
    }),
    defineField({
      name: 'heroSection',
      title: 'ヒーローセクション',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'ヒーロー画像',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: '代替テキスト',
              validation: Rule => Rule.required()
            }
          ]
        },
        {
          name: 'title',
          title: 'タイトル',
          type: 'string',
          initialValue: 'カフェキネシのページにようこそ'
        },
        {
          name: 'subtitle',
          title: 'サブタイトル',
          type: 'text',
          rows: 2,
          initialValue: 'だれでもどこでも簡単にできるキネシオロジーとアロマを使った健康法'
        }
      ]
    }),
    defineField({
      name: 'tableOfContents',
      title: '目次',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'テキスト',
              type: 'string'
            },
            {
              name: 'link',
              title: 'リンク先（アンカーID）',
              type: 'string',
              description: '例: #what-is-cafekinesi'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'sections',
      title: 'セクション',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'セクションID',
              type: 'string',
              description: 'アンカーリンク用（例: what-is-cafekinesi）'
            },
            {
              name: 'title',
              title: 'セクションタイトル',
              type: 'string'
            },
            {
              name: 'layout',
              title: 'レイアウト',
              type: 'string',
              options: {
                list: [
                  { title: '画像左・テキスト右', value: 'image-left' },
                  { title: '画像右・テキスト左', value: 'image-right' },
                  { title: 'テキストのみ', value: 'text-only' },
                  { title: 'カード一覧', value: 'cards' },
                  { title: 'リンクカード', value: 'link-cards' }
                ]
              }
            },
            {
              name: 'backgroundColor',
              title: 'ブロック背景色',
              type: 'string',
              options: {
                list: [
                  { title: '背景色なし（白）', value: 'none' },
                  { title: 'ごく薄いベージュ', value: 'beige-light' },
                  { title: 'ごく薄いグレー', value: 'gray-light' },
                  { title: 'ごく薄いティール', value: 'teal-light' },
                  { title: 'ごく薄いパープル', value: 'purple-light' },
                  { title: 'カスタム', value: 'custom' }
                ]
              },
              initialValue: 'none',
              description: 'セクションブロック全体の背景色を設定します'
            },
            {
              name: 'customBackgroundColor',
              title: 'カスタム背景色',
              type: 'string',
              description: '例: hsl(35, 22%, 97%) または #f5f5f5',
              hidden: ({ parent }) => parent?.backgroundColor !== 'custom'
            },
            {
              name: 'image',
              title: '画像',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: '代替テキスト'
                }
              ],
              hidden: ({ parent }) => parent?.layout === 'text-only' || parent?.layout === 'cards' || parent?.layout === 'link-cards'
            },
            {
              name: 'content',
              title: '本文',
              type: 'array',
              of: [
                {
                  type: 'block'
                }
              ],
              hidden: ({ parent }) => parent?.layout === 'cards' || parent?.layout === 'link-cards'
            },
            {
              name: 'highlightBox',
              title: 'ハイライトボックス',
              type: 'object',
              fields: [
                {
                  name: 'show',
                  title: '表示する',
                  type: 'boolean',
                  initialValue: false
                },
                {
                  name: 'content',
                  title: '内容',
                  type: 'array',
                  of: [{ type: 'block' }]
                }
              ]
            },
            {
              name: 'button',
              title: 'リンクボタン',
              type: 'object',
              fields: [
                {
                  name: 'show',
                  title: '表示する',
                  type: 'boolean',
                  initialValue: false
                },
                {
                  name: 'text',
                  title: 'ボタンテキスト',
                  type: 'string',
                  description: '例: 講座一覧を見る'
                },
                {
                  name: 'link',
                  title: 'リンク先URL',
                  type: 'string',
                  description: '例: /school または https://example.com'
                }
              ],
              hidden: ({ parent }) => parent?.layout === 'cards' || parent?.layout === 'link-cards'
            },
            {
              name: 'cards',
              title: 'カード',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'number',
                      title: '番号',
                      type: 'number'
                    },
                    {
                      name: 'title',
                      title: 'タイトル',
                      type: 'string'
                    },
                    {
                      name: 'description',
                      title: '説明',
                      type: 'text',
                      rows: 3
                    },
                    {
                      name: 'bgColor',
                      title: '背景色（CSSクラス）',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'ティール', value: 'bg-[hsl(var(--brand-teal))]' },
                          { title: 'パープル', value: 'bg-[hsl(var(--brand-purple))]' },
                          { title: 'ブルーグレー', value: 'bg-[hsl(var(--brand-blue-gray))]' },
                          { title: 'ベージュ', value: 'bg-[hsl(var(--brand-beige))]' },
                          { title: 'カスタム', value: 'custom' }
                        ]
                      }
                    },
                    {
                      name: 'customBgColor',
                      title: 'カスタム背景色（HSL）',
                      type: 'string',
                      description: '例: hsl(180_25%_35%)',
                      hidden: ({ parent }) => parent?.bgColor !== 'custom'
                    }
                  ]
                }
              ],
              hidden: ({ parent }) => parent?.layout !== 'cards'
            },
            {
              name: 'linkCards',
              title: 'リンクカード',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'タイトル',
                      type: 'string',
                      validation: Rule => Rule.required()
                    },
                    {
                      name: 'description',
                      title: '説明',
                      type: 'text',
                      rows: 2
                    },
                    {
                      name: 'link',
                      title: 'リンク先URL',
                      type: 'string',
                      validation: Rule => Rule.required(),
                      description: '例: /school または https://example.com'
                    },
                    {
                      name: 'image',
                      title: '画像（オプション）',
                      type: 'image',
                      options: { hotspot: true },
                      fields: [
                        {
                          name: 'alt',
                          type: 'string',
                          title: '代替テキスト'
                        }
                      ]
                    },
                    {
                      name: 'bgColor',
                      title: '背景色',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'ホワイト', value: 'white' },
                          { title: 'ティール', value: 'teal' },
                          { title: 'パープル', value: 'purple' },
                          { title: 'ブルーグレー', value: 'blue-gray' },
                          { title: 'ベージュ', value: 'beige' }
                        ]
                      },
                      initialValue: 'white'
                    }
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'link'
                    }
                  }
                }
              ],
              hidden: ({ parent }) => parent?.layout !== 'link-cards'
            }
          ],
          preview: {
            select: {
              title: 'title',
              layout: 'layout'
            },
            prepare(selection) {
              const { title, layout } = selection
              return {
                title: title || 'セクション',
                subtitle: layout ? `レイアウト: ${layout}` : ''
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: 'isActive',
      title: '有効化',
      type: 'boolean',
      initialValue: true,
      description: 'このページを公開する場合はONにしてください'
    }),
    defineField({
      name: 'seo',
      title: 'SEO設定',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'SEOタイトル',
          type: 'string'
        },
        {
          name: 'description',
          title: 'SEO説明文',
          type: 'text',
          rows: 3
        },
        {
          name: 'keywords',
          title: 'キーワード',
          type: 'string'
        },
        {
          name: 'ogImage',
          title: 'OG画像',
          type: 'image'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      return {
        title: selection.title || 'カフェキネシについて',
        subtitle: 'Aboutページ設定'
      }
    }
  }
})
