import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    console.log('Draft disable API called:', request.url)

    const { searchParams } = new URL(request.url)
    const redirectUrl = searchParams.get('redirect') || '/'

    // ドラフトモードを無効化
    const draft = await draftMode()
    draft.disable()
    console.log('Draft mode disabled')

    console.log('Redirecting to:', redirectUrl)
    redirect(redirectUrl)

  } catch (error) {
    console.error('Draft disable API error:', error)

    return NextResponse.json(
      {
        error: 'Failed to disable draft mode',
        details: String(error),
        message: error instanceof Error ? error.message : 'Unknown error'
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