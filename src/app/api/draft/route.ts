import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Draft API called with URL:', request.url)

    const url = new URL(request.url)
    const searchParams = url.searchParams

    // 全パラメータをログ出力
    const allParams: Record<string, string> = {}
    for (const [key, value] of searchParams.entries()) {
      allParams[key] = value
    }
    console.log('🔍 All search parameters:', allParams)

    // パラメータの取得
    const slug = searchParams.get('slug')
    const pathname = searchParams.get('pathname') || searchParams.get('path')
    const type = searchParams.get('type')

    console.log('🔍 Extracted parameters:', { slug, pathname, type })

    // ドラフトモードを有効化
    try {
      const draft = await draftMode()
      draft.enable()
      console.log('✅ Draft mode enabled')
    } catch (draftError) {
      console.error('❌ Failed to enable draft mode:', draftError)
      throw draftError
    }

    // リダイレクト先の決定
    let redirectTo = '/'

    if (pathname) {
      redirectTo = pathname
      console.log('🎯 Using pathname for redirect')
    } else if (slug) {
      if (type === 'blogPost') {
        redirectTo = `/blog/${slug}`
        console.log('🎯 Determined blogPost route')
      } else if (type === 'news') {
        redirectTo = `/news/${slug}`
        console.log('🎯 Determined news route')
      } else {
        // typeが不明な場合はblogを仮定
        redirectTo = `/blog/${slug}`
        console.log('🎯 Fallback to blog route')
      }
    }

    console.log('🚀 Redirecting to:', redirectTo)
    redirect(redirectTo)

  } catch (error) {
    console.error('❌ Draft API error:', error)

    // エラーが発生した場合は最低限のドラフト機能を提供
    try {
      const draft = await draftMode()
      draft.enable()
    } catch (draftError) {
      console.error('❌ Failed to enable draft mode in error handler:', draftError)
    }

    redirect('/')
  }
}