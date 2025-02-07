'use client'

import { redirect } from 'next/navigation'

export default function LoginPage() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
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
      const data = await response.json()
      console.log(data)
      redirect('/')
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
