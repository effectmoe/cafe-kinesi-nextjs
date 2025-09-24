import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    console.log('[Enable Draft] Starting...')

    const url = new URL(request.url)
    const params = new URLSearchParams(url.search)

    // Sanityからのsecretとpathname取得
    const secret = params.get('sanity-preview-secret')
    const pathname = params.get('sanity-preview-pathname') || '/'

    console.log('[Enable Draft] Parameters:', { secret: !!secret, pathname })

    // draftModeを取得して有効化
    const draft = await draftMode()
    draft.enable()

    console.log('[Enable Draft] Draft mode enabled, redirecting to:', pathname)

    // パスにリダイレクト
    return NextResponse.redirect(new URL(pathname, url.origin))
  } catch (error) {
    console.error('[Enable Draft] Error:', error)

    return NextResponse.json({
      error: 'Failed to enable draft mode',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}