import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemas'
import {defaultDocumentNode, structure} from './sanity/structure'
import {extractTextAction} from './sanity/actions/extractTextAction'

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
      structure,
    }),
    presentationTool({
      previewUrl: {
        preview: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        origin: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        draftMode: {
          enable: '/api/draft',
        },
        previewMode: {
          enable: '/api/preview-mode/enable',
          disable: '/api/preview-mode/disable',
        },
      },
      // Chrome拡張機能の干渉を回避
      allowOrigins: [
        'http://localhost:3000',
        'http://localhost:3333',
        'https://cafekinesi-nextjs.vercel.app',
        'https://cafekinesi.sanity.studio',
      ],
      resolve: {
        locations: {
          blogPost: {
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `/blog/${doc?.slug}`,
                },
                {
                  title: 'ブログ一覧',
                  href: '/blog',
                },
              ],
            }),
          },
          news: {
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `/news/${doc?.slug}`,
                },
                {
                  title: 'ニュース一覧',
                  href: '/news',
                },
              ],
            }),
          },
        },
      },
    }),
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
    actions: (prev, context) => {
      // Add extract text action for knowledgeBase documents
      if (context.schemaType === 'knowledgeBase') {
        return [...prev, extractTextAction]
      }
      return prev
    },
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
  useCdn: false, // CDNを無効化（リアルタイム更新のため）
})