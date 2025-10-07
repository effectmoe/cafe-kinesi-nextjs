import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// デバッグ用ログ（ビルド時のみ）
if (typeof window === 'undefined') {
  console.log('Sanity Environment Variables Debug:')
  console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET)
  console.log('NEXT_PUBLIC_SANITY_API_VERSION:', process.env.NEXT_PUBLIC_SANITY_API_VERSION)
}

// 環境変数の安全な取得
const getEnvVar = (key: string, defaultValue: string): string => {
  const value = process.env[key]
  if (!value || value === 'undefined' || value === 'null' || value === '' || value.trim() === '') {
    return defaultValue
  }
  return value.trim()
}

// 環境変数の取得（デフォルト値付き）
const rawProjectId = getEnvVar('NEXT_PUBLIC_SANITY_PROJECT_ID', 'e4aqw590')
const rawDataset = getEnvVar('NEXT_PUBLIC_SANITY_DATASET', 'production')
const rawApiVersion = getEnvVar('NEXT_PUBLIC_SANITY_API_VERSION', '2024-01-01')

// projectIdのバリデーション（ビルドエラー回避）
const validateProjectId = (id: string): string => {
  // projectIdの形式をチェック（a-z, 0-9, ダッシュのみ）
  if (!id || !/^[a-z0-9-]+$/.test(id)) {
    if (typeof window === 'undefined') {
      console.warn(`Invalid projectId format: "${id}", using default`)
    }
    return 'e4aqw590'
  }
  return id
}

// datasetのバリデーション
const validateDataset = (ds: string): string => {
  // datasetの形式をチェック（小文字、数字、アンダースコア、ダッシュのみ）
  if (!ds || !/^[a-z0-9_-]+$/.test(ds)) {
    if (typeof window === 'undefined') {
      console.warn(`Invalid dataset format: "${ds}", using default`)
    }
    return 'production'
  }
  return ds
}

// apiVersionのバリデーション
const validateApiVersion = (version: string): string => {
  // API versionの形式をチェック（YYYY-MM-DD または v1）
  if (!version || (!/^\d{4}-\d{2}-\d{2}$/.test(version) && version !== 'v1' && version !== '1')) {
    if (typeof window === 'undefined') {
      console.warn(`Invalid API version format: "${version}", using default`)
    }
    return '2024-01-01'
  }
  return version
}

// 検証済みの値
const projectId = validateProjectId(rawProjectId)
const dataset = validateDataset(rawDataset)
const apiVersion = validateApiVersion(rawApiVersion)

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  stega: {
    enabled: true, // Visual Editing用に常に有効化
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://cafekinesi.sanity.studio',
  },
})

// プレビュー用クライアント（ドラフト表示用）
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts',
  stega: {
    enabled: true,
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://cafekinesi.sanity.studio',
  },
})

// サーバーコンポーネント用のsanityFetch関数
export async function sanityFetch<QueryResponse = any>({
  query,
  params = {},
  isDraftMode = false,
}: {
  query: string
  params?: any
  isDraftMode?: boolean
}) {
  const targetClient = isDraftMode ? previewClient : client
  return targetClient.fetch<QueryResponse>(query, params)
}

// 後方互換性のため
export const sanityClient = client

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => {
  return builder.image(source)
}

// 画像URL生成のヘルパー関数
export const getImageUrl = (image: any, width = 800, height = 600) => {
  if (!image) return null
  try {
    const url = urlFor(image).width(width).height(height).fit('crop').auto('format').url()
    return url || null
  } catch (error) {
    console.warn('Error generating image URL:', error)
    return null
  }
}