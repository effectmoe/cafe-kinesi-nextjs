import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'トップページ',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'ページタイトル',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'カフェキネシ - Cafe Kinesi'
    }),
    defineField({
      name: 'categoryCards',
      title: 'カテゴリーカード',
      type: 'array',
      of: [{ type: 'categoryCard' }],
      validation: Rule => Rule.required().min(6).max(6).error('6枚のカードを設定してください'),
      description: 'TOPページに表示する6枚のカテゴリーカード'
    }),
    defineField({
      name: 'blogSection',
      title: 'ブログセクション設定',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'セクションタイトル',
          type: 'string',
          initialValue: 'ブログ'
        },
        {
          name: 'displayCount',
          title: '表示件数',
          type: 'number',
          initialValue: 9,
          validation: Rule => Rule.min(3).max(12)
        },
        {
          name: 'showAllButton',
          title: '「すべての記事を見る」ボタンを表示',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'noPostsMessage',
          title: '記事がない時のメッセージ',
          type: 'string',
          initialValue: '記事がまだありません'
        }
      ]
    }),
    defineField({
      name: 'socialLinks',
      title: 'ソーシャルリンク',
      type: 'array',
      of: [{ type: 'socialLink' }],
      description: '右側に縦表示されるソーシャルリンク'
    }),
    defineField({
      name: 'viewAllButton',
      title: 'View Allボタン設定',
      type: 'object',
      fields: [
        {
          name: 'show',
          title: '表示する',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'text',
          title: 'ボタンテキスト',
          type: 'string',
          initialValue: 'View All →'
        },
        {
          name: 'link',
          title: 'リンク先',
          type: 'string',
          initialValue: '#'
        }
      ]
    }),
    defineField({
      name: 'profileButton',
      title: '代表者プロフィールボタン設定',
      type: 'object',
      fields: [
        {
          name: 'show',
          title: '表示する',
          type: 'boolean',
          initialValue: true,
          description: '「カフェキネシの夢」と「カフェキネシ講座を受講する」の間に表示されます'
        },
        {
          name: 'text',
          title: 'ボタンテキスト',
          type: 'string',
          initialValue: '代表者プロフィール'
        },
        {
          name: 'link',
          title: 'リンク先',
          type: 'string',
          initialValue: '/profile'
        }
      ]
    }),
    defineField({
      name: 'navigationMenu',
      title: 'ハンバーガーメニュー項目',
      type: 'array',
      of: [{ type: 'navigationMenu' }],
      description: 'ヘッダーのハンバーガーメニューに表示される項目',
      validation: Rule => Rule.min(1).error('少なくとも1つのメニュー項目を追加してください')
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection) {
      return {
        title: selection.title || 'トップページ',
        subtitle: 'ホームページ設定'
      }
    }
  }
})