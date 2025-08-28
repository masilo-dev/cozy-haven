'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, MapPin, Play } from 'lucide-react'
import { useState } from 'react'

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const stats = [
    { value: '500+', label: 'Premium Properties' },
    { value: '4.9', label: 'Average Rating', icon: Star },
    { value: '50+', label: 'Cities Covered' }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with optimized loading */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
          alt="Luxury property interior showcasing modern design and comfort"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white container-responsive py-20">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
            Find Your Perfect
            <br />
            Rental
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed text-pretty">
            Discover exceptional properties across England for short-term stays and long-term living.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
          <Link
            href="/properties"
            className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Browse all available properties"
          >
            <span>Explore Properties</span>
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          
          <button
            onClick={() => setIsVideoPlaying(true)}
            className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Watch property tour video"
          >
            <Play className="h-5 w-5" aria-hidden="true" />
            <span>Watch Tour</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-colors duration-300"
            >
              <div className="flex items-center justify-center space-x-1 mb-2">
                {stat.icon && <stat.icon className="h-6 w-6 text-yellow-400 fill-current" aria-hidden="true" />}
                <span className="text-3xl md:text-4xl font-bold">{stat.value}</span>
              </div>
              <div className="text-gray-300 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 hidden lg:block animate-bounce" aria-hidden="true">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <MapPin className="h-6 w-6 text-white" />
          </div>
        </div>
        
        <div className="absolute bottom-20 right-10 hidden lg:block animate-pulse" aria-hidden="true">
          <div className="bg-red-500/20 backdrop-blur-sm p-3 rounded-full">
            <Star className="h-6 w-6 text-red-400" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* Video Modal (if needed) */}
      {isVideoPlaying && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoPlaying(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Property tour video"
        >
          <div className="relative max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2 focus:outline-none focus:ring-2 focus:ring-white rounded"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Video content would go here */}
            <div className="flex items-center justify-center h-full text-white">
              <p>Video player would be implemented here</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}