import { basePayload } from '@/libs/payload'
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
              className="h-full w-full object-cover"
            />
            <div className="from-base-100 via-base-100/80 absolute right-0 bottom-0 left-0 bg-gradient-to-t to-transparent p-6">
              <div className="container mx-auto max-w-4xl">
                <h1 className="mb-2 text-4xl font-bold text-black">{noticia.titulo}</h1>
                <div className="text-sm text-black/80">Publicado el: {fechaPublicacion}</div>
              </div>
            </div>
          </div>
        )}

        {/* Contenido */}
        <section className="container mx-auto max-w-4xl py-8">
          <div
            dangerouslySetInnerHTML={{ __html: noticia.contenido_old ?? '' }}
            className="prose lg:prose-lg text-base-content" // Clases modificadas aquí
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
            className="h-full w-full object-cover"
          />
          <div className="from-base-100 via-base-100/80 absolute right-0 bottom-0 left-0 bg-gradient-to-t to-transparent p-6">
            <div className="container mx-auto max-w-4xl">
              <h1 className="mb-2 text-4xl font-bold text-black">{noticia.titulo}</h1>
              <div className="text-sm text-black/80">Publicado el: {fechaPublicacion}</div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido */}
      <section className="container mx-auto max-w-4xl py-8">
        <div className="prose-lg">
          <RichText data={noticia.contenido!} className="space-y-6" />
        </div>
      </section>
    </main>
  )
}
