import type { PropsWithChildren } from 'react'
import './globals.css'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html>
      <head lang="es"></head>
      <body style={{ border: 'solid', borderWidth: 3, borderColor: 'red', padding: 1 }}>
        {children}
      </body>
    </html>
  )
}
