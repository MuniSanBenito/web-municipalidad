import { generateMetadata as generateSEOMetadata } from '@/web/lib/metadata'
import {
  IconCalendar,
  IconCar,
  IconCertificate,
  IconCheck,
  IconGift,
  IconHeart,
  IconHeartHandshake,
  IconLeaf,
  IconMail,
  IconMapPin,
  IconPhone,
  IconReceipt,
  IconScissors,
  IconUsers,
  IconWheelchair,
} from '@tabler/icons-react'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Sección Acción Social',
  description:
    'Sección Acción Social de la Municipalidad de San Benito. Asistencia a familias vulnerables, subsidios, traslados para personas con discapacidad, programas alimentarios y más.',
  keywords: [
    'accion social',
    'trabajo social',
    'subsidios municipales',
    'traslados discapacidad',
    'pensiones',
    'programas alimentarios',
    'ropero comunitario',
    'el carretel',
    'san benito',
  ],
  url: '/tramites/accion-social',
})

const servicios = [
  {
    titulo: 'Políticas Alimentarias',
    icon: IconLeaf,
    items: [
      'Entrega de semillas (primavera/verano y otoño/invierno)',
      'Incorporación a Módulos Alimentarios',
      'Incorporación a Comedores Municipales',
      'Gestión de Tarjeta Social por Riesgo Social',
    ],
  },
  {
    titulo: 'Gestión de Subsidios',
    icon: IconReceipt,
    items: [
      'Por servicio atmosférico',
      'Por conexión cloacal',
      'Por subsistencia',
      'Por materiales de construcción',
      'Por solicitud de medicamentos',
      'Por fallecimiento',
    ],
  },
  {
    titulo: 'Programas Nacionales, Provinciales y Municipales',
    icon: IconCertificate,
    items: ['Ley Provincial N° 4035', 'Pensión Nacional No Contributiva', 'Inscripción IAPV'],
  },
  {
    titulo: 'Ayudas Directas',
    icon: IconGift,
    items: ['Pañales descartables', 'Nylon', 'Colchones', 'Frazadas', 'Otros elementos'],
  },
  {
    titulo: 'Salud Animal',
    icon: IconHeart,
    items: ['Operativos de castración', 'Vacunación antirrábica y desparasitaria'],
  },
  {
    titulo: 'Taller "El Carretel" y Ropero Comunitario',
    icon: IconScissors,
    items: ['Gestión de Programa "Bienvenido Bebé"', 'Ropero comunitario'],
  },
]

const equipo = [
  { nombre: 'Sieber Stella', rol: 'Coordinadora de Sección Acción Social' },
  { nombre: 'Leiva Laura', rol: 'Lic. en Trabajo Social' },
  { nombre: 'Nosmor Silvia', rol: 'Lic. en Trabajo Social' },
  {
    nombre: 'Franco Romina · Riquelme Jacqueline · Villalba Milagros · Vogel Lucila',
    rol: 'Administración - Pasantes Lic. en Trabajo Social ',
  },
  { nombre: 'Pasantes', rol: 'Lic. en Trabajo Social' },
]

const requisitosTraslado = [
  'Tener domicilio en San Benito',
  'Fotocopia de DNI del solicitante',
  'Pedido o turno médico',
  'No contar con cobertura de obra social',
  'Tener Certificado Único de Discapacidad (CUD) o constancia que acredite el padecimiento',
  'Solicitar el traslado con una anticipación de 24/48 hs (sin excepción)',
]

