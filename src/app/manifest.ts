import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cozy Haven Holdings - Premium Property Rentals',
    short_name: 'Cozy Haven',
    description: 'Premium property rentals across England - London, Manchester, Birmingham, Edinburgh',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ef4444',
    orientation: 'portrait-primary',
    categories: ['travel', 'lifestyle', 'business'],
    lang: 'en-GB',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png'
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '750x1334',
        type: 'image/png'
      }
    ]
  }
}