import { Suspense } from 'react'
import { Metadata } from 'next'
import Hero from '../components/home/Hero'
import FeaturedProperties from '../components/home/FeaturedProperties'
import Categories from '../components/home/Categories'
import SearchSection from '../components/home/SearchSection'
import LoadingSpinner from '../components/ui/LoadingSpinner'

export const metadata: Metadata = {
  title: 'Premium Property Rentals Across England',
  description: 'Discover exceptional rental properties across England. From luxury London apartments to charming countryside homes. Short-term and long-term rentals available.',
  openGraph: {
    title: 'Premium Property Rentals Across England | Cozy Haven Holdings',
    description: 'Discover exceptional rental properties across England. From luxury London apartments to charming countryside homes.',
    images: ['/og-home.jpg'],
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      
      <SearchSection />
      
      <Suspense fallback={<LoadingSpinner aria-label="Loading property categories" />}>
        <Categories />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner aria-label="Loading featured properties" />}>
        <FeaturedProperties />
      </Suspense>
    </>
  )
}