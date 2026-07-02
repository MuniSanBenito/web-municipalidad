import { IconArrowLeft, IconWorld } from '@tabler/icons-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

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

const IdeMap = dynamic(
  () => import('@/web/components/ide/ide-map').then((m) => m.IdeMap),
  { ssr: false, loading: MapFallback },
)

export default function VisorIdePage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <Link
        href="/transparencia/ide"
        className="btn btn-link text-primary mb-4 pl-0 hover:no-underline"
      >
        <IconArrowLeft size={18} />
        Volver a IDE
      </Link>

      <header className="mb-6">
        <h1 className="text-4xl font-bold text-base-content">
          <IconWorld size={36} className="mb-1 mr-2 inline-block text-primary" />
          Visor IDE San Benito
        </h1>
        <p className="mt-2 text-base-content/70">
          Explorá la información geoespacial del municipio. Activá capas, ajustá opacidad y
          consultá atributos haciendo clic sobre el mapa.
        </p>
      </header>

      <IdeMap />
    </main>
  )
}
