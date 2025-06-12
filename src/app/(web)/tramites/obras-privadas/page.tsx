import {
  IconBuildingSkyscraper,
  IconCertificate,
  IconCopy,
  IconFileDescription,
} from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Obras Privadas - San Benito',
}

export default function PageObrasPrivadas() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Obras Privadas</h1>
            <p className="mt-4 text-base leading-relaxed md:text-lg">
              La Dirección de Obras Privadas se encarga de regular y controlar las construcciones
              dentro del municipio, garantizando el cumplimiento de las normativas vigentes y el
              desarrollo urbano ordenado.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold md:text-3xl">
            Trámites Disponibles
          </h2>

          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
            <Link
              href="/tramites/obras-privadas/inscripcion-municipal"
              className="btn btn-primary gap-2 shadow-md transition-transform hover:scale-105"
            >
              <IconCertificate size={20} />
              <span>Inscripción Municipal de Profesional</span>
            </Link>

            <Link
              href="/tramites/obras-privadas/presentacion-de-proyecto"
              className="btn gap-2 shadow-md transition-transform hover:scale-105"
              style={{ backgroundColor: '#cbc846' }}
            >
              <IconFileDescription size={20} />
              <span>Presentación de Proyecto</span>
            </Link>

            <Link
              href="/tramites/obras-privadas/presentacion-de-relevamiento"
              className="btn gap-2 shadow-md transition-transform hover:scale-105"
              style={{ backgroundColor: '#dfce45' }}
            >
              <IconCopy size={20} />
              <span>Presentación de Relevamiento</span>
            </Link>

            <Link
              href="/tramites/obras-privadas/presentacion-de-final-de-obra"
              className="btn btn-secondary gap-2 shadow-md transition-transform hover:scale-105"
            >
              <IconBuildingSkyscraper size={20} />
              <span>Presentación de Finalización de Obra</span>
            </Link>
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
                <h3 className="font-bold">Horarios de Atención</h3>
                <p className="text-sm">
                  Lunes a Viernes de 7:00 a 13:00 hs en el Edificio Municipal. Para consultas, puede
                  comunicarse al teléfono (0343) 4973454 o por correo a
                  <a
                    href="mailto:obrasprivadas@munisanbenito.gov.ar"
                    className="ml-1 font-bold hover:underline"
                  >
                    obrasprivadas@munisanbenito.gov.ar
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Requisitos Generales</h3>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Título de propiedad o boleto de compra-venta certificado</li>
                  <li>Plano de mensura visado por la Dirección de Catastro</li>
                  <li>Libre deuda municipal</li>
                  <li>Certificado de factibilidad de servicios</li>
                  <li>Planos firmados por profesional habilitado</li>
                </ul>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Normativa Aplicable</h3>
                <p>Las construcciones en el municipio de San Benito deben cumplir con:</p>
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>Código de Edificación Municipal</li>
                  <li>Ordenanza de Uso del Suelo</li>
                  <li>Reglamentaciones sobre retiros y factores de ocupación</li>
                  <li>Normativas de seguridad e higiene</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
