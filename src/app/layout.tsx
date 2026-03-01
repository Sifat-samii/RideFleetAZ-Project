import './globals.css'
import { ReactNode } from 'react'
import { Inter, Sora } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body'
})

const headingFont = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading'
})

export const metadata = {
  title: 'RideFleetAZ — Vehicle rentals for gig drivers',
  description: 'Weekly rentals, unlimited miles, no credit check. Fast approvals for rideshare & delivery drivers.'
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "RideFleetAZ",
  "description": "Weekly vehicle rentals for rideshare and delivery drivers. No credit check, maintenance included.",
  "telephone": "(555) 555-0101",
  "email": "hello@ridefleetaz.com",
  "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Phoenix",
    "addressRegion": "AZ",
    "addressCountry": "US"
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <script id="ld+json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  )
}
