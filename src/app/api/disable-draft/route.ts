import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  // ドラフトモードを無効化
  const draft = await draftMode()
  draft.disable()

  // ホームページにリダイレクト
  redirect('/')
}