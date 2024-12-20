import type { ReactNode } from 'react'

export default async function PruebaLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ border: 'solid', borderWidth: 3, borderColor: 'blue', padding: 1 }}>
      {children}
    </div>
  )
}
