import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// Sanity Presentation Tool用の標準的なAPIエンドポイント
export async function GET(request: NextRequest) {
  try {
    console.log('[Draft API] Request received:', {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries())
    })

    // パラメータを取得
    const { searchParams } = request.nextUrl
    const pathname = searchParams.get('sanity-preview-pathname') || '/'

    console.log('[Draft API] Parameters:', {
      pathname,
      allParams: Object.fromEntries(searchParams.entries())
    })

    // ドラフトモードを有効化
    console.log('[Draft API] Enabling draft mode...')
    const draft = await draftMode()
    draft.enable()
    console.log('[Draft API] Draft mode enabled successfully')

    // レスポンスを返す（リダイレクトの代わりに）
    return new NextResponse(null, {
      status: 307,
      headers: {
        Location: pathname,
      },
    })
  } catch (error) {
    console.error('[Draft API] Error occurred:', error)
    console.error('[Draft API] Error stack:', error instanceof Error ? error.stack : 'No stack')

    // エラーレスポンスを返す
    return NextResponse.json(
      {
        error: 'Draft mode activation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        details: String(error)
      },
      { status: 500 }
    )
  }
}