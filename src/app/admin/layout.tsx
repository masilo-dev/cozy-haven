import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard - Cozy Haven Holdings',
  description: 'Administrative interface for property management',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* No Header component - admin has its own navigation */}
        {children}
      </body>
    </html>
  )
}