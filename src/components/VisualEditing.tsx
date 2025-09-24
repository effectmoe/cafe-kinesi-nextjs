'use client'

import { enableOverlays } from '@sanity/overlays'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LiveVisualEditing() {
  const router = useRouter()

  useEffect(() => {
    // Visual Editing overlaysを有効化
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

    return () => disable()
  }, [router])

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
      📝 Sanity Visual Editing有効 - リアルタイム編集可能
      <a
        href="/api/disable-draft"
        style={{ color: 'white', textDecoration: 'underline', marginLeft: '8px' }}
        onClick={(e) => {
          e.preventDefault()
          router.push('/api/disable-draft')
        }}
      >
        プレビューを終了
      </a>
    </div>
  )
}