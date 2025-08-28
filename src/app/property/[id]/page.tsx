import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Star, MapPin, Users, Bed, Bath, Wifi, Car, Utensils, Tv, Wind, Dumbbell, Shield, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getPropertyById, getReviewsByPropertyId } from '../../../lib/data'
import BookingForm from '../../../components/property/BookingForm'
import ReviewsList from '../../../components/property/ReviewsList'

interface PropertyPageProps {
  params: {
    id: string
  }
}

const amenityIcons: { [key: string]: any } = {
  'WiFi': Wifi,
  'Kitchen': Utensils,
  'TV': Tv,
  'Parking': Car,
  'Air Conditioning': Wind,
  'Gym': Dumbbell,
  '24/7 Security': Shield,
  'Heating': Wind,
  'Washer': Wind
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = getPropertyById(params.id)
  const reviews = getReviewsByPropertyId(params.id)

  if (!property) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link 
          href="/properties"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Properties</span>
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-96">
          <div className="md:col-span-1 lg:col-span-2 relative rounded-xl overflow-hidden">
            <Image
              src={`${property.images[0]}?auto=compress&cs=tinysrgb&w=800`}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {property.images.slice(1, 3).map((image, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden h-full">
                <Image
                  src={`${image}?auto=compress&cs=tinysrgb&w=400`}
                  alt={`${property.title} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {property.images.slice(3, 5).map((image, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden h-full">
                <Image
                  src={`${image}?auto=compress&cs=tinysrgb&w=400`}
                  alt={`${property.title} - Image ${index + 4}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{property.rating}</span>
                  <span className="text-gray-600">({property.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-gray-600 mb-6">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{property.maxGuests} guests</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms} bathrooms</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity] || Wifi
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <IconComponent className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Reviews */}
            <ReviewsList reviews={reviews} rating={property.rating} reviewCount={property.reviewCount} />
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingForm property={property} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}