import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  // シークレットトークンのチェックをスキップ（開発環境用）
  // if (secret !== 'your-secret-token') {
  //   return new Response('Invalid token', { status: 401 })
  // }

  // ドラフトモードを有効化
  const draft = await draftMode()
  draft.enable()

  // プレビューページにリダイレクト
  if (slug) {
    redirect(`/blog/${slug}`)
  }

  redirect('/')
}