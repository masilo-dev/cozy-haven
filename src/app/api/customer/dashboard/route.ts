import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'No authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user's bookings
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select(`
        *,
        properties (
          id,
          title,
          location,
          images,
          price,
          price_type
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (bookingsError) {
      console.error('Error fetching bookings:', bookingsError)
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      )
    }

    // Get user's favorite properties (if we had a favorites table)
    const { data: favoriteProperties, error: favoritesError } = await supabase
      .from('properties')
      .select('*')
      .eq('featured', true)
      .limit(3)

    if (favoritesError) {
      console.error('Error fetching favorites:', favoritesError)
    }

    // Calculate dashboard stats
    const totalBookings = bookings?.length || 0
    const activeBookings = bookings?.filter(b => b.status === 'confirmed').length || 0
    const totalSpent = bookings?.reduce((sum, booking) => sum + (booking.total_price || 0), 0) || 0

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || '',
        phone: user.user_metadata?.phone || '',
        created_at: user.created_at
      },
      stats: {
        totalBookings,
        activeBookings,
        totalSpent,
        memberSince: user.created_at
      },
      recentBookings: bookings?.slice(0, 5) || [],
      favoriteProperties: favoriteProperties || []
    })
  } catch (error) {
    console.error('Customer dashboard error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

