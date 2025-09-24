'use client'

export default function LiveVisualEditing() {
  return (
    <div
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
      📝 Sanity プレビューモード - パブリッシュ機能有効
      <a href="/api/disable-draft" style={{ color: 'white', textDecoration: 'underline', marginLeft: '8px' }}>
        プレビューを終了
      </a>
    </div>
  )
}