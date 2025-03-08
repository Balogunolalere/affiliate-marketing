import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/shared/header"
import Footer from "@/components/shared/footer"
import CustomCursor from "@/components/ui/custom-cursor"
import JsonLd from "@/components/shared/json-ld"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  metadataBase: new URL('https://dbaincomeboost.com'),
  title: {
    default: 'Digital BOSS Academy - DBA Income Boost',
    template: '%s | Digital BOSS Academy'
  },
  description: 'Join Digital BOSS Academy\'s premier affiliate marketing platform. Transform your digital presence and boost your income with DBA Income Boost. Expert training and proven strategies for success.',
  keywords: ['Digital BOSS Academy', 'DBA Income Boost', 'affiliate marketing', 'digital marketing', 'online business', 'passive income', 'digital entrepreneurship'],
  authors: [{ name: 'Digital BOSS Academy' }],
  creator: 'Digital BOSS Academy',
  publisher: 'DBA Income Boost',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      }
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      }
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dbaincomeboost.com',
    title: 'Digital BOSS Academy - DBA Income Boost',
    description: 'Join Digital BOSS Academy\'s premier affiliate marketing platform. Transform your digital presence and boost your income with DBA Income Boost.',
    siteName: 'DBA Income Boost',
    images: [
      {
        url: '/logoimage-removebg-preview.png',
        width: 1200,
        height: 630,
        alt: 'Digital BOSS Academy - DBA Income Boost'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital BOSS Academy - DBA Income Boost',
    description: 'Join Digital BOSS Academy\'s premier affiliate marketing platform. Transform your digital presence and boost your income with DBA Income Boost.',
    images: ['/logoimage-removebg-preview.png'],
    creator: '@digitalbossacademy',
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <CustomCursor />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
