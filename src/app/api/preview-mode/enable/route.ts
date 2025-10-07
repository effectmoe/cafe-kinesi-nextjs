import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { client } from '@/lib/sanity'

const token = process.env.SANITY_API_TOKEN

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const type = searchParams.get('type') || 'blogPost'
  const secret = searchParams.get('secret')

  // secretの検証（オプション）
  if (secret && token) {
    const { isValid, redirectTo = '/' } = await validatePreviewUrl(
      client.withConfig({ token }),
      request.url
    )

    if (!isValid) {
      return new Response('Invalid secret', { status: 401 })
    }

    // draftモードを有効化
    const draft = await draftMode()
    draft.enable()

    redirect(redirectTo)
  }

  // シンプルなプレビューモード有効化
  const draft = await draftMode()
  draft.enable()

  // リダイレクト先の決定
  let redirectPath = '/'
  if (slug) {
    if (type === 'news') {
      redirectPath = `/news/${slug}`
    } else if (type === 'blogPost') {
      redirectPath = `/blog/${slug}`
    }
  }

  redirect(redirectPath)
}