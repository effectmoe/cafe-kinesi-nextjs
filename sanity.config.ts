import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool, defineDocuments} from 'sanity/presentation'
import {schemaTypes} from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e4aqw590'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Cafe Kinesi',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('コンテンツ')
          .items([
            S.listItem()
              .title('ブログ記事')
              .id('blogPost')
              .child(
                S.documentTypeList('blogPost')
                  .title('ブログ記事')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('お知らせ')
              .id('news')
              .child(
                S.documentTypeList('news')
                  .title('お知らせ')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !['blogPost', 'news'].includes(listItem.getId() || '')
            ),
          ])
    }),
    presentationTool({
      previewUrl: 'https://cafe-kinesi-nextjs.vercel.app/api/draft',
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },

  // パフォーマンス最適化とセキュリティ設定
  studio: {
    components: {
      // 軽量化設定
    }
  },

  // デフォルトのパブリッシュアクションとプレビューを有効化
  document: {
    actions: (prev, context) => {
      // プレビューアクションを確実に含める
      if (context.schemaType === 'blogPost' || context.schemaType === 'news') {
        return prev.map((action) => {
          if (action.action === 'publish') {
            return action
          }
          return action
        })
      }
      return prev
    },
    productionUrl: async (prev, context) => {
      const { document } = context
      if (document && typeof document === 'object') {
        const doc = document as any
        if (doc._type === 'blogPost' && doc.slug?.current) {
          return `https://cafe-kinesi-nextjs.vercel.app/blog/${doc.slug.current}`
        }
        if (doc._type === 'news' && doc.slug?.current) {
          return `https://cafe-kinesi-nextjs.vercel.app/news/${doc.slug.current}`
        }
      }
      return prev
    }
  },

  // API設定を追加
  api: {
    projectId,
    dataset,
  },

  // パフォーマンス設定
  useCdn: true, // CDN使用でロード高速化

  // 開発環境でのデバッグ無効化
  debug: false,
})