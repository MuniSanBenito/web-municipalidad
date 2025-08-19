import PageTitle from '@/web/components/ui/PageTitle'
import { basePayload } from '@/web/lib/payload'
import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'

interface Licitacion {
  id: string
  titulo: string
  descripcion: string
  fecha: string
  estado: 'en_proceso' | 'adjudicada' | 'cancelada'
}

type Props = {
  searchParams: Promise<{ [key: string]: string }>
}

export default async function PageLicitaciones({ searchParams }: Props) {
  const { docs: licitaciones } = await basePayload.find({
    collection: 'licitaciones',
    limit: 10,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/transparencia/contabilidad"
        className="btn btn-link text-primary mb-4 pl-0 hover:no-underline"
      >
        <IconArrowLeft size={18} />
        Volver a Contabilidad
      </Link>
      <PageTitle title="Licitaciones" />

      <div className="mb-12 text-center">
        <p className="text-base-content/80 mx-auto max-w-3xl text-lg">
          En esta sección encontrará información sobre las licitaciones públicas realizadas por el
          municipio, incluyendo pliegos, condiciones y resultados.
        </p>
      </div>

      {licitaciones.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {licitaciones.map((licitacion) => (
            <Link
              href={`/transparencia/contabilidad/licitaciones/${licitacion.id}`}
              key={licitacion.id}
              className="card bg-base-100 border-base-300 border shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="card-body">
                <h3 className="card-title mb-2 text-xl">{licitacion.titulo}</h3>
                <div className="text-base-content/70 flex items-center justify-between text-sm">
                  <span>Fecha: {new Date(licitacion.fecha).toLocaleDateString()}</span>
                  <span
                    className={`badge ${
                      licitacion.estado === 'en_proceso'
                        ? 'badge-info'
                        : licitacion.estado === 'adjudicada'
                          ? 'badge-success'
                          : 'badge-error'
                    }`}
                  >
                    {licitacion.estado === 'en_proceso'
                      ? 'En proceso'
                      : licitacion.estado === 'adjudicada'
                        ? 'Adjudicada'
                        : 'Cancelada'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <p className="text-base-content/80">No hay licitaciones publicadas en este momento.</p>
        </div>
      )}
    </div>
  )
}
