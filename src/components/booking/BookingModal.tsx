'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  event?: {
    title: string
    start: Date
    end: Date
    resource?: {
      courseId?: string
      courseType: string
      instructor: string
      capacity: number
      booked: number
    }
  }
}

export default function BookingModal({ isOpen, onClose, event }: BookingModalProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Reset form when modal closes
    if (!isOpen) {
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        notes: '',
      })
      setError(null)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate phone number
    if (!formData.customerPhone) {
      setError('電話番号を入力してください')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Check if courseId exists
      if (!event?.resource?.courseId) {
        throw new Error('講座情報が見つかりません')
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: event.resource.courseId,
          startTime: event.start,
          endTime: event.end,
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
          notes: formData.notes,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '予約の送信に失敗しました')
      }

      // Success
      alert('予約を受け付けました。確認メールをお送りします。')
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : '予約に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!isOpen || !event) return null

  const availableSpots = event.resource
    ? event.resource.capacity - event.resource.booked
    : 0
  const isFull = availableSpots <= 0

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '100%',
          maxWidth: '500px',
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '28px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>講座予約</h2>
            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#9ca3af',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6'
                e.currentTarget.style.color = '#4b5563'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#9ca3af'
              }}
              aria-label="閉じる"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Event Details */}
          <div style={{
            marginBottom: '28px',
            padding: '20px',
            background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '12px' }}>
              {event.title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                📅 {format(event.start, 'yyyy年M月d日(E)', { locale: ja })}
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                🕐 {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
              </p>
              {event.resource && (
                <>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    👤 講師: {event.resource.instructor}
                  </p>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: isFull ? '#dc2626' : '#16a34a',
                    margin: 0
                  }}>
                    {isFull ? '満席' : `残り${availableSpots}席`}
                  </p>
                </>
              )}
            </div>
          </div>

          {isFull ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <p style={{ color: '#ef4444', fontWeight: '600', marginBottom: '20px', fontSize: '15px' }}>
                申し訳ございません。この講座は満席です。
              </p>
              <button
                onClick={onClose}
                style={{
                  padding: '12px 32px',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: 'white',
                  backgroundColor: '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4b5563'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#6b7280'
                }}
              >
                閉じる
              </button>
            </div>
          ) : (
            <>
              {/* Booking Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label
                    htmlFor="customerName"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}
                  >
                    お名前 <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    placeholder="山田 太郎"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      transition: 'all 0.2s',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#8B5A3C'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 90, 60, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="customerEmail"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}
                  >
                    メールアドレス <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      transition: 'all 0.2s',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#8B5A3C'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 90, 60, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="customerPhone"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}
                  >
                    電話番号 <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="customerPhone"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    required
                    placeholder="090-1234-5678"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      transition: 'all 0.2s',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#8B5A3C'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 90, 60, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}
                  >
                    備考・ご質問
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="アレルギーや配慮が必要な事項があればお書きください"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      transition: 'all 0.2s',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#8B5A3C'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 90, 60, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {error && (
                  <div style={{
                    padding: '14px 16px',
                    backgroundColor: '#fef2f2',
                    border: '2px solid #fecaca',
                    borderRadius: '10px'
                  }}>
                    <p style={{ fontSize: '14px', color: '#dc2626', margin: 0 }}>{error}</p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <button
                    type="button"
                    onClick={onClose}
                    style={{
                      flex: 1,
                      padding: '14px 24px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#374151',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db'
                      e.currentTarget.style.backgroundColor = '#f9fafb'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb'
                      e.currentTarget.style.backgroundColor = 'white'
                    }}
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      flex: 1,
                      padding: '14px 24px',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '600',
                      color: 'white',
                      backgroundColor: isSubmitting ? '#9ca3af' : '#8B5A3C',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      outline: 'none',
                      boxShadow: isSubmitting ? 'none' : '0 4px 6px -1px rgba(139, 90, 60, 0.2), 0 2px 4px -1px rgba(139, 90, 60, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = '#6B4A2C'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                        e.currentTarget.style.boxShadow = '0 6px 10px -1px rgba(139, 90, 60, 0.3), 0 4px 6px -1px rgba(139, 90, 60, 0.15)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = '#8B5A3C'
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(139, 90, 60, 0.2), 0 2px 4px -1px rgba(139, 90, 60, 0.1)'
                      }
                    }}
                  >
                    {isSubmitting ? '送信中...' : '予約する'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
