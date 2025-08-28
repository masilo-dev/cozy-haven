'use client'

import { Search, MapPin, Calendar, Users } from 'lucide-react'
import { useState } from 'react'

export default function SearchSection() {
  const [location, setLocation] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [guests, setGuests] = useState('1')

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching for:', { location, checkIn, guests })
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Stay</h2>
          <p className="text-lg text-gray-600">Search from our collection of premium properties</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check In</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="input pl-10"
                >
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                  <option value="5">5+ guests</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button 
              onClick={handleSearch}
              className="btn-primary flex items-center space-x-2 w-full md:w-auto"
            >
              <Search className="h-5 w-5" />
              <span>Search Properties</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}