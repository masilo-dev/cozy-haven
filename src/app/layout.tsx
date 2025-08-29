import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { AuthProvider } from '@/lib/auth-context'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://cozyhaven.co.uk'),
  title: {
    default: 'Cozy Haven Holdings - Premium Property Rentals Across England',
    template: '%s | Cozy Haven Holdings'
  },
  description: 'Premium property rentals across England - London, Manchester, Birmingham, Edinburgh. Short-term Airbnb & long-term lettings with exceptional service.',
  keywords: [
    'property rental England',
    'luxury accommodation UK',
    'short term rental London',
    'long term lettings Manchester',
    'holiday rentals England',
    'serviced apartments UK',
    'corporate housing England',
    'vacation rentals Britain'
  ],
  authors: [{ name: 'Cozy Haven Holdings' }],
  creator: 'Cozy Haven Holdings',
  publisher: 'Cozy Haven Holdings',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://cozyhaven.co.uk',
    siteName: 'Cozy Haven Holdings',
    title: 'Cozy Haven Holdings - Premium Property Rentals Across England',
    description: 'Premium property rentals across England - London, Manchester, Birmingham, Edinburgh. Short-term Airbnb & long-term lettings with exceptional service.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cozy Haven Holdings - Premium Property Rentals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cozy Haven Holdings - Premium Property Rentals Across England',
    description: 'Premium property rentals across England - London, Manchester, Birmingham, Edinburgh.',
    images: ['/og-image.jpg'],
    creator: '@cozyhaven',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://cozyhaven.co.uk',
    languages: {
      'en-GB': 'https://cozyhaven.co.uk',
      'en-US': 'https://cozyhaven.co.uk/us',
    },
  },
  category: 'travel',
}

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cozy Haven Holdings',
  url: 'https://cozyhaven.co.uk',
  logo: 'https://cozyhaven.co.uk/logo.png',
  description: 'Premium property rentals across England',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Deansgate',
    addressLocality: 'Manchester',
    postalCode: 'M3 2BW',
    addressCountry: 'GB',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+44-161-123-4567',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.facebook.com/cozyhaven',
    'https://www.twitter.com/cozyhaven',
    'https://www.instagram.com/cozyhaven',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-red-500 text-white px-4 py-2 rounded-lg z-50"
          >
            Skip to main content
          </a>
          <Suspense fallback={<LoadingSpinner />}>
            <Header />
          </Suspense>
          <main id="main-content" role="main">
            {children}
          </main>
          <noscript>
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              This website requires JavaScript to function properly. Please enable JavaScript in your browser.
            </div>
          </noscript>
        </AuthProvider>
      </body>
    </html>
  )
}