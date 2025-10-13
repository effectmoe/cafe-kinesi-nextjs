'use client'

import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import ja from 'date-fns/locale/ja'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useEffect, useState } from 'react'

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
  resource?: {
    courseType: string
    instructor: string
    capacity: number
    booked: number
  }
}

export default function FullCalendar() {
  const [events, setEvents] = useState<Event[]>([])
  const [view, setView] = useState<View>('month')

  useEffect(() => {
    // TODO: Sanityから予約データを取得
    const dummyEvents: Event[] = [
      {
        title: 'ピーチタッチ基礎講座',
        start: new Date(2025, 9, 15, 10, 0),
        end: new Date(2025, 9, 15, 12, 0),
        resource: {
          courseType: 'peach-touch',
          instructor: '山田 花子',
          capacity: 8,
          booked: 3,
        },
      },
      {
        title: 'チャクラキネシ実践',
        start: new Date(2025, 9, 20, 14, 0),
        end: new Date(2025, 9, 20, 16, 0),
        resource: {
          courseType: 'chakra-kinesi',
          instructor: '佐藤 一郎',
          capacity: 10,
          booked: 7,
        },
      },
      {
        title: 'ハッピーオーラ入門',
        start: new Date(2025, 9, 25, 10, 0),
        end: new Date(2025, 9, 25, 11, 30),
        resource: {
          courseType: 'happy-aura',
          instructor: '山田 花子',
          capacity: 12,
          booked: 12,
        },
      },
    ]
    setEvents(dummyEvents)
  }, [])

  const eventStyleGetter = (event: Event) => {
    let backgroundColor = '#8B5A3C'

    if (event.resource) {
      switch (event.resource.courseType) {
        case 'peach-touch':
          backgroundColor = '#FF6B6B'
          break
        case 'chakra-kinesi':
          backgroundColor = '#4ECDC4'
          break
        case 'happy-aura':
          backgroundColor = '#FFD93D'
          break
      }

      // 満席の場合は暗くする
      if (event.resource.booked >= event.resource.capacity) {
        backgroundColor = '#9CA3AF'
      }
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => setView('month')}
            className={`px-4 py-2 rounded ${
              view === 'month'
                ? 'bg-[#8B5A3C] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            月
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded ${
              view === 'week'
                ? 'bg-[#8B5A3C] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            週
          </button>
          <button
            onClick={() => setView('day')}
            className={`px-4 py-2 rounded ${
              view === 'day'
                ? 'bg-[#8B5A3C] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            日
          </button>
        </div>

        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FF6B6B' }}></div>
            <span>ピーチタッチ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#4ECDC4' }}></div>
            <span>チャクラキネシ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFD93D' }}></div>
            <span>ハッピーオーラ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-400"></div>
            <span>満席</span>
          </div>
        </div>
      </div>

      <div style={{ height: 600 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          culture="ja"
          view={view}
          onView={setView}
          views={['month', 'week', 'day', 'agenda']}
          eventPropGetter={eventStyleGetter}
          messages={{
            next: '次',
            previous: '前',
            today: '今日',
            month: '月',
            week: '週',
            day: '日',
            agenda: '一覧',
            date: '日付',
            time: '時間',
            event: 'イベント',
            noEventsInRange: 'この期間にイベントはありません',
          }}
        />
      </div>

      <style jsx global>{`
        .rbc-calendar {
          font-family: inherit;
        }
        .rbc-header {
          padding: 16px 8px;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #E5E7EB;
        }
        .rbc-today {
          background-color: #FEF3C7;
        }
        .rbc-toolbar button {
          color: #374151;
          padding: 8px 16px;
          border-radius: 6px;
        }
        .rbc-toolbar button:hover {
          background-color: #F3F4F6;
        }
        .rbc-toolbar button.rbc-active {
          background-color: #8B5A3C;
          color: white;
        }
      `}</style>
    </div>
  )
}
