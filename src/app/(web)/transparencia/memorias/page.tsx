import Link from 'next/link'

export default function MemoriasPage() {
  return (
    <main className="container mx-auto p-6">
      <section className="hero bg-base-200 rounded-lg p-10 text-center shadow-lg">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-5xl font-bold">Memorias del Intendente</h1>
            <p className="mt-4 text-lg leading-relaxed">
              Los discursos de apertura de cada año reflejan los logros, desafíos y objetivos de la
              gestión municipal. Aquí podrás acceder a los documentos históricos que marcan el rumbo
              de nuestra ciudad.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-6">
        <div className="bg-base-100 rounded-lg p-8 shadow-md">
          <h2 className="mb-6 text-3xl font-semibold">Documentos Disponibles</h2>
          <p className="mb-6 text-lg">
            Selecciona el año que deseas consultar para acceder al documento completo:
          </p>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { year: '2024', url: '/memorias/memoria_2024.pdf' },
              { year: '2023', url: '/memorias/memoria_2023.pdf' },
            ].map((memoria, index) => (
              <Link
                key={index}
                href={memoria.url}
                target="_blank"
                className="bg-base-200 rounded-lg p-6 text-center shadow-md transition-all hover:bg-primary hover:text-primary-content hover:shadow-lg"
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <span className="text-3xl font-bold">{memoria.year}</span>
                  <span className="text-sm">Memoria Anual</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-8 shadow-md">
          <h2 className="mb-4 text-3xl font-semibold">Importancia de las Memorias</h2>
          <p className="text-lg leading-relaxed">
            Las memorias anuales del Intendente son documentos oficiales que presentan un balance
            detallado de la gestión municipal. Incluyen información sobre obras realizadas, 
            proyectos en curso, estado financiero del municipio y planes futuros para el desarrollo
            de San Benito.
          </p>
        </div>
      </section>
    </main>
  )
}
