import { 
  IconLicense, 
  IconBuildingStore, 
  IconCash, 
  IconGenderFemale 
} from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trámites - San Benito',
}

// Definición de las secciones de trámites con sus iconos y enlaces
const tramites = [
  {
    title: 'Licencia de Conducir',
    icon: IconLicense,
    link: '/tramites/licencia',
    description: 'Información sobre trámites de licencias de conducir'
  },
  {
    title: 'Habilitaciones Comerciales',
    icon: IconBuildingStore,
    link: '/tramites/habilitaciones',
    description: 'Requisitos y procedimientos para habilitaciones comerciales'
  },
  {
    title: 'Rentas',
    icon: IconCash,
    link: '/tramites/rentas',
    description: 'Información sobre impuestos y tasas municipales'
  },
  {
    title: 'Área Mujer y Género',
    icon: IconGenderFemale,
    link: '/tramites/area-mujer',
    description: 'Servicios y asistencia del área de mujer y género'
  }
]

export default function PageTramites() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-primary mb-12 text-center text-5xl font-bold">Trámites Municipales</h1>
      
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {tramites.map((tramite, index) => (
          <a
            key={index}
            href={tramite.link}
            className="card bg-base-100 hover:bg-base-200 p-8 shadow-lg transition-all duration-300 hover:scale-102 hover:shadow-2xl"
            aria-label={`Ir a ${tramite.title}`}
          >
            <div className="card-body items-center text-center">
              <span className="text-primary mb-8 text-6xl">
                <tramite.icon stroke={1.2} size={80} />
              </span>
              <h2 className="card-title text-2xl font-bold">{tramite.title}</h2>
              <p className="mt-2 text-base">{tramite.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}