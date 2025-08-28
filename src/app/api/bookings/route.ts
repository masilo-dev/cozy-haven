import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const propertyId = searchParams.get('propertyId')

    let query = supabase
      .from('bookings')
      .select(`
        *,
        properties (
          id,
          title,
          location,
          images
        )
      `)

    if (userId) {
      query = query.eq('user_id', userId)
    }

    if (propertyId) {
      query = query.eq('property_id', propertyId)
    }

    const { data: bookings, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching bookings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Bookings API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    // Check if property is available for the requested dates
    const { data: existingBookings, error: checkError } = await supabase
      .from('bookings')
      .select('*')
      .eq('property_id', bookingData.property_id)
      .eq('status', 'confirmed')
      .or(`check_in.lte.${bookingData.check_out},check_out.gte.${bookingData.check_in}`)

    if (checkError) {
      console.error('Error checking availability:', checkError)
      return NextResponse.json(
        { error: 'Failed to check availability' },
        { status: 500 }
      )
    }

    if (existingBookings && existingBookings.length > 0) {
      return NextResponse.json(
        { error: 'Property is not available for the selected dates' },
        { status: 400 }
      )
    }

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single()

    if (error) {
      console.error('Error creating booking:', error)
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

