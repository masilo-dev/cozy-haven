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

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''
    const status = searchParams.get('status') || ''

    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' })

    // Apply filters
    if (search) {
      query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (type) {
      query = query.eq('type', type)
    }

    if (status === 'available') {
      query = query.eq('available', true)
    } else if (status === 'unavailable') {
      query = query.eq('available', false)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: properties, error, count } = await query
      .range(from, to)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching properties:', error)
      return NextResponse.json(
        { error: 'Failed to fetch properties' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })
  } catch (error) {
    console.error('Admin properties GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authCheck = await checkAdminAuth(request)
    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
    }

    const body = await request.json()
    
    const {
      title,
      description,
      location,
      price,
      price_type = 'night',
      bedrooms,
      bathrooms,
      guests,
      images = [],
      amenities = [],
      type = 'short-term',
      available = true,
      featured = false,
      airbnb_listing_id,
      latitude,
      longitude
    } = body

    // Validate required fields
    if (!title || !description || !location || !price || !bedrooms || !bathrooms || !guests) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, location, price, bedrooms, bathrooms, guests' },
        { status: 400 }
      )
    }

    const propertyData = {
      title,
      description,
      location,
      price: parseFloat(price),
      price_type,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseFloat(bathrooms),
      guests: parseInt(guests),
      rating: 0,
      review_count: 0,
      images,
      amenities,
      type,
      available,
      featured,
      airbnb_listing_id,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data: property, error } = await supabase
      .from('properties')
      .insert([propertyData])
      .select()
      .single()

    if (error) {
      console.error('Error creating property:', error)
      return NextResponse.json(
        { error: 'Failed to create property' },
        { status: 500 }
      )
    }

    return NextResponse.json({ property }, { status: 201 })
  } catch (error) {
    console.error('Admin properties POST error:', error)
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

    const { id, ...updateData } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      )
    }

    // Add updated timestamp
    updateData.updated_at = new Date().toISOString()

    // Convert numeric fields if they exist
    if (updateData.price) updateData.price = parseFloat(updateData.price)
    if (updateData.bedrooms) updateData.bedrooms = parseInt(updateData.bedrooms)
    if (updateData.bathrooms) updateData.bathrooms = parseFloat(updateData.bathrooms)
    if (updateData.guests) updateData.guests = parseInt(updateData.guests)
    if (updateData.latitude) updateData.latitude = parseFloat(updateData.latitude)
    if (updateData.longitude) updateData.longitude = parseFloat(updateData.longitude)

    const { data: property, error } = await supabase
      .from('properties')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating property:', error)
      return NextResponse.json(
        { error: 'Failed to update property' },
        { status: 500 }
      )
    }

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ property })
  } catch (error) {
    console.error('Admin properties PUT error:', error)
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
        { error: 'Property ID is required' },
        { status: 400 }
      )
    }

    // First check if property exists
    const { data: existingProperty, error: fetchError } = await supabase
      .from('properties')
      .select('id, title')
      .eq('id', id)
      .single()

    if (fetchError || !existingProperty) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    // Delete the property
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting property:', error)
      return NextResponse.json(
        { error: 'Failed to delete property' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Property deleted successfully',
      deletedProperty: existingProperty
    })
  } catch (error) {
    console.error('Admin properties DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

