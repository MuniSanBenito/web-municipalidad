import { RootLayout } from '@/web/components/root-layout'
import { basePayload } from '@/web/lib/payload'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { headers as nextHeaders } from 'next/headers'
import Script from 'next/script'
import type { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Municipalidad de San Benito',
    template: '%s | Municipalidad de San Benito',
  },
  description:
    'Portal oficial de la Municipalidad de San Benito. Trámites en línea, noticias, agenda de eventos y servicios municipales.',
  keywords: [
    'municipalidad',
    'san benito',
    'tramites',
    'gobierno local',
    'servicios municipales',
    'noticias municipales',
    'argentina',
  ],
  authors: [{ name: 'Municipalidad de San Benito' }],
  creator: 'Municipalidad de San Benito',
  publisher: 'Municipalidad de San Benito',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sanbenito.gob.ar'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Municipalidad de San Benito',
    description:
      'Portal oficial de la Municipalidad de San Benito. Trámites en línea, noticias, agenda de eventos y servicios municipales.',
    url: 'https://sanbenito.gob.ar',
    siteName: 'Municipalidad de San Benito',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Municipalidad de San Benito',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Municipalidad de San Benito',
    description:
      'Portal oficial de la Municipalidad de San Benito. Trámites en línea, noticias, agenda de eventos y servicios municipales.',
    images: ['/images/og-image.png'],
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
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default async function Layout({ children }: PropsWithChildren) {
  const headers = await nextHeaders()
  const result = await basePayload.auth({ headers, canSetHeaders: false })

  return (
    <html lang="es" suppressHydrationWarning data-theme="light">
      <head>
        <meta name="apple-mobile-web-app-title" content="San Benito" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta name="theme-color" content="#1e40af" /> */}
        <link rel="apple-touch-icon" href="/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        {process.env.NODE_ENV === 'production' ? (
          <Script
            src="https://umami.sanbenito.gob.ar/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_TRACKING_CODE ?? ''}
            async
            defer
          />
        ) : null}
      </head>
      <body className="drawer scroll-smooth">
        <ThemeProvider defaultTheme="light">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <RootLayout ciudadano={result.user?.collection === 'ciudadanos' ? result.user : null}>
            {children}
          </RootLayout>
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
