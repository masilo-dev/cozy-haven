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

    const { data: properties, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching properties:', error)
      return NextResponse.json(
        { error: 'Failed to fetch properties' },
        { status: 500 }
      )
    }

    return NextResponse.json({ properties })
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

    const { id, ...propertyData } = await request.json()

    const { data: property, error } = await supabase
      .from('properties')
      .update(propertyData)
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

    return NextResponse.json({ message: 'Property deleted successfully' })
  } catch (error) {
    console.error('Admin properties DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

