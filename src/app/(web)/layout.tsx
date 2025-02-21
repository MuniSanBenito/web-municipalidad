import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { Navbar } from '../../components/navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Municipalidad de San Benito',
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="es" data-theme="sanbenito">
      <body className="p-0">
        <Navbar />
        <main className="container mx-auto mt-35">{children}</main>
      </body>
    </html>
  )
}
