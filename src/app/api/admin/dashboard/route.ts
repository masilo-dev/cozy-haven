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

    // Check if user is admin
    const isAdmin = user.email === 'admin@cozyhaven.co.uk' || user.user_metadata?.role === 'admin'
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    // Get all properties
    const { data: properties, error: propertiesError } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    // Get all bookings
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select(`
        *,
        properties (
          id,
          title,
          location
        )
      `)
      .order('created_at', { ascending: false })

    // Get all users from auth
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers()

    if (propertiesError || bookingsError) {
      console.error('Error fetching admin data:', propertiesError || bookingsError)
      return NextResponse.json(
        { error: 'Failed to fetch dashboard data' },
        { status: 500 }
      )
    }

    // Calculate stats
    const totalProperties = properties?.length || 0
    const totalBookings = bookings?.length || 0
    const totalUsers = users?.length || 0
    const totalRevenue = bookings?.reduce((sum, booking) => sum + (booking.total_price || 0), 0) || 0
    const activeBookings = bookings?.filter(b => b.status === 'confirmed').length || 0

    // Recent activity
    const recentBookings = bookings?.slice(0, 10) || []
    const recentProperties = properties?.slice(0, 5) || []

    return NextResponse.json({
      stats: {
        totalProperties,
        totalBookings,
        totalUsers,
        totalRevenue,
        activeBookings
      },
      recentBookings,
      recentProperties,
      users: users?.map(u => ({
        id: u.id,
        email: u.email,
        name: u.user_metadata?.name || '',
        role: u.user_metadata?.role || 'customer',
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at
      })) || []
    })
  } catch (error) {
    console.error('Admin dashboard error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

