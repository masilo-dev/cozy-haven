import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>
          
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-500 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}