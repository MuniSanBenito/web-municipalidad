import { generateMetadata as generateSEOMetadata } from '@/web/lib/metadata'
import {
  IconBook,
  IconBriefcase,
  IconBuilding,
  IconBuildingBank,
  IconCertificate,
  IconClock,
  IconGavel,
  IconGenderFemale,
  IconHeadset,
  IconHeart,
  IconHome,
  IconMail,
  IconMapPin,
  IconPhone,
  IconPhoneCall,
  IconReceipt,
  IconShieldCheck,
  IconWheelchair,
} from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Telefonos Útiles - Teléfonos y Horarios',
  description:
    'Teléfonos útiles de la Municipalidad de San Benito. Números de emergencia, dependencias municipales, horarios de atención y contactos importantes.',
  keywords: [
    'telefonos utiles',
    'datos utiles',
    'emergencias',
    'numeros municipales',
    'horarios atencion',
    'contactos',
    'san benito',
  ],
  url: '/tramites/datos-utiles',
})

// Números de emergencia
const emergencias = [
  {
    nombre: 'Policía y Bomberos',
    telefono: '911',
    descripcion: 'Emergencias policiales y de bomberos',
    disponibilidad: '24 horas',
  },
  {
    nombre: 'Emergencias Médicas',
    telefono: '107',
    descripcion: 'Emergencias de salud',
    disponibilidad: '24 horas',
  },
  {
    nombre: 'Defensa Civil',
    telefono: '103',
    descripcion: 'Emergencias y catástrofes',
    disponibilidad: '24 horas',
  },
  {
    nombre: 'Violencia de Género',
    telefono: '144',
    descripcion: 'Atención y contención',
    disponibilidad: '24 horas',
  },
  {
    nombre: 'Ayuda al Niño',
    telefono: '102',
    descripcion: 'Protección de menores',
    disponibilidad: '24 horas',
  },
]

// Dependencias Municipales - COMPLETAR CON DATOS REALES DE SAN BENITO
const dependenciasMunicipales = [
  {
    area: 'Edificio Municipal',
    icon: IconBuilding,
    telefono: '343-4973454',
    horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
    direccion: 'Basavilbaso 1094',
    email: 'presidencia@munisanbenito.gov.ar',
  },
  {
    area: 'Centro de Atención al Vecino (CAV)',
    icon: IconHeadset,
    telefono: '343-6127013',
    horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
    direccion: 'Basavilbaso 1094',
    whatsapp: '543436127013',
  },
  {
    area: 'Direcion de desarollo social y comunitario',
    icon: IconHeart,
    telefono: '0343-4973644',
    horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
    direccion: 'Basavilbaso 1093',
    whatsapp: '5434345107410',
  },
  {
    area: 'Área de niñez, adolescencia y Familia',
    icon: IconHeart,
    telefono: '0343-4973644',
    horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
    direccion: 'Basavilbaso 1093',
    whatsapp: '543434594697',
  },
  {
    area: 'Juzgado de Faltas/Transito, Transporte e Inspecion General',
    icon: IconGavel,
    telefono: '0343-4973821',
    horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
    direccion: '25 de Mayo 944',
  },
  {
    area: 'Asesoria Legal y Tecnica',
    icon: IconBriefcase,
    horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
    direccion: 'Basavilbaso 1094',
    email: 'asesorialegalytecnica@sanbenito.gob.ar',
  },
  {
    area: 'Honorable concejo deliberante',
    icon: IconBuildingBank,
    telefono: '3434700140',
    horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
    direccion: 'Av.Friuli y Rivadavia',
    whatsapp: '543434700140',
  },
  {
    area: 'Rentas',
    icon: IconReceipt,
    whatsapp: '543436127015',
    telefono: '3436127015',
    horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
    direccion: 'Basavilbaso 1094',
    email: 'rentas@munisanbenito.gov.ar',
  },
  {
    area: 'Habilitaciones Comerciales',
    icon: IconCertificate,
    telefono: '3434537319',
    whatsapp: '543434537319',
    horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
    direccion: 'Basavilbaso 1094',
  },
  {
    area: 'Área de la Mujer y Genero',
    icon: IconGenderFemale,
    telefono: '3435204239',
    whatsapp: '543435204239',
    horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
    direccion: 'Buenos Aires y Misiones (edificio NIDO)',
  },
  {
    area: 'Tercera Edad y Discapacidad',
    icon: IconWheelchair,
    telefono: '3433027297',
    whatsapp: '543433027297',
    horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
    direccion: 'Basavilbaso 1093',
    email: 'adultosmayoresydiscapacidadsb@gmail.com',
  },
  {
    area: 'Obras privadas',
    icon: IconHome,
    telefono: '3434681033',
    whatsapp: '543434681033',
    horario: 'Lunes a Viernes de 7:00 a 13:00 hs',
    direccion: 'Basavilbaso 1094',
  },
  {
    area: 'Biblioteca - Punto digital',
    icon: IconBook,
    telefono: '3434503200',
    whatsapp: '543434503200',
    horario: 'Lunes a Viernes de 7:00 a 19:00 hs',
    direccion: 'Friuli 1051',
  },
  {
    area: 'Oficina de Produccion y Empleo',
    icon: IconBriefcase,
    telefono: '3434470379',
    whatsapp: '543434470379',
    horario: 'Lunes a Viernes de 8:00 a 13:00 hs',
    direccion: 'Buenos Aires y Misiones (edificio NIDO)',
  },
]

