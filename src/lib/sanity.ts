import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// 環境変数のバリデーション
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e4aqw590'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// projectIdのバリデーション（ビルドエラー回避）
const validateProjectId = (id: string): string => {
  // 環境変数が設定されていない場合はデフォルト値を使用
  if (!id || id === 'undefined' || id === 'null') {
    return 'e4aqw590'
  }
  // projectIdの形式をチェック
  if (!/^[a-z0-9-]+$/.test(id)) {
    console.warn('Invalid projectId format, using default')
    return 'e4aqw590'
  }
  return id
}

export const client = createClient({
  projectId: validateProjectId(projectId),
  dataset: dataset || 'production',
  apiVersion: apiVersion || '2024-01-01',
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