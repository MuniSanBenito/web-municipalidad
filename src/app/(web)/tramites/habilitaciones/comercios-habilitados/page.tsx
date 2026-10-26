import { basePayload } from '@/web/lib/payload'
import { IconBuildingStore, IconMapPin, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { FiltroRubros } from './FiltroRubros'

type Props = {
  searchParams: Promise<{ rubro?: string }>
}

export default async function ComerciosHabilitadosPage({ searchParams }: Props) {
  const { rubro } = await searchParams

  const hoy = new Date().toISOString()

  const whereBase = {
    or: [
      { fechaBaja: { exists: false } },
      { fechaBaja: { equals: null } },
      { fechaBaja: { greater_than: hoy } },
    ],
  }

  const whereConRubro = rubro
    ? {
        and: [whereBase, { rubro: { equals: rubro } }],
      }
    : whereBase

  const [{ docs: comercios }, { docs: rubros }] = await Promise.all([
    basePayload.find({
      collection: 'comercios-habilitados',
      where: whereConRubro,
      depth: 1,
      sort: 'nombre',
      limit: 200,
    }),
    basePayload.find({
      collection: 'rubros-comercios',
      sort: 'nombre',
      limit: 100,
    }),
  ])

  const rubrosParaFiltro = rubros.map((r) => ({ id: r.id, nombre: r.nombre }))

  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Comercios Habilitados</h1>
            <p className="mt-4 text-base leading-relaxed md:text-lg">
              Consulta el registro de establecimientos comerciales con habilitación vigente en la
              Municipalidad de San Benito.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold">
              Establecimientos{' '}
              <span className="badge badge-primary badge-lg ml-2">{comercios.length}</span>
            </h2>
            <Suspense fallback={<div className="skeleton h-10 w-48" />}>
              <FiltroRubros rubros={rubrosParaFiltro} />
            </Suspense>
          </div>

          {comercios.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <IconSearch size={56} stroke={1.5} className="text-base-content/30" />
              <p className="text-base-content/60 text-lg">
                No se encontraron comercios habilitados
                {rubro ? ' para el rubro seleccionado' : ''}.
              </p>
              {rubro && (
                <Link
                  href="/tramites/habilitaciones/comercios-habilitados"
                  className="btn btn-outline btn-sm"
                >
                  Ver todos los comercios
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {comercios.map((comercio) => {
                const rubroNombre =
                  comercio.rubro && typeof comercio.rubro === 'object'
                    ? (comercio.rubro as { nombre: string }).nombre
                    : null

                // localizacion is [longitude, latitude] (GeoJSON order)
                const [lng, lat] = Array.isArray(comercio.localizacion)
                  ? comercio.localizacion
                  : [null, null]

                const mapsUrl =
                  lat && lng
                    ? `https://www.google.com/maps?q=${lat},${lng}`
                    : `https://www.google.com/maps/search/${encodeURIComponent(comercio.direccion + ', San Benito, Entre Ríos')}`

                return (
                  <div
                    key={comercio.id}
                    className="card bg-base-200 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="card-body gap-3 p-5">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 shrink-0 rounded-lg p-2">
                          <IconBuildingStore size={24} className="text-primary" stroke={1.5} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="card-title text-base leading-tight">{comercio.nombre}</h3>
                          {rubroNombre && (
                            <span className="badge badge-ghost badge-sm mt-1">{rubroNombre}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <IconMapPin
                          size={16}
                          className="text-base-content/50 shrink-0"
                          stroke={1.5}
                        />
                        <span className="text-base-content/70 truncate">{comercio.direccion}</span>
                      </div>

                      <div className="card-actions mt-1 justify-end gap-2">
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost btn-xs gap-1"
                        >
                          <IconMapPin size={14} stroke={1.5} />
                          Ver en mapa
                        </a>
                        <Link
                          href={`/tramites/habilitaciones/comercios-habilitados/${comercio.id}`}
                          className="btn btn-primary btn-xs"
                        >
                          Ver detalle
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">¿No encontrás tu comercio?</h2>
          <p className="text-base-content/70">
            Si tu local tiene habilitación vigente y no aparece en este listado, por favor
            comunicate con el área de Habilitaciones Comerciales.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="https://wa.me/3434537319" target="_blank" className="btn btn-outline btn-sm">
              WhatsApp: 3434537319
            </a>
            <a href="mailto:habilitaciones@munisanbenito.gov.ar" className="btn btn-outline btn-sm">
              habilitaciones@munisanbenito.gov.ar
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
