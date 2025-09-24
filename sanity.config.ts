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
      resolve: {
        mainDocuments: defineLocations,
        locations: {
          blogPost: defineLocations,
        },
      },
      previewUrl: {
        origin: 'https://cafe-kinesi-nextjs.vercel.app',
        previewMode: {
          enable: '/api/draft?secret=your-secret-token',
          disable: '/api/disable-draft'
        }
      },
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})

function defineLocations(params: any) {
  switch (params?.type) {
    case 'blogPost':
      return {
        locations: [
          {
            title: 'Blog Post',
            href: `/blog/${params?.slug}`,
          },
        ],
      }
    default:
      return null
  }
}