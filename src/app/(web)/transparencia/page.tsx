import PageTitle from '@/web/components/ui/PageTitle'
import {
  IconAlertCircle,
  IconBuildings,
  IconCoin,
  IconDashboard,
  IconDatabase,
  IconGavel,
  IconMapPin,
} from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

const sections = [
  // { title: 'Obras', icon: IconRoad, link: 'transparencia/obras' },
  {
    title: 'Estructura Municipal',
    icon: IconBuildings,
    link: 'transparencia/estructura-municipal',
  },
  {
    title: 'Concejo Deliberante',
    icon: IconGavel,
    link: 'https://ben-ent-hcd.paisdigital.innovacion.gob.ar/',
  },
  { title: 'Memorias del intendente', icon: IconMapPin, link: 'transparencia/memorias' },
  { title: 'Infraestructura de Datos Espaciales', icon: IconDatabase, link: 'transparencia/ide' },
  { title: 'Gestión', icon: IconDashboard, link: 'transparencia/gestion' },
  { title: 'Contabilidad', icon: IconCoin, link: 'transparencia/contabilidad' },
  {
    title: 'Intimaciones Públicas',
    icon: IconAlertCircle,
    link: 'transparencia/intimaciones-publicas',
  },
]

export const metadata: Metadata = {
  title: 'Portal de Transparencia - Municipalidad de San Benito',
  description:
    'Accedé a información pública sobre la gestión municipal, estructura, obras, contabilidad y más. Comprometidos con un gobierno abierto y transparente.',
}

export default function PageTransparencia() {
  return (
    <main className="container mx-auto px-4 py-8">
      <PageTitle title="Portal de Transparencia" />
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {sections.map((section) => {
          const isExternal = section.link.startsWith('http')
          const cardClasses =
            'card bg-base-100 hover:bg-base-200 focus-visible:ring-primary focus-visible:ring-offset-base-100 rounded-lg p-8 shadow-lg transition-all duration-300 hover:scale-102 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

          if (isExternal) {
            return (
              <a
                key={section.title}
                href={section.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClasses}
                aria-label={`Ir a ${section.title} (en una nueva pestaña)`}
              >
                <div className="card-body items-center text-center">
                  <span className="text-primary mb-8 text-6xl">
                    <section.icon stroke={1.2} size={80} />
                  </span>
                  <h2 className="card-title text-2xl font-bold">{section.title}</h2>
                </div>
              </a>
            )
          }

          return (
            <Link
              key={section.title}
              href={section.link}
              className={cardClasses}
              aria-label={`Ir a ${section.title}`}
            >
              <div className="card-body items-center text-center">
                <span className="text-primary mb-8 text-6xl">
                  <section.icon stroke={1.2} size={80} />
                </span>
                <h2 className="card-title text-2xl font-bold">{section.title}</h2>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
