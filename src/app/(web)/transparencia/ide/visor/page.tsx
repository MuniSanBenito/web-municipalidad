import { IdeMapLoader } from '@/web/components/ide/ide-map-loader'
import { IconArrowLeft, IconWorld } from '@tabler/icons-react'
import Link from 'next/link'

export default function VisorIdePage() {
  return (
    <main className="flex h-[100dvh] flex-col md:container md:mx-auto md:h-[calc(100vh-80px)] md:min-h-[600px] md:px-4 md:py-6">
      <header className="absolute left-0 top-0 z-20 flex items-center gap-3 p-3 md:static md:mb-6 md:p-0">
        <Link
          href="/transparencia/ide"
          className="btn btn-circle btn-sm bg-base-100/95 shadow-md backdrop-blur md:btn-md"
          aria-label="Volver a IDE"
        >
          <IconArrowLeft size={18} />
        </Link>

        <div className="hidden md:block">
          <h1 className="text-4xl font-bold text-base-content">
            <IconWorld size={36} className="mb-1 mr-2 inline-block text-primary" />
            Visor IDE San Benito
          </h1>
          <p className="mt-2 text-base-content/70">
            Explorá la información geoespacial del municipio. Activá capas, ajustá opacidad y
            consultá atributos haciendo clic sobre el mapa.
          </p>
        </div>
      </header>

      <IdeMapLoader className="flex-1 min-h-0" />
    </main>
  )
}
