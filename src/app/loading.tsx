import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Loading your content...</p>
      </div>
    </div>
  )
}