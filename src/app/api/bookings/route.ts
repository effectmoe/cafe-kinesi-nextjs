import { NextRequest, NextResponse } from 'next/server'
import { previewClient } from '@/lib/sanity'
import { nanoid } from 'nanoid'

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { courseId, startTime, endTime, customerName, customerEmail, customerPhone, notes } = body

    // Validation
    if (!courseId || !startTime || !endTime || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate customerPhone is provided
    if (!customerPhone) {
      return NextResponse.json(
        { error: '電話番号は必須です' },
        { status: 400 }
      )
    }

    // Generate booking number
    const bookingNumber = `BK-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${nanoid(6).toUpperCase()}`

    // Create booking in Sanity
    const booking = await previewClient.create({
      _type: 'booking',
      bookingNumber,
      course: {
        _type: 'reference',
        _ref: courseId,
      },
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      customerName,
      customerEmail,
      customerPhone,
      participants: 1,
      notes: notes || '',
      status: 'pending',
      paymentStatus: 'unpaid',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        booking,
        message: '予約を受け付けました'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create booking', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// GET /api/bookings - Get all bookings (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseSlug = searchParams.get('course')
    const status = searchParams.get('status')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Build GROQ query
    let query = '*[_type == "booking"'
    const filters: string[] = []

    if (courseSlug) {
      filters.push(`course._ref == *[_type == "course" && slug.current == "${courseSlug}"][0]._id`)
    }
    if (status) {
      filters.push(`status == "${status}"`)
    }
    if (startDate) {
      filters.push(`startTime >= "${startDate}"`)
    }
    if (endDate) {
      filters.push(`startTime <= "${endDate}"`)
    }

    if (filters.length > 0) {
      query += ' && ' + filters.join(' && ')
    }

    query += '] | order(startTime desc) { _id, _type, bookingNumber, "course": course->{title, slug, category, instructor->{name}}, startTime, endTime, customerName, customerEmail, customerPhone, notes, participants, status, paymentStatus, totalPrice, staffNotes, createdAt, updatedAt }'

    const bookings = await previewClient.fetch(query)

    return NextResponse.json(
      { success: true, bookings, count: bookings.length },
      { status: 200 }
    )
  } catch (error) {
    console.error('Booking fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
