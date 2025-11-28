import type { Archivo, Noticia } from '@/payload-types'
import ShareButton from '@/web/components/ShareButton'
import { generateStructuredData } from '@/web/lib/metadata'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { IconArrowLeft, IconFileDownload } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

interface Props {
  noticia: Noticia
}
export function TemplateNoticia({ noticia }: Props) {
  const fechaPublicacion = new Date(noticia.createdAt).toLocaleDateString('es-AR')

  const [bgImage, image] =
    typeof noticia?.portada === 'string'
      ? [noticia.portada, noticia.portada]
      : [noticia.portada?.url, noticia.portada?.sizes?.og?.url]

  console.log('bgImage', bgImage)
  console.log('image', image)

  return (
    <main className="min-h-screen">
      {/* Portada */}
      {noticia.portada && (
        <div className="relative h-40 w-full sm:h-64 lg:h-96">
          {/* La misma imagen como fondo difuminado */}
          {bgImage ? (
            <Image
              src={bgImage}
              alt={
                typeof noticia.portada === 'string'
                  ? 'Portada de la noticia'
                  : noticia.portada?.alt || 'Portada de la noticia'
              }
              className="absolute inset-0 -z-30 h-full w-full object-cover blur-sm"
              fill
              priority
              sizes="100vw"
            />
          ) : null}
          {/* Imagen principal (OG) */}
          {image ? (
            <Image
              src={image}
              alt={
                typeof noticia.portada === 'string'
                  ? 'Portada de la noticia'
                  : noticia.portada?.alt || 'Portada de la noticia'
              }
              className="h-full w-full object-contain"
              fill
              priority
              sizes="100vw"
            />
          ) : null}
        </div>
      )}

      {/* Título y fecha */}
      <div className="container mx-auto max-w-4xl px-4 py-4 sm:px-6">
        <Link href="/noticias" className="btn btn-link text-primary mb-4 pl-0 hover:no-underline">
          <IconArrowLeft size={16} />
          Volver a Noticias
        </Link>
        <h1 className="text-primary mb-2 text-4xl leading-tight font-bold">{noticia.titulo}</h1>
        <div className="text-base-content/80 text-sm">Publicado el: {fechaPublicacion}</div>
        <p className="mt-2 text-gray-600 italic">{noticia.descripcion}</p>
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

      {/* Botón de compartir */}
      <section className="container mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <ShareButton
              title={noticia.titulo}
              url={`${process.env.NEXT_PUBLIC_SERVER_URL || 'https://sanbenito.gob.ar'}/noticias/${noticia.slug}`}
              type="noticia"
            />
          </div>
        </div>
      </section>

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
                  ? `https://sanbenito.gob.ar${noticia.portada?.url}`
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
