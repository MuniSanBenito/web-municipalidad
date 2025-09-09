import type { Archivo, Noticia } from '@/payload-types'
import { generateStructuredData } from '@/web/lib/metadata'
import { basePayload } from '@/web/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { IconArrowLeft, IconFileDownload, IconNewsOff } from '@tabler/icons-react'
import type { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

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
      ? `https://sanbenito.gob.ar${noticia.portada.url}`
      : 'https://sanbenito.gob.ar/images/og-image.png' // Fallback OG image

  return {
    title: noticia.titulo,
    description:
      noticia.descripcion ||
      `Noticia publicada por la Municipalidad de San Benito: ${noticia.titulo}`,
    keywords: [
      'noticia',
      'san benito',
      'municipalidad',
      'actualidad',
      ...(noticia.titulo?.split(' ').slice(0, 5) || []),
    ],
    authors: [{ name: 'Municipalidad de San Benito' }],
    alternates: {
      canonical: `https://sanbenito.gob.ar/noticias/${slug}`,
    },
    openGraph: {
      title: noticia.titulo,
      description:
        noticia.descripcion ||
        `Noticia publicada por la Municipalidad de San Benito: ${noticia.titulo}`,
      url: `https://sanbenito.gob.ar/noticias/${slug}`,
      siteName: 'Municipalidad de San Benito',
      locale: 'es_AR',
      type: 'article',
      publishedTime: noticia.createdAt,
      modifiedTime: noticia.updatedAt,
      authors: ['Municipalidad de San Benito'],
      section: 'Noticias',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: noticia.titulo,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: noticia.titulo,
      description:
        noticia.descripcion ||
        `Noticia publicada por la Municipalidad de San Benito: ${noticia.titulo}`,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
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

  if (!docs.length) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <IconNewsOff size={64} className="text-base-content/30 mb-4" />
        <p className="text-2xl font-bold">Noticia no encontrada</p>
        <p className="text-base-content/70 mt-2">
          El enlace puede ser incorrecto o la noticia ha sido eliminada.
        </p>
        <Link href="/noticias" className="btn btn-primary mt-6">
          Volver a Noticias
        </Link>
      </div>
    )
  }

  const noticia = docs[0]
  const fechaPublicacion = new Date(noticia.createdAt).toLocaleDateString('es-AR')

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
            sizes="100vw"
          />
        </div>
      )}

      {/* Título y fecha */}
      <div className="container mx-auto max-w-4xl px-4 py-4 sm:px-6">
        <Link href="/noticias" className="btn btn-link text-primary mb-4 pl-0 hover:no-underline">
          <IconArrowLeft size={16} />
          Volver a Noticias
        </Link>
        <h1 className="text-primary mb-2 text-4xl font-bold leading-tight">{noticia.titulo}</h1>
        <div className="text-base-content/80 text-sm">Publicado el: {fechaPublicacion}</div>
      </div>

      {/* Contenido */}
      <section className="prose-lg container mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {noticia.is_old ? (
          <div
            dangerouslySetInnerHTML={{ __html: noticia.contenido_old ?? '' }}
            className="prose lg:prose-lg text-base-content"
          />
        ) : (
          <RichText data={noticia.contenido!} className="space-y-6" />
        )}
      </section>

      {/* Archivos adjuntos */}
      {noticia.archivos && noticia.archivos.length > 0 && (
        <section className="container mx-auto max-w-4xl px-4 pb-8 sm:px-6">
          <h2 className="text-primary mb-4 text-2xl font-bold">Archivos adjuntos</h2>
          <div className="space-y-2">
            {(noticia.archivos as (string | Archivo)[]).map((archivo, index) => {
              const url = typeof archivo === 'string' ? archivo : archivo.url || '#'
              const filename =
                typeof archivo === 'string'
                  ? 'Archivo adjunto'
                  : archivo.filename || 'Archivo adjunto'

              return (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary flex items-center gap-2 hover:underline"
                >
                  <IconFileDownload size={20} />
                  <span>{filename}</span>
                </a>
              )
            })}
          </div>
        </section>
      )}

      {/* Datos estructurados JSON-LD para la noticia */}
      <Script
        id="structured-data-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateStructuredData('Article', {
              title: noticia.titulo,
              description: noticia.descripcion,
              image:
                typeof noticia.portada === 'object' && noticia.portada?.url
                  ? `https://sanbenito.gob.ar${noticia.portada.url}`
                  : 'https://sanbenito.gob.ar/images/og-image.png',
              publishedTime: noticia.createdAt,
              modifiedTime: noticia.updatedAt,
              url: `https://sanbenito.gob.ar/noticias/${noticia.slug}`,
            }),
          ),
        }}
      />
    </main>
  )
}
