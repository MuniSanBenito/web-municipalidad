'use client'
import type { ErrorResult } from 'payload'
import { useState } from 'react'

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const data: ErrorResult = await response.json()
      if (response.ok) {
        console.log(data)
        // redirect('/')
      } else {
        console.error(data)
      }
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input type="email" id="email" name="email" />
      </label>
      <label>
        Contraseña
        <input type="password" id="password" name="password" />
      </label>
      <button type="submit">Iniciar sesion</button>
    </form>
  )
}
