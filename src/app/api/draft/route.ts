import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    console.log('Draft API called:', request.url)

    const { searchParams } = new URL(request.url)
    console.log('Search params:', Object.fromEntries(searchParams.entries()))

    // ドラフトモードを有効化
    const draft = await draftMode()
    draft.enable()
    console.log('Draft mode enabled')

    // パラメータからリダイレクト先を判定
    const pathname = searchParams.get('sanity-preview-pathname') ||
                    searchParams.get('pathname') ||
                    searchParams.get('path')

    const slug = searchParams.get('slug')
    const documentType = searchParams.get('type')

    console.log('Redirect params:', { pathname, slug, documentType })

    // リダイレクト先を決定
    let redirectUrl = '/'

    if (pathname) {
      // pathname が指定されている場合はそのまま使用
      redirectUrl = pathname.startsWith('/') ? pathname : `/${pathname}`
      console.log('Using pathname:', redirectUrl)
    } else if (slug && documentType === 'blogPost') {
      // ブログ記事の場合
      redirectUrl = `/blog/${slug}`
      console.log('Blog post redirect:', redirectUrl)
    } else if (slug && documentType === 'news') {
      // ニュース記事の場合
      redirectUrl = `/news/${slug}`
      console.log('News redirect:', redirectUrl)
    } else if (slug) {
      // スラッグのみの場合はブログとして扱う
      redirectUrl = `/blog/${slug}`
      console.log('Default blog redirect:', redirectUrl)
    }

    console.log('Final redirect URL:', redirectUrl)
    redirect(redirectUrl)

  } catch (error) {
    console.error('Draft API error:', error)

    // エラーの場合はJSONレスポンス
    return NextResponse.json(
      {
        error: 'Failed to enable draft mode',
        details: String(error),
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }
    )
  }
}