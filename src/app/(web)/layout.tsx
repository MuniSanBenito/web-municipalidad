import type { PropsWithChildren } from 'react'
import Navbar from '../../components/navbar'
import './globals.css'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="es" data-theme="sanbenito">
      <head>
        <title>Municipalidad de San Benito</title>
      </head>
      <body className="p-0">
        <Navbar />
        <main className="container mx-auto mt-28">{children}</main>
      </body>
    </html>
  )
}
