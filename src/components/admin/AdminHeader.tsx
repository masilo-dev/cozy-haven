'use client'

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Bell, Settings, LogOut, User, Menu, X } from 'lucide-react'

export default function AdminHeader() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Admin Logo */}
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-red-500" />
            <div>
              <span className="text-xl font-bold text-gray-900">Cozy Haven</span>
              <span className="block text-xs text-red-600 font-medium">Admin Dashboard</span>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-600 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-100 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">New booking received</p>
                      <p className="text-xs text-gray-600">Manchester Apartment - £475</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Payment processed</p>
                      <p className="text-xs text-gray-600">Brighton Villa - £900</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50">
                      <p className="text-sm font-medium text-gray-900">New review posted</p>
                      <p className="text-xs text-gray-600">5 stars - Edinburgh Townhouse</p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-red-600" />
                </div>
                <span className="text-sm font-medium">{user?.name || 'Admin'}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-2">
                    <button
                      onClick={() => router.push('/admin/settings')}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}