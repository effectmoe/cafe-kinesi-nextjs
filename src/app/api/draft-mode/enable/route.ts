import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('Draft mode enable API called')
  console.log('Full URL:', request.url)

  try {
    // URLパラメータを取得
    const { searchParams } = new URL(request.url)

    // デバッグ用：全パラメータをログ出力
    console.log('Query params:')
    searchParams.forEach((value, key) => {
      console.log(`  ${key}: ${value}`)
    })

    // ドラフトモードを有効化
    const draft = await draftMode()
    draft.enable()
    console.log('Draft mode enabled successfully')

    // リダイレクト先を決定
    const pathname = searchParams.get('sanity-preview-pathname') || '/'
    console.log('Redirecting to:', pathname)

    // リダイレクト
    redirect(pathname)

  } catch (error) {
    console.error('Error in draft mode enable:', error)
    // エラー時は必ずリダイレクト（Next.js App Routerの仕様）
    redirect('/')
  }
}