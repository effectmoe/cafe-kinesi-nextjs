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
      // 構造化表示の最適化
      defaultDocumentNode: () => null, // 不要なプレビューを無効
    }),
    presentationTool({
      previewUrl: {
        origin: 'https://cafe-kinesi-nextjs.vercel.app',
        draftMode: {
          enable: '/api/draft'
        }
      },
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/blog/:slug',
            filter: `_type == "blogPost" && slug.current == $slug`,
          },
          {
            route: '/news/:slug',
            filter: `_type == "news" && slug.current == $slug`,
          },
        ])
      }
    }),
    // Vision Toolは開発時のみ有効化
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : [])
  ],

  schema: {
    types: schemaTypes,
  },

  // パフォーマンス最適化
  studio: {
    components: {
      // 軽量化設定
    }
  },

  // デフォルトのパブリッシュアクションを有効化
  document: {
    actions: (prev, context) => {
      // すべてのドキュメントタイプでパブリッシュアクションを有効にする
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