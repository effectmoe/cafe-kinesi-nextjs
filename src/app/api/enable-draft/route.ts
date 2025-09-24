import { draftMode } from 'next/headers'

export async function GET() {
  (await draftMode()).enable()
  return new Response(null, {
    status: 307,
    headers: {
      Location: '/'
    }
  })
}