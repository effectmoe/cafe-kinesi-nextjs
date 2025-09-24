import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e4aqw590',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // クライアントサイドでは最新データを取得
  ignoreBrowserTokenWarning: true,
})

// 後方互換性のため
export const sanityClient = client

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => {
  return builder.image(source)
}

// 画像URL生成のヘルパー関数
export const getImageUrl = (image: any, width = 800, height = 600) => {
  if (!image) return null
  return urlFor(image).width(width).height(height).fit('crop').auto('format').url()
}