export default function PageAccionSocial() {
  return (
    <main className="container mx-auto px-4 py-6">
      {/* Hero */}
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <IconHeartHandshake className="text-primary mx-auto mb-4" size={60} stroke={1.5} />
            <h1 className="text-3xl font-bold md:text-5xl">Sección Acción Social</h1>
            <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="prose max-w-none">
            {/* Descripción */}
            <p className="text-base-content text-lg">
              Desde la Sección Acción Social tenemos como principales objetivos la asistencia a las
              familias más vulnerables de San Benito, fomentando la promoción y reparación de
              derechos. Articulamos acciones entre las diferentes áreas municipales y organismos
              provinciales y nacionales, abordando de manera interdisciplinaria situaciones
              familiares complejas, asesorando, acompañando y orientando.
            </p>

            {/* Áreas internas */}
            <div className="card bg-base-200 mt-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-primary">Áreas de la Sección</h3>
                <ul className="text-base-content list-disc space-y-2 pl-5">
                  <li className="hover:text-primary transition-colors duration-300">
                    Área de Trabajo Social
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Área de Pensiones
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Taller de Costura y Ropero Municipal "El Carretel"
                  </li>
                </ul>
              </div>
            </div>

            {/* Servicios */}
            <h2 className="text-primary mt-8 text-2xl font-bold">Servicios que brindamos</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {servicios.map((servicio, index) => (
                <div
                  key={index}
                  className="card bg-base-200 shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <div className="card-body">
                    <div className="flex items-center gap-3">
                      <servicio.icon className="text-primary shrink-0" size={24} />
                      <h3 className="card-title text-base">{servicio.titulo}</h3>
                    </div>
                    <ul className="text-base-content mt-2 space-y-1 text-sm">
                      {servicio.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <IconCheck
                            className="text-success mt-0.5 shrink-0"
                            size={16}
                            stroke={2.5}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Traslados */}
            <div className="bg-base-200 mt-8 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <IconCar className="text-primary shrink-0" size={28} />
                <h3 className="text-primary text-xl font-semibold">
                  Traslados para Personas con Discapacidad
                </h3>
              </div>
              <p className="text-base-content mt-3">
                Servicio de traslado en vehículo adaptado para personas que certifiquen alguna
                discapacidad o padecimiento de salud. También se brinda la prestación de la{' '}
                <strong>Tarjeta SUBE</strong>.
              </p>

              <div className="mt-4">
                <h4 className="font-semibold">Requisitos:</h4>
                <ul className="mt-2 space-y-2">
                  {requisitosTraslado.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <IconCheck className="text-success mt-0.5 shrink-0" size={16} stroke={2.5} />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/543435107410"
                  className="btn btn-success gap-2 transition-transform duration-300 hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconPhone size={18} />
                  Reservar traslado por WhatsApp
                </a>
              </div>
            </div>

            {/* Banco ortopédico */}
            <div className="bg-base-200 mt-6 flex items-start gap-4 rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg">
              <IconWheelchair className="text-primary mt-1 shrink-0" size={28} />
              <div>
                <h3 className="text-primary text-lg font-semibold">
                  Banco de Elementos Ortopédicos
                </h3>
                <p className="text-base-content mt-1 text-sm">
                  Prestación de elementos ortopédicos en comodato para quienes los necesiten.
                </p>
              </div>
            </div>

            {/* Equipo */}
            <div className="card bg-base-200 mt-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="card-body">
                <div className="flex items-center gap-3">
                  <IconUsers className="text-primary" size={24} />
                  <h3 className="card-title text-primary">Nuestro Equipo</h3>
                </div>
                <ul className="text-base-content mt-2 list-disc space-y-2 pl-5">
                  {equipo.map((integrante, i) => (
                    <li key={i} className="hover:text-primary transition-colors duration-300">
                      <span className="font-medium">{integrante.nombre}</span>{' '}
                      <span className="text-base-content/70">— {integrante.rol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contacto */}
            <div className="bg-base-200 mt-6 grid grid-cols-1 gap-4 rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg md:grid-cols-2">
              <div>
                <h3 className="text-primary text-lg font-semibold">Contacto</h3>
                <div className="text-base-content mt-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <IconPhone size={20} className="text-primary shrink-0" />
                    <a
                      href="https://wa.me/543435107410"
                      className="hover:text-primary transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      343 - 5107410
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconMail size={20} className="text-primary shrink-0" />
                    <a
                      href="mailto:areatrabajosocialsb@gmail.com"
                      className="hover:text-primary transition-colors duration-300"
                    >
                      areatrabajosocialsb@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconMapPin size={20} className="text-primary shrink-0" />
                    <span>Basavilbaso 1030</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconCalendar size={20} className="text-primary shrink-0" />
                    <span>Lunes a Viernes de 7:00 a 13:00 hs</span>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-start md:justify-end">
                <a
                  href="https://wa.me/543435107410"
                  className="btn btn-success gap-2 transition-transform duration-300 hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconPhone size={20} />
                  WhatsApp: 343 - 5107410
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
