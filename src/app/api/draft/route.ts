import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import { client } from '@/lib/sanity'

const token = process.env.SANITY_API_TOKEN!

export async function GET(request: NextRequest) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(client.withConfig({ token }), request.url)

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(redirectTo)
}