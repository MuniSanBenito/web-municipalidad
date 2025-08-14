'use client'
import { redirect } from 'next/navigation'
import type { ErrorResult } from 'payload'
import { useState } from 'react'
import { toast } from 'sonner'

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    if (email && password) {
      const response = await fetch('/api/ciudadanos/login', {
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
        toast.success('Inicio de sesión exitoso')
        redirect('/')
      } else {
        console.error(data)
        toast.error('Error al iniciar sesión')
      }
      setIsSubmitting(false)
    }
  }

  return (
    <section className="grid h-full w-full place-items-center">
      <form className="flex w-full max-w-xs flex-col gap-4" onSubmit={handleSubmit}>
        <label className="fieldset">
          <span className="fieldset-legend">Email</span>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
            className="input"
          />
        </label>
        <fieldset>
          <label className="fieldset">
            <span className="fieldset-legend">Contraseña</span>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingrese su contraseña"
              className="input"
            />
          </label>
          <label className="label">
            <input type="checkbox" className="checkbox" />
            Mostrar contraseña
          </label>
        </fieldset>
        <button type="submit" className="btn btn-primary">
          Iniciar sesion
        </button>
      </form>
    </section>
  )
}
