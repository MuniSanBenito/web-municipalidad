import { basePayload } from '@/libs/payload'
import { IconCalendar, IconChevronRight } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function PageNoticias() {
  const noticias = await basePayload.find({
    collection: 'noticias',
  })

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Título principal */}
        <div className="mb-12 text-center">
          <h1 className="text-base-content text-5xl font-bold">Últimas Noticias</h1>
          <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
        </div>

        {/* Lista de noticias */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.docs.map((noticia) => (
            <div
              key={noticia.id}
              className="group card bg-base-100 overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl"
            >
              {/* Imagen de la noticia */}
              <figure className="relative h-48 w-full overflow-hidden">
                <Image
                  src={noticia.portada?.thumbnailURL || '/images/placeholder.jpg'}
                  alt={noticia.portada?.alt || 'Imagen de la noticia'}
                  width={400}
                  height={250}
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

                <h2 className="card-title mt-2 line-clamp-2 text-lg font-bold">{noticia.titulo}</h2>

                <p className="text-base-content/80 mt-2 line-clamp-3">{noticia.descripcion}</p>

                <div className="card-actions mt-4 justify-end">
                  <Link
                    href={`/noticias/${noticia.slug}`}
                    className="btn btn-link btn-sm group gap-2 outline-none focus:ring-0"
                  >
                    Leer más
                    <IconChevronRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        {noticias.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="join">
              {/* Botón Anterior */}
              {noticias.hasPrevPage && (
                <a href={`/noticias?page=${noticias.prevPage}`} className="join-item btn btn-link">
                  Anterior
                </a>
              )}

              {/* Páginas */}
              {[...Array(noticias.totalPages)].map((_, index) => (
                <a
                  key={index}
                  href={`/noticias?page=${index + 1}`}
                  className={`join-item btn btn-link ${noticias.page === index + 1 ? 'btn-active' : ''}`}
                >
                  {index + 1}
                </a>
              ))}

              {/* Botón Siguiente */}
              {noticias.hasNextPage && (
                <a href={`/noticias?page=${noticias.nextPage}`} className="join-item btn btn-link">
                  Siguiente
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
