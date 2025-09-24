import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('Draft API called with URL:', request.url)

  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const pathname = searchParams.get('pathname') || searchParams.get('path')
  const type = searchParams.get('type')

  console.log('Parameters:', { slug, pathname, type })

  // ドラフトモードを有効化
  const draft = await draftMode()
  draft.enable()

  console.log('Draft mode enabled')

  // リダイレクト先の決定
  let redirectTo = '/'

  // pathnameがある場合はそれを優先
  if (pathname) {
    redirectTo = pathname
  }
  // typeとslugから自動判定
  else if (slug) {
    if (type === 'blogPost') {
      redirectTo = `/blog/${slug}`
    } else if (type === 'news') {
      redirectTo = `/news/${slug}`
    } else {
      // typeが不明な場合はblogを仮定
      redirectTo = `/blog/${slug}`
    }
  }

  console.log('Redirecting to:', redirectTo)

  redirect(redirectTo)
}