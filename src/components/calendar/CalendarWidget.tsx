'use client'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import ja from 'date-fns/locale/ja'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const locales = { ja }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface Event {
  title: string
  start: Date
  end: Date
  resource?: any
}

interface CalendarWidgetProps {
  courseSlug?: string
  className?: string
}

export default function CalendarWidget({ courseSlug, className = '' }: CalendarWidgetProps) {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    // TODO: Sanityから予約データを取得
    // 仮のデータ
    const dummyEvents: Event[] = [
      {
        title: 'ピーチタッチ基礎講座',
        start: new Date(2025, 9, 15, 10, 0),
        end: new Date(2025, 9, 15, 12, 0),
      },
      {
        title: 'チャクラキネシ実践',
        start: new Date(2025, 9, 20, 14, 0),
        end: new Date(2025, 9, 20, 16, 0),
      },
    ]
    setEvents(dummyEvents)
  }, [courseSlug])

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">今月の講座</h3>
        <Link
          href="/calendar"
          className="text-sm text-[#8B5A3C] hover:text-[#6B4A2C] transition-colors"
        >
          すべて見る →
        </Link>
      </div>

      <div className="calendar-widget-container" style={{ height: 300 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          culture="ja"
          views={['month']}
          defaultView="month"
          toolbar={false}
          style={{ height: '100%' }}
        />
      </div>

      <style jsx global>{`
        .calendar-widget-container .rbc-calendar {
          font-family: inherit;
        }
        .calendar-widget-container .rbc-header {
          padding: 8px 4px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #4B5563;
          border-bottom: 1px solid #E5E7EB;
        }
        .calendar-widget-container .rbc-date-cell {
          padding: 4px;
          font-size: 0.75rem;
        }
        .calendar-widget-container .rbc-event {
          background-color: #8B5A3C;
          border-radius: 4px;
          padding: 2px 4px;
          font-size: 0.75rem;
        }
        .calendar-widget-container .rbc-today {
          background-color: #FEF3C7;
        }
      `}</style>
    </div>
  )
}
