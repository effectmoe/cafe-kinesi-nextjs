// Sanity公式ドキュメントに基づく実装
// https://www.sanity.io/docs/presentation-tool

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  await draftMode().then(mode => mode.enable())
  redirect('/')
}