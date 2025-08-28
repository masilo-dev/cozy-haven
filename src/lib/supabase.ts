import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://lvvfgsxgrblbgrzlbsah.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dmZnc3hncmJsYmdyemxic2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMzE5ODAsImV4cCI6MjA2OTkwNzk4MH0.DmwQu0XkPfr-4KaGx1aVRYl2rE-_DOxgGE4eJ3cVurc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Property {
  id: string
  title: string
  location: string
  price: number
  price_type: 'night' | 'month'
  bedrooms: number
  bathrooms: number
  guests: number
  rating: number
  review_count: number
  images: string[]
  amenities: string[]
  description: string
  available: boolean
  featured: boolean
  type: 'short-term' | 'long-term'
  airbnb_listing_id?: string
  latitude?: number
  longitude?: number
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  property_id: string
  user_id: string
  guest_name: string
  email: string
  phone: string
  check_in: string
  check_out: string
  guests: number
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface UserSession {
  id: string
  user_id: string
  session_data: Record<string, any>
  last_activity: string
  created_at: string
}

