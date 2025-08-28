import { Suspense } from 'react'
import PropertiesGrid from '../../components/properties/PropertiesGrid'
import PropertiesFilters from '../../components/properties/PropertiesFilters'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Properties</h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of premium rental properties across England
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Suspense fallback={<LoadingSpinner />}>
              <PropertiesFilters />
            </Suspense>
          </div>
          
          <div className="lg:col-span-3">
            <Suspense fallback={<LoadingSpinner />}>
              <PropertiesGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}