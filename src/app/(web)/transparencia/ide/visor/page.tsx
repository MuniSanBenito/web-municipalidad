import { IdeMapLoader } from '@/web/components/ide/ide-map-loader'
import { IconArrowLeft, IconWorld } from '@tabler/icons-react'
import Link from 'next/link'

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

      <IdeMapLoader />
    </main>
  )
}
