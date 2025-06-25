'use client'

import {
  IconAlertCircle,
  IconBuildingCommunity,
  IconPhone,
  IconSearch,
  IconSun,
} from '@tabler/icons-react'
import Link from 'next/link'

const QUICK_ACCESS = [
  {
    title: 'Alertas',
    icon: IconAlertCircle,
    link: '/alertas',
    description: 'Información importante y avisos urgentes',
  },
  {
    title: 'Clima',
    icon: IconSun,
    link: '/clima',
    description: 'Pronóstico del tiempo en San Benito',
  },
  {
    title: 'Teléfonos Útiles',
    icon: IconPhone,
    link: '/telefonos',
    description: 'Números de emergencia y servicios',
  },
  {
    title: 'Mapa Municipal',
    icon: IconBuildingCommunity,
    link: '/mapa',
    description: 'Ubicación de servicios y dependencias',
  },
]

export function QuickAccess() {
  return (
    <section className="w-full bg-base-200 px-4 py-8">
      <div className="container mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Accesos Rápidos</h2>
          <div className="relative">
            <input
              type="search"
              placeholder="Buscar trámites y servicios..."
              className="input input-bordered w-full max-w-xs pr-10"
            />
            <IconSearch className="absolute right-3 top-1/2 -translate-y-1/2 transform text-base-content/50" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACCESS.map(item => (
            <Link
              key={item.link}
              href={item.link}
              className="card bg-base-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="card-body">
                <item.icon className="text-primary" size={40} />
                <h3 className="card-title">{item.title}</h3>
                <p className="text-sm text-base-content/70">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
