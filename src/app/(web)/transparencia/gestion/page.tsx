'use client'

import Link from 'next/link'

export default function GestionPage() {
  return (
    <main className="bg-base-100 min-h-screen p-6">
      <section className="hero bg-base-200 rounded-lg p-10 text-center shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Nuestra Visión</h1>
          <p className="mt-4 text-lg">
            Nuestra visión es la de una ciudad dispuesta a trabajar colectivamente por un futuro
            mejor de la comunidad.
          </p>
          <p className="mt-4 text-lg">
            <strong>El San Benito</strong> que se propone es un lugar con{' '}
            <strong>oportunidades</strong>, atractiva para visitantes,
            <strong>segura</strong>, bien comunicada y <strong>sustentable</strong>.
          </p>
        </div>
      </section>

      <section className="container mx-auto my-10 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Plan Estratégico de Gestión 2023-2027</h2>
        <p>
          La formulación estratégica se consolida en el{' '}
          <strong>Plan Estratégico de Gestión 2023-2027</strong>, el cual responde a los compromisos
          asumidos y busca diseñar un Modelo de Gobierno Municipal orientado a un{' '}
          <strong>desarrollo integral</strong> del Municipio de San Benito.
        </p>
      </section>

      <section className="container mx-auto my-10 rounded-lg bg-gray-100 p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Memorias del Intendente</h2>
        <p>
          Los discursos de apertura de cada año reflejan los logros, desafíos y objetivos de la
          gestión municipal.
        </p>
        <ul className="mt-4 space-y-2">
          <li>
            <Link
              href="/memorias/memoria_2024.pdf"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              Memoria del Intendente 2024
            </Link>
          </li>
          <li>
            <Link
              href="/memorias/memoria_2023.pdf"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              Memoria del Intendente 2023
            </Link>
          </li>
        </ul>
      </section>
    </main>
  )
}
