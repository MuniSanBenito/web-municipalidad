import PageTitle from '@/web/components/ui/PageTitle'
import { generateMetadata as generateSEOMetadata } from '@/web/lib/metadata'
import {
  IconAccessible,
  IconBallFootball,
  IconBook,
  IconBriefcase,
  IconBuilding,
  IconBuildingCommunity,
  IconBuildingStore,
  IconCalendarEvent,
  IconCash,
  IconClipboardList,
  IconGenderFemale,
  IconHeadset,
  IconHomeEdit,
  IconLicense,
  IconMasksTheater,
  IconUserCircle,
} from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Trámites y Servicios',
  description:
    'Guía completa de trámites municipales en San Benito. Licencias de conducir, catastro, rentas, habilitaciones, obras privadas y más servicios municipales.',
  keywords: [
    'tramites municipales',
    'licencia de conducir',
    'catastro',
    'rentas municipales',
    'habilitaciones comerciales',
    'obras privadas',
    'servicios municipales',
    'gestiones municipales',
    'mesa de entrada',
  ],
  url: '/tramites',
})

// Definición de las secciones de trámites con sus iconos y enlaces
const tramites = [
  {
    title: 'Licencia de Conducir',
    icon: IconLicense,
    link: '/tramites/licencia',
    description: 'Información sobre trámites de licencias de conducir',
  },
  {
    title: 'Habilitaciones Comerciales',
    icon: IconBuildingStore,
    link: '/tramites/habilitaciones',
    description: 'Requisitos y procedimientos para habilitaciones comerciales',
  },
  {
    title: 'Rentas',
    icon: IconCash,
    link: '/tramites/rentas',
    description: 'Información sobre impuestos y tasas municipales',
  },
  {
    title: 'Centro de Atención Al Vecino',
    icon: IconHeadset,
    link: '/tramites/cav',
    description: 'Gestión de reclamos y atención ciudadana',
  },
  {
    title: 'Área Mujer y Género',
    icon: IconGenderFemale,
    link: '/tramites/area-mujer',
    description: 'Servicios y asistencia del área de mujer y género',
  },
  {
    title: 'Obras Privadas',
    icon: IconBuilding,
    link: '/tramites/obras-privadas',
    description: 'Trámites relacionados con construcciones y proyectos',
  },
  {
    title: 'Catastro Municipal',
    icon: IconHomeEdit,
    link: '/tramites/catastro',
    description: 'Información sobre presentación de trámites generales',
  },
  {
    title: 'Mesa de Entrada',
    icon: IconClipboardList,
    link: '/tramites/mesa-de-entrada',
    description: 'Información sobre presentación de trámites generales',
  },
  {
    title: 'Punto Digital - Biblioteca',
    icon: IconBook,
    link: '/tramites/punto-digital-biblioteca',
    description: 'Talleres y actividades en la Biblioteca Municipal',
  },
  {
    title: 'Talleres Culturales',
    icon: IconMasksTheater,
    link: '/tramites/talleres-culturales',
    description: 'Información sobre talleres artísticos municipales',
  },
  {
    title: 'Actividades Deportivas',
    icon: IconBallFootball,
    link: '/tramites/actividades-deportivas',
    description: 'Talleres deportivos y recreativos municipales',
  },
  {
    title: 'CIC Barrio San Pedro',
    icon: IconBuildingCommunity,
    link: '/tramites/cic-barrio-san-pedro',
    description: 'Actividades y talleres en el Centro Integrador Comunitario',
  },
  {
    title: 'Área de Producción y Empleo',
    icon: IconBriefcase,
    link: '/tramites/produccion-empleo',
    description: 'Programas y servicios para el desarrollo productivo y laboral.',
  },
  {
    title: 'Recursos Humanos',
    icon: IconUserCircle,
    link: 'http://sigem.sanbenito.gob.ar/personal/personal.aspx',
    description: 'Recibos de sueldo y certificación de haberes para empleados municipales',
  },
  {
    title: 'Agenda Cultural',
    icon: IconCalendarEvent,
    link: '/agenda',
    description: 'Eventos culturales, artísticos y recreativos de la ciudad',
  },
  {
    title: 'Área de Tercera Edad y Discapacidad',
    icon: IconAccessible,
    link: '/tramites/tercera-edad-discapacidad',
    description: 'Servicios y asistencia para personas mayores y personas con discapacidad',
  },
  {
    title: 'NIDO',
    icon: IconBuildingCommunity,
    link: '/tramites/nido',
    description: 'Núcleo de innovación y Desarrollo de Oportunidades',
  },
]

export default function PageTramites() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Trámites y Servicios" />

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
