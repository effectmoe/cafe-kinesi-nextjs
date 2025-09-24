import { draftMode } from 'next/headers'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // ドラフトモードを有効化
  const draft = await draftMode()
  draft.enable()

  // リダイレクト先を取得（デフォルトはホーム）
  const { searchParams } = request.nextUrl
  const redirect = searchParams.get('redirect') || '/'

  return new Response(null, {
    status: 307,
    headers: {
      Location: redirect
    }
  })
}