'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Users, Bed, Bath, Heart } from 'lucide-react'
import { properties } from '../../lib/data'

export default function PropertiesGrid() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [filteredProperties, setFilteredProperties] = useState(properties)

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing {filteredProperties.length} of {properties.length} properties
        </p>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Rating: Highest</option>
          <option>Most Recent</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative h-48 overflow-hidden">
              <Link href={`/property/${property.id}`}>
                <Image
                  src={`${property.images[0]}?auto=compress&cs=tinysrgb&w=600`}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                />
              </Link>
              
              {/* Badges */}
              {property.featured && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Featured
                </div>
              )}
              
              {/* Rating */}
              <div className="absolute top-3 right-12 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg shadow-lg">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-semibold text-gray-900">{property.rating}</span>
                </div>
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(property.id)}
                className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 group/heart"
              >
                <Heart 
                  className={`h-4 w-4 transition-colors duration-200 ${
                    favorites.includes(property.id) 
                      ? 'text-red-500 fill-current' 
                      : 'text-gray-600 group-hover/heart:text-red-500'
                  }`} 
                />
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Link href={`/property/${property.id}`}>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors cursor-pointer line-clamp-1">
                    {property.title}
                  </h3>
                </Link>
                <div className="text-right ml-2">
                  <p className="text-lg font-bold text-gray-900">
                    {property.currency}{property.price}
                  </p>
                  <p className="text-xs text-gray-500">/{property.priceType}</p>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-gray-600 mb-3">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm line-clamp-1">{property.location}</span>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{property.maxGuests}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  property.type === 'SHORT_TERM' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {property.type === 'SHORT_TERM' ? 'Short Stay' : 'Long Stay'}
                </span>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span>{property.rating} ({property.reviewCount})</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
          <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  )
}