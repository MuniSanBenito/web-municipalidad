import PageTitle from '@/web/components/ui/PageTitle'
import { generateMetadata as generateSEOMetadata } from '@/web/lib/metadata'
import { basePayload } from '@/web/lib/payload'
import { IconCalendar, IconChevronRight, IconNewsOff } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{ [key: string]: string }>
}

export const metadata: Metadata = generateSEOMetadata({
  title: 'Noticias',
  description:
    'Últimas noticias de la Municipalidad de San Benito. Mantente informado sobre eventos, anuncios y novedades del gobierno municipal.',
  keywords: [
    'noticias',
    'actualidad',
    'eventos municipales',
    'anuncios oficiales',
    'comunicados',
    'novedades san benito',
  ],
  url: '/noticias',
})

export default async function PageNoticias({ searchParams }: Props) {
  const page = parseInt((await searchParams)?.page || '1')
  const noticias = await basePayload.find({
    collection: 'noticias',
    page,
    limit: 12,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return (
    <main className="container mx-auto min-h-screen px-4 py-12">
      {/* Título principal */}
      <PageTitle title="Últimas Noticias" />

      {/* Contenedor principal de noticias y paginación */}
      {noticias.docs.length > 0 ? (
        <>
          {/* Lista de noticias */}
          <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.docs.map((noticia) => (
              <Link
                href={`/noticias/${noticia.slug}`}
                key={noticia.id}
                className="card bg-base-100 hover:bg-base-200 focus-within:ring-primary focus-within:ring-offset-base-100 group cursor-pointer overflow-hidden rounded-lg shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 hover:shadow-2xl"
                aria-label={`Leer noticia: ${noticia.titulo}`}
              >
                {/* Imagen de la noticia */}
                <figure className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={
                      typeof noticia.portada === 'string'
                        ? noticia.portada
                        : noticia.portada?.sizes?.og?.url || '/images/placeholder.jpg'
                    }
                    alt={
                      typeof noticia.portada === 'string'
                        ? noticia.portada
                        : noticia.portada?.alt || 'Imagen de la noticia'
                    }
                    width={400}
                    height={250}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30"></div>
                </figure>

                {/* Contenido de la noticia */}
                <div className="card-body">
                  <div className="text-base-content/70 flex items-center gap-2 text-sm">
                    <IconCalendar size={16} />
                    <span>{new Date(noticia.createdAt).toLocaleDateString()}</span>
                  </div>

                  <h2 className="card-title mt-2 line-clamp-2 text-lg font-bold">
                    {noticia.titulo}
                  </h2>

                  <p className="text-base-content/80 mt-2 line-clamp-3">{noticia.descripcion}</p>

                  <div className="card-actions mt-4 justify-end">
                    <span className="btn btn-link btn-sm group gap-2">
                      Leer más
                      <IconChevronRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </section>

          {/* Paginación */}
          {noticias.totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="join">
                {/* Botón Anterior */}
                {noticias.hasPrevPage && (
                  <Link
                    href={`/noticias?page=${noticias.prevPage}`}
                    className="join-item btn btn-link"
                  >
                    Anterior
                  </Link>
                )}

                {/* Páginas */}
                {[...Array(noticias.totalPages)].map((_, index) => (
                  <Link
                    key={index}
                    href={`/noticias?page=${index + 1}`}
                    className={`join-item btn btn-link ${noticias.page === index + 1 ? 'btn-active' : ''}`}
                  >
                    {index + 1}
                  </Link>
                ))}

                {/* Botón Siguiente */}
                {noticias.hasNextPage && (
                  <Link
                    href={`/noticias?page=${noticias.nextPage}`}
                    className="join-item btn btn-link"
                  >
                    Siguiente
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <IconNewsOff size={64} className="text-base-content/30 mb-4" />
          <p className="text-2xl font-bold">No hay noticias para mostrar</p>
          <p className="text-base-content/70 mt-2">
            Vuelve a intentarlo más tarde o explora otras secciones del sitio.
          </p>
        </div>
      )}
    </main>
  )
}
