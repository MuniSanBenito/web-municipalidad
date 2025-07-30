import PageTitle from '@/web/components/ui/PageTitle'
import { IconArrowLeft, IconBuildingBridge, IconBulb, IconRoad, IconTree } from '@tabler/icons-react'
import AnimatedCounters from '@/web/components/obras/animated-counters'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Obras y Servicios Públicos',
  description: 'Información sobre las obras realizadas, en ejecución y finalizadas por la Municipalidad de San Benito.',
}

// Datos de obras y servicios
const OBRAS_FINALIZADAS = [
  {
    obra: 'Plaza Central - Renovación',
    ubicacion: 'Centro',
    inversion: '$15.000.000',
    finalizacion: 'Marzo 2025',
  },
  {
    obra: 'Iluminación LED',
    ubicacion: 'Av. Principal',
    inversion: '$8.500.000',
    finalizacion: 'Enero 2025',
  },
  {
    obra: 'Centro Cultural Municipal',
    ubicacion: 'Barrio Sur',
    inversion: '$22.000.000',
    finalizacion: 'Diciembre 2024',
  },
  {
    obra: 'Desagües Pluviales',
    ubicacion: 'Zona Oeste',
    inversion: '$12.800.000',
    finalizacion: 'Noviembre 2024',
  },
]



export default function PageObras() {
  return (
    <main className="container mx-auto p-6">
      <Link
        href="/transparencia"
        className="btn btn-link mb-4 pl-0 text-primary hover:no-underline"
      >
        <IconArrowLeft size={18} />
        Volver a Transparencia
      </Link>
      <section className="hero bg-base-200 mb-10 rounded-lg p-10 text-center shadow-lg">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <PageTitle title="Obras y Servicios Públicos" />
            <p className="mt-4 text-lg leading-relaxed">
              La Municipalidad de San Benito trabaja constantemente en la mejora de la
              infraestructura y los servicios públicos para todos los vecinos. En esta sección podrá
              encontrar información sobre las obras realizadas y en ejecución.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-8 text-center text-3xl font-bold">Obras Destacadas</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="card bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-base-100 rounded-lg">
            <figure className="px-6 pt-6">
              <div className="bg-base-200 flex h-48 w-full items-center justify-center rounded-xl">
                <IconRoad stroke={1.2} size={80} className="text-primary opacity-50" />
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title text-xl font-bold">Pavimentación Av. Guido Marizza</h3>
              <div className="mb-2 flex items-center gap-2">
                <span className="badge badge-success">Finalizada</span>
              </div>
              <p>
                Pavimentación de 11 cuadras en la Avenida Guido Marizza, incluyendo cordones,
                cunetas, señalización horizontal y vertical, e iluminación LED.
              </p>
              <div className="card-actions mt-4 justify-end">
                <button className="btn btn-outline btn-sm">Ver detalles</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-base-100 rounded-lg">
            <figure className="px-6 pt-6">
              <div className="bg-base-200 flex h-48 w-full items-center justify-center rounded-xl">
                <IconBuildingBridge stroke={1.2} size={80} className="text-primary opacity-50" />
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title text-xl font-bold">Centro de Atención Primaria</h3>
              <div className="mb-2 flex items-center gap-2">
                <span className="badge badge-success">Inaugurado</span>
              </div>
              <p>
                Finalización e inauguración del nuevo Centro de Atención Primaria de Salud en el
                Barrio Este, con equipamiento de última generación y personal especializado.
              </p>
              <div className="card-actions mt-4 justify-end">
                <button className="btn btn-outline btn-sm">Ver detalles</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-8 text-center text-3xl font-bold">Estadísticas de Obras y Servicios</h2>
        <AnimatedCounters />
      </section>

      <section className="mb-12">
        <h2 className="mb-8 text-center text-3xl font-bold">Obras en Ejecución</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl font-bold">Pavimentación Barrio Norte</h3>
              <div className="mb-2 flex items-center gap-2">
                <span className="badge badge-primary">En ejecución</span>
                <span className="text-gray-600">Avance: 65%</span>
              </div>
              <p>
                Pavimentación de 10 cuadras en el Barrio Norte, incluyendo cordones, cunetas y
                desagües pluviales.
              </p>
              <div className="mt-2 h-2.5 w-full rounded-full bg-gray-200">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl font-bold">Ampliación Red Cloacal</h3>
              <div className="mb-2 flex items-center gap-2">
                <span className="badge badge-primary">En ejecución</span>
                <span className="text-gray-600">Avance: 40%</span>
              </div>
              <p>
                Ampliación de la red cloacal en los barrios Este y Sur, beneficiando a más de 500
                familias.
              </p>
              <div className="mt-2 h-2.5 w-full rounded-full bg-gray-200">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-center text-3xl font-bold">Obras Finalizadas</h2>
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>Obra</th>
                <th>Ubicación</th>
                <th>Inversión</th>
                <th>Finalización</th>
              </tr>
            </thead>
            <tbody>
              {OBRAS_FINALIZADAS.map((obra) => (
                <tr key={obra.obra}>
                  <td>{obra.obra}</td>
                  <td>{obra.ubicacion}</td>
                  <td>{obra.inversion}</td>
                  <td>{obra.finalizacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
