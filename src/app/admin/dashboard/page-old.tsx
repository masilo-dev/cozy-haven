'use client'

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '../../../components/admin/AdminHeader'
import { 
  Building2, Users, Calendar, DollarSign, Plus, Edit, Trash2, Eye, 
  Settings, LogOut, Home, Star, Activity, AlertTriangle,
  CreditCard, Shield, FileText, Search, Filter
} from 'lucide-react'
import Image from 'next/image'
import { User, ClientActivity, SuspiciousActivity, PaymentHistory } from '../../../types'

interface Property {
  id: string
  title: string
  location: string
  price: number
  priceType: string
  rating: number
  reviewCount: number
  images: string[]
  status: string
  bookings: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [clientActivity, setClientActivity] = useState<ClientActivity[]>([])
  const [suspiciousActivity, setSuspiciousActivity] = useState<SuspiciousActivity[]>([])
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/auth/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'admin') {
      router.push('/dashboard')
      return
    }

    setUser(parsedUser)
    loadAdminData()
  }, [router])

  const loadAdminData = async () => {
    try {
      // Mock data - replace with actual API calls
      setProperties([
        {
          id: '1',
          title: 'Luxury Manchester Apartment',
          location: 'City Centre, Manchester',
          price: 95,
          priceType: 'night',
          rating: 4.9,
          reviewCount: 127,
          images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
          status: 'active',
          bookings: 45
        },
        {
          id: '2',
          title: 'Brighton Seaside Villa',
          location: 'Brighton Beach, Brighton',
          price: 180,
          priceType: 'night',
          rating: 4.9,
          reviewCount: 156,
          images: ['https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg'],
          status: 'active',
          bookings: 32
        },
        {
          id: '3',
          title: 'Historic Edinburgh Townhouse',
          location: 'Old Town, Edinburgh',
          price: 1250,
          priceType: 'month',
          rating: 4.8,
          reviewCount: 89,
          images: ['https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg'],
          status: 'inactive',
          bookings: 12
        }
      ])

      // Mock client activity data
      setClientActivity([
        {
          id: '1',
          clientName: 'John Smith',
          email: 'john@example.com',
          action: 'Property Booking',
          property: 'Manchester Apartment',
          amount: '£475',
          timestamp: '2024-01-20 14:30',
          status: 'completed',
          ipAddress: '192.168.1.100',
          location: 'London, UK',
          paymentMethod: 'Credit Card',
          riskScore: 'low'
        },
        {
          id: '2',
          clientName: 'Sarah Johnson',
          email: 'sarah@example.com',
          action: 'Account Login',
          property: '-',
          amount: '-',
          timestamp: '2024-01-20 13:15',
          status: 'success',
          ipAddress: '10.0.0.50',
          location: 'Manchester, UK',
          paymentMethod: '-',
          riskScore: 'low'
        },
        {
          id: '3',
          clientName: 'Mike Wilson',
          email: 'mike@example.com',
          action: 'Failed Payment',
          property: 'Brighton Villa',
          amount: '£900',
          timestamp: '2024-01-20 12:45',
          status: 'failed',
          ipAddress: '203.0.113.0',
          location: 'Unknown',
          paymentMethod: 'Credit Card',
          riskScore: 'high'
        }
      ])

      // Mock suspicious activity
      setSuspiciousActivity([
        {
          id: '1',
          type: 'Multiple Failed Payments',
          client: 'Mike Wilson (mike@example.com)',
          description: '5 failed payment attempts in 10 minutes',
          riskLevel: 'high',
          timestamp: '2024-01-20 12:45',
          status: 'investigating',
          actions: ['Block Account', 'Contact Client', 'Review Manually']
        },
        {
          id: '2',
          type: 'Unusual Location Login',
          client: 'Emma Davis (emma@example.com)',
          description: 'Login from Nigeria while previous login was from UK',
          riskLevel: 'medium',
          timestamp: '2024-01-20 11:20',
          status: 'pending',
          actions: ['Verify Identity', 'Send Security Alert', 'Temporary Suspend']
        },
        {
          id: '3',
          type: 'Large Transaction',
          client: 'Robert Brown (robert@example.com)',
          description: 'Booking worth £2,800 - 400% above average',
          riskLevel: 'medium',
          timestamp: '2024-01-20 10:15',
          status: 'resolved',
          actions: ['Verified', 'Approved']
        }
      ])

      // Mock payment history
      setPaymentHistory([
        {
          id: '1',
          client: 'John Smith',
          property: 'Manchester Apartment',
          amount: '£475.00',
          method: 'Visa **** 1234',
          status: 'completed',
          timestamp: '2024-01-20 14:30',
          transactionId: 'TXN-001234567',
          fees: '£14.25'
        },
        {
          id: '2',
          client: 'Sarah Johnson',
          property: 'Edinburgh Townhouse',
          amount: '£1,250.00',
          method: 'PayPal',
          status: 'completed',
          timestamp: '2024-01-20 13:15',
          transactionId: 'TXN-001234568',
          fees: '£37.50'
        },
        {
          id: '3',
          client: 'Mike Wilson',
          property: 'Brighton Villa',
          amount: '£900.00',
          method: 'Mastercard **** 5678',
          status: 'failed',
          timestamp: '2024-01-20 12:45',
          transactionId: 'TXN-001234569',
          fees: '£0.00'
        }
      ])
    } catch (error) {
      console.error('Error loading admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleDeleteProperty = (propertyId: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(p => p.id !== propertyId))
    }
  }

  const handleToggleStatus = (propertyId: string) => {
    setProperties(properties.map(p => 
      p.id === propertyId 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <>
      <AdminHeader />
      <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your properties and bookings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-red-600">Administrator</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'overview' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Activity className="h-5 w-5" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('properties')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'properties' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span>Properties</span>
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'bookings' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Bookings</span>
                </button>
                <button
                  onClick={() => setActiveTab('customers')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'customers' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Users className="h-5 w-5" />
                  <span>Customers</span>
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'payments' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Payments</span>
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'security' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Shield className="h-5 w-5" />
                  <span>Security & Monitoring</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'settings' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
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
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Properties</p>
                        <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
                      </div>
                      <Home className="h-8 w-8 text-red-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Bookings</p>
                        <p className="text-2xl font-bold text-gray-900">89</p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">£12,450</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Avg Rating</p>
                        <p className="text-2xl font-bold text-gray-900">4.8</p>
                      </div>
                      <Star className="h-8 w-8 text-yellow-500" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-sm text-gray-700">New booking for Manchester Apartment - £475</p>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-sm text-gray-700">Property review received - 5 stars</p>
                      <span className="text-xs text-gray-500">4 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <p className="text-sm text-gray-700">Payment processed for Brighton Villa</p>
                      <span className="text-xs text-gray-500">6 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'properties' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Properties</h2>
                  <button
                    onClick={() => router.push('/admin/properties/new')}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Property</span>
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Property
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rating
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bookings
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {properties.map((property) => (
                          <tr key={property.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                  <Image
                                    src={`${property.images[0]}?auto=compress&cs=tinysrgb&w=100`}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                  <div className="text-sm text-gray-500">{property.location}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">£{property.price}/{property.priceType}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="ml-1 text-sm text-gray-900">{property.rating}</span>
                                <span className="ml-1 text-sm text-gray-500">({property.reviewCount})</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {property.bookings}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleToggleStatus(property.id)}
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  property.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {property.status}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => router.push(`/property/${property.id}`)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => router.push(`/admin/properties/edit?id=${property.id}`)}
                                  className="text-yellow-600 hover:text-yellow-900"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProperty(property.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
                
                {/* Client Activity Monitoring */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Client Activity Log</h3>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search activities..."
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Filter className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {clientActivity.map((activity) => (
                          <tr key={activity.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div>
                                <div className="font-medium text-gray-900">{activity.clientName}</div>
                                <div className="text-sm text-gray-500">{activity.email}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                                activity.status === 'failed' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {activity.action}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{activity.property}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{activity.amount}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{activity.location}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                activity.riskScore === 'low' ? 'bg-green-100 text-green-800' :
                                activity.riskScore === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {activity.riskScore}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">{activity.timestamp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
                
                {/* Payment Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">£24,750</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Successful Payments</p>
                        <p className="text-2xl font-bold text-gray-900">156</p>
                      </div>
                      <CreditCard className="h-8 w-8 text-blue-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Failed Payments</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Processing Fees</p>
                        <p className="text-2xl font-bold text-gray-900">£742.50</p>
                      </div>
                      <FileText className="h-8 w-8 text-purple-500" />
                    </div>
                  </div>
                </div>

                {/* Payment History */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment History</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fees</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {paymentHistory.map((payment) => (
                          <tr key={payment.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{payment.client}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{payment.property}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900">{payment.amount}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{payment.method}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{payment.fees}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{payment.timestamp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Security & Monitoring</h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Real-time monitoring active</span>
                  </div>
                </div>

                {/* Suspicious Activity Alerts */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Suspicious Activity Alerts</h3>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      {suspiciousActivity.filter(a => a.status !== 'resolved').length} Active
                    </span>
                  </div>

                  <div className="space-y-4">
                    {suspiciousActivity.map((alert) => (
                      <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                        alert.riskLevel === 'high' ? 'border-red-500 bg-red-50' :
                        alert.riskLevel === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                        'border-green-500 bg-green-50'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <AlertTriangle className={`h-5 w-5 ${
                                alert.riskLevel === 'high' ? 'text-red-500' :
                                alert.riskLevel === 'medium' ? 'text-yellow-500' :
                                'text-green-500'
                              }`} />
                              <h4 className="font-semibold text-gray-900">{alert.type}</h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                alert.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                                alert.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {alert.riskLevel} risk
                              </span>
                            </div>
                            <p className="text-gray-700 mb-2">{alert.description}</p>
                            <div className="text-sm text-gray-600 mb-3">
                              <span className="font-medium">Client:</span> {alert.client} | 
                              <span className="font-medium"> Time:</span> {alert.timestamp}
                            </div>
                            <div className="flex items-center space-x-2">
                              {alert.actions.map((action, index) => (
                                <button
                                  key={index}
                                  className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                                >
                                  {action}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="ml-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              alert.status === 'resolved' ? 'bg-green-100 text-green-800' :
                              alert.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {alert.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Real-time Fraud Detection</h4>
                        <p className="text-sm text-gray-600">Monitor transactions for suspicious patterns</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-green-600 font-medium">Active</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">IP Geolocation Tracking</h4>
                        <p className="text-sm text-gray-600">Track unusual login locations</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-green-600 font-medium">Active</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Payment Velocity Limits</h4>
                        <p className="text-sm text-gray-600">Limit rapid successive payments</p>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-green-600 font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Admin Settings</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        defaultValue="Cozy Haven Holdings"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                      <input
                        type="email"
                        defaultValue="admin@cozyhaven.co.uk"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue="+44 161 123 4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Save Settings
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
    </>
  )
}