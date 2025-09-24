import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

// draftModeのテスト
export async function GET() {
  try {
    console.log('[Test Draft] Starting test...')

    // draftModeの取得をテスト
    const draft = await draftMode()
    const isEnabled = draft.isEnabled

    console.log('[Test Draft] Draft mode status:', isEnabled)

    return NextResponse.json({
      status: 'ok',
      draftModeEnabled: isEnabled,
      message: 'Test API is working',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    })
  } catch (error) {
    console.error('[Test Draft] Error:', error)

    return NextResponse.json({
      error: 'Test failed',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}