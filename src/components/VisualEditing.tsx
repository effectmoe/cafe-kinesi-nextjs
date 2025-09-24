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

  return suspiciousGlobals.some(global => global in window)
}

export default function LiveVisualEditing() {
  const [extensionWarning, setExtensionWarning] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const errorCountRef = useRef(0)
  const maxErrors = 3

  useEffect(() => {
    // Chrome拡張機能のチェック
    if (hasProblematicExtensions()) {
      setExtensionWarning(true)
      console.warn(
        'Sanity Visual Editing: Chrome拡張機能が検出されました。',
        'プレビュー機能が正しく動作しない可能性があります。',
        '拡張機能を無効化するか、シークレットモードでお試しください。'
      )
    }

    // PostMessageエラーのハンドリング
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes('postMessage') ||
          event.message?.includes('cross-origin')) {
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

        // Visual Editingを有効化
        const cleanup = enableVisualEditing({
          refresh: (payload) => {
            // リフレッシュ処理
            if (payload.source === 'mutation') {
              window.location.reload()
              return false
            }
            return false
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