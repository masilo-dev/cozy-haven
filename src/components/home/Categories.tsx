'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Building2, Home, TreePine, Bed } from 'lucide-react'

const categories = [
  {
    id: 'apartments',
    name: 'Apartments',
    description: 'Modern city living',
    icon: <Building2 className="h-8 w-8" />,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    count: 120
  },
  {
    id: 'houses',
    name: 'Houses',
    description: 'Spacious family homes',
    icon: <Home className="h-8 w-8" />,
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
    count: 85
  },
  {
    id: 'villas',
    name: 'Villas',
    description: 'Luxury retreats',
    icon: <TreePine className="h-8 w-8" />,
    image: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg',
    count: 45
  },
  {
    id: 'studios',
    name: 'Studios',
    description: 'Cozy & efficient',
    icon: <Bed className="h-8 w-8" />,
    image: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg',
    count: 67
  }
]

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <p className="text-lg text-gray-600">Find the perfect type of accommodation for your needs</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/properties?category=${category.id}`}
              className="group card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={`${category.image}?auto=compress&cs=tinysrgb&w=400`}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                  <div className="text-gray-700 group-hover:text-red-500 transition-colors">{category.icon}</div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-500 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <p className="text-sm text-gray-500 font-medium">{category.count} properties</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}