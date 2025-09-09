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
  title: 'Municipalidad de San Benito',
}

export default async function Layout({ children }: PropsWithChildren) {
  const headers = await nextHeaders()
  const result = await basePayload.auth({ headers, canSetHeaders: false })

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="San Benito" />
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
        <ThemeProvider>
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
