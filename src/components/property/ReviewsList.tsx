'use client'

'use client'

import { Star, User } from 'lucide-react'

interface Review {
  id: string
  guestName: string
  rating: number
  comment: string
  date: string
}

interface ReviewsListProps {
  reviews: Review[]
  rating: number
  reviewCount: number
}

export default function ReviewsList({ reviews, rating, reviewCount }: ReviewsListProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="font-semibold text-lg">{rating}</span>
          </div>
          <span className="text-gray-600">({reviewCount} reviews)</span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600">No reviews yet. Be the first to leave a review!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{review.guestName}</h4>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}