import { RootLayout } from '@/web/components/root-layout'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import type { PropsWithChildren } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Municipalidad de San Benito',
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="San Benito" />
      </head>
      <body className="drawer scroll-smooth">
        <ThemeProvider>
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <RootLayout>{children}</RootLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
