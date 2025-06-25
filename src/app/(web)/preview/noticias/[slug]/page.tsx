import { RefreshRouteOnSave } from '@/components/refresh-route-on-save'
import { YouTuveVideo } from '@/components/youtube-video'
import type { Imagen } from '@/payload-types'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

type PageParams = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: PageParams) {
  const { slug = 'home' } = await paramsPromise
  const payload = await getPayload({ config })

  const { docs: noticias } = await payload.find({
    collection: 'noticias',
    draft: true,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!noticias || !noticias.length || !noticias[0]) {
    return notFound()
  }

  const [noticia] = noticias
  const fechaPublicacion = new Date(noticia.createdAt).toLocaleDateString('es-AR')

  return (
    <>
      <RefreshRouteOnSave />
      <main className="bg-base-100 min-h-screen">
        {/* Portada */}
        {noticia.portada && (
          <div className="relative h-96 w-full">
            <img
              src={
                typeof noticia.portada === 'string'
                  ? noticia.portada
                  : (noticia.portada as Imagen)?.url || '/images/placeholder.jpg'
              }
              alt={
                typeof noticia.portada === 'string'
                  ? 'Portada de la noticia'
                  : (noticia.portada as Imagen)?.alt || 'Portada de la noticia'
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
          {noticia.is_old ? (
            <div
              dangerouslySetInnerHTML={{ __html: noticia.contenido_old ?? '' }}
              className="prose lg:prose-lg text-base-content"
            />
          ) : (
            <div className="prose-lg">
              {noticia.contenido && <RichText data={noticia.contenido} className="space-y-6" />}
            </div>
          )}

          <div className="mt-8 space-y-4">
            {noticia.youtube_videos?.map((video) => (
              <YouTuveVideo key={video.id} url={video.url} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
