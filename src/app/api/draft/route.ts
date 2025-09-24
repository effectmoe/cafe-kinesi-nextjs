import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const type = searchParams.get('type') || 'blogPost'

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the appropriate page
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