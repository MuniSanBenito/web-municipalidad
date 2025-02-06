'use client'
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
  { title: 'Mi Ciudad', icon: IconMapPin, link: 'transparencia/mi-ciudad' },
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
      <h1 className="text-primary mb-8 text-center text-4xl font-bold">Transparencia</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sections.map((section, index) => (
          <a
            key={index}
            href={section.link}
            className="card bg-base-100 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            aria-label={`Ir a ${section.title}`}
          >
            <div className="card-body items-center text-center">
              <span className="text-primary mb-4 text-4xl">
                <section.icon stroke={1.5} size={48} />
              </span>
              <h2 className="card-title text-lg font-semibold">{section.title}</h2>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
