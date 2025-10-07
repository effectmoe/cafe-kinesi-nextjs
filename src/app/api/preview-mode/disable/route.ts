import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  // draftモードを無効化
  const draft = await draftMode()
  draft.disable()

  // ホームページにリダイレクト
  redirect('/')
}