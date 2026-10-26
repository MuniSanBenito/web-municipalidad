'use client'

import {
    IconBuildingStore,
    IconCalendar,
    IconHash,
    IconMapPin,
    IconPrinter,
    IconShieldCheck,
    IconTag,
} from '@tabler/icons-react'

interface CertificadoHabilitacionProps {
  nombre: string
  razonSocial: string
  cuit: string
  direccion: string
  fechaAlta?: string | null
  fechaBaja?: string | null
  urlValidacion?: string | null
  numeroHabilitacion?: string | null
  rubroNombre?: string | null
  showActions?: boolean
}

function formatFecha(iso: string | null | undefined): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Argentina/Buenos_Aires',
  })
}

export function CertificadoHabilitacion({
  nombre,
  razonSocial,
  cuit,
  direccion,
  fechaAlta,
  fechaBaja,
  urlValidacion,
  numeroHabilitacion,
  rubroNombre,
  showActions = false,
}: CertificadoHabilitacionProps) {
  const vigente = !fechaBaja || new Date(fechaBaja) >= new Date()

  return (
    <div className="space-y-4">
      {showActions && (
        <div className="no-print flex justify-end gap-2">
          <button
            onClick={() => window.print()}
            className="btn btn-outline btn-sm gap-2"
          >
            <IconPrinter size={16} />
            Imprimir / Guardar PDF
          </button>
        </div>
      )}

      <div className="certificado-print relative mx-auto max-w-2xl bg-white text-gray-800 shadow-2xl rounded-2xl">
        {/* Borde decorativo doble */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border-4 border-double border-gray-200" />

        <div className="relative">
          {/* Header municipal */}
          <div className="flex flex-col items-center gap-3 border-b-2 border-gray-200 bg-gray-50 rounded-t-2xl px-8 py-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center">
              <img
                src="/images/escudo.webp"
                alt="Escudo Municipalidad de San Benito"
                className="h-20 w-20 object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                Municipalidad de San Benito
              </p>
              <h1 className="mt-1 text-xl font-bold text-gray-800 md:text-2xl">
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
            <h2 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">{nombre}</h2>
            <p className="mt-1 text-sm text-gray-500">{razonSocial}</p>
          </div>

          <div className="divider my-0 px-8" />

          {/* Datos */}
          <div className="px-8 py-6">
            <dl className="space-y-5">
              {/* CUIT */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 rounded-lg bg-gray-100 p-1.5">
                  <IconHash size={16} className="text-gray-500" stroke={1.5} />
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                    CUIT / CUIL
                  </dt>
                  <dd className="mt-0.5 text-base font-medium text-gray-800">{cuit}</dd>
                </div>
              </div>

              {/* Rubro */}
              {rubroNombre && (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 rounded-lg bg-gray-100 p-1.5">
                    <IconTag size={16} className="text-gray-500" stroke={1.5} />
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                      Rubro
                    </dt>
                    <dd className="mt-0.5 text-base font-medium text-gray-800">{rubroNombre}</dd>
                  </div>
                </div>
              )}

              {/* Dirección */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 rounded-lg bg-gray-100 p-1.5">
                  <IconMapPin size={16} className="text-gray-500" stroke={1.5} />
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                    Dirección
                  </dt>
                  <dd className="mt-0.5 text-base font-medium text-gray-800">{direccion}</dd>
                </div>
              </div>

              {/* Fechas */}
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
                      {formatFecha(fechaAlta)}
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
                        fechaBaja ? (vigente ? 'text-gray-800' : 'text-red-600') : 'text-gray-400',
                      ].join(' ')}
                    >
                      {fechaBaja ? formatFecha(fechaBaja) : 'Sin vencimiento'}
                    </dd>
                  </div>
                </div>
              </div>

              {/* Número de habilitación */}
              {numeroHabilitacion && (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 rounded-lg bg-gray-100 p-1.5">
                    <IconShieldCheck size={16} className="text-gray-500" stroke={1.5} />
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                      Número de Habilitación
                    </dt>
                    <dd className="mt-0.5 font-mono text-sm font-medium text-gray-700">
                      {numeroHabilitacion}
                    </dd>
                  </div>
                </div>
              )}
            </dl>
          </div>

          <div className="divider my-0 px-8" />

          {/* Estado destacado */}
          <div className="px-8 py-5">
            <div
              className={[
                'flex items-center justify-center gap-3 rounded-xl border-2 py-4',
                vigente ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50',
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
                  {vigente ? 'Habilitación VIGENTE' : 'Habilitación VENCIDA'}
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
            {urlValidacion && (
              <p className="mb-2 text-xs text-gray-400">
                Verificar online:{' '}
                <span className="font-mono text-gray-500 break-all">{urlValidacion}</span>
              </p>
            )}
            <p className="text-xs text-gray-400">
              Documento emitido digitalmente · Municipalidad de San Benito
            </p>
            <p className="mt-0.5 text-xs text-gray-300">
              Este certificado fue generado electrónicamente y es válido sin firma ni sello físico.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
