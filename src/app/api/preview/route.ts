// 別のアプローチ: cookieを直接設定
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const slug = searchParams.get('slug')
  const type = searchParams.get('type') || 'blogPost'

  // cookieにドラフトモードを設定
  const cookieStore = await cookies()
  cookieStore.set('__prerender_bypass', 'true', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/'
  })

  cookieStore.set('__next_preview_data', 'preview', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/'
  })

  // リダイレクト先を決定
  let redirectPath = '/'
  if (slug) {
    redirectPath = type === 'news' ? `/news/${slug}` : `/blog/${slug}`
  }

  return NextResponse.redirect(new URL(redirectPath, request.url))
}