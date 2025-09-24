import { NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

export async function GET() {
  try {
    const { isEnabled } = await draftMode();

    return NextResponse.json({
      previewMode: isEnabled,
      timestamp: new Date().toISOString(),
      status: 'ok',
      message: isEnabled ? 'Preview mode is active' : 'Preview mode is inactive'
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to check preview status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}