import { IdeMapLoader } from '@/web/components/ide/ide-map-loader'
import { IconArrowLeft, IconWorld } from '@tabler/icons-react'
import Link from 'next/link'

export default function VisorIdePage() {
  return (
    <main className="flex min-h-0 flex-col md:container md:mx-auto md:h-[calc(100dvh-8rem)] md:overflow-hidden md:px-4 md:py-6">
      <div className="relative flex h-[65dvh] min-h-0 flex-col md:h-auto md:min-h-0 md:flex-1">
        <header className="absolute top-0 left-0 z-20 flex items-center gap-3 p-3 md:static md:mb-6 md:p-0">
          <Link
            href="/transparencia/ide"
            className="btn btn-circle btn-sm bg-base-100/95 md:btn-md shadow-md backdrop-blur"
            aria-label="Volver a IDE"
          >
            <IconArrowLeft size={18} />
          </Link>

          <div className="hidden md:block">
            <h1 className="text-base-content text-4xl font-bold">
              <IconWorld size={36} className="text-primary mr-2 mb-1 inline-block" />
              Visor IDE San Benito
            </h1>
            <p className="text-base-content/70 mt-2">
              Explorá la información geoespacial del municipio. Activá capas, ajustá opacidad y
              consultá atributos haciendo clic sobre el mapa.
            </p>
          </div>
        </header>

        <IdeMapLoader className="min-h-0 flex-1" />
      </div>

      <section className="space-y-2 px-4 py-6 pb-28 md:hidden">
        <h1 className="text-base-content text-xl font-bold">
          <IconWorld size={24} className="text-primary mr-1.5 mb-0.5 inline-block" />
          Visor IDE San Benito
        </h1>
        <p className="text-base-content/70 text-sm">
          Explorá la información geoespacial del municipio. Activá capas, ajustá opacidad y consultá
          atributos tocando el mapa.
        </p>
      </section>
    </main>
  )
}
