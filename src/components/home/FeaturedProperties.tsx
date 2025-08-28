'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Users, Bed, Bath, ArrowRight, Heart } from 'lucide-react'
import { useState } from 'react'

// Mock data - will be replaced with API calls
const featuredProperties = [
  {
    id: '1',
    title: 'Luxury Manchester Apartment',
    location: 'City Centre, Manchester',
    price: 95,
    currency: '£',
    priceType: 'night',
    rating: 4.9,
    reviewCount: 127,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    type: 'SHORT_TERM',
    category: 'APARTMENT'
  },
  {
    id: '2',
    title: 'Historic Edinburgh Townhouse',
    location: 'Old Town, Edinburgh',
    price: 1250,
    currency: '£',
    priceType: 'month',
    rating: 4.8,
    reviewCount: 89,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    images: ['https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg'],
    type: 'LONG_TERM',
    category: 'HOUSE'
  },
  {
    id: '3',
    title: 'Brighton Seaside Villa',
    location: 'Brighton Beach, Brighton',
    price: 180,
    currency: '£',
    priceType: 'night',
    rating: 4.9,
    reviewCount: 156,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    images: ['https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg'],
    type: 'SHORT_TERM',
    category: 'VILLA'
  }
]

export default function FeaturedProperties() {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional rental properties, 
            each offering unique charm and premium amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="group card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
            >
              <div className="relative h-64 overflow-hidden">
                <Link href={`/property/${property.id}`}>
                  <Image
                    src={`${property.images[0]}?auto=compress&cs=tinysrgb&w=600`}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                  />
                </Link>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Featured
                </div>
                
                {/* Rating */}
                <div className="absolute top-3 right-12 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-semibold text-gray-900">{property.rating}</span>
                    <span className="text-xs text-gray-600">({property.reviewCount})</span>
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

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <Link href={`/property/${property.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors cursor-pointer">
                      {property.title}
                    </h3>
                  </Link>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">
                      {property.currency}{property.price}
                    </p>
                    <p className="text-xs text-gray-500">/{property.priceType}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{property.maxGuests} guests</span>
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
                  <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    {property.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/properties"
            className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>View All Properties</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}