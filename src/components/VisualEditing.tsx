'use client'

import { useEffect } from 'react'

export default function LiveVisualEditing() {
  useEffect(() => {
    // Sanity Visual Editing overlaysを手動で有効化
    if (typeof window !== 'undefined') {
      // Sanity Visual Editingが利用可能かチェック
      const loadVisualEditing = async () => {
        try {
          const { enableOverlays } = await import('@sanity/overlays')

          const disable = enableOverlays({
            history: {
              subscribe: (navigate) => {
                const handler = (event: PopStateEvent) => {
                  navigate({
                    type: 'push',
                    url: event.state?.url || window.location.pathname,
                  })
                }
                window.addEventListener('popstate', handler)
                return () => window.removeEventListener('popstate', handler)
              },
              update: (update) => {
                if (update.type === 'push' || update.type === 'replace') {
                  const method = update.type === 'push' ? 'pushState' : 'replaceState'
                  window.history[method]({ url: update.url }, '', update.url)
                } else if (update.type === 'pop') {
                  window.history.back()
                }
              },
            },
          })

          return disable
        } catch (error) {
          console.warn('Visual Editing overlay could not be loaded:', error)
          return null
        }
      }

      loadVisualEditing()
    }
  }, [])

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
      📝 Sanity プレビューモード -
      <a href="/api/disable-draft" style={{ color: 'white', textDecoration: 'underline', marginLeft: '8px' }}>
        プレビューを終了
      </a>
    </div>
  )
}