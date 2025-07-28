'use client'

import { IconBulb, IconRoad, IconTree } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

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
      setCount((prevCount) => {
        const nextCount = prevCount + step
        return nextCount >= end ? end : nextCount
      })
    }, interval)

    return () => clearInterval(timer)
  }, [end])

  return (
    <div className="card bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="card-body items-center text-center">
        <div className="text-primary mb-4 text-5xl">
          <Icon stroke={1.2} size={60} />
        </div>
        <h3 className="card-title mb-2 text-3xl font-bold">{count}</h3>
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="mt-2 text-gray-600">{description}</p>
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
]

export default function AnimatedCounters() {
  return (
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
  )
}
