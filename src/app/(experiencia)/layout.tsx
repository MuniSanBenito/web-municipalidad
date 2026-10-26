import type { Metadata, Viewport } from 'next'
import type { PropsWithChildren } from 'react'
import '../(web)/globals.css'

export const metadata: Metadata = {
  title: 'Imaginemos juntos nuestro barrio',
  description: 'Experiencia interactiva de participación ciudadana de San Benito',
  robots: { index: false, follow: false },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Participación San Benito',
  },
}

export const viewport: Viewport = {
  themeColor: '#10b981',
}

export default function ExperienciaLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es" suppressHydrationWarning data-theme="warm">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="scroll-smooth">
        <div className="flex min-h-[100dvh] w-full flex-col overflow-y-auto bg-base-100">{children}</div>
      </body>
    </html>
  )
}
