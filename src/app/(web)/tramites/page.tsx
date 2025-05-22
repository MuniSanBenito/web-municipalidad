import PageTitle from '@/components/ui/PageTitle'
import { EnlaceExternoConIcono } from '@/components/ui/EnlaceExternoConIcono' // Import new component
import {
  IconBallFootball,
  IconBook,
  IconBuilding,
  IconBuildingCommunity,
  IconBuildingStore,
  IconCash,
  IconClipboardList,
  IconGenderFemale,
  IconLicense,
  IconMusic,
  IconUserCircle,
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
    description: 'Información sobre trámites de licencias de conducir',
    isExternal: false,
  },
  {
    title: 'Habilitaciones Comerciales',
    icon: IconBuildingStore,
    link: '/tramites/habilitaciones',
    description: 'Requisitos y procedimientos para habilitaciones comerciales',
    isExternal: false,
  },
  {
    title: 'Rentas',
    icon: IconCash,
    link: '/tramites/rentas',
    description: 'Información sobre impuestos y tasas municipales',
    isExternal: false,
  },
  {
    title: 'Área Mujer y Género',
    icon: IconGenderFemale,
    link: '/tramites/area-mujer',
    description: 'Servicios y asistencia del área de mujer y género',
    isExternal: false,
  },
  {
    title: 'Obras Privadas',
    icon: IconBuilding,
    link: '/tramites/obras-privadas',
    description: 'Trámites relacionados con construcciones y proyectos',
    isExternal: false,
  },
  {
    title: 'Mesa de Entrada',
    icon: IconClipboardList,
    link: '/tramites/mesa-de-entrada',
    description: 'Información sobre presentación de trámites generales',
    isExternal: false,
  },
  {
    title: 'Punto Digital - Biblioteca',
    icon: IconBook,
    link: '/tramites/punto-digital-biblioteca',
    description: 'Talleres y actividades en la Biblioteca Municipal',
    isExternal: false,
  },
  {
    title: 'Talleres Culturales',
    icon: IconMusic,
    link: '/tramites/talleres-culturales',
    description: 'Información sobre talleres artísticos municipales',
    isExternal: false,
  },
  {
    title: 'Actividades Deportivas',
    icon: IconBallFootball,
    link: '/tramites/actividades-deportivas',
    description: 'Talleres deportivos y recreativos municipales',
    isExternal: false,
  },
  {
    title: 'CIC Barrio San Pedro',
    icon: IconBuildingCommunity,
    link: '/tramites/cic-barrio-san-pedro',
    description: 'Actividades y talleres en el Centro Integrador Comunitario',
    isExternal: false,
  },
  {
    title: 'Recursos Humanos',
    icon: IconUserCircle,
    link: 'http://181.228.27.231/personal/personal.aspx',
    description: 'Recibos de sueldo y certificación de haberes para empleados municipales',
    isExternal: true,
  },
]

export default function PageTramites() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Trámites y Servicios" />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {tramites.map((tramite, index) => (
          <a // The card itself remains an 'a' tag for consistent click behavior of the whole card
            key={index}
            href={tramite.link} // Keep href here for non-external, or as fallback
            {...(tramite.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="card bg-base-100 hover:bg-base-200 p-8 shadow-lg transition-all duration-300 hover:scale-102 hover:shadow-2xl"
            aria-label={`Ir a ${tramite.title}`}
          >
            <div className="card-body items-center text-center">
              <span className="text-primary mb-8 text-6xl">
                <tramite.icon stroke={1.2} size={80} />
              </span>
              <h2 className="card-title text-2xl font-bold">
                {tramite.isExternal && tramite.title === 'Recursos Humanos' ? (
                  <EnlaceExternoConIcono href={tramite.link} className="hover:underline">
                    {tramite.title}
                  </EnlaceExternoConIcono>
                ) : (
                  tramite.title
                )}
              </h2>
              <p className="mt-2 text-base">{tramite.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
