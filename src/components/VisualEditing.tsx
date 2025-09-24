'use client'

// Visual Editing機能は一時的に無効化（ライブラリ互換性のため）
// import { VisualEditing } from '@sanity/visual-editing'

export default function LiveVisualEditing() {
  // プレビューモードが有効な場合にSanityのVisual Editingツールバーを表示
  return (
    <div
      id="sanity-visual-editing-toolbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: '#ff6b35',
        color: 'white',
        padding: '8px 16px',
        fontSize: '14px',
        textAlign: 'center',
        zIndex: 9999
      }}
    >
      Sanity Visual Editing モード - プレビュー中
    </div>
  )
}