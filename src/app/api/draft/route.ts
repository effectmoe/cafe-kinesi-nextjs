import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // デバッグ用ログ
  console.log('Draft API called with URL:', request.url)

  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const pathname = searchParams.get('pathname')

  console.log('Slug:', slug, 'Pathname:', pathname)

  // ドラフトモードを有効化
  const draft = await draftMode()
  draft.enable()

  console.log('Draft mode enabled')

  // リダイレクト先の決定
  let redirectTo = '/'

  if (pathname) {
    redirectTo = pathname
  } else if (slug) {
    redirectTo = `/blog/${slug}`
  }

  console.log('Redirecting to:', redirectTo)

  redirect(redirectTo)
}