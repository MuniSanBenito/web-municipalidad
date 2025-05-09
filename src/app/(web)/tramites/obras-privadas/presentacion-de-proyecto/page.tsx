import { IconArrowLeft, IconDownload } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Presentación de Proyecto - Obras Privadas - San Benito',
}

export default function PagePresentacionProyecto() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Obras Privadas</h1>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Presentación de Proyecto</h2>
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
              <p className="mb-4 font-bold">
                Presentar en una carpeta, en el orden que a continuación se detalla:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Carátula de Expediente.{' '}
                  <strong>
                    <em>Descargar.</em>
                  </strong>
                </li>
                <li>
                  Solicitud de Construcción por duplicado.{' '}
                  <strong>
                    <em>Descargar.</em>
                  </strong>
                </li>
                <li>
                  Acreditación de dominio: Fotocopia de Escritura, Boleto de compra o Reserva de
                  Compra
                </li>
                <li>Fotocopia: Plano de Mensura del Lote.</li>
                <li>Planilla de locales.</li>
                <li>
                  Plano de construcción en original transparente y cuatro copias:{' '}
                  <em>VISADO POR EL COLEGIO DE PROFESIONALES CORRESPONDIENTE:</em>
                  <ul className="mt-2 list-disc pl-5">
                    <li>Planta de cada piso acotado</li>
                    <li>Cortes: dos como mínimo</li>
                    <li>Fachada/s – Esc.:1:50</li>
                    <li>Planos y planillas estructuradas resistentes</li>
                    <li>Planos de instalación sanitaria</li>
                  </ul>
                </li>
                <li>Balance de superficie.</li>
                <li>Declaración jurada de ATER.</li>
                <li>Solicitud de número domiciliario.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-4 text-center text-xl font-semibold">
              <strong>PROFESIONALES:</strong>
              <br />
              El/los profesionales actuantes deberán presentar:
            </h3>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <ul className="list-disc space-y-2 pl-5">
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
          </div>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/documents/Caratula del Expediente.pdf"
              className="btn btn-primary gap-2"
              target="_blank"
              download
            >
              <IconDownload size={20} />
              <span>Caratula del Expediente</span>
            </a>
            <a
              href="/documents/Solicitud de Construcción.pdf"
              className="btn btn-primary gap-2"
              target="_blank"
              download
            >
              <IconDownload size={20} />
              <span>Solicitud de Construcción</span>
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
