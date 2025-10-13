import { defineType, defineField } from 'sanity'
import { Users } from 'lucide-react'

export default defineType({
  name: 'instructorPage',
  title: 'インストラクターページ設定',
  type: 'document',
  icon: Users,
  groups: [
    {
      name: 'content',
      title: 'コンテンツ',
      default: true,
    },
    {
      name: 'services',
      title: 'サービス設定',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'ページタイトル',
      type: 'string',
      initialValue: 'インストラクターを探す',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    // ヒーローセクション
    defineField({
      name: 'heroSection',
      title: 'ヒーローセクション',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'title',
          title: 'タイトル',
          type: 'string',
          initialValue: 'インストラクターを探す',
        }),
        defineField({
          name: 'description',
          title: '説明文',
          type: 'text',
          rows: 3,
          initialValue: 'お近くのカフェキネシインストラクターを見つけましょう',
        }),
        defineField({
          name: 'backgroundImage',
          title: '背景画像',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: '代替テキスト',
              type: 'string',
              initialValue: 'インストラクターセッション風景',
            }),
          ],
        }),
      ],
    }),
    // Aboutセクション
    defineField({
      name: 'aboutSection',
      title: 'カフェキネシインストラクターとは',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'title',
          title: 'セクションタイトル',
          type: 'string',
          initialValue: 'カフェキネシインストラクターとは',
        }),
        defineField({
          name: 'description',
          title: '説明文',
          type: 'array',
          of: [{ type: 'block' }],
          description: '複数段落の説明文を入力できます',
        }),
        defineField({
          name: 'image',
          title: 'セクション画像',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: '代替テキスト',
              type: 'string',
              initialValue: 'カフェキネシセッション風景',
            }),
          ],
        }),
      ],
    }),
    // サービスセクション
    defineField({
      name: 'servicesSection',
      title: '提供サービス',
      type: 'object',
      group: 'services',
      fields: [
        defineField({
          name: 'title',
          title: 'セクションタイトル',
          type: 'string',
          initialValue: '提供サービス',
        }),
        defineField({
          name: 'services',
          title: 'サービス一覧',
          type: 'array',
          of: [
            defineField({
              name: 'service',
              title: 'サービス',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'サービス名',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: '説明',
                  type: 'text',
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'icon',
                  title: 'アイコン（オプション）',
                  type: 'string',
                  description: '表示するアイコン名（将来的に使用）',
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                },
                prepare(selection) {
                  const { title, subtitle } = selection
                  return {
                    title: title,
                    subtitle: subtitle ? subtitle.substring(0, 60) + '...' : '',
                  }
                },
              },
            }),
          ],
          validation: (Rule) => Rule.min(1).max(6),
        }),
      ],
    }),
    // マップセクション設定
    defineField({
      name: 'mapSection',
      title: 'インストラクター検索セクション',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'title',
          title: 'セクションタイトル',
          type: 'string',
          initialValue: 'インストラクターを探す',
        }),
        defineField({
          name: 'description',
          title: '説明文（オプション）',
          type: 'text',
          rows: 2,
        }),
      ],
    }),
    // SEO設定
    defineField({
      name: 'seo',
      title: 'SEO設定',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'title',
          title: 'ページタイトル',
          type: 'string',
          initialValue: 'インストラクターを探す | Cafe Kinesi',
        }),
        defineField({
          name: 'description',
          title: 'メタディスクリプション',
          type: 'text',
          rows: 3,
          initialValue: 'お近くのカフェキネシインストラクターを見つけましょう。キネシオロジーやセラピーを教える経験豊富な認定インストラクターが全国にいます。',
        }),
        defineField({
          name: 'keywords',
          title: 'キーワード',
          type: 'string',
          initialValue: 'カフェキネシ, インストラクター, 講師, キネシオロジー, セラピー, 認定講師',
        }),
        defineField({
          name: 'ogImage',
          title: 'OGP画像',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    // 公開設定
    defineField({
      name: 'isActive',
      title: '公開状態',
      type: 'boolean',
      initialValue: true,
      description: 'チェックを外すとインストラクターページが非公開になります',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, isActive } = selection
      return {
        title,
        subtitle: !isActive ? '非公開' : '公開中',
      }
    },
  },
})
