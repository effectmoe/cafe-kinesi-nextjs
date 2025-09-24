import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    console.log('Draft mode disable requested')

    const draft = await draftMode()
    draft.disable()

    console.log('Draft mode disabled')

    return NextResponse.json(
      { message: 'Draft mode disabled' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error disabling draft mode:', error)
    return NextResponse.json(
      { error: 'Failed to disable draft mode' },
      { status: 500 }
    )
  }
}