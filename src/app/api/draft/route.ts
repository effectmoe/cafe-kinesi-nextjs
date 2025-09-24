import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Sanity特有のパラメータを処理
    const sanityPreviewSecret = searchParams.get('sanity-preview-secret')
    const sanityPreviewPerspective = searchParams.get('sanity-preview-perspective')
    const sanityPreviewPathname = searchParams.get('sanity-preview-pathname')

    // 従来のパラメータもサポート
    const secret = searchParams.get('secret')
    const slug = searchParams.get('slug')

    // シークレットトークンの検証
    const expectedSecret = process.env.SANITY_PREVIEW_SECRET || 'default-preview-secret'

    if (sanityPreviewSecret) {
      // Sanityからのプレビューリクエスト
      if (sanityPreviewSecret !== expectedSecret) {
        return new Response('Invalid preview secret', { status: 401 })
      }
    } else if (secret && secret !== expectedSecret) {
      // 従来のsecretパラメータの検証
      return new Response('Invalid token', { status: 401 })
    }

    // ドラフトモードを有効化
    const draft = await draftMode()
    draft.enable()

    // リダイレクト先の決定
    let redirectPath = '/'

    if (sanityPreviewPathname) {
      // Sanityからのパス指定がある場合
      redirectPath = sanityPreviewPathname
    } else if (slug) {
      // slugパラメータがある場合
      redirectPath = `/blog/${slug}`
    }

    // パスの正規化
    if (redirectPath.startsWith('/undefined') || redirectPath === '/undefined') {
      redirectPath = '/'
    }

    redirect(redirectPath)
  } catch (error) {
    console.error('Draft mode error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}