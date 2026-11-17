import { MapaComerciosLoader } from '@/web/components/mapa-comercios-loader'
import {
  comercioCoincide,
  etiquetaTitulares,
  idsDeTitulares,
  nombresActividades,
} from '@/web/lib/busqueda-comercios'
import { comercioEstaEnSanBenito, coordenadasComercio } from '@/web/lib/habilitaciones'
import { basePayload } from '@/web/lib/payload'
import { IconMapPin, IconSearch } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { FiltrosComercios } from './FiltrosComercios'

export const metadata: Metadata = {
  title: 'Comercios habilitados',
  description:
    'Registro de establecimientos comerciales con habilitación vigente en San Benito.',
}

export const dynamic = 'force-dynamic'

type Props = {
  searchParams: Promise<{ q?: string; actividad?: string }>
}

export default async function ComerciosHabilitadosPage({ searchParams }: Props) {
  const { q = '', actividad = '' } = await searchParams

  const hoy = new Date().toISOString()

  const whereBase = {
    and: [
      {
        or: [
          { fechaBaja: { exists: false } },
          { fechaBaja: { equals: null } },
          { fechaBaja: { greater_than: hoy } },
        ],
      },
      {
        or: [
          { fechaVencimiento: { exists: false } },
          { fechaVencimiento: { equals: null } },
          { fechaVencimiento: { greater_than_equal: hoy } },
        ],
      },
    ],
  }

  const [{ docs: vigentes }, { docs: actividades }] = await Promise.all([
    basePayload.find({
      collection: 'comercios-habilitados',
      where: whereBase,
      depth: 1,
      sort: 'nombre',
      limit: 500,
    }),
    basePayload.find({
      collection: 'actividades-comercios',
      sort: 'nombre',
      limit: 200,
    }),
  ])

  const actividadesParaFiltro = actividades.map((item) => ({ id: item.id, nombre: item.nombre }))
  const idsTitulares = [
    ...new Set(vigentes.flatMap((comercio) => idsDeTitulares(comercio.titulares))),
  ]
  const { docs: personas } = idsTitulares.length
    ? await basePayload.find({
        collection: 'ciudadanos',
        where: { id: { in: idsTitulares } },
        depth: 0,
        limit: idsTitulares.length,
        pagination: false,
        overrideAccess: true,
        select: { nombre: true, apellido: true },
      })
    : { docs: [] }
  const titularPorId = new Map(
    personas.map((persona) => [
      persona.id,
      { nombre: persona.nombre, apellido: persona.apellido },
    ]),
  )
  const listado = vigentes.map((comercio) => ({
    ...comercio,
    titulares: idsDeTitulares(comercio.titulares).map(
      (id) => titularPorId.get(id) ?? { nombre: null, apellido: null },
    ),
  }))
  const comercios = listado.filter((comercio) => comercioCoincide(comercio, q, actividad))

  const comerciosEnMapa = comercios.flatMap((comercio) => {
    const coords = coordenadasComercio(comercio.localizacion)
    if (!coords || !comercioEstaEnSanBenito(coords)) return []
    const actividadesNombre = nombresActividades(comercio.actividades)
    return [
      {
        id: String(comercio.id),
        nombre: comercio.nombre,
        direccion: comercio.direccion,
        rubro: actividadesNombre.join(' · ') || null,
        lat: coords.lat,
        lng: coords.lng,
      },
    ]
  })

  const textoMapa =
    comercios.length === 0
      ? 'No hay comercios para ubicar.'
      : comerciosEnMapa.length === 0
        ? 'Estos comercios todavía no tienen ubicación en el mapa.'
        : comerciosEnMapa.length === comercios.length
          ? 'Todos los comercios de este listado.'
          : `${comerciosEnMapa.length} de ${comercios.length} comercios tienen ubicación.`

  const cantidad = `${comercios.length} ${comercios.length === 1 ? 'comercio' : 'comercios'}`

  return (
    <main className="container mx-auto px-4 py-8 md:py-10">
      <header>
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Comercios habilitados</h1>
          <p className="text-base-content/70 mt-2 text-base">
            Establecimientos con habilitación vigente en San Benito.
          </p>
        </div>
        <div className="mt-6">
          <Suspense fallback={<div className="skeleton h-16 w-full" />}>
            <FiltrosComercios actividades={actividadesParaFiltro} />
          </Suspense>
        </div>
      </header>

      <p className="text-base-content/60 mt-8 text-sm font-medium">{cantidad}</p>

      {comercios.length === 0 ? (
        <div className="border-base-300 mt-4 flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
          <IconSearch size={40} stroke={1.5} className="text-base-content/30" />
          <p className="text-base-content/70">
            {`No hay comercios habilitados${q ? ` para “${q.trim()}”` : ''}${actividad ? ' en esa actividad' : ''}.`}
          </p>
          {(q || actividad) && (
            <Link
              href="/tramites/habilitaciones/comercios-habilitados"
              className="btn btn-outline btn-sm"
            >
              Ver todos los comercios
            </Link>
          )}
        </div>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {comercios.map((comercio) => {
            const actividadesNombre = nombresActividades(comercio.actividades)
            const titulares = etiquetaTitulares(comercio.titulares)

            const coords = coordenadasComercio(comercio.localizacion)
            const mapsUrl = coords
              ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
              : `https://www.google.com/maps/search/${encodeURIComponent(comercio.direccion + ', San Benito, Entre Ríos')}`

            return (
              <li key={comercio.id}>
                <article className="border-base-300 bg-base-100 flex h-full flex-col rounded-xl border p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    {actividadesNombre.slice(0, 2).map((nombre) => (
                      <span key={nombre} className="badge badge-ghost">
                        {nombre}
                      </span>
                    ))}
                    {comercio.numeroHabilitacion && (
                      <span className="text-base-content/50 font-mono text-xs">
                        {comercio.numeroHabilitacion}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-3 text-xl font-semibold leading-tight">
                    <Link
                      href={`/tramites/habilitaciones/comercios-habilitados/${comercio.id}`}
                      className="hover:text-primary"
                    >
                      {comercio.nombre}
                    </Link>
                  </h2>
                  {titulares && (
                    <p className="text-base-content/60 mt-1 text-sm">Titular: {titulares}</p>
                  )}
                  <p className="text-base-content/70 mt-2 flex items-start gap-2 text-sm leading-snug">
                    <IconMapPin size={16} className="mt-0.5 shrink-0" stroke={1.5} />
                    <span>{comercio.direccion}</span>
                  </p>
                  <div className="mt-auto flex items-center gap-3 pt-5">
                    <Link
                      href={`/tramites/habilitaciones/comercios-habilitados/${comercio.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Ver ficha
                    </Link>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-hover text-sm"
                    >
                      Cómo llegar
                    </a>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      )}

      <section className="mt-14">
        <h2 className="text-xl font-semibold">Dónde están</h2>
        <p className="text-base-content/60 mt-1 mb-4 text-sm">{textoMapa}</p>
        {comerciosEnMapa.length > 0 && (
          <MapaComerciosLoader key={`${q}-${actividad}`} comercios={comerciosEnMapa} />
        )}
      </section>

      <section className="border-base-300 mt-14 rounded-xl border p-5 md:p-6">
        <h2 className="text-lg font-semibold">¿No encontrás tu comercio?</h2>
        <p className="text-base-content/70 mt-2 max-w-2xl text-sm leading-relaxed">
          Si tu local tiene habilitación vigente y no aparece en este listado, comunicate con el
          área de Habilitaciones Comerciales.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="https://wa.me/3434537319" target="_blank" className="btn btn-outline btn-sm">
            WhatsApp 3434537319
          </a>
          <a href="mailto:habilitaciones@munisanbenito.gov.ar" className="btn btn-outline btn-sm">
            habilitaciones@munisanbenito.gov.ar
          </a>
        </div>
      </section>
    </main>
  )
}
