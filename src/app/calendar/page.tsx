import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FullCalendar from '@/components/calendar/FullCalendar'

export const metadata: Metadata = {
  title: 'カレンダー - Cafe Kinesi',
  description: 'Cafe Kinesiの講座スケジュール',
}

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="font-noto-serif text-3xl md:text-4xl font-medium text-center mb-8">
          講座スケジュール
        </h1>
        <FullCalendar />
      </main>
      <Footer />
    </div>
  )
}
