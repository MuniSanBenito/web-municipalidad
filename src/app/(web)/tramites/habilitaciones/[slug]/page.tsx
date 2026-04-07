import { basePayload } from '@/web/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string }>
}

export default async function PageHabilitaciones({ params }: Props) {
  const { slug } = await params

  // Decodificar el slug de la URL (para manejar espacios y caracteres especiales)
  const decodedSlug = decodeURIComponent(slug)

  // Query by nombre instead of slug since that's what we're using in the URL
  const { docs } = await basePayload.find({
    collection: 'habilitaciones',
    where: {
      nombre: {
        equals: decodedSlug,
      },
    },
  })

  // Si no se encuentra la habilitación, mostrar 404
  if (docs.length === 0) {
    return notFound()
  }

  const habilitacion = docs[0]

  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">{habilitacion.nombre}</h1>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-2xl font-semibold">Requisitos y Documentación</h2>

          {habilitacion.contenido && (
            <RichText data={habilitacion.contenido} className="prose max-w-none" />
          )}

          {/* Mostrar adjuntos si existen */}
          {habilitacion.adjuntos && habilitacion.adjuntos.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-xl font-semibold">Documentos Adjuntos</h3>
              <ul className="space-y-2">
                {habilitacion.adjuntos.map((adjunto: any, index: number) => {
                  // Check if adjunto is an object with url/filename, otherwise treat as string
                  const isArchivo =
                    typeof adjunto === 'object' && adjunto !== null && 'url' in adjunto
                  return (
                    <li key={index} className="bg-base-200 rounded-lg p-3">
                      {isArchivo ? (
                        <a
                          href={adjunto.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary flex items-center hover:underline"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          {adjunto.filename || `Documento ${index + 1}`}
                        </a>
                      ) : (
                        <span>
                          {typeof adjunto === 'string' ? adjunto : `Documento ${index + 1}`}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
