import { IconCalendar, IconInfoCircle, IconMail, IconMapPin, IconPhone } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Área de Tercera Edad y Discapacidad - San Benito',
}

export default function PageTerceraEdadDiscapacidad() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Área de Tercera Edad y Discapacidad</h1>
            <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="prose max-w-none">
            <p className="text-base-content text-lg">
              Desde el municipio de San Benito, a través del Área de Tercera Edad y Discapacidad
              trabajamos con el compromiso de garantizar y promover los derechos de las personas
              mayores y de las personas con discapacidad. Nuestro accionar se fundamenta en la
              Convención Interamericana sobre la Protección de los Derechos Humanos de las Personas
              Mayores y la Convención Internacional sobre los Derechos de las Personas con
              Discapacidad.
            </p>

            <div className="card bg-base-200 mt-6 shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-primary">Nuestro Equipo</h3>
                <ul className="text-base-content list-disc space-y-2 pl-5">
                  <li className="hover:text-primary transition-colors duration-300">
                    Zampieri, Ana María - Psicopedagoga - Coordinadora del área
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Petrosino, Natalia - Lic. en Terapia Ocupacional
                  </li>
                  <li className="hover:text-primary transition-colors duration-300">
                    Romero, Melisa - Pasante de la Lic. en Trabajo Social
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-base-200 mt-6 flex flex-col items-center justify-between rounded-lg p-4 transition-all duration-300 hover:shadow-lg md:flex-row">
              <div className="mb-4 md:mb-0">
                <h3 className="text-primary text-lg font-semibold">Horarios de Atención</h3>
                <div className="text-base-content mt-2 flex items-center">
                  <IconCalendar size={20} className="text-primary mr-2" />
                  <p>Lunes a Viernes de 7 a 13hs</p>
                </div>
              </div>
            </div>

            <div className="bg-base-200 mt-6 flex flex-col items-center justify-between rounded-lg p-4 transition-all duration-300 hover:shadow-lg md:flex-row">
              <div className="mb-4 md:mb-0">
                <h3 className="text-primary text-lg font-semibold">Ubicación</h3>
                <div className="text-base-content mt-2 flex items-center">
                  <IconMapPin size={20} className="text-primary mr-2" />
                  <p>
                    Edificio de la Dirección de Desarrollo Social y Comunitario (acción social),
                    ubicado en calle Bvad. Basavilbaso N° 1030.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-base-200 mt-6 grid grid-cols-1 gap-4 rounded-lg p-4 transition-all duration-300 hover:shadow-lg md:grid-cols-2">
              <div>
                <h3 className="text-primary text-lg font-semibold">Contacto</h3>
                <div className="text-base-content mt-2 flex items-center">
                  <IconPhone size={20} className="text-primary mr-2" />
                  <a href="https://wa.me/+543433027297" className="hover:text-primary transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                    Teléfono: 343-3027297
                  </a>
                </div>
                <div className="text-base-content mt-2 flex items-center">
                  <IconMail size={20} className="text-primary mr-2" />
                  <a href="mailto:adultosmayoresydiscapacidadsb@gmail.com" className="hover:text-primary transition-colors duration-300">
                    Mail: adultosmayoresydiscapacidadsb@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="bg-base-200 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center">
                  <IconInfoCircle size={24} className="text-primary mr-2" />
                  <h3 className="text-primary text-xl font-semibold">Formulario de Relevamiento</h3>
                </div>
                <p className="mt-2">
                  Complete el siguiente formulario para el relevamiento de personas con
                  discapacidad:
                </p>
                <div className="mt-4 flex justify-center">
                  <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLScmAJA6BYQWP403mdjR8p6Xb6pb5gnSVlwSnp7kL0duXh8XwA/viewform?sfnsn=scwspmo"
                    className="btn btn-primary gap-2 transition-transform duration-300 hover:scale-105"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Formulario de Relevamiento de Personas con Discapacidad
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-primary mb-4 text-center text-xl font-semibold">
                Video en Lengua de Señas Argentina (LSA)
              </h3>
              <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                {/* Reemplazar con el video en LSA cuando esté disponible */}
                <div className="bg-base-200 flex h-full w-full items-center justify-center p-6 text-center">
                  <p className="text-base-content">Video en LSA próximamente disponible</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
