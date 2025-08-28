'use client'

import { useState } from 'react'
import { Search, MapPin, Home, Building2, TreePine, Bed } from 'lucide-react'

export default function PropertiesFilters() {
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    type: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    guests: ''
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      city: '',
      type: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      guests: ''
    })
  }

  const cities = ['London', 'Manchester', 'Edinburgh', 'Birmingham', 'Brighton', 'Leeds', 'Liverpool', 'Bath']
  const categories = [
    { id: 'APARTMENT', name: 'Apartments', icon: Building2 },
    { id: 'HOUSE', name: 'Houses', icon: Home },
    { id: 'VILLA', name: 'Villas', icon: TreePine },
    { id: 'STUDIO', name: 'Studios', icon: Bed }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        <button 
          onClick={clearFilters}
          className="text-sm text-red-500 hover:text-red-600 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Rental Type</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value=""
                checked={filters.type === ''}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="text-red-500 focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-700">All Types</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="SHORT_TERM"
                checked={filters.type === 'SHORT_TERM'}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="text-red-500 focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-700">Short-term</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="LONG_TERM"
                checked={filters.type === 'LONG_TERM'}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="text-red-500 focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-700">Long-term</span>
            </label>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Property Category</label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(category => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => handleFilterChange('category', 
                    filters.category === category.id ? '' : category.id
                  )}
                  className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                    filters.category === category.id
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  <IconComponent className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-xs font-medium">{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (£)</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
          <select
            value={filters.bedrooms}
            onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Any</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
          <select
            value={filters.guests}
            onChange={(e) => handleFilterChange('guests', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Any</option>
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="4">4 Guests</option>
            <option value="6">6+ Guests</option>
          </select>
        </div>

        {/* Apply Filters Button */}
        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
          Apply Filters
        </button>
      </div>
    </div>
  )
}