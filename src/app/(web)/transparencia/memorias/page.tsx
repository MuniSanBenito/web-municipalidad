import { basePayload } from '@/web/lib/payload'
import { IconArrowLeft, IconDownload, IconFileText } from '@tabler/icons-react'
import Link from 'next/link'

export default async function MemoriasPage() {
  const { docs: memorias } = await basePayload.find({
    collection: 'memorias',
    sort: '-createdAt',
  })

  return (
    <main className="container mx-auto p-6">
      <Link
        href="/transparencia"
        className="btn btn-link text-primary mb-4 pl-0 hover:no-underline"
      >
        <IconArrowLeft size={18} />
        Volver a Transparencia
      </Link>
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

      <section className="mt-10">
        <div className="bg-base-100 rounded-lg p-8 shadow-md">
          <h2 className="mb-6 text-center text-3xl font-semibold">Documentos Disponibles</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {memorias && memorias.length > 0 ? (
              memorias.map((memoria) => {
                const archivoUrl =
                  typeof memoria.archivo === 'object' && memoria.archivo?.url
                    ? memoria.archivo.url
                    : '#'
                const year = memoria.nombre || new Date(memoria.createdAt).getFullYear().toString()

                return (
                  <Link
                    key={memoria.id}
                    href={archivoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`card bg-base-100 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${archivoUrl === '#' ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    <div className="card-body items-center text-center">
                      <span className="text-primary mb-4">
                        <IconFileText size={60} stroke={1.5} />
                      </span>
                      <h3 className="card-title text-2xl font-bold">{year}</h3>
                      <p className="text-base-content/70">Memoria Anual</p>
                      <div className="card-actions mt-4">
                        <span className="btn btn-primary btn-sm">
                          <IconDownload size={18} className="mr-2" />
                          Ver Documento
                        </span>
                      </div>
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

        <div className="bg-base-100 mt-10 rounded-lg p-8 shadow-md">
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
