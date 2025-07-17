'use client'
import PageTitle from '@/web/components/ui/PageTitle'
import {
  IconAlertCircle,
  IconBuildings,
  IconCoin,
  IconDashboard,
  IconDatabase,
  IconMapPin,
  IconRoad,
} from '@tabler/icons-react'

const sections = [
  { title: 'Gestión', icon: IconDashboard, link: 'transparencia/gestion' },
  {
    title: 'Estructura Municipal',
    icon: IconBuildings,
    link: 'transparencia/estructura-municipal',
  },
  { title: 'Memorias del intendente', icon: IconMapPin, link: 'transparencia/memorias' },
  { title: 'Infraestructura de Datos Espaciales', icon: IconDatabase, link: 'transparencia/ide' },
  { title: 'Obras', icon: IconRoad, link: 'transparencia/obras' },
  {
    title: 'Intimaciones Públicas',
    icon: IconAlertCircle,
    link: 'transparencia/intimaciones-publicas',
  },
  { title: 'Contabilidad', icon: IconCoin, link: 'transparencia/contabilidad' },
]

export default function PageTransparencia() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Transparencia" />
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {sections.map((section, index) => (
          <a
            key={index}
            href={section.link}
            className="card bg-base-100 hover:bg-base-200 p-8 shadow-lg transition-all duration-300 hover:scale-102 hover:shadow-2xl"
            aria-label={`Ir a ${section.title}`}
          >
            <div className="card-body items-center text-center">
              <span className="text-primary mb-8 text-6xl">
                <section.icon stroke={1.2} size={80} />
              </span>
              <h2 className="card-title text-2xl font-bold">{section.title}</h2>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
