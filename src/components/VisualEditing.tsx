'use client'

import { useEffect, useRef, useState } from 'react'

// Chrome拡張機能のチェック
function hasProblematicExtensions() {
  if (typeof window === 'undefined') return false

  // 拡張機能による干渉を検出
  const suspiciousGlobals = [
    'videoSpeedController',
    '__videoSpeedController',
    'adblockDetected',
    '__adblockActive',
  ]

  // Chrome拡張機能のランタイムチェック
  if ((window as any).chrome && (window as any).chrome.runtime && (window as any).chrome.runtime.id) {
    console.log('拡張機能が検出されました:', (window as any).chrome.runtime.id)
    return true
  }

  return suspiciousGlobals.some(global => global in window)
}

export default function LiveVisualEditing() {
  const [extensionWarning, setExtensionWarning] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const errorCountRef = useRef(0)
  const maxErrors = 3

  useEffect(() => {
    // iframe内でのみ有効化
    const isInIframe = window !== window.parent
    if (!isInIframe) {
      console.log('Visual Editing: Not in iframe, skipping initialization')
      return
    }

    // Chrome拡張機能のチェック
    if (hasProblematicExtensions()) {
      setExtensionWarning(true)
      console.warn(
        'Sanity Visual Editing: Chrome拡張機能が検出されました。',
        'プレビュー機能が正しく動作しない可能性があります。',
        '拡張機能を無効化するか、シークレットモードでお試しください。'
      )
    }

    // 拡張機能エラーの無視
    const handleError = (event: ErrorEvent) => {
      // content-all.js エラーを無視
      if (event.filename && event.filename.includes('content-all.js')) {
        event.preventDefault()
        console.log('拡張機能エラーを無視しました')
        return
      }

      if (event.message?.includes('postMessage') ||
          event.message?.includes('cross-origin') ||
          event.message?.includes('Receiving end does not exist')) {
        event.preventDefault()
        errorCountRef.current++

        if (errorCountRef.current > maxErrors) {
          console.error(
            'Sanity Visual Editing: 通信エラーが頻発しています。',
            'Chrome拡張機能を無効化してください。'
          )
          setIsEnabled(false)
        }
      }
    }

    window.addEventListener('error', handleError)

    // Visual Editingを有効化
    setIsEnabled(true)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  // ビルドエラーを回避するため、動的インポートを使用
  useEffect(() => {
    if (!isEnabled) return

    const loadVisualEditing = async () => {
      try {
        const { enableVisualEditing } = await import('@sanity/visual-editing')

        // Visual Editingを有効化（参考資料に基づく設定）
        const cleanup = enableVisualEditing({
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

        // クリーンアップ関数を返す
        return cleanup
      } catch (error) {
        console.error('Visual Editing loading error:', error)
      }
    }

    let cleanup: (() => void) | undefined

    loadVisualEditing().then(fn => {
      cleanup = fn
    })

    return () => {
      if (cleanup) cleanup()
    }
  }, [isEnabled])

  if (!isEnabled) {
    return null
  }

  if (extensionWarning) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: 'orange',
          color: 'white',
          padding: '10px 15px',
          borderRadius: 5,
          zIndex: 9999,
          fontSize: '12px',
          maxWidth: '300px',
        }}
      >
        ⚠️ Chrome拡張機能が検出されました。
        プレビュー機能が制限される可能性があります。
      </div>
    )
  }

  return null
}