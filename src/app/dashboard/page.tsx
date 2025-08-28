'use client'

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Calendar, Heart, CreditCard, Settings, LogOut, Home, Star, MapPin } from 'lucide-react'
import Image from 'next/image'

interface Booking {
  id: string
  property: {
    title: string
    location: string
    images: string[]
  }
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: string
}

export default function CustomerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('bookings')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/auth/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role === 'admin') {
      router.push('/admin/dashboard')
      return
    }

    setUser(parsedUser)
    loadUserData()
  }, [router])

  const loadUserData = async () => {
    try {
      // Mock data - replace with actual API calls
      setBookings([
        {
          id: '1',
          property: {
            title: 'Luxury Manchester Apartment',
            location: 'City Centre, Manchester',
            images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg']
          },
          checkIn: '2024-02-15',
          checkOut: '2024-02-20',
          guests: 2,
          totalPrice: 475,
          status: 'confirmed'
        },
        {
          id: '2',
          property: {
            title: 'Brighton Seaside Villa',
            location: 'Brighton Beach, Brighton',
            images: ['https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg']
          },
          checkIn: '2024-03-10',
          checkOut: '2024-03-15',
          guests: 4,
          totalPrice: 900,
          status: 'pending'
        }
      ])

      setFavorites([
        {
          id: '3',
          title: 'Historic Edinburgh Townhouse',
          location: 'Old Town, Edinburgh',
          price: 1250,
          priceType: 'month',
          rating: 4.8,
          images: ['https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg']
        }
      ])
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Manage your bookings and account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'bookings' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="h-5 w-5" />
                  <span>My Bookings</span>
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'favorites' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'payments' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Methods</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'settings' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Account Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
                
                {bookings.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-600 mb-6">Start exploring our amazing properties!</p>
                    <button
                      onClick={() => router.push('/properties')}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Browse Properties
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start space-x-4">
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={`${booking.property.images[0]}?auto=compress&cs=tinysrgb&w=200`}
                              alt={booking.property.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{booking.property.title}</h3>
                                <div className="flex items-center space-x-1 text-gray-600 mt-1">
                                  <MapPin className="h-4 w-4" />
                                  <span className="text-sm">{booking.property.location}</span>
                                </div>
                                <div className="mt-2 text-sm text-gray-600">
                                  <p>{booking.checkIn} - {booking.checkOut}</p>
                                  <p>{booking.guests} guests</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">£{booking.totalPrice}</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                  booking.status === 'confirmed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {booking.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Favorite Properties</h2>
                
                {favorites.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
                    <p className="text-gray-600 mb-6">Save properties you love for easy access later!</p>
                    <button
                      onClick={() => router.push('/properties')}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Browse Properties
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favorites.map((property) => (
                      <div key={property.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={`${property.images[0]}?auto=compress&cs=tinysrgb&w=400`}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
                          <div className="flex items-center space-x-1 text-gray-600 mb-2">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{property.rating}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">£{property.price}</p>
                              <p className="text-xs text-gray-500">/{property.priceType}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <p className="text-gray-600">No payment methods saved yet.</p>
                  <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Add Payment Method
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}