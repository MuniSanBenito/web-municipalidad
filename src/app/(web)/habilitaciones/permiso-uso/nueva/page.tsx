import { SolicitudPermisoUsoForm } from '@/web/components/solicitud-permiso-uso-form'
import { basePayload } from '@/web/lib/payload'
import { IconArrowLeft, IconLock } from '@tabler/icons-react'
import { headers as nextHeaders } from 'next/headers'
import Link from 'next/link'

export default async function NuevaPermisoUsoPage() {
  const headers = await nextHeaders()
  const { user } = await basePayload.auth({ headers, canSetHeaders: false })

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <IconLock size={48} className="text-base-content/30 mb-4" />
        <h1 className="mb-4 text-2xl font-bold">Acceso Requerido</h1>
        <p className="text-base-content/70 mb-6">
          Debés iniciar sesión para enviar una solicitud.
        </p>
        <Link href="/login" className="btn btn-primary">
          Iniciar Sesión
        </Link>
      </div>
    )
  }

  if (user.collection !== 'ciudadanos') {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <IconLock size={48} className="text-base-content/30 mb-4" />
        <h1 className="mb-4 text-2xl font-bold">Acceso Denegado</h1>
        <p className="text-base-content/70 mb-6">
          Esta sección está disponible únicamente para ciudadanos registrados.
        </p>
        <Link href="/" className="btn btn-secondary">
          Volver al Inicio
        </Link>
      </div>
    )
  }

  return (
    <main className="bg-base-100 min-h-screen">
      <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <Link
            href="/habilitaciones"
            className="text-base-content/60 hover:text-base-content mb-4 flex items-center gap-1 text-sm transition-colors"
          >
            <IconArrowLeft size={16} />
            Volver a Habilitaciones
          </Link>
          <h1 className="text-primary text-3xl font-bold">Solicitud de Permiso de Uso</h1>
          <p className="text-base-content/70 mt-1">
            Paso 1 del circuito — Verificación de aptitud edilicia por Obras Privadas.
          </p>
        </div>

        <SolicitudPermisoUsoForm />
      </div>
    </main>
  )
}
