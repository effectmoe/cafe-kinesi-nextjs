import { NextRequest, NextResponse } from 'next/server'
import { previewClient } from '@/lib/sanity'

interface RouteParams {
  params: {
    id: string
  }
}

// GET /api/bookings/[id] - Get a specific booking
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    const booking = await previewClient.fetch(
      `*[_type == "booking" && _id == $id][0] {
        _id,
        _type,
        bookingNumber,
        "course": course->{title, slug, category, instructor->{name}},
        startTime,
        endTime,
        customerName,
        customerEmail,
        customerPhone,
        notes,
        participants,
        status,
        paymentStatus,
        totalPrice,
        staffNotes,
        createdAt,
        updatedAt
      }`,
      { id }
    )

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, booking },
      { status: 200 }
    )
  } catch (error) {
    console.error('Booking fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch booking', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// PATCH /api/bookings/[id] - Update a booking
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params
    const body = await request.json()

    // Check if booking exists
    const existingBooking = await previewClient.fetch(
      `*[_type == "booking" && _id == $id][0]`,
      { id }
    )

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    }

    if (body.status) updateData.status = body.status
    if (body.customerName) updateData.customerName = body.customerName
    if (body.customerEmail) updateData.customerEmail = body.customerEmail
    if (body.customerPhone) updateData.customerPhone = body.customerPhone
    if (body.notes !== undefined) updateData.notes = body.notes
    if (body.staffNotes !== undefined) updateData.staffNotes = body.staffNotes
    if (body.participants !== undefined) updateData.participants = body.participants
    if (body.paymentStatus) updateData.paymentStatus = body.paymentStatus
    if (body.startTime) updateData.startTime = new Date(body.startTime).toISOString()
    if (body.endTime) updateData.endTime = new Date(body.endTime).toISOString()

    // Update booking
    const updatedBooking = await previewClient
      .patch(id)
      .set(updateData)
      .commit()

    return NextResponse.json(
      {
        success: true,
        booking: updatedBooking,
        message: '予約を更新しました'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Booking update error:', error)
    return NextResponse.json(
      { error: 'Failed to update booking', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// DELETE /api/bookings/[id] - Delete a booking (or mark as cancelled)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params
    const { searchParams } = new URL(request.url)
    const hardDelete = searchParams.get('hard') === 'true'

    // Check if booking exists
    const existingBooking = await previewClient.fetch(
      `*[_type == "booking" && _id == $id][0]`,
      { id }
    )

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    if (hardDelete) {
      // Hard delete: completely remove from Sanity
      await previewClient.delete(id)
      return NextResponse.json(
        {
          success: true,
          message: '予約を削除しました'
        },
        { status: 200 }
      )
    } else {
      // Soft delete: mark as cancelled
      const cancelledBooking = await previewClient
        .patch(id)
        .set({ status: 'cancelled' })
        .commit()

      return NextResponse.json(
        {
          success: true,
          booking: cancelledBooking,
          message: '予約をキャンセルしました'
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Booking delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete booking', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
