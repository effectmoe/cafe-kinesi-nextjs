import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
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