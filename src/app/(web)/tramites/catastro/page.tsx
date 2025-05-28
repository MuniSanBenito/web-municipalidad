import { IconBuildingCommunity, IconMap2, IconRulerMeasure } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Catastro Municipal - San Benito',
}

export default function PageCatastro() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Catastro Municipal</h1>
            <p className="mt-4 text-base leading-relaxed md:text-lg">
              El área de Catastro Municipal se encarga de mantener actualizado el registro de propiedades,
              realizar mediciones y valuaciones, y gestionar la información territorial del municipio para
              garantizar una planificación urbana eficiente.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold md:text-3xl">
            Servicios Disponibles
          </h2>

          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
            <Link
              href="#"
              className="btn btn-primary gap-2 shadow-md transition-transform hover:scale-105"
            >
              <IconMap2 size={20} />
              <span>Consulta Catastral</span>
            </Link>

            <Link
              href="#"
              className="btn gap-2 shadow-md transition-transform hover:scale-105"
              style={{ backgroundColor: '#cbc846' }}
            >
              <IconRulerMeasure size={20} />
              <span>Medición y Relevamiento</span>
            </Link>

            <Link
              href="#"
              className="btn btn-secondary gap-2 shadow-md transition-transform hover:scale-105"
            >
              <IconBuildingCommunity size={20} />
              <span>Certificados Catastrales</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}