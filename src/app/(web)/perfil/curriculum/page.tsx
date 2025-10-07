import type { Ciudadano } from '@/payload-types'
import { CurriculumManager } from '@/web/components/curriculum-manager'
import { basePayload } from '@/web/lib/payload'
import { headers as nextHeaders } from 'next/headers'
import Link from 'next/link'

export default async function PerfilCVPage() {
  const headers = await nextHeaders()
  const { user } = await basePayload.auth({ headers, canSetHeaders: false })

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Acceso Requerido</h1>
        <p className="text-base-content/70 mb-6">
          Debes iniciar sesión para gestionar tu currículum.
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

  // Obtener los currículums del ciudadano
  const { docs: curriculums } = await basePayload.find({
    collection: 'curriculums',
    where: {
      ciudadano: {
        equals: ciudadano.id,
      },
    },
    limit: 1,
  })
  const curriculum = curriculums.length > 0 ? curriculums[0] : null

  return (
    <main className="bg-base-100 min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <Link href="/perfil" className="btn btn-ghost btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              Volver al Perfil
            </Link>
          </div>
        </div>

        {/* Curriculum Manager */}
        <CurriculumManager curriculum={curriculum} ciudadano={ciudadano} />
      </div>
    </main>
  )
}
