import type { Ciudadano } from '@/payload-types'
import { EditarPerfilForm } from '@/web/components/editar-perfil-form'
import { basePayload } from '@/web/lib/payload'
import { IconArrowLeft } from '@tabler/icons-react'
import type { Metadata } from 'next'
import { headers as nextHeaders } from 'next/headers'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Editar Perfil - San Benito',
  description: 'Edita la información de tu perfil de ciudadano',
}

export default async function EditarPerfilPage() {
  const headers = await nextHeaders()
  const { user } = await basePayload.auth({ headers, canSetHeaders: false })

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Acceso Requerido</h1>
        <p className="text-base-content/70 mb-6">Debes iniciar sesión para editar tu perfil.</p>
        <Link href="/login" className="btn btn-primary">
          Iniciar Sesión
        </Link>
      </div>
    )
  }

  if (user.collection !== 'ciudadanos') {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Acceso Denegado</h1>
        <p className="text-base-content/70 mb-6">
          Esta página está disponible solo para ciudadanos registrados.
        </p>
        <Link href="/" className="btn btn-secondary">
          Volver al Inicio
        </Link>
      </div>
    )
  }

  const ciudadano = user as Ciudadano

  return (
    <main className="bg-base-100 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <Link href="/perfil" className="btn btn-ghost btn-sm gap-2">
              <IconArrowLeft size={16} />
              Volver al Perfil
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <EditarPerfilForm ciudadano={ciudadano} />
          </div>
        </div>
      </div>
    </main>
  )
}
