import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  
  // Get session from cookies
  const token = request.cookies.get('sb-access-token')?.value
  const refreshToken = request.cookies.get('sb-refresh-token')?.value
  
  let session = null
  
  if (token) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lvvfgsxgrblbgrzlbsah.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dmZnc3hncmJsYmdyemxic2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMzE5ODAsImV4cCI6MjA2OTkwNzk4MH0.DmwQu0XkPfr-4KaGx1aVRYl2rE-_DOxgGE4eJ3cVurc'
      )
      
      const { data: { user } } = await supabase.auth.getUser(token)
      if (user) {
        session = { user }
      }
    } catch (error) {
      console.error('Auth error:', error)
    }
  }

  const { pathname } = request.nextUrl

  // Admin routes protection
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // Check if user is admin
    const userRole = session.user?.user_metadata?.role
    const isAdmin = userRole === 'admin' || session.user?.email === 'admin@cozyhaven.co.uk'
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/customer/dashboard', request.url))
    }
  }

  // Customer dashboard protection
  if (pathname.startsWith('/customer')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // API routes protection
  if (pathname.startsWith('/api/admin')) {
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userRole = session.user?.user_metadata?.role
    const isAdmin = userRole === 'admin' || session.user?.email === 'admin@cozyhaven.co.uk'
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  if (pathname.startsWith('/api/customer')) {
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith('/auth/') && session) {
    const userRole = session.user?.user_metadata?.role
    const isAdmin = userRole === 'admin' || session.user?.email === 'admin@cozyhaven.co.uk'
    
    if (isAdmin) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    } else {
      return NextResponse.redirect(new URL('/customer/dashboard', request.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/customer/:path*',
    '/api/admin/:path*',
    '/api/customer/:path*',
    '/auth/:path*'
  ]
}

