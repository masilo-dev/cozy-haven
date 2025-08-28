import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const featured = searchParams.get('featured')
    const location = searchParams.get('location')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const bedrooms = searchParams.get('bedrooms')
    const guests = searchParams.get('guests')

    let query = supabase
      .from('properties')
      .select('*')
      .eq('available', true)

    // Apply filters
    if (type) {
      query = query.eq('type', type)
    }
    
    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    if (location) {
      query = query.ilike('location', `%${location}%`)
    }

    if (minPrice) {
      query = query.gte('price', parseFloat(minPrice))
    }

    if (maxPrice) {
      query = query.lte('price', parseFloat(maxPrice))
    }

    if (bedrooms) {
      query = query.gte('bedrooms', parseInt(bedrooms))
    }

    if (guests) {
      query = query.gte('guests', parseInt(guests))
    }

    const { data: properties, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching properties:', error)
      return NextResponse.json(
        { error: 'Failed to fetch properties' },
        { status: 500 }
      )
    }

    return NextResponse.json({ properties })
  } catch (error) {
    console.error('Properties API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const propertyData = await request.json()

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

    return NextResponse.json({ property })
  } catch (error) {
    console.error('Property creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

