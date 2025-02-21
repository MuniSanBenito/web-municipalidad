import Link from 'next/link'

export default function MemoriasPage() {
  return (
    <div>
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
    </div>
  )
}
