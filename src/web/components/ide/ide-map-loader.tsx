'use client'

import dynamic from 'next/dynamic'

function MapFallback() {
  return (
    <div className="flex h-[calc(100vh-120px)] min-h-[600px] w-full items-center justify-center rounded-lg border border-base-300 bg-base-200">
      <div className="flex flex-col items-center gap-2 text-base-content/70">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <span>Cargando visor cartográfico...</span>
      </div>
    </div>
  )
}

export const IdeMapLoader = dynamic(
  () => import('./ide-map').then((m) => m.IdeMap),
  { ssr: false, loading: MapFallback },
)
