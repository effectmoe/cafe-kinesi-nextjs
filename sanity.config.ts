import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemas'
import {defaultDocumentNode} from './sanity/structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e4aqw590'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Cafe Kinesi',

  projectId,
  dataset,

  plugins: [
    structureTool({
      defaultDocumentNode,
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

  // ドキュメントアクション - デフォルトアクションを使用
  document: {
    // デフォルトのパブリッシュアクションを使用
    actions: (prev) => prev,
    productionUrl: async (prev, context) => {
      const {document} = context

      if (document._type === 'blogPost') {
        const slug = (document.slug as any)?.current
        if (slug) {
          return `https://cafe-kinesi-nextjs.vercel.app/blog/${slug}`
        }
      }

      if (document._type === 'news') {
        const slug = (document.slug as any)?.current
        if (slug) {
          return `https://cafe-kinesi-nextjs.vercel.app/news/${slug}`
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

  // トークン設定（パブリッシュ機能に必要）
  token: process.env.SANITY_API_TOKEN,
})