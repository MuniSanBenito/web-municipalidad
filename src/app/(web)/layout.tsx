import { Navbar } from '@/components/navbar'
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
      <body className="p-0">
        <ThemeProvider themes={['sanbenito', 'sanbenito-dark']}>
          <Navbar />
          <div className="container mx-auto mt-35">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
