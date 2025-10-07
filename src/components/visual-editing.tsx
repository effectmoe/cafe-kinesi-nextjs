'use client'

import { useEffect } from 'react'
import { enableVisualEditing } from '@sanity/visual-editing'

export function VisualEditing() {
  useEffect(() => {
    // iframe内でのみ有効化
    const isInIframe = window !== window.parent
    const isStudioHost = window.location.ancestorOrigins &&
      (window.location.ancestorOrigins[0]?.includes('sanity.studio') ||
       window.location.ancestorOrigins[0]?.includes('localhost:3333'))

    if (!isInIframe && !isStudioHost) return

    const disable = enableVisualEditing({
      history: {
        subscribe: (callback) => {
          const handlePopState = () => {
            callback({
              type: 'push',
              url: window.location.href,
            })
          }
          window.addEventListener('popstate', handlePopState)
          return () => window.removeEventListener('popstate', handlePopState)
        },
        update: (update) => {
          if (update.type === 'push' || update.type === 'replace') {
            const method = update.type === 'push' ? 'pushState' : 'replaceState'
            window.history[method](null, '', update.url)
          }
        },
      },
    })

    return () => disable()
  }, [])

  return null
}