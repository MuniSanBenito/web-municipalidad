import { CertificadoHabilitacion } from '@/web/components/certificado-habilitacion'
import { basePayload } from '@/web/lib/payload'
import { IconBuildingStore, IconCalendar, IconCertificate, IconHash, IconMapPin, IconTag } from '@tabler/icons-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export default async function DetalleComercioPage({ params }: Props) {
  const { id } = await params

  const comercio = await basePayload.findByID({
    collection: 'comercios-habilitados',
    id,
    depth: 2,
  })

  if (!comercio) return notFound()

  const rubroNombre =
    comercio.rubro && typeof comercio.rubro === 'object'
      ? (comercio.rubro as { nombre: string }).nombre
      : null

  const actividades: string[] = Array.isArray(comercio.actividades)
    ? comercio.actividades
        .filter((a) => typeof a === 'object' && a !== null)
        .map((a) => (a as { nombre: string }).nombre)
    : []

  const [lng, lat] = Array.isArray(comercio.localizacion) ? comercio.localizacion : [null, null]

  const mapsUrl =
    lat && lng
      ? `https://www.google.com/maps?q=${lat},${lng}`
      : `https://www.google.com/maps/search/${encodeURIComponent(comercio.direccion + ', San Benito, Entre Ríos')}`

  const fechaAlta = comercio.fechaAlta
    ? new Date(comercio.fechaAlta).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : null

  const fechaBaja = comercio.fechaBaja
    ? new Date(comercio.fechaBaja).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : null

  const estaVigente = !comercio.fechaBaja || new Date(comercio.fechaBaja) > new Date()

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-4">
        <Link
          href="/tramites/habilitaciones/comercios-habilitados"
          className="btn btn-ghost btn-sm gap-1"
        >
          ← Volver al listado
        </Link>
      </div>

      <section className="hero bg-base-200 rounded-lg p-6 shadow-lg md:p-10">
        <div className="hero-content w-full max-w-4xl flex-col items-start gap-4">
          <div className="flex w-full items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 rounded-xl p-3">
                <IconBuildingStore size={40} className="text-primary" stroke={1.5} />
              </div>
              <div>
                <h1 className="text-2xl font-bold md:text-4xl">{comercio.nombre}</h1>
                <p className="text-base-content/60 mt-1 text-sm">{comercio.razonSocial}</p>
              </div>
            </div>
            <div className="shrink-0">
              {estaVigente ? (
                <span className="badge badge-success badge-lg gap-1">Vigente</span>
              ) : (
                <span className="badge badge-error badge-lg gap-1">Dado de baja</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Datos del establecimiento</h2>
          <dl className="space-y-4">
            <div className="flex items-start gap-3">
              <IconHash size={18} className="text-primary mt-0.5 shrink-0" stroke={1.5} />
              <div>
                <dt className="text-base-content/60 text-xs font-medium tracking-wide uppercase">
                  CUIT / CUIL
                </dt>
                <dd className="mt-0.5 font-medium">{comercio.cuit}</dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <IconMapPin size={18} className="text-primary mt-0.5 shrink-0" stroke={1.5} />
              <div>
                <dt className="text-base-content/60 text-xs font-medium tracking-wide uppercase">
                  Dirección
                </dt>
                <dd className="mt-0.5 font-medium">{comercio.direccion}</dd>
              </div>
            </div>

            {rubroNombre && (
              <div className="flex items-start gap-3">
                <IconTag size={18} className="text-primary mt-0.5 shrink-0" stroke={1.5} />
                <div>
                  <dt className="text-base-content/60 text-xs font-medium tracking-wide uppercase">
                    Rubro
                  </dt>
                  <dd className="mt-0.5">
                    <span className="badge badge-outline">{rubroNombre}</span>
                  </dd>
                </div>
              </div>
            )}

            {actividades.length > 0 && (
              <div className="flex items-start gap-3">
                <IconTag size={18} className="text-primary mt-0.5 shrink-0" stroke={1.5} />
                <div>
                  <dt className="text-base-content/60 text-xs font-medium tracking-wide uppercase">
                    Actividades
                  </dt>
                  <dd className="mt-1 flex flex-wrap gap-1">
                    {actividades.map((act) => (
                      <span key={act} className="badge badge-ghost badge-sm">
                        {act}
                      </span>
                    ))}
                  </dd>
                </div>
              </div>
            )}
          </dl>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Habilitación</h2>
          <dl className="space-y-4">
            {fechaAlta && (
              <div className="flex items-start gap-3">
                <IconCalendar size={18} className="text-primary mt-0.5 shrink-0" stroke={1.5} />
                <div>
                  <dt className="text-base-content/60 text-xs font-medium tracking-wide uppercase">
                    Fecha de alta
                  </dt>
                  <dd className="mt-0.5 font-medium">{fechaAlta}</dd>
                </div>
              </div>
            )}

            {fechaBaja && (
              <div className="flex items-start gap-3">
                <IconCalendar size={18} className="text-error mt-0.5 shrink-0" stroke={1.5} />
                <div>
                  <dt className="text-base-content/60 text-xs font-medium tracking-wide uppercase">
                    Fecha de baja
                  </dt>
                  <dd className="text-error mt-0.5 font-medium">{fechaBaja}</dd>
                </div>
              </div>
            )}

            <div className="divider my-2" />

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm w-full gap-2"
            >
              <IconMapPin size={16} stroke={1.5} />
              Ver ubicación en Google Maps
            </a>

            {comercio.urlValidacion && (
              <a
                href={comercio.urlValidacion}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm mt-2 w-full gap-2"
              >
                <IconCertificate size={16} stroke={1.5} />
                Ver certificado de habilitación
              </a>
            )}
          </dl>
        </div>
      </section>

      {/* Certificado de Habilitación embebido */}
      <section className="mt-6">
        <h2 className="mb-4 text-xl font-semibold">Certificado de Habilitación</h2>
        <CertificadoHabilitacion
          nombre={comercio.nombre}
          razonSocial={comercio.razonSocial}
          cuit={comercio.cuit}
          direccion={comercio.direccion}
          fechaAlta={comercio.fechaAlta ?? null}
          fechaBaja={comercio.fechaBaja ?? null}
          urlValidacion={(comercio as any).urlValidacion ?? null}
          numeroHabilitacion={(comercio as any).numeroHabilitacion ?? null}
          rubroNombre={rubroNombre}
          showActions
        />
      </section>

      <div className="no-print mt-6 text-center">
        <p className="text-base-content/50 text-xs">
          Registro Municipal de Habilitaciones Comerciales · Municipalidad de San Benito ·{' '}
          <span className="font-mono">{comercio.id}</span>
        </p>
      </div>
    </main>
  )
}
