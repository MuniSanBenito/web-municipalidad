'use client'

import { useEffect, useState } from 'react'
import PageTitle from '@/web/components/ui/PageTitle'
import {
  IconBulb,
  IconRoad,
  IconTree,
  IconTrash,
  IconDroplet,
  IconBuildingBridge,
} from '@tabler/icons-react'

// Definición de tipos para el contador animado
type AnimatedCounterProps = {
  end: number
  title: string
  icon: React.ElementType
  description: string
}

// Componente para el contador animado
const AnimatedCounter = ({ end, title, icon: Icon, description }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    // Duración de la animación en ms (aumentada a 4 segundos)
    const animationDuration = 4000
    // Intervalo entre incrementos (aumentado para hacer más lenta la animación)
    const interval = 50
    // Cantidad a incrementar en cada paso (mínimo 1)
    const step = Math.max(1, Math.ceil(end / (animationDuration / interval)))
    
    const timer = setInterval(() => {
      setCount(prevCount => {
        const nextCount = prevCount + step
        return nextCount >= end ? end : nextCount
      })
    }, interval)
    
    return () => clearInterval(timer)
  }, [end])
  
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="card-body items-center text-center">
        <div className="text-primary mb-4 text-5xl">
          <Icon stroke={1.2} size={60} />
        </div>
        <h3 className="card-title text-3xl font-bold mb-2">{count}</h3>
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  )
}

// Datos de obras y servicios
const obrasData = [
  {
    title: 'Luminarias LED',
    count: 100,
    icon: IconBulb,
    description: 'Luminarias instaladas en el municipio',
  },
  {
    title: 'Calles Asfaltadas',
    count: 25,
    icon: IconRoad,
    description: 'Kilómetros de calles asfaltadas',
  },
  {
    title: 'Espacios Verdes',
    count: 15,
    icon: IconTree,
    description: 'Plazas y parques renovados',
  },
  {
    title: 'Gestión de Residuos',
    count: 500,
    icon: IconTrash,
    description: 'Toneladas procesadas mensualmente',
  },
  {
    title: 'Red de Agua',
    count: 30,
    icon: IconDroplet,
    description: 'Kilómetros de red de agua potable',
  },
  {
    title: 'Infraestructura',
    count: 12,
    icon: IconBuildingBridge,
    description: 'Obras de infraestructura completadas',
  },
]

export default function PageObras() {
  return (
    <main className="container mx-auto p-6">
      <section className="hero bg-base-200 rounded-lg p-10 text-center shadow-lg mb-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <PageTitle title="Obras y Servicios Públicos" />
            <p className="mt-4 text-lg leading-relaxed">
              La Municipalidad de San Benito trabaja constantemente en la mejora de la
              infraestructura y los servicios públicos para todos los vecinos. En esta sección
              podrá encontrar información sobre las obras realizadas y en ejecución.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Obras Destacadas</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <figure className="px-6 pt-6">
              <div className="bg-base-200 h-48 w-full rounded-xl flex items-center justify-center">
                <IconRoad stroke={1.2} size={80} className="text-primary opacity-50" />
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title text-xl font-bold">Pavimentación Av. Guido Marizza</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-success">Finalizada</span>
              </div>
              <p>Pavimentación de 11 cuadras en la Avenida Guido Marizza, incluyendo cordones, cunetas, señalización horizontal y vertical, e iluminación LED.</p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-outline btn-sm">Ver detalles</button>
              </div>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <figure className="px-6 pt-6">
              <div className="bg-base-200 h-48 w-full rounded-xl flex items-center justify-center">
                <IconBuildingBridge stroke={1.2} size={80} className="text-primary opacity-50" />
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title text-xl font-bold">Centro de Atención Primaria</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-success">Inaugurado</span>
              </div>
              <p>Finalización e inauguración del nuevo Centro de Atención Primaria de Salud en el Barrio Este, con equipamiento de última generación y personal especializado.</p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-outline btn-sm">Ver detalles</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Estadísticas de Obras y Servicios</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {obrasData.map((obra, index) => (
            <AnimatedCounter
              key={index}
              end={obra.count}
              title={obra.title}
              icon={obra.icon}
              description={obra.description}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Obras en Ejecución</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl font-bold">Pavimentación Barrio Norte</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-primary">En ejecución</span>
                <span className="text-gray-600">Avance: 65%</span>
              </div>
              <p>Pavimentación de 10 cuadras en el Barrio Norte, incluyendo cordones, cunetas y desagües pluviales.</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl font-bold">Ampliación Red Cloacal</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-primary">En ejecución</span>
                <span className="text-gray-600">Avance: 40%</span>
              </div>
              <p>Ampliación de la red cloacal en los barrios Este y Sur, beneficiando a más de 500 familias.</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Obras Finalizadas</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Obra</th>
                <th>Ubicación</th>
                <th>Inversión</th>
                <th>Finalización</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Plaza Central - Renovación</td>
                <td>Centro</td>
                <td>$15.000.000</td>
                <td>Marzo 2025</td>
              </tr>
              <tr>
                <td>Iluminación LED</td>
                <td>Av. Principal</td>
                <td>$8.500.000</td>
                <td>Enero 2025</td>
              </tr>
              <tr>
                <td>Centro Cultural Municipal</td>
                <td>Barrio Sur</td>
                <td>$22.000.000</td>
                <td>Diciembre 2024</td>
              </tr>
              <tr>
                <td>Desagües Pluviales</td>
                <td>Zona Oeste</td>
                <td>$12.800.000</td>
                <td>Noviembre 2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
