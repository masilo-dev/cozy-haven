import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: property, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Error fetching property:', error)
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ property })
  } catch (error) {
    console.error('Property API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyData = await request.json()

    const { data: property, error } = await supabase
      .from('properties')
      .update(propertyData)
      .eq('id', params.id)
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
    console.error('Property update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting property:', error)
      return NextResponse.json(
        { error: 'Failed to delete property' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Property deleted successfully' })
  } catch (error) {
    console.error('Property deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

