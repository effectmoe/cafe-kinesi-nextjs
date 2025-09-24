import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  // 簡単なセキュリティチェック
  if (secret !== 'your-secret-token') {
    return new Response('Invalid token', { status: 401 })
  }

  // ドラフトモードを有効化
  draftMode().enable()

  // プレビューページにリダイレクト
  if (slug) {
    redirect(`/blog/${slug}`)
  }

  redirect('/')
}