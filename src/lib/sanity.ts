import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// 環境変数の安全な取得
const getEnvVar = (key: string, defaultValue: string): string => {
  const value = process.env[key]
  if (!value || value === 'undefined' || value === 'null' || value === '') {
    return defaultValue
  }
  return value
}

// 環境変数のバリデーション
const projectId = getEnvVar('NEXT_PUBLIC_SANITY_PROJECT_ID', 'e4aqw590')
const dataset = getEnvVar('NEXT_PUBLIC_SANITY_DATASET', 'production')
const apiVersion = getEnvVar('NEXT_PUBLIC_SANITY_API_VERSION', '2024-01-01')

// projectIdのバリデーション（ビルドエラー回避）
const validateProjectId = (id: string): string => {
  // projectIdの形式をチェック（a-z, 0-9, ダッシュのみ）
  if (!/^[a-z0-9-]+$/.test(id)) {
    console.warn('Invalid projectId format, using default')
    return 'e4aqw590'
  }
  return id
}

// datasetのバリデーション
const validateDataset = (ds: string): string => {
  // datasetの形式をチェック（小文字、数字、アンダースコア、ダッシュのみ）
  if (!/^[a-z0-9_-]+$/.test(ds)) {
    console.warn('Invalid dataset format, using default')
    return 'production'
  }
  return ds
}

export const client = createClient({
  projectId: validateProjectId(projectId),
  dataset: validateDataset(dataset),
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