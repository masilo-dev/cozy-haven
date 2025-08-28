export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'customer'
  phone?: string
  created_at: string
}

export interface ClientActivity {
  id: string
  clientName: string
  email: string
  action: string
  property?: string
  amount?: string
  timestamp: string
  status: string
  ipAddress: string
  location: string
  paymentMethod?: string
  riskScore: string
}

export interface SuspiciousActivity {
  id: string
  type: string
  client: string
  description: string
  riskLevel: 'low' | 'medium' | 'high'
  timestamp: string
  ipAddress?: string
  location?: string
  status: string
  actions: string[]
}

export interface PaymentHistory {
  id: string
  client: string
  property: string
  amount: string
  method: string
  status: 'pending' | 'completed' | 'failed'
  timestamp: string
  transactionId: string
  fees: string
}

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

