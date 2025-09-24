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
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: 'https://cafe-kinesi-nextjs.vercel.app',
        previewMode: {
          enable: '/api/draft',
        },
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