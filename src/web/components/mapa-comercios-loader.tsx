'use client'

import dynamic from 'next/dynamic'
import type { ComercioEnMapa } from './mapa-comercios'

const Mapa = dynamic(() => import('./mapa-comercios').then((modulo) => modulo.MapaComercios), {
  ssr: false,
  loading: () => <div className="bg-base-200 h-72 w-full animate-pulse rounded-xl md:h-96" />,
})

export function MapaComerciosLoader({
  comercios,
  consulta = '',
}: {
  comercios: ComercioEnMapa[]
  consulta?: string
}) {
  return <Mapa comercios={comercios} consulta={consulta} />
}
