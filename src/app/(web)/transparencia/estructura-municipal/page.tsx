'use client'

import Link from 'next/link'

export default function EstructuraMunicipal() {
  return (
    <main className="container mx-auto p-6">
      <section className="hero bg-base-200 rounded-lg p-10 text-center shadow-lg">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-5xl font-bold">Estructura Municipal</h1>
            <p className="mt-4 text-lg leading-relaxed">
              La estructura municipal define la organización y funcionamiento de las distintas áreas y
              dependencias del gobierno local. Aquí puedes consultar el organigrama oficial.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-6">
        <div className="bg-base-100 rounded-lg p-8 shadow-md">
          <div className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-3xl font-semibold">Organigrama Municipal</h2>
            <p className="text-lg max-w-3xl text-center">
              El organigrama municipal representa la estructura jerárquica y funcional de nuestra administración.
              Puedes descargarlo o visualizarlo directamente desde esta página.
            </p>
            <Link 
              href="/documents/organigrama.pdf" 
              target="_blank" 
              className="btn btn-primary btn-lg"
            >
              Descargar Organigrama
            </Link>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-3xl font-semibold text-center">Vista Previa</h2>
          <div className="flex justify-center">
            <div className="w-full max-w-4xl overflow-hidden rounded-lg border border-base-300 shadow-lg">
              <iframe
                src="/documents/organigrama.pdf"
                width="100%"
                height="600"
                className="rounded-lg"
                title="Organigrama Municipal de San Benito"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
