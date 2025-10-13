import { defineType, defineField } from 'sanity'
import { BookOpen } from 'lucide-react'

export default defineType({
  name: 'course',
  title: '講座',
  type: 'document',
  icon: BookOpen,
  groups: [
    {
      name: 'ai',
      title: 'AI最適化',
      default: false,
    },
    {
      name: 'basic',
      title: '基本情報',
      default: true,
    },
    {
      name: 'details',
      title: '詳細情報',
    },
    {
      name: 'content',
      title: 'コンテンツ',
    },
    {
      name: 'pricing',
      title: '料金・時間',
    },
    {
      name: 'media',
      title: 'メディア',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'sidebar',
      title: 'サイドバー設定',
    },
    {
      name: 'cta',
      title: 'CTA設定',
    },
  ],
  fields: [
    // ========== AI最適化フィールド ==========
    defineField({
      name: 'aiSearchKeywords',
      title: 'AI検索キーワード',
      description: 'AIチャットで検索されるキーワード（例：「カフェキネシ」「基礎講座」「初心者向け」）',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'ai',
    }),
    defineField({
      name: 'aiQuickAnswer',
      title: 'AIクイック回答',
      description: 'この講座について聞かれたときのAI回答（100文字以内）',
      type: 'text',
      group: 'ai',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'conversationalQueries',
      title: '想定される質問',
      description: 'AIチャットで聞かれそうな質問（「どんな講座？」「誰向け？」など）',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'ai',
    }),
    defineField({
      name: 'topicClusters',
      title: 'トピッククラスター',
      description: 'この講座が属するトピック（セマンティック検索用）',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'ai',
    }),
    defineField({
      name: 'intentType',
      title: '検索意図',
      type: 'string',
      group: 'ai',
      options: {
        list: [
          { title: '情報収集', value: 'informational' },
          { title: '申込・購入', value: 'transactional' },
          { title: '講座検索', value: 'navigational' },
          { title: '比較検討', value: 'commercial' }
        ]
      },
      initialValue: 'informational',
    }),

    // ========== 既存フィールド ==========
    defineField({
      name: 'courseId',
      title: '講座ID',
      type: 'string',
      description: 'URLに使用される識別子（例：kinesi1, peach-touch）',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'title',
      title: '講座名',
      type: 'string',
      description: '例：カフェキネシⅠ',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'subtitle',
      title: 'サブタイトル',
      type: 'string',
      description: '例：基礎セラピー講座',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'description',
      title: '講座説明',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'features',
      title: '講座の特徴',
      type: 'array',
      of: [{ type: 'string' }],
      description: '講座の主な特徴をリスト形式で入力',
      validation: (Rule) => Rule.required().min(3),
      group: 'basic',
    }),
    defineField({
      name: 'image',
      title: '講座画像',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: '代替テキスト',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      group: 'media',
    }),
    defineField({
      name: 'backgroundClass',
      title: 'カラーテーマ',
      type: 'string',
      options: {
        list: [
          { title: 'ベージュ', value: 'album-beige' },
          { title: 'ブルーグレー', value: 'album-blue-gray' },
          { title: 'ライトグレー', value: 'album-light-gray' },
          { title: 'パープル', value: 'album-purple' },
          { title: 'ティール', value: 'album-teal' },
          { title: 'ピンク', value: 'album-pink' }
        ],
        layout: 'radio'
      },
      validation: (Rule) => Rule.required().error('カラーテーマを選択してください'),
      description: '講座カードの背景色を設定します',
      group: 'basic',
    }),
    defineField({
      name: 'recommendations',
      title: 'こんな方におすすめ',
      type: 'array',
      of: [{ type: 'string' }],
      description: '受講を推奨する対象者',
      group: 'details',
    }),
    defineField({
      name: 'effects',
      title: '受講後の効果',
      type: 'array',
      of: [{ type: 'string' }],
      description: '受講後に期待できる効果',
      group: 'details',
    }),
    defineField({
      name: 'order',
      title: '表示順序',
      type: 'number',
      description: '講座の表示順序（小さい番号が上に表示）',
      validation: (Rule) => Rule.required().min(0),
      group: 'basic',
    }),
    defineField({
      name: 'isActive',
      title: '公開状態',
      type: 'boolean',
      initialValue: true,
      description: 'チェックを外すと非公開になります',
      group: 'basic',
    }),
    defineField({
      name: 'price',
      title: '受講料',
      type: 'object',
      fields: [
        defineField({
          name: 'amount',
          title: '金額',
          type: 'number',
        }),
        defineField({
          name: 'unit',
          title: '単位',
          type: 'string',
          initialValue: '円',
        }),
        defineField({
          name: 'note',
          title: '備考',
          type: 'string',
          description: '例：税込、教材費込み',
        }),
      ],
      group: 'pricing',
    }),
    defineField({
      name: 'duration',
      title: '講座時間',
      type: 'object',
      fields: [
        defineField({
          name: 'hours',
          title: '時間数',
          type: 'number',
        }),
        defineField({
          name: 'sessions',
          title: '回数',
          type: 'number',
        }),
        defineField({
          name: 'note',
          title: '備考',
          type: 'string',
          description: '例：全6回、1回3時間',
        }),
      ],
      group: 'pricing',
    }),
    defineField({
      name: 'prerequisites',
      title: '受講条件',
      type: 'text',
      description: '受講に必要な前提条件がある場合に記入',
      group: 'details',
    }),
    defineField({
      name: 'applicationLink',
      title: '申込リンク',
      type: 'url',
      description: '外部の申込フォームがある場合のURL',
      group: 'details',
    }),
    // 講座詳細ページ用フィールド
    defineField({
      name: 'tableOfContents',
      title: '目次',
      type: 'array',
      of: [{ type: 'string' }],
      description: '詳細ページの目次項目',
      group: 'content',
    }),
    defineField({
      name: 'sections',
      title: '詳細セクション',
      type: 'array',
      of: [
        defineField({
          name: 'section',
          title: 'セクション',
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'セクションID',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'セクションタイトル',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'セクション内容',
              type: 'text',
              rows: 5,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              content: 'content',
            },
            prepare(selection) {
              const { title, content } = selection
              return {
                title: title,
                subtitle: content ? content.substring(0, 100) + '...' : '',
              }
            },
          },
        }),
      ],
      description: '詳細ページで表示するセクション',
      group: 'content',
    }),
    defineField({
      name: 'gallery',
      title: 'ギャラリー',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          title: '画像',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: '代替テキスト',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      description: '詳細ページで表示する追加画像',
      group: 'media',
    }),
    defineField({
      name: 'instructorInfo',
      title: 'インストラクター情報',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'インストラクター名',
          type: 'string',
        }),
        defineField({
          name: 'bio',
          title: '経歴・紹介',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'image',
          title: 'プロフィール画像',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: '代替テキスト',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'profileUrl',
          title: 'プロフィールページURL',
          type: 'url',
        }),
      ],
      description: '詳細ページで表示するインストラクター情報',
      group: 'details',
    }),
    defineField({
      name: 'relatedCourses',
      title: '関連講座',
      type: 'array',
      of: [
        defineField({
          name: 'relatedCourse',
          title: '関連講座',
          type: 'reference',
          to: [{ type: 'course' }],
        }),
      ],
      description: '詳細ページで推奨する関連講座',
      group: 'details',
    }),
    defineField({
      name: 'seo',
      title: 'SEO設定',
      type: 'seo',
      group: 'seo',
    }),
    // CTAボックス設定（講座カードの「この講座について」ボックス）
    defineField({
      name: 'ctaBox',
      title: 'CTAボックス設定',
      type: 'object',
      group: 'cta',
      description: '講座一覧ページのカードに表示される「この講座について」ボックスの設定',
      fields: [
        defineField({
          name: 'title',
          title: 'タイトル',
          type: 'string',
          initialValue: 'この講座について',
        }),
        defineField({
          name: 'subtitle',
          title: 'サブタイトル',
          type: 'string',
          initialValue: '詳細情報やお申込みはこちら',
        }),
        defineField({
          name: 'primaryButtonText',
          title: 'メインボタンテキスト',
          type: 'string',
          initialValue: '詳細を見る',
        }),
        defineField({
          name: 'primaryButtonLink',
          title: 'メインボタンリンク',
          type: 'string',
          description: '空欄の場合は /school/{courseId} へリンク',
        }),
        defineField({
          name: 'secondaryButtonText',
          title: 'サブボタンテキスト',
          type: 'string',
          initialValue: '講座詳細・お申込み →',
        }),
        defineField({
          name: 'secondaryButtonLink',
          title: 'サブボタンリンク',
          type: 'string',
          description: '外部申込フォームなどへのリンク',
        }),
      ],
    }),
    // サイドバー設定
    defineField({
      name: 'sidebar',
      title: 'サイドバー設定',
      type: 'object',
      group: 'sidebar',
      fields: [
        defineField({
          name: 'showContactButton',
          title: 'お問い合わせボタンを表示',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'contactButtonText',
          title: 'お問い合わせボタンテキスト',
          type: 'string',
          initialValue: 'お問い合わせ・お申し込み',
        }),
        defineField({
          name: 'contactButtonLink',
          title: 'お問い合わせボタンリンク',
          type: 'string',
          initialValue: '/contact',
        }),
        defineField({
          name: 'customSections',
          title: 'カスタムセクション',
          type: 'array',
          of: [
            defineField({
              name: 'customSection',
              title: 'セクション',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'セクションタイトル',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'items',
                  title: 'アイテム',
                  type: 'array',
                  of: [
                    defineField({
                      name: 'item',
                      title: 'アイテム',
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'text',
                          title: 'テキスト',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                          name: 'link',
                          title: 'リンク',
                          type: 'string',
                        }),
                      ],
                      preview: {
                        select: {
                          title: 'text',
                          subtitle: 'link',
                        },
                      },
                    }),
                  ],
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  items: 'items',
                },
                prepare(selection) {
                  const { title, items } = selection
                  return {
                    title: title,
                    subtitle: items ? `${items.length}個のアイテム` : '0個のアイテム',
                  }
                },
              },
            }),
          ],
          description: 'サイドバーに表示するカスタムセクション（カテゴリー、Facebookなど）',
        }),
      ],
    }),

    // ========== Schema.org自動生成フィールド（読み取り専用） ==========
    defineField({
      name: 'structuredData',
      title: '構造化データ（自動生成）',
      type: 'object',
      group: 'seo',
      readOnly: true,
      description: 'Webhook経由で自動生成されるSchema.org JSON-LD',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'schemaOrgType',
          title: 'Schema.orgタイプ',
          type: 'string',
          readOnly: true,
        }),
        defineField({
          name: 'jsonLd',
          title: 'JSON-LD',
          type: 'text',
          rows: 10,
          readOnly: true,
        }),
        defineField({
          name: 'generatedAt',
          title: '生成日時',
          type: 'datetime',
          readOnly: true,
        }),
      ],
    }),

    // ========== AI埋め込み用コンテンツ（自動生成） ==========
    defineField({
      name: 'aiEmbeddingContent',
      title: 'AI埋め込み用コンテンツ（自動生成）',
      type: 'text',
      group: 'ai',
      rows: 5,
      readOnly: true,
      description: 'ベクトルDBに保存されるテキスト（自動生成）',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
      order: 'order',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, media, order, isActive } = selection
      return {
        title: `${order}. ${title}`,
        subtitle: `${subtitle} ${!isActive ? '(非公開)' : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: '表示順序',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})