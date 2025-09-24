import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('[Enable Draft] Starting...')

    // draftModeを取得
    const draft = await draftMode()
    console.log('[Enable Draft] Draft mode object obtained')

    // 有効化
    draft.enable()
    console.log('[Enable Draft] Draft mode enabled')

    // リダイレクトレスポンスを返す
    return NextResponse.redirect(new URL('/', 'https://cafe-kinesi-nextjs.vercel.app'), 303)
  } catch (error) {
    console.error('[Enable Draft] Error:', error)

    // エラーの詳細を返す
    return NextResponse.json({
      error: 'Failed to enable draft mode',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}