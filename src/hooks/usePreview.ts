import { useState, useEffect } from 'react'
import { createClient } from '@sanity/client'

export function usePreview() {
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setIsPreview(params.get('preview') === 'true')
  }, [])

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e4aqw590',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: !isPreview,
    perspective: isPreview ? 'previewDrafts' : 'published',
    token: isPreview ? process.env.NEXT_PUBLIC_SANITY_API_TOKEN : undefined,
    stega: {
      enabled: true,
      studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://cafekinesi.sanity.studio',
    },
  })

  return { isPreview, client }
}