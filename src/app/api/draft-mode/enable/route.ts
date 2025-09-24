import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  console.log('Draft mode enable API called')

  try {
    const draft = await draftMode()
    draft.enable()
    console.log('Draft mode enabled')

    // 単純にホームページにリダイレクト
    redirect('/')

  } catch (error) {
    console.error('Error enabling draft mode:', error)
    redirect('/?draft-error=true')
  }
}