// Otros servicios útiles
const otrosServicios = [
  {
    nombre: 'Comisaría de San Benito',
    telefono: '(0343) 496-XXXX',
    horario: '24 horas',
  },
  {
    nombre: 'Centro de Salud',
    telefono: '(0343) 496-XXXX',
    horario: 'Lunes a Viernes de 7:00 a 19:00 hs',
  },
  {
    nombre: 'Centro de Salud CIC',
    telefono: '(0343) 496-XXXX',
    horario: 'Lunes a Viernes de 7:00 a 19:00 hs',
  },
  {
    nombre: 'ENERSA (Electricidad)',
    telefono: '0800-777-0080',
    horario: '24 horas',
  },
  {
    nombre: 'cooperativa de agua San Benito',
    telefono: '0800-888-7278',
    horario: 'Lunes a Viernes de 7:00 a 14:00 hs',
  },
]

export default function PageDatosUtiles() {
  return (
    <main className="container mx-auto px-4 py-6">
      {/* Header */}
      <section className="hero from-primary to-secondary mb-8 rounded-lg bg-linear-to-r p-6 text-center text-white shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <IconPhoneCall className="mx-auto mb-4" size={60} stroke={1.5} />
            <h1 className="text-3xl font-bold md:text-5xl">Telefonos Útiles</h1>
            <p className="mt-4 text-base leading-relaxed opacity-90 md:text-lg">
              Teléfonos de emergencia, dependencias municipales y servicios útiles de San Benito.
              Toda la información de contacto que necesitás en un solo lugar.
            </p>
          </div>
        </div>
      </section>

      {/* Números de Emergencia */}
      <section className="mb-10">
        <div className="mb-6 flex items-center gap-3">
          <IconShieldCheck className="text-neutral" size={32} />
          <h2 className="text-2xl font-bold md:text-3xl">Números de Emergencia</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {emergencias.map((item, index) => (
            <a
              key={index}
              href={`tel:${item.telefono}`}
              className="card bg-neutral/10 hover:bg-neutral/20 border-neutral/30 border-2 p-5 transition-all duration-300 hover:scale-102 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="bg-neutral flex h-14 w-14 items-center justify-center rounded-full text-white">
                  <IconPhone size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{item.nombre}</h3>
                  <p className="text-neutral text-2xl font-bold">{item.telefono}</p>
                  <p className="text-base-content/70 text-sm">{item.disponibilidad}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Dependencias Municipales */}
      <section className="mb-10">
        <div className="mb-6 flex items-center gap-3">
          <IconBuilding className="text-primary" size={32} />
          <h2 className="text-2xl font-bold md:text-3xl">Dependencias Municipales</h2>
        </div>

        <div className="bg-base-100 hidden overflow-hidden rounded-xl shadow-lg md:block">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="text-base">Área</th>
                  <th className="text-base">Teléfono</th>
                  <th className="hidden text-base md:table-cell">Horario</th>
                  <th className="hidden text-base lg:table-cell">Dirección</th>
                </tr>
              </thead>
              <tbody>
                {dependenciasMunicipales.map((dep, index) => (
                  <tr key={index} className="hover:bg-base-200 transition-colors">
                    <td>
                      <div className="flex items-center gap-3">
                        <dep.icon className="text-primary hidden sm:block" size={24} />
                        <span className="font-medium">{dep.area}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-wrap items-center gap-2">
                        {dep.telefono ? (
                          <a
                            href={`tel:${dep.telefono.replace(/[^0-9+]/g, '')}`}
                            className="text-primary font-semibold hover:underline"
                          >
                            {dep.telefono}
                          </a>
                        ) : (
                          <span className="text-base-content/50 text-sm italic"></span>
                        )}
                        {dep.whatsapp && (
                          <a
                            href={`https://wa.me/${dep.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-success btn-xs"
                          >
                            WhatsApp
                          </a>
                        )}
                        {dep.email && (
                          <a
                            href={`mailto:${dep.email}`}
                            className="btn btn-info btn-xs"
                            title={dep.email}
                          >
                            <IconMail size={14} />
                            Email
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <IconClock size={16} className="text-base-content/50" />
                        <span className="text-sm">{dep.horario}</span>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <IconMapPin size={16} className="text-base-content/50" />
                        <span className="text-sm">{dep.direccion}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vista móvil de dependencias */}
        <div className="space-y-3 md:hidden">
          {dependenciasMunicipales.map((dep, index) => (
            <div key={index} className="card bg-base-100 p-4 shadow">
              <div className="flex items-start gap-3">
                <dep.icon className="text-primary mt-1" size={24} />
                <div className="flex-1">
                  <h3 className="font-bold">{dep.area}</h3>
                  {dep.telefono ? (
                    <a
                      href={`tel:${dep.telefono.replace(/[^0-9+]/g, '')}`}
                      className="text-primary font-semibold"
                    >
                      {dep.telefono}
                    </a>
                  ) : (
                    <span className="text-base-content/50 text-sm italic">-</span>
                  )}
                  <p className="text-base-content/70 mt-1 flex items-center gap-1 text-sm">
                    <IconClock size={14} /> {dep.horario}
                  </p>
                  <p className="text-base-content/70 mt-1 flex items-center gap-1 text-sm">
                    <IconMapPin size={14} /> {dep.direccion}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {dep.whatsapp && (
                      <a
                        href={`https://wa.me/${dep.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success btn-xs"
                      >
                        WhatsApp
                      </a>
                    )}
                    {dep.email && (
                      <a href={`mailto:${dep.email}`} className="btn btn-info btn-xs">
                        <IconMail size={14} />
                        {dep.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Otros Servicios */}
      {/* <section className="mb-10">
        <div className="mb-6 flex items-center gap-3">
          <IconPhoneCall className="text-secondary" size={32} />
          <h2 className="text-2xl font-bold md:text-3xl">Otros Servicios</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {otrosServicios.map((servicio, index) => (
            <div
              key={index}
              className="card bg-base-100 flex flex-row items-center gap-4 p-5 shadow-md"
            >
              <div className="bg-secondary/10 flex h-12 w-12 items-center justify-center rounded-full">
                <IconPhone className="text-secondary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{servicio.nombre}</h3>
                <a
                  href={`tel:${servicio.telefono.replace(/[^0-9+]/g, '')}`}
                  className="text-primary text-lg font-semibold hover:underline"
                >
                  {servicio.telefono}
                </a>
                <p className="text-base-content/70 text-sm">{servicio.horario}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}
    </main>
  )
}
