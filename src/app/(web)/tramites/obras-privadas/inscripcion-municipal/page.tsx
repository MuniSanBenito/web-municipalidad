import { IconArrowLeft, IconDownload } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Inscripción Municipal de Profesional - Obras Privadas - San Benito',
}

export default function PageInscripcionMunicipal() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Obras Privadas</h1>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              Inscripción Municipal de Profesional
            </h2>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold md:text-3xl">
            Documentación Necesaria
          </h2>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <ul className="list-disc space-y-3 pl-5 text-lg">
                <li>Formulario de Inscripción/Ratificación.</li>
                <li>Constancia de pago de inscripción/Ratificación.</li>
                <li>Fotocopia DNI.</li>
                <li>
                  Constancia ratificación de matricula expedida por el colegio de Profesionales
                  correspondiente.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="/documents/FP-INSCRIPCION-PROFESIONAL.pdf"
              className="btn btn-primary gap-2"
              target="_blank"
              download
            >
              <IconDownload size={20} />
              <span>Formulario de Inscripción/Ratificación</span>
            </a>
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
