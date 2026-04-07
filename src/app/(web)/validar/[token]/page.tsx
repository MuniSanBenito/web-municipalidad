import { basePayload } from '@/web/lib/payload'
import {
  IconBuildingStore,
  IconCalendar,
  IconMapPin,
  IconShieldCheck,
  IconTag,
} from '@tabler/icons-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ token: string }>
}

interface CertificadoData {
  nombre: string
  rubro: string | null
  direccion: string
  fechaAlta: string | null
  fechaVencimiento: string | null
  vigente: boolean
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Validación de Habilitación Comercial',
    robots: {
      index: false,
      follow: false,
    },
  }
}

function formatFecha(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Argentina/Buenos_Aires',
  })
}

export default async function ValidarHabilitacionPage({ params }: Props) {
  const { token } = await params

  const result = await basePayload.find({
    collection: 'comercios-habilitados',
    where: { tokenValidacion: { equals: token } },
    depth: 1,
    limit: 1,
  })

  if (result.docs.length === 0) return notFound()

  const comercio = result.docs[0]

  const rubroNombre =
    comercio.rubro && typeof comercio.rubro === 'object'
      ? (comercio.rubro as { nombre: string }).nombre
      : null

  const fechaVencimiento = comercio.fechaBaja ?? null
  const vigente = !fechaVencimiento || new Date(fechaVencimiento) >= new Date()

  const data: CertificadoData = {
    nombre: comercio.nombre,
    rubro: rubroNombre,
    direccion: comercio.direccion,
    fechaAlta: comercio.fechaAlta ?? null,
    fechaVencimiento,
    vigente,
  }

  return (
    <main className="bg-base-200 min-h-screen px-4 py-8 md:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="card relative bg-white shadow-2xl">
          <div className="absolute inset-0 rounded-2xl border-4 border-double border-gray-200 pointer-events-none" />

          <div className="card-body gap-0 p-0">
            {/* Header municipal */}
            <div className="relative flex flex-col items-center gap-3 border-b-2 border-gray-200 bg-gray-50 px-8 py-6 text-center">
              {/* Espacio para el logo municipal */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 ring-2 ring-gray-300">
                <IconShieldCheck size={36} className="text-gray-500" stroke={1.5} />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  Municipalidad de San Benito
                </p>
                <h1 className="mt-1 text-xl font-bold text-gray-800">
                  Certificado de Habilitación Comercial
                </h1>
                <p className="text-xs text-gray-400">Entre Ríos · Argentina</p>
              </div>

              {/* Sello de estado */}
              <div
                className={[
                  'absolute right-6 top-6 select-none rounded-md border-4 px-3 py-1.5 font-black tracking-widest opacity-80',
                  'text-sm uppercase leading-none',
                  vigente
                    ? 'border-green-600 text-green-600 rotate-12'
                    : 'border-red-600 text-red-600 -rotate-12',
                ].join(' ')}
              >
                {vigente ? 'VIGENTE' : 'VENCIDA'}
              </div>
            </div>

            {/* Nombre del comercio */}
            <div className="bg-gray-50/50 px-8 py-5 text-center">
              <p className="text-xs font-medium tracking-widest text-gray-400 uppercase">
                Nombre de Fantasía
              </p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">{data.nombre}</h2>
            </div>

            <div className="divider my-0 px-8" />

            {/* Datos */}
            <div className="px-8 py-6">
              <dl className="space-y-5">
                {data.rubro && (
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 rounded-lg bg-gray-100 p-1.5">
                      <IconTag size={16} className="text-gray-500" stroke={1.5} />
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                        Rubro
                      </dt>
                      <dd className="mt-0.5 text-base font-medium text-gray-800">{data.rubro}</dd>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 rounded-lg bg-gray-100 p-1.5">
                    <IconMapPin size={16} className="text-gray-500" stroke={1.5} />
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                      Dirección
                    </dt>
                    <dd className="mt-0.5 text-base font-medium text-gray-800">{data.direccion}</dd>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 rounded-lg bg-gray-100 p-1.5">
                      <IconCalendar size={16} className="text-gray-500" stroke={1.5} />
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                        Fecha de Alta
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-gray-800">
                        {formatFecha(data.fechaAlta)}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 rounded-lg bg-gray-100 p-1.5">
                      <IconCalendar
                        size={16}
                        className={vigente ? 'text-gray-500' : 'text-red-500'}
                        stroke={1.5}
                      />
                    </div>
                    <div>
                      <dt className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                        Vencimiento
                      </dt>
                      <dd
                        className={[
                          'mt-0.5 text-sm font-medium',
                          data.fechaVencimiento
                            ? vigente
                              ? 'text-gray-800'
                              : 'text-red-600'
                            : 'text-gray-400',
                        ].join(' ')}
                      >
                        {data.fechaVencimiento ? formatFecha(data.fechaVencimiento) : 'Sin vencimiento'}
                      </dd>
                    </div>
                  </div>
                </div>
              </dl>
            </div>

            <div className="divider my-0 px-8" />

            {/* Estado destacado */}
            <div className="px-8 py-5">
              <div
                className={[
                  'flex items-center justify-center gap-3 rounded-xl border-2 py-4',
                  vigente
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50',
                ].join(' ')}
              >
                <IconBuildingStore
                  size={24}
                  className={vigente ? 'text-green-600' : 'text-red-600'}
                  stroke={1.5}
                />
                <div>
                  <p
                    className={[
                      'text-sm font-bold',
                      vigente ? 'text-green-700' : 'text-red-700',
                    ].join(' ')}
                  >
                    {vigente
                      ? 'Habilitación VIGENTE'
                      : 'Habilitación VENCIDA'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {vigente
                      ? 'Este establecimiento cuenta con habilitación comercial vigente.'
                      : 'La habilitación de este establecimiento ha vencido o fue dada de baja.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="rounded-b-2xl bg-gray-50 px-8 py-4 text-center">
              <p className="text-xs text-gray-400">
                Verificación oficial · Municipalidad de San Benito ·{' '}
                <span className="font-mono">{token.slice(0, 8)}…</span>
              </p>
              <p className="mt-0.5 text-xs text-gray-300">
                Este certificado fue generado electrónicamente y es válido sin firma ni sello físico.
              </p>
            </div>
          </div>
        </div>

        {/* Link de retorno */}
        <div className="mt-6 text-center">
          <a
            href="/tramites/habilitaciones/comercios-habilitados"
            className="btn btn-ghost btn-sm text-gray-500"
          >
            ← Ver todos los comercios habilitados
          </a>
        </div>
      </div>
    </main>
  )
}
