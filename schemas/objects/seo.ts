export default {
  name: 'seo',
  type: 'object',
  title: 'SEO設定',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'SEOタイトル',
      description: '検索結果やソーシャルメディアで表示されるタイトル（60文字以内推奨）',
      validation: (Rule: any) => Rule.max(60).warning('60文字以内を推奨します')
    },
    {
      name: 'description',
      type: 'text',
      title: 'メタディスクリプション',
      description: '検索結果で表示される説明文（160文字以内推奨）',
      rows: 3,
      validation: (Rule: any) => Rule.max(160).warning('160文字以内を推奨します')
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'キーワード',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'ogTitle',
      type: 'string',
      title: 'OGタイトル',
      description: 'ソーシャルメディア用タイトル（未設定の場合はSEOタイトルを使用）'
    },
    {
      name: 'ogDescription',
      type: 'text',
      title: 'OG説明文',
      description: 'ソーシャルメディア用説明文（未設定の場合はメタディスクリプションを使用）',
      rows: 3
    },
    {
      name: 'ogImage',
      type: 'customImage',
      title: 'OG画像',
      description: 'ソーシャルメディアで表示される画像（1200x630px推奨）'
    },
    {
      name: 'noindex',
      type: 'boolean',
      title: '検索エンジンからの除外',
      description: 'チェックすると検索エンジンのインデックスから除外されます',
      initialValue: false
    },
    // 🚀 Schema.org設定を再定義
    {
      name: 'schemaEnabled',
      type: 'boolean',
      title: '🚀 Schema.org構造化データを有効化',
      description: '検索エンジン向けの構造化データを出力します',
      initialValue: false
    },
    {
      name: 'schemaType',
      type: 'string',
      title: '📄 Schema.orgコンテンツタイプ',
      options: {
        list: [
          { title: 'BlogPosting（ブログ投稿）', value: 'BlogPosting' },
          { title: 'Article（標準記事）', value: 'Article' },
          { title: 'NewsArticle（ニュース記事）', value: 'NewsArticle' },
          { title: 'HowTo（ハウツー）', value: 'HowTo' },
          { title: 'Recipe（レシピ）', value: 'Recipe' },
          { title: 'FAQPage（FAQ）', value: 'FAQPage' },
          { title: 'Review（レビュー）', value: 'Review' },
          { title: 'Product（製品）', value: 'Product' },
          { title: 'Event（イベント）', value: 'Event' }
        ]
      },
      initialValue: 'BlogPosting',
      hidden: ({ parent }) => !parent?.schemaEnabled
    },
    {
      name: 'schemaCustom',
      type: 'text',
      title: '🔧 カスタムJSON-LD',
      description: 'カスタムJSON-LDを直接入力（上級者向け）',
      rows: 10,
      hidden: ({ parent }) => !parent?.schemaEnabled
    }
  ]
}