'use client'

import { enableOverlays } from '@sanity/overlays'
import { useEffect } from 'react'

export default function LiveVisualEditing() {
  useEffect(() => {
    // Sanity Visual Editing overlaysを有効化
    const disable = enableOverlays({
      history: {
        subscribe: (navigate) => {
          const handlePopState = (event: PopStateEvent) => {
            navigate({
              type: 'push',
              url: event.state?.url || window.location.pathname,
            })
          }
          window.addEventListener('popstate', handlePopState)
          return () => window.removeEventListener('popstate', handlePopState)
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

    return () => disable()
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: '#43d9ad',
        color: 'white',
        padding: '8px 16px',
        fontSize: '14px',
        textAlign: 'center',
        zIndex: 9999,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      ✨ Sanity Visual Editing有効 - リアルタイム編集中
      <form action="/api/draft-mode/disable" method="POST" className="inline ml-3">
        <button
          type="submit"
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          プレビューを終了
        </button>
      </form>
    </div>
  )
}