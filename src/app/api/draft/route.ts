import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

// Sanity Presentation Tool用の標準的なAPIエンドポイント
export async function GET(request: NextRequest) {
  // パラメータを取得
  const { searchParams } = request.nextUrl
  const pathname = searchParams.get('sanity-preview-pathname') || '/'

  // ドラフトモードを有効化
  const draft = await draftMode()
  draft.enable()

  // 指定されたパスにリダイレクト
  redirect(pathname)
}