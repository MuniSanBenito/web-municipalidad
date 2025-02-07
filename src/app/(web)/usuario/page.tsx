'use client'
import { useEffect, useState } from 'react'

export default function UsuarioPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const response = await fetch('/api/users/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      console.log(data)
      setIsLoading(false)
    })()
  }, [])

  if (isLoading) {
    return <div>cargando...</div>
  }

  return <>Check</>
}
