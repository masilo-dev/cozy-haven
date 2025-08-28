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

    const { data: { users }, error } = await supabase.auth.admin.listUsers()

    if (error) {
      console.error('Error fetching users:', error)
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      )
    }

    const formattedUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || '',
      phone: user.user_metadata?.phone || '',
      role: user.user_metadata?.role || 'customer',
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at,
      email_confirmed_at: user.email_confirmed_at
    }))

    return NextResponse.json({ users: formattedUsers })
  } catch (error) {
    console.error('Admin users GET error:', error)
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

    const { id, name, phone, role } = await request.json()

    const { data, error } = await supabase.auth.admin.updateUserById(id, {
      user_metadata: {
        name,
        phone,
        role
      }
    })

    if (error) {
      console.error('Error updating user:', error)
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || '',
        phone: data.user.user_metadata?.phone || '',
        role: data.user.user_metadata?.role || 'customer',
        created_at: data.user.created_at,
        last_sign_in_at: data.user.last_sign_in_at
      }
    })
  } catch (error) {
    console.error('Admin users PUT error:', error)
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
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase.auth.admin.deleteUser(id)

    if (error) {
      console.error('Error deleting user:', error)
      return NextResponse.json(
        { error: 'Failed to delete user' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Admin users DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

