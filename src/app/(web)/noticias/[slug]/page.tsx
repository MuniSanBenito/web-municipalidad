import { basePayload } from '@/web/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Archivo } from '@/payload-types'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string }>
}

export default async function PageNoticia({ params }: Props) {
  const { slug } = await params

  const { docs } = await basePayload.find({
    collection: 'noticias',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!docs.length) return <div className="text-error py-20 text-center">Noticia no encontrada</div>

  const noticia = docs[0]
  const fechaPublicacion = new Date(noticia.createdAt).toLocaleDateString('es-AR')
  console.log(noticia)
  if (noticia.is_old) {
    return (
      <main className="bg-base-100 min-h-screen">
        {/* Portada */}
        {noticia.portada && (
          <div className="relative h-96 w-full">
            <img
              src={
                typeof noticia.portada === 'string'
                  ? noticia.portada
                  : noticia.portada?.url || '/images/placeholder.jpg'
              }
              alt={
                typeof noticia.portada === 'string'
                  ? 'Portada de la noticia'
                  : noticia.portada?.alt || 'Portada de la noticia'
              }
              className="h-96 w-full object-cover"
            />
          </div>
        )}

        {/* Título y fecha */}
        <div className="container mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <h1 className="text-primary mb-2 text-4xl font-bold">{noticia.titulo}</h1>
          <div className="text-base-content/80 text-sm">Publicado el: {fechaPublicacion}</div>
        </div>

        {/* Contenido */}
        <section className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div
            dangerouslySetInnerHTML={{ __html: noticia.contenido_old ?? '' }}
            className="prose lg:prose-lg text-base-content"
          />
        </section>

        {/* Archivos adjuntos */}
        {noticia.archivos && noticia.archivos.length > 0 && (
          <section className="container mx-auto max-w-4xl px-4 pb-8 sm:px-6">
            <h2 className="text-primary mb-4 text-2xl font-bold">Archivos adjuntos</h2>
            <div className="space-y-2">
              {noticia.archivos.map((archivo: string | Archivo, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  <a
                    href={typeof archivo === 'string' ? archivo : archivo.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {typeof archivo === 'string' ? 'Archivo adjunto' : archivo.filename || 'Archivo adjunto'}
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    )
  }

  // Versión para noticias nuevas (no old)
  return (
    <main className="bg-base-100 min-h-screen">
      {/* Portada */}
      {noticia.portada && (
        <div className="w-full">
          <img
            src={
              typeof noticia.portada === 'string'
                ? noticia.portada
                : noticia.portada?.url || '/images/placeholder.jpg'
            }
            alt={
              typeof noticia.portada === 'string'
                ? 'Portada de la noticia'
                : noticia.portada?.alt || 'Portada de la noticia'
            }
            className="h-96 w-full object-cover"
          />
        </div>
      )}

      {/* Título y fecha */}
      <div className="container mx-auto max-w-4xl px-4 py-4 sm:px-6">
        <h1 className="text-primary mb-2 text-4xl font-bold">{noticia.titulo}</h1>
        <div className="text-base-content/80 text-sm">Publicado el: {fechaPublicacion}</div>
      </div>

      {/* Contenido */}
      <section className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="prose-lg">
          <RichText data={noticia.contenido!} className="space-y-6" />
        </div>
      </section>

      {/* Archivos adjuntos */}
      {noticia.archivos && noticia.archivos.length > 0 && (
        <section className="container mx-auto max-w-4xl px-4 pb-8 sm:px-6">
          <h2 className="text-primary mb-4 text-2xl font-bold">Archivos adjuntos</h2>
          <div className="space-y-2">
            {noticia.archivos.map((archivo: string | Archivo, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <a
                  href={typeof archivo === 'string' ? archivo : archivo.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {typeof archivo === 'string' ? 'Archivo adjunto' : archivo.filename || 'Archivo adjunto'}
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
