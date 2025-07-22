import { basePayload } from '@/web/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Archivo, Noticia } from '@/payload-types'
import { IconArrowLeft, IconFileDownload } from '@tabler/icons-react'
import type { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = params

  const { docs } = await basePayload.find({
    collection: 'noticias',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const noticia = docs[0] as Noticia | undefined

  if (!noticia) {
    return {
      title: 'Noticia no encontrada',
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  const imageUrl =
    typeof noticia.portada === 'object' && noticia.portada?.url
      ? noticia.portada.url
      : '/images/og-image.png' // Fallback OG image

  return {
    title: noticia.titulo,
    description: noticia.descripcion,
    openGraph: {
      title: noticia.titulo,
      description: noticia.descripcion || '',
      images: [imageUrl, ...previousImages],
    },
  }
}

export default async function PageNoticia({ params }: Props) {
  const { slug } = params

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
  if (noticia.is_old) {
    return (
      <main className="bg-base-100 min-h-screen">
        {/* Portada */}
        {noticia.portada && (
          <div className="relative h-96 w-full">
            <Image
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
              fill
              priority
            />
          </div>
        )}

        {/* Título y fecha */}
        <div className="container mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <Link href="/noticias" className="btn btn-link mb-4 pl-0">
            <IconArrowLeft size={16} />
            Volver a Noticias
          </Link>
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
                  <IconFileDownload size={20} />
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
        <div className="relative h-96 w-full">
          <Image
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
            fill
            priority
          />
        </div>
      )}

      {/* Título y fecha */}
      <div className="container mx-auto max-w-4xl px-4 py-4 sm:px-6">
        <Link href="/noticias" className="btn btn-link mb-4 pl-0">
          <IconArrowLeft size={16} />
          Volver a Noticias
        </Link>
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
                <IconFileDownload size={20} />
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
