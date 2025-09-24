import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
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
      previewUrl: 'https://cafe-kinesi-nextjs.vercel.app',
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
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
})