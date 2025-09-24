import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
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
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Preview handling
    productionUrl: async (prev, context) => {
      const {document} = context
      if (document._type === 'blogPost') {
        const slug = (document as any).slug?.current
        if (slug) {
          const previewUrl = `${window.location.origin}/blog/${slug}`
          return previewUrl
        }
      }
      return null
    }
  }
})