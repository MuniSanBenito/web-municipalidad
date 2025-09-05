import PageTitle from '@/web/components/ui/PageTitle'
import { IconBuilding, IconBuildingBank, IconBus, IconFlag } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nuestra Ciudad',
  description: 'Conocé más sobre la ciudad de San Benito, su historia, gobierno y servicios.',
}

const sections = [
  { title: 'San Benito Ciudad', icon: IconBuilding, link: 'nuestra-ciudad/san-benito' },
  { title: 'Nuestra Bandera', icon: IconFlag, link: 'nuestra-ciudad/bandera' },
  { title: 'Gobierno', icon: IconBuildingBank, link: 'nuestra-ciudad/gobierno' },
  { title: 'Lineas de Colectivos', icon: IconBus, link: 'nuestra-ciudad/lineas-colectivos' },
]

export default function PageNuestraCiudad() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Nuestra Ciudad" />
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.link}
            className="card bg-base-100 hover:bg-base-200 focus:bg-base-200 p-8 shadow-lg transition-all duration-300 hover:scale-102 hover:shadow-2xl focus:scale-102 focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`Ir a ${section.title}`}
          >
            <div className="card-body items-center text-center">
              <span className="text-primary mb-8 text-6xl">
                <section.icon stroke={1.2} size={80} />
              </span>
              <h2 className="card-title text-2xl font-bold">{section.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
