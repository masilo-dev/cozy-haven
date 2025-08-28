'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  User, 
  Calendar, 
  MapPin, 
  Star, 
  CreditCard, 
  Clock,
  Home,
  Settings,
  LogOut,
  Plus,
  Eye
} from 'lucide-react'
import { AuthService } from '@/lib/auth'

interface DashboardData {
  user: {
    id: string
    email: string
    name: string
    phone: string
    created_at: string
  }
  stats: {
    totalBookings: number
    activeBookings: number
    totalSpent: number
    memberSince: string
  }
  recentBookings: any[]
  favoriteProperties: any[]
}

export default function CustomerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const { user: currentUser, error: userError } = await AuthService.getCurrentUser()
      
      if (userError || !currentUser) {
        router.push('/auth/login')
        return
      }

      setUser(currentUser)

      // Get auth headers
      const headers = await AuthService.getAuthHeaders()
      
      const response = await fetch('/api/customer/dashboard', {
        headers
      })

      if (response.ok) {
        const data = await response.json()
        setDashboardData(data)
      } else {
        setError('Failed to load dashboard data')
      }
    } catch (err) {
      setError('Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await AuthService.signOut()
    router.push('/')
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={loadDashboard}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
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
              <Home className="h-8 w-8 text-red-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Customer Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/customer/profile')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container-responsive py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData?.stats.totalBookings || 0}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData?.stats.activeBookings || 0}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardData?.stats.totalSpent || 0)}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Member Since</p>
                <p className="text-lg font-bold text-gray-900">
                  {dashboardData?.stats.memberSince ? formatDate(dashboardData.stats.memberSince) : 'N/A'}
                </p>
              </div>
              <User className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                <button
                  onClick={() => router.push('/customer/bookings')}
                  className="text-red-500 hover:text-red-600 text-sm font-medium"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              {dashboardData?.recentBookings && dashboardData.recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.recentBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {booking.properties?.title || 'Property'}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.properties?.location || 'Location'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {formatCurrency(booking.total_price)}
                        </p>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No bookings yet</p>
                  <button
                    onClick={() => router.push('/properties')}
                    className="btn-primary mt-4"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Book Your First Stay
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Favorite Properties */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recommended Properties</h2>
            </div>
            <div className="p-6">
              {dashboardData?.favoriteProperties && dashboardData.favoriteProperties.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.favoriteProperties.slice(0, 3).map((property) => (
                    <div key={property.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Home className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{property.title}</h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">
                            {property.rating} ({property.review_count} reviews)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          £{property.price}
                          <span className="text-sm text-gray-600">/{property.price_type}</span>
                        </p>
                        <button
                          onClick={() => router.push(`/property/${property.id}`)}
                          className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center mt-1"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Explore our properties</p>
                  <button
                    onClick={() => router.push('/properties')}
                    className="btn-primary mt-4"
                  >
                    Browse Properties
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/properties')}
              className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Plus className="h-6 w-6 text-red-500" />
              <span className="font-medium text-red-700">Book New Property</span>
            </button>
            
            <button
              onClick={() => router.push('/customer/bookings')}
              className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Calendar className="h-6 w-6 text-blue-500" />
              <span className="font-medium text-blue-700">Manage Bookings</span>
            </button>
            
            <button
              onClick={() => router.push('/customer/profile')}
              className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Settings className="h-6 w-6 text-green-500" />
              <span className="font-medium text-green-700">Update Profile</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

