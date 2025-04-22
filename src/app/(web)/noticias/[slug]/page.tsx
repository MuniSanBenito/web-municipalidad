import { basePayload } from '@/web/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'

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
    </main>
  )
}
