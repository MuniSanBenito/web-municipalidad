import type { Ciudadano } from '@/payload-types'
import { SolicitudHabilitacionForm } from '@/web/components/solicitud-habilitacion-form'
import { basePayload } from '@/web/lib/payload'
import { IconArrowLeft, IconLock } from '@tabler/icons-react'
import { headers as nextHeaders } from 'next/headers'
import Link from 'next/link'

export default async function NuevaHabilitacionPage() {
  const headers = await nextHeaders()
  const { user } = await basePayload.auth({ headers, canSetHeaders: false })

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <IconLock size={48} className="text-base-content/30 mb-4" />
        <h1 className="mb-4 text-2xl font-bold">Acceso Requerido</h1>
        <p className="text-base-content/70 mb-6">
          Debés iniciar sesión para acceder a este módulo.
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
        <Link href="/" className="btn btn-secondary">
          Volver al Inicio
        </Link>
      </div>
    )
  }

  const ciudadano = user as Ciudadano
  const tieneAcceso =
    Array.isArray(ciudadano.permisos) && ciudadano.permisos.includes('HABILITACIONES')

  if (!tieneAcceso) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <IconLock size={48} className="text-warning mb-4" />
        <h1 className="mb-4 text-2xl font-bold">Módulo no habilitado</h1>
        <p className="text-base-content/70 mb-6">
          Tu cuenta no tiene acceso al módulo de Habilitaciones Comerciales.
        </p>
        <Link href="/habilitaciones" className="btn btn-ghost">
          Volver
        </Link>
      </div>
    )
  }

  const [{ docs: rubros }, { docs: actividades }] = await Promise.all([
    basePayload.find({
      collection: 'rubros-comercios',
      limit: 200,
      sort: 'nombre',
    }),
    basePayload.find({
      collection: 'actividades-comercios',
      limit: 200,
      sort: 'nombre',
    }),
  ])

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
          <h1 className="text-primary text-3xl font-bold">Nueva Solicitud de Habilitación</h1>
          <p className="text-base-content/70 mt-1">
            Paso 2 del circuito — Ya tenés el Permiso de Uso aprobado por Obras Privadas.
          </p>
        </div>

        <SolicitudHabilitacionForm rubros={rubros} actividades={actividades} />
      </div>
    </main>
  )
}
