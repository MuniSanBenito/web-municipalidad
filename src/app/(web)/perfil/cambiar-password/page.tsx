import type { Ciudadano } from '@/payload-types'
import { basePayload } from '@/web/lib/payload'
import { IconArrowLeft } from '@tabler/icons-react'
import { headers as nextHeaders } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CambiarContrasenaForm } from '../../../../web/components/cambiar-contrasena-form'

export default async function CambiarContrasenaPage() {
  const headers = await nextHeaders()
  const { user } = await basePayload.auth({ headers, canSetHeaders: false })

  // Verificaciones simplificadas
  if (!user) redirect('/login')
  if (user.collection !== 'ciudadanos') redirect('/')

  const ciudadano = user as Ciudadano

  return (
    <main className="bg-base-100 min-h-screen">
      <div className="container mx-auto max-w-2xl px-4 py-8 sm:px-6">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/perfil"
            className="btn btn-ghost text-base-content/70 hover:text-base-content gap-2"
          >
            <IconArrowLeft size={16} />
            Volver al Perfil
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="bg-primary text-primary-content mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          <h1 className="text-base-content mb-2 text-3xl font-bold">Cambiar Contraseña</h1>
          <p className="text-base-content/70 text-lg">
            Actualiza tu contraseña para mantener tu cuenta segura
          </p>
        </div>

        {/* Form */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <CambiarContrasenaForm ciudadano={ciudadano} />
          </div>
        </div>
      </div>
    </main>
  )
}
