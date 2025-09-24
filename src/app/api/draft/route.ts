import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('🔍 Draft API called with URL:', request.url)
  console.log('🔍 Headers:', Object.fromEntries(request.headers.entries()))

  const { searchParams } = new URL(request.url)

  // 全パラメータをログ出力
  const allParams: Record<string, string> = {}
  searchParams.forEach((value, key) => {
    allParams[key] = value
  })
  console.log('🔍 All search parameters:', allParams)

  const slug = searchParams.get('slug')
  const pathname = searchParams.get('pathname') || searchParams.get('path')
  const type = searchParams.get('type')
  const documentId = searchParams.get('documentId') || searchParams.get('_id')
  const documentType = searchParams.get('documentType') || searchParams.get('_type')

  console.log('🔍 Extracted parameters:', {
    slug,
    pathname,
    type,
    documentId,
    documentType
  })

  // ドラフトモードを有効化
  const draft = await draftMode()
  draft.enable()

  console.log('✅ Draft mode enabled')

  // リダイレクト先の決定
  let redirectTo = '/'

  // pathnameがある場合はそれを優先
  if (pathname) {
    redirectTo = pathname
    console.log('🎯 Using pathname for redirect')
  }
  // documentTypeとslugから判定
  else if (slug && (documentType === 'blogPost' || type === 'blogPost')) {
    redirectTo = `/blog/${slug}`
    console.log('🎯 Determined blogPost route')
  }
  else if (slug && (documentType === 'news' || type === 'news')) {
    redirectTo = `/news/${slug}`
    console.log('🎯 Determined news route')
  }
  // slugがあるがtypeが不明な場合は型を問い合わせ
  else if (slug) {
    redirectTo = `/blog/${slug}`
    console.log('🎯 Fallback to blog route')
  }

  console.log('🚀 Redirecting to:', redirectTo)

  redirect(redirectTo)
}