import { IconArrowLeft, IconDownload, IconUsers } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Inscripción Municipal de Profesional - Obras Privadas - San Benito',
}

export default function PageInscripcionMunicipal() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Obras Privadas</h1>
            <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
            <h2 className="mt-4 text-xl font-semibold md:text-2xl">
              Inscripción Municipal de Profesional
            </h2>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg">
          <h2 className="text-primary mb-6 text-center text-2xl font-semibold md:text-3xl">
            Documentación Necesaria
          </h2>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <ul className="list-disc space-y-3 pl-5 text-base md:text-lg">
                <li>
                  Formulario de Inscripción/Ratificación.{' '}
                  <a
                    href="/documents/FP-INSCRIPCION-PROFESIONAL.pdf"
                    className="link link-primary"
                    target="_blank"
                    download
                  >
                    Descargar Formulario
                  </a>
                </li>
                <li>Constancia de pago de inscripción/Ratificación.</li>
                <li>Fotocopia DNI.</li>
                <li>
                  Constancia ratificación de matrícula expedida por el Colegio de Profesionales
                  correspondiente.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/documents/FP-INSCRIPCION-PROFESIONAL.pdf"
              className="btn btn-primary w-full gap-2 sm:w-auto"
              target="_blank"
              download
            >
              <IconDownload size={20} />
              <span>Descargar Formulario</span>
            </a>
            <Link
              href="/tramites/obras-privadas/profesionales-matriculados"
              className="btn btn-secondary w-full gap-2 sm:w-auto"
            >
              <IconUsers size={20} />
              <span>Ver Profesionales Habilitados</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <Link href="/tramites/obras-privadas" className="btn btn-outline gap-2">
          <IconArrowLeft size={20} />
          <span>Volver a Obras Privadas</span>
        </Link>
      </div>
    </main>
  )
}
