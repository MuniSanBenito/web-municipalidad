'use client'

import dynamic from 'next/dynamic'
import type { ComercioEnMapa } from './mapa-comercios'

const Mapa = dynamic(() => import('./mapa-comercios').then((modulo) => modulo.MapaComercios), {
  ssr: false,
  loading: () => <div className="bg-base-200 h-80 w-full animate-pulse rounded-lg md:h-[28rem]" />,
})

export function MapaComerciosLoader({ comercios }: { comercios: ComercioEnMapa[] }) {
  return <Mapa comercios={comercios} />
}
