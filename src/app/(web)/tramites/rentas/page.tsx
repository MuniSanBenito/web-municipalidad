import { HeroTramite } from '@/components/tramites/HeroTramite'
import { SeccionContenidoTramite } from '@/components/tramites/SeccionContenidoTramite'
import { EnlaceExternoConIcono } from '@/components/ui/EnlaceExternoConIcono'
import {
  IconBrandWhatsapp,
  IconDownload,
  IconMail,
  IconMapPin,
  IconPhone,
  IconClockHour4, // Added for consistency
} from '@tabler/icons-react'
import Image from 'next/image'

export default function PageRentas() {
  const descripcionIntro = (
    <>
      <p className="mt-4 text-base leading-relaxed md:text-lg">
        La Dirección de Rentas se encarga de la recaudación de tasas y contribuciones municipales,
        brindando a los contribuyentes herramientas para facilitar el cumplimiento de sus
        obligaciones tributarias a través de nuestra plataforma web.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <EnlaceExternoConIcono
          href="http://181.228.27.231/ingresospublicos/ingresospublicos.aspx"
          className="btn btn-primary gap-2"
        >
          Acceder a Gestión Tributaria
        </EnlaceExternoConIcono>
        <a 
          href="https://wa.me/5493436127015" // Standardized number
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary gap-2"
        >
          <IconBrandWhatsapp size={20} />
          <span>WhatsApp Rentas</span> {/* Text here is fine as it's a main button label */}
        </a>
      </div>
    </>
  )

  return (
    <main className="container mx-auto px-4 py-6">
      <HeroTramite titulo="Rentas Municipales" descripcionIntro={descripcionIntro} />

      <SeccionContenidoTramite tituloSeccion="Instructivos Gestión Tributaria">
        {/* Contenido de instructivos sin cambios, se omite por brevedad */}
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
            <details className="mt-4 rounded-lg bg-base-100 p-4 shadow">
              <summary className="cursor-pointer font-medium text-primary hover:underline">
                Ver instrucciones textuales (Tasa Higiene, Profilaxis y Seguridad)
              </summary>
              <div className="prose prose-sm max-w-none pt-2 dark:prose-invert">
                <p className="font-bold">
                  NOTA: Este es un contenido placeholder. Reemplazar con la transcripción real de la
                  imagen.
                </p>
                <h4>Guía para Generación y Pago de Tasa de Higiene, Profilaxis y Seguridad</h4>
                <ol>
                  <li>
                    <strong>Acceso al Sistema:</strong>
                    <ul>
                      <li>
                        Ingrese al portal de Gestión Tributaria: (dirección web si aplica).
                      </li>
                      <li>Seleccione la opción &quot;Tasas Municipales&quot;.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Identificación del Contribuyente:</strong>
                    <ul>
                      <li>Ingrese su número de partida o CUIT.</li>
                      <li>Verifique sus datos personales y de la propiedad/comercio.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Selección de Tasa:</strong>
                    <ul>
                      <li>
                        Busque y seleccione &quot;Tasa de Higiene, Profilaxis y Seguridad&quot;.
                      </li>
                      <li>Indique el período que desea abonar.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Generación de Boleta:</strong>
                    <ul>
                      <li>Confirme los datos y genere la boleta de pago (VEP).</li>
                      <li>Anote el número de VEP o guárdelo.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Opciones de Pago:</strong>
                    <ul>
                      <li>
                        Pago Electrónico: (Detallar cómo pagar por home banking, Link Pagos, etc.,
                        según la imagen).
                      </li>
                      <li>
                        Pago Presencial: (Detallar lugares habilitados según la imagen, ej.
                        Rapipago, Tesorería).
                      </li>
                    </ul>
                  </li>
                </ol>
                <p>
                  <em>Información Adicional:</em> (Incluir fechas de vencimiento, contacto para
                  consultas, etc., si la imagen lo muestra).
                </p>
              </div>
            </details>
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
            <details className="mt-4 rounded-lg bg-base-100 p-4 shadow">
              <summary className="cursor-pointer font-medium text-primary hover:underline">
                Ver instrucciones textuales (TGI y Obras Sanitarias)
              </summary>
              <div className="prose prose-sm max-w-none pt-2 dark:prose-invert">
                <p className="font-bold">
                  NOTA: Este es un contenido placeholder. Reemplazar con la transcripción real de la
                  imagen.
                </p>
                <h4>Guía para Pago de Tasa General Inmobiliaria (TGI) y Obras Sanitarias</h4>
                <ol>
                  <li>
                    <strong>Obtención de la Boleta:</strong>
                    <ul>
                      <li>
                        Opción A: Boleta Electrónica (Ingresar al portal, ir a &quot;Consulta de
                        Deuda&quot;, descargar).
                      </li>
                      <li>Opción B: Boleta Física (Si aplica).</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Identificación de Datos de Pago:</strong>
                    <ul>
                      <li>Localice el código de pago electrónico.</li>
                      <li>Verifique monto y fecha de vencimiento.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Modalidades de Pago:</strong>
                    <ul>
                      <li>
                        Pago Online: (Home Banking, PagoMisCuentas, Link Pagos, Mercado Pago, según
                        la imagen).
                      </li>
                      <li>
                        Pago Presencial: (Bancos, Rapipago, Pago Fácil, Caja Municipal, según la
                        imagen).
                      </li>
                    </ul>
                  </li>
                </ol>
                <p>
                  <em>Recomendaciones:</em> (Pagar antes del vencimiento, conservar comprobante,
                  etc., si la imagen lo muestra).
                </p>
              </div>
            </details>
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
      </SeccionContenidoTramite>

      <SeccionContenidoTramite tituloSeccion="Información Importante">
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
                  href="https://wa.me/5493436127015" // Standardized number
                  className="text-success font-bold hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +54 9 343 612-7015 {/* Standardized display */}
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
                  <strong>Dirección:</strong> {/* Added label */}
                  <span>Edificio Municipal - Blvd. Basavilbaso 1094, San Benito</span>
                </p>
                <p className="flex items-center gap-2">
                  <IconPhone className="text-primary" size={20} />
                  <strong>Teléfono:</strong> {/* Added label */}
                  <a href="tel:03434973454" className="ml-1 hover:underline">(0343) 4973454</a>
                </p>
                <p className="flex items-center gap-2">
                  <IconBrandWhatsapp className="text-success" size={20} />
                  <strong>WhatsApp:</strong> {/* Added label */}
                  <a
                    href="https://wa.me/5493436127015" // Standardized number
                    className="ml-1 text-success hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +54 9 343 612-7015 {/* Standardized display */}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <IconMail className="text-primary" size={20} />
                  <strong>Correo Electrónico:</strong> {/* Added label */}
                  <a
                    href="mailto:rentas@munisanbenito.gov.ar"
                    className="ml-1 text-primary hover:underline"
                  >
                    rentas@munisanbenito.gov.ar
                  </a>
                </p>
                <p className="mt-2 flex items-center gap-2">
                  <IconClockHour4 className="text-primary" size={20} /> {/* Added icon */}
                  <strong>Horario de Atención:</strong> Lunes a Viernes de 7:00 a 13:00 hs
                </p>
              </div>
            </div>
          </div>
        </div>
      </SeccionContenidoTramite>
    </main>
  )
}
