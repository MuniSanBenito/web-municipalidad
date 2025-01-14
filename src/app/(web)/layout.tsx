import type { PropsWithChildren } from 'react'
import './globals.css'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html>
      <head lang="es"></head>
      <body>{children}</body>
    </html>
  )
}
