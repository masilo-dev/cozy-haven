'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye
} from 'lucide-react'
import { AuthService } from '@/lib/auth'

interface Booking {
  id: string
  property_id: string
  check_in: string
  check_out: string
  guests: number
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled'
  guest_name: string
  email: string
  phone: string
  created_at: string
  properties: {
    id: string
    title: string
    location: string
    images: string[]
    price: number
    price_type: string
    bedrooms: number
    bathrooms: number
    guests: number
  }
}

export default function CustomerBookings() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      const { user, error: userError } = await AuthService.getCurrentUser()
      
      if (userError || !user) {
        router.push('/auth/login')
        return
      }

      const headers = await AuthService.getAuthHeaders()
      
      const response = await fetch('/api/customer/bookings', {
        headers
      })

      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings || [])
      } else {
        setError('Failed to load bookings')
      }
    } catch (err) {
      setError('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container-responsive py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/customer/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-600">Manage your property reservations</p>
          </div>
        </div>
      </header>

      <main className="container-responsive py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'all', label: 'All Bookings' },
                { key: 'confirmed', label: 'Confirmed' },
                { key: 'pending', label: 'Pending' },
                { key: 'cancelled', label: 'Cancelled' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.key
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.key === 'all' 
                      ? bookings.length 
                      : bookings.filter(b => b.status === tab.key).length
                    }
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(booking.status)}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {booking.properties?.title || 'Property'}
                        </h3>
                        <p className="text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.properties?.location || 'Location'}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Check-in</p>
                        <p className="font-medium">{formatDate(booking.check_in)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Check-out</p>
                        <p className="font-medium">{formatDate(booking.check_out)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Guests</p>
                        <p className="font-medium">{booking.guests} guest{booking.guests !== 1 ? 's' : ''}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-medium text-lg">{formatCurrency(booking.total_price)}</p>
                      </div>
                    </div>
                  </div>

                  {booking.properties && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Property Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Bedrooms:</span> {booking.properties.bedrooms}
                        </div>
                        <div>
                          <span className="font-medium">Bathrooms:</span> {booking.properties.bathrooms}
                        </div>
                        <div>
                          <span className="font-medium">Max Guests:</span> {booking.properties.guests}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Booked on {formatDate(booking.created_at)}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => router.push(`/property/${booking.property_id}`)}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Property</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {filter === 'all' ? 'No bookings yet' : `No ${filter} bookings`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? "You haven't made any bookings yet. Start exploring our properties!"
                : `You don't have any ${filter} bookings at the moment.`
              }
            </p>
            <button
              onClick={() => router.push('/properties')}
              className="btn-primary"
            >
              Browse Properties
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

