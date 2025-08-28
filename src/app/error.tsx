'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h1>
          <p className="text-gray-600 mb-4">
            We're sorry, but something unexpected happened. Please try again.
          </p>
          {error.digest && (
            <p className="text-xs text-gray-500 font-mono bg-gray-100 p-2 rounded">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full justify-center"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors w-full justify-center"
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}