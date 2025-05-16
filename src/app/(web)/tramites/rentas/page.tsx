import {
  IconBrandWhatsapp,
  IconDownload,
  IconExternalLink,
  IconMail,
  IconMapPin,
  IconPhone,
} from '@tabler/icons-react'
import Image from 'next/image'

export default function PageRentas() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Rentas Municipales</h1>
            <p className="mt-4 text-base leading-relaxed md:text-lg">
              La Dirección de Rentas se encarga de la recaudación de tasas y contribuciones
              municipales, brindando a los contribuyentes herramientas para facilitar el
              cumplimiento de sus obligaciones tributarias a través de nuestra plataforma web.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="http://181.228.27.231/ingresospublicos/ingresospublicos.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary gap-2"
              >
                <IconExternalLink size={20} />
                <span>Acceder a Gestión Tributaria</span>
              </a>
              <a
                href="https://wa.me/+543436127015"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary gap-2"
              >
                <IconBrandWhatsapp size={20} />
                <span>WhatsApp Rentas</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold md:text-3xl">
            Instructivos Gestión Tributaria
          </h2>

          <div className="card bg-base-200 mb-10 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-center text-xl font-semibold">
                Instrucciones Generación y Pago – Tasa Higiene, Profilaxis y Seguridad
              </h3>
              <div className="mt-4 flex justify-center">
                <a
                  href="/images/Instrucciones-Generacion-y-Pago-Tasa-Higiene-Profilaxis-y-Seguridad.webp"
                  className="btn btn-primary gap-2"
                  target="_blank"
                  download
                >
                  <IconDownload size={20} />
                  <span>Descargar Instructivo</span>
                </a>
              </div>
              <div className="mt-6 flex justify-center">
                <Image
                  src="/images/Instrucciones-Generacion-y-Pago-Tasa-Higiene-Profilaxis-y-Seguridad.webp"
                  alt="Instructivo para Tasa de Higiene, Profilaxis y Seguridad"
                  width={700}
                  height={900}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-center text-xl font-semibold">
                Instrucciones Pago – TGI y Obras Sanitarias
              </h3>
              <div className="mt-4 flex justify-center">
                <a
                  href="/images/Instrucciones-Pago-TGI-y-Obras-Sanitarias.webp"
                  className="btn btn-secondary gap-2"
                  target="_blank"
                  download
                >
                  <IconDownload size={20} />
                  <span>Descargar Instructivo</span>
                </a>
              </div>
              <div className="mt-6 flex justify-center">
                <Image
                  src="/images/Instrucciones-Pago-TGI-y-Obras-Sanitarias.webp"
                  alt="Instructivo para TGI y Obras Sanitarias"
                  width={700}
                  height={900}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold md:text-3xl">
            Información Importante
          </h2>

          <div className="alert alert-info shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 flex-shrink-0 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <h3 className="font-bold">Solicitud de Usuario y Contraseña</h3>
                <p className="text-sm">
                  Para acceder al sistema de Gestión Tributaria, debe contar con una cuenta
                  habilitada. Si no posee usuario y contraseña, envíe un correo electrónico a{' '}
                  <a
                    href="mailto:rentas@munisanbenito.gov.ar"
                    className="font-bold hover:underline"
                  >
                    rentas@munisanbenito.gov.ar
                  </a>{' '}
                  solicitando sus credenciales o contáctenos por WhatsApp al{' '}
                  <a
                    href="https://wa.me/+543436127015"
                    className="text-success font-bold hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    3436127015
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Tasas Municipales</h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Tasa General Inmobiliaria (TGI)</li>
                  <li>Tasa de Higiene, Profilaxis y Seguridad</li>
                  <li>Obras Sanitarias</li>
                  <li>Convenios de Pagos</li>
                  <li>Obras por Mejoras</li>
                </ul>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Contacto y Ubicación</h3>
                <div className="mt-2 space-y-3">
                  <p className="flex items-center gap-2">
                    <IconMapPin className="text-primary" size={20} />
                    <span>Edificio Municipal - Blvd. Basavilbaso 1094, San Benito</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <IconPhone className="text-primary" size={20} />
                    <span>(0343) 4973454</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <IconBrandWhatsapp className="text-success" size={20} />
                    <a
                      href="https://wa.me/+543436127015"
                      className="text-success hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      3436127015
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <IconMail className="text-primary" size={20} />
                    <a
                      href="mailto:rentas@munisanbenito.gov.ar"
                      className="text-primary hover:underline"
                    >
                      rentas@munisanbenito.gov.ar
                    </a>
                  </p>
                  <p className="mt-2">
                    <strong>Horario de Atención:</strong> Lunes a Viernes de 7:00 a 13:00 hs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
