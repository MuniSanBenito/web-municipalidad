'use client'
import PageTitle from '@/components/ui/PageTitle'
import { IconChartBar, IconFileText, IconGavel, IconScale } from '@tabler/icons-react'
import Link from 'next/link'

const sections = [
  {
    title: 'Licitaciones',
    icon: IconGavel,
    link: '/transparencia/contabilidad/licitaciones',
    description: 'Información sobre las licitaciones públicas del municipio',
  },
  {
    title: 'Concursos',
    icon: IconScale,
    link: '/transparencia/contabilidad/concursos',
    description: 'Detalles de los concursos públicos y sus resultados',
  },
  {
    title: 'Balances Mensuales',
    icon: IconFileText,
    link: '/transparencia/contabilidad/balances-mensuales',
    description: 'Información financiera y balances mensuales del municipio',
  },
  {
    title: 'Sistema SIGEM',
    icon: IconChartBar,
    link: 'http://181.228.27.231/contable/contable.aspx',
    description: 'Acceso al sistema de gestión municipal reportes financieros',
    external: true,
  },
]

export default function PageContabilidad() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Contabilidad" />
      <div className="mb-12 text-center">
        <p className="text-lg text-gray-600">
          En esta sección encontrará información relevante sobre la gestión financiera del
          municipio, incluyendo licitaciones, concursos y balances mensuales.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {sections.map((section, index) => (
          <Link
            key={index}
            href={section.link}
            target={section.external ? '_blank' : '_self'}
            className="card bg-base-100 hover:bg-base-200 p-6 shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="card-body items-center text-center">
              <span className="text-primary mb-4 text-5xl">
                <section.icon stroke={1.2} size={60} />
              </span>
              <h2 className="card-title mb-2 text-xl font-bold">{section.title}</h2>
              <p className="text-gray-600">{section.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="mb-6 text-2xl font-bold">Documentos Recientes</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"></div>
      </div>
    </div>
  )
}
