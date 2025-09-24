import { NextResponse } from 'next/server'

// 最も基本的なテスト
export async function GET() {
  try {
    // 単純にJSONを返すだけ
    return NextResponse.json({
      status: 'ok',
      message: 'Test API is working',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Test failed',
      details: String(error)
    }, { status: 500 })
  }
}