'use client'

import dynamic from 'next/dynamic'

function MapFallback() {
  return (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded-lg bg-base-200 md:min-h-[600px]">
      <div className="flex flex-col items-center gap-2 text-base-content/70">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <span>Cargando visor cartográfico...</span>
      </div>
    </div>
  )
}

const DynamicIdeMap = dynamic(() => import('./ide-map').then((m) => m.IdeMap), {
  ssr: false,
  loading: MapFallback,
})

export function IdeMapLoader({ className }: { className?: string }) {
  return (
    <div className={className}>
      <DynamicIdeMap />
    </div>
  )
}
