import { basePayload } from '@/web/lib/payload'
import Link from 'next/link'

export default async function MemoriasPage() {
  const { docs: memorias } = await basePayload.find({
    collection: 'memorias',
  })

  console.log(memorias)

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
            {memorias && memorias.length > 0 ? (
              memorias.map((memoria, index) => {
                const archivoUrl =
                  typeof memoria.archivo === 'string'
                    ? memoria.archivo
                    : memoria.archivo?.url || '#'
                const year = memoria.nombre || new Date(memoria.createdAt).getFullYear().toString()

                return (
                  <Link
                    key={index}
                    href={archivoUrl}
                    target="_blank"
                    className="bg-base-200 hover:bg-primary hover:text-primary-content rounded-lg p-6 text-center shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <span className="text-3xl font-bold">{year}</span>
                      <span className="text-sm">Memoria Anual</span>
                    </div>
                  </Link>
                )
              })
            ) : (
              <p className="col-span-3 text-center text-lg">
                No hay memorias disponibles actualmente.
              </p>
            )}
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
