// Mock database - In production, this would come from your database
export const properties = [
  {
    id: '1',
    title: 'Luxury Manchester City Centre Apartment',
    location: 'City Centre, Manchester',
    address: '15 Deansgate, Manchester M3 2BW',
    city: 'Manchester',
    country: 'England',
    price: 95,
    currency: '£',
    priceType: 'night',
    rating: 4.9,
    reviewCount: 127,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Air Conditioning', 'Heating', 'TV', 'Parking', 'Gym'],
    description: 'A beautifully designed modern loft in the heart of Manchester. Perfect for business travelers and couples seeking luxury accommodation with stunning city views. Located minutes from major attractions, shopping, and dining.',
    type: 'SHORT_TERM',
    category: 'APARTMENT',
    available: true,
    featured: true,
    latitude: 53.4808,
    longitude: -2.2426
  },
  {
    id: '2',
    title: 'Historic Edinburgh Old Town Townhouse',
    location: 'Old Town, Edinburgh',
    address: '42 Royal Mile, Edinburgh EH1 1SH',
    city: 'Edinburgh',
    country: 'Scotland',
    price: 1250,
    currency: '£',
    priceType: 'month',
    rating: 4.8,
    reviewCount: 89,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Kitchen', 'Garden', 'Fireplace', 'Parking', 'Pet Friendly', 'Historic Features'],
    description: 'Charming Victorian townhouse combining period features with modern comfort. Perfect for families and groups exploring Edinburgh. Walking distance to Edinburgh Castle and major attractions.',
    type: 'LONG_TERM',
    category: 'HOUSE',
    available: true,
    featured: true,
    latitude: 55.9533,
    longitude: -3.1883
  },
  {
    id: '3',
    title: 'Brighton Seaside Villa with Ocean Views',
    location: 'Brighton Beach, Brighton',
    address: '28 Marine Parade, Brighton BN2 1TL',
    city: 'Brighton',
    country: 'England',
    price: 180,
    currency: '£',
    priceType: 'night',
    rating: 4.9,
    reviewCount: 156,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    images: [
      'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Kitchen', 'Balcony', 'Sea Views', 'Beach Access', 'Parking', 'BBQ Area'],
    description: 'Stunning seaside villa with panoramic ocean views. Perfect for family holidays and group getaways. Direct beach access and walking distance to Brighton Pier and city center.',
    type: 'SHORT_TERM',
    category: 'VILLA',
    available: true,
    featured: true,
    latitude: 50.8225,
    longitude: -0.1372
  },
  {
    id: '4',
    title: 'Executive Penthouse - London Canary Wharf',
    location: 'Canary Wharf, London',
    address: '1 Canada Square, London E14 5AB',
    city: 'London',
    country: 'England',
    price: 2800,
    currency: '£',
    priceType: 'month',
    rating: 4.9,
    reviewCount: 45,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    images: [
      'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2468773/pexels-photo-2468773.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Kitchen', 'Balcony', 'Gym', 'Concierge', 'City Views', 'Parking', '24/7 Security'],
    description: 'Luxury penthouse in London\'s financial district. Sophisticated accommodation for executives and professionals. Premium building with world-class amenities.',
    type: 'LONG_TERM',
    category: 'APARTMENT',
    available: true,
    featured: true,
    latitude: 51.5074,
    longitude: -0.0278
  },
  {
    id: '5',
    title: 'Cozy Birmingham Canal-side Studio',
    location: 'Jewellery Quarter, Birmingham',
    address: '78 Vyse Street, Birmingham B18 6HA',
    city: 'Birmingham',
    country: 'England',
    price: 75,
    currency: '£',
    priceType: 'night',
    rating: 4.6,
    reviewCount: 203,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    images: [
      'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Kitchenette', 'Canal Views', 'Historic Building', 'Central Location'],
    description: 'Cozy studio apartment overlooking Birmingham\'s historic canals. Perfect for solo travelers and romantic getaways. Located in the trendy Jewellery Quarter.',
    type: 'SHORT_TERM',
    category: 'STUDIO',
    available: true,
    featured: false,
    latitude: 52.4862,
    longitude: -1.8904
  },
  {
    id: '6',
    title: 'Leeds City Centre Modern Apartment',
    location: 'City Centre, Leeds',
    address: '12 Wellington Street, Leeds LS1 4JJ',
    city: 'Leeds',
    country: 'England',
    price: 850,
    currency: '£',
    priceType: 'month',
    rating: 4.7,
    reviewCount: 78,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    images: [
      'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Heating', 'City Views', 'Shopping Nearby'],
    description: 'Modern apartment in Leeds city center. Perfect for young professionals and students. Close to universities, shopping, and nightlife.',
    type: 'LONG_TERM',
    category: 'APARTMENT',
    available: true,
    featured: false,
    latitude: 53.8008,
    longitude: -1.5491
  },
  {
    id: '7',
    title: 'Liverpool Waterfront Luxury Suite',
    location: 'Albert Dock, Liverpool',
    address: '5 Albert Dock, Liverpool L3 4AF',
    city: 'Liverpool',
    country: 'England',
    price: 120,
    currency: '£',
    priceType: 'night',
    rating: 4.8,
    reviewCount: 134,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    images: [
      'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Kitchen', 'Waterfront Views', 'Historic Location', 'Museums Nearby'],
    description: 'Luxury suite at Liverpool\'s famous Albert Dock. Stunning waterfront views and walking distance to The Beatles Story and Tate Liverpool.',
    type: 'SHORT_TERM',
    category: 'APARTMENT',
    available: true,
    featured: false,
    latitude: 53.4084,
    longitude: -2.9916
  },
  {
    id: '8',
    title: 'Bath Georgian Townhouse',
    location: 'City Centre, Bath',
    address: '25 Gay Street, Bath BA1 2NT',
    city: 'Bath',
    country: 'England',
    price: 200,
    currency: '£',
    priceType: 'night',
    rating: 4.9,
    reviewCount: 92,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    images: [
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Kitchen', 'Garden', 'Historic Features', 'Roman Baths Nearby', 'Parking'],
    description: 'Beautiful Georgian townhouse in the heart of Bath. UNESCO World Heritage location with period features and modern amenities. Perfect for exploring Bath\'s historic sites.',
    type: 'SHORT_TERM',
    category: 'HOUSE',
    available: true,
    featured: false,
    latitude: 51.3811,
    longitude: -2.3590
  }
]

export const reviews = [
  {
    id: '1',
    propertyId: '1',
    guestName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely stunning apartment! The location is perfect and the amenities exceeded our expectations. Will definitely book again.',
    date: '2024-01-15'
  },
  {
    id: '2',
    propertyId: '1',
    guestName: 'Michael Chen',
    rating: 5,
    comment: 'Great place for a business trip. Very clean, modern, and the WiFi was excellent. Host was very responsive.',
    date: '2024-01-10'
  },
  {
    id: '3',
    propertyId: '2',
    guestName: 'Emma Wilson',
    rating: 5,
    comment: 'The townhouse is beautiful with so much character. Perfect location for exploring Edinburgh. Highly recommend!',
    date: '2024-01-08'
  }
]

export const cities = [
  { name: 'London', count: 45, image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg' },
  { name: 'Manchester', count: 32, image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg' },
  { name: 'Edinburgh', count: 28, image: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg' },
  { name: 'Birmingham', count: 24, image: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg' },
  { name: 'Brighton', count: 18, image: 'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg' },
  { name: 'Leeds', count: 15, image: 'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg' },
  { name: 'Liverpool', count: 12, image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg' },
  { name: 'Bath', count: 8, image: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg' }
]

// Helper functions
export function getPropertyById(id: string) {
  return properties.find(property => property.id === id)
}

export function getPropertiesByCity(city: string) {
  return properties.filter(property => 
    property.city.toLowerCase().includes(city.toLowerCase())
  )
}

export function getFeaturedProperties() {
  return properties.filter(property => property.featured)
}

export function searchProperties(filters: {
  location?: string
  minPrice?: number
  maxPrice?: number
  guests?: number
  type?: string
}) {
  return properties.filter(property => {
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }
    if (filters.minPrice && property.price < filters.minPrice) {
      return false
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false
    }
    if (filters.guests && property.maxGuests < filters.guests) {
      return false
    }
    if (filters.type && property.type !== filters.type) {
      return false
    }
    return true
  })
}

export function getReviewsByPropertyId(propertyId: string) {
  return reviews.filter(review => review.propertyId === propertyId)
}