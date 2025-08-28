import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

async function checkAdminAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return { error: 'No authorization header', status: 401 }
  }

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)

  if (authError || !user) {
    return { error: 'Invalid token', status: 401 }
  }

  const isAdmin = user.email === 'admin@cozyhaven.co.uk' || user.user_metadata?.role === 'admin'
  if (!isAdmin) {
    return { error: 'Access denied', status: 403 }
  }

  return { user }
}

export async function GET(request: NextRequest) {
  try {
    const authCheck = await checkAdminAuth(request)
    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
    }

    const { data: bookings, error } = await supabase
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
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching bookings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Admin bookings GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authCheck = await checkAdminAuth(request)
    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
    }

    const { id, ...bookingData } = await request.json()

    const { data: booking, error } = await supabase
      .from('bookings')
      .update(bookingData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating booking:', error)
      return NextResponse.json(
        { error: 'Failed to update booking' },
        { status: 500 }
      )
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('Admin bookings PUT error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authCheck = await checkAdminAuth(request)
    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting booking:', error)
      return NextResponse.json(
        { error: 'Failed to delete booking' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Booking deleted successfully' })
  } catch (error) {
    console.error('Admin bookings DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

