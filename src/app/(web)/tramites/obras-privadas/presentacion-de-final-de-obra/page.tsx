import { IconArrowLeft, IconDownload } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Presentación de Final de Obra - Obras Privadas - San Benito',
}

export default function PageFinalizacionObra() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Obras Privadas</h1>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              Presentación de Final de Obra
            </h2>
            <p className="mt-4 text-base leading-relaxed md:text-lg">
              El certificado de Final de Obra es un documento oficial que acredita que la construcción 
              ha sido completada de acuerdo con los planos aprobados y cumple con todas las normativas 
              municipales vigentes.
            </p>
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
              <p className="mb-4">
                Para obtener el certificado de Final de Obra, es necesario completar el siguiente trámite:
              </p>
              <ul className="list-disc space-y-3 pl-5 text-lg">
                <li>
                  Presentar Planilla firmada por el Profesional de la Construcción por Mesa de
                  Entrada.
                </li>
                <li>
                  La planilla debe estar completa con todos los datos de la obra y del profesional responsable.
                </li>
                <li>
                  Una vez presentada la documentación, se coordinará una inspección final para verificar 
                  que la obra se haya realizado conforme a los planos aprobados.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-4 text-xl font-semibold">Información Importante</h3>
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
                  <p className="text-sm">
                    El certificado de Final de Obra es necesario para diversos trámites, como:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-sm">
                    <li>Actualización catastral</li>
                    <li>Conexión definitiva de servicios</li>
                    <li>Escrituración</li>
                    <li>Habilitaciones comerciales (en caso de locales)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="/documents/Planilla para Presentación de Final de Obra.pdf"
              className="btn btn-primary gap-2"
              target="_blank"
              download
            >
              <IconDownload size={20} />
              <span>Planilla para Presentación de Final de Obra</span>
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
