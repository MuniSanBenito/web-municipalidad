'use client'
import PageTitle from '@/components/ui/PageTitle'

export default function PageConcursos() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Concursos" />
      
      <div className="mb-12 text-center">
        <p className="text-lg text-gray-600">
          En esta sección encontrará información sobre los concursos públicos realizados por el municipio,
          incluyendo bases, condiciones y resultados.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Aquí se pueden agregar las tarjetas de concursos cuando haya datos disponibles */}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          No hay concursos publicados en este momento.
        </p>
      </div>
    </div>
  )
}