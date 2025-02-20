'use client'

import Link from 'next/link'

export default function EstructuraMunicipal() {
  return (
    <main className="bg-base-100 min-h-screen p-6">
      <section className="hero bg-base-200 rounded-lg p-10 text-center shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Nuestra Visión</h1>
          <p className="mt-4 text-lg">
            La estructura municipal define la organización y funcionamiento de las distintas áreas y
            dependencias del gobierno local. Aquí puedes consultar el organigrama oficial.
          </p>
        </div>
      </section>
      <section className="container mx-auto my-10 rounded-lg bg-white p-2 text-center align-middle shadow-lg">
        <Link href="/documents/organigrama.pdf" target="_blank" className="btn btn-primary">
          Descargar Estructura Municipal
        </Link>
      </section>
      <section className="mt-12 text-center">
        <div className="container">
          <h2 className="mb-4 text-2xl font-semibold">Vista Previa</h2>
          <div className="flex justify-center">
            <iframe
              src="/documents/organigrama.pdf"
              width="800"
              height="500"
              className="rounded-lg border border-gray-300 shadow-lg"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  )
}
