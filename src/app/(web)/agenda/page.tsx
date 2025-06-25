import { IconCalendarEvent, IconFilter, IconMapPin, IconSearch } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import PageTitle from '@/components/ui/PageTitle'
import { basePayload } from '@/web/lib/payload'
// Definir el tipo para los eventos de Payload
interface EventoDoc {
  id: string
  slug?: string
  nombre: string
  fecha: string
  descripcion?: string
  ubicacion?: {
    id: string
    nombre: string
    geolocalizacion?: [number, number] | null
  }
  entradas?: string
  organiza?: string
  imagen?: {
    url: string
    alt?: string
    sizes?: {
      medium?: { url: string }
      [key: string]: any
    }
    [key: string]: any
  }
  createdAt: string
  updatedAt: string
}

export const metadata: Metadata = {
  title: 'Agenda Cultural - San Benito',
  description: 'Descubrí todos los eventos culturales, artísticos y recreativos de San Benito',
}

type Props = {
  searchParams: Promise<{ [key: string]: string }>
}

export default async function AgendaPage({ searchParams }: Props) {
  const page = parseInt((await searchParams)?.page || '1')
  const eventos = await basePayload.find({
    collection: 'eventos',
    page,
    limit: 12,
    depth: 3,
  })

  // Filtrar y ordenar eventos futuros
  const now = new Date();
  const eventosFuturos = eventos.docs
    .filter(ev => new Date(ev.fecha) >= new Date(now.toDateString()))
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <PageTitle
          title="Agenda Cultural"
          subtitle="Descubrí todos los eventos culturales, artísticos y recreativos de San Benito"
        />

        {/* Filtros y Búsqueda */}
        <div className="my-8 flex flex-wrap items-center gap-4">
          <div className="join flex-1">
            <div className="join-item bg-base-200 flex w-full max-w-sm items-center gap-2 rounded-l-lg px-4">
              <IconSearch size={20} className="text-base-content/70" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                className="w-full bg-transparent py-3 focus:outline-none"
              />
            </div>
            <button className="btn btn-primary join-item rounded-r-lg">Buscar</button>
          </div>
          <div className="join">
            <button className="btn join-item gap-2">
              <IconFilter size={20} />
              Filtrar
            </button>
            <select className="select select-bordered join-item">
              <option value="">Todas las categorías</option>
              <option value="musica">Música</option>
              <option value="teatro">Teatro</option>
              <option value="danza">Danza</option>
              <option value="arte">Arte</option>
              <option value="feria">Ferias</option>
            </select>
          </div>
        </div>

        {/* Lista de Eventos */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {eventosFuturos.map((evento) => (
            <article
              key={evento.id}
              className="card bg-base-100 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="card-body">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="card-title">{evento.nombre}</h3>
                    <p className="text-base-content/70 text-sm">
                      {new Date(evento.fecha).toLocaleDateString('es-AR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="badge badge-primary">
                    <IconCalendarEvent size={16} className="mr-1" />
                    {new Date(evento.fecha).toLocaleTimeString('es-AR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                {/* Miniatura de imagen */}
                <figure className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={
                      typeof evento.imagen === 'object' && evento.imagen?.sizes?.square?.url
                        ? evento.imagen.sizes.square.url
                        : typeof evento.imagen === 'string'
                          ? evento.imagen
                          : '/images/placeholder.jpg'
                    }
                    alt={
                      typeof evento.imagen === 'object' && evento.imagen?.alt
                        ? evento.imagen.alt
                        : './images/agenda-default.jpg'
                    }
                    width={400}
                    height={250}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30"></div>
                </figure>

                <p className="line-clamp-2 text-sm">{evento.descripcion}</p>
                <div className="card-actions mt-4 items-center justify-between">
                  <div className="text-base-content/70 flex items-center gap-1 text-sm">
                    <IconMapPin size={16} />
                    {evento.ubicacion && typeof evento.ubicacion === 'object'
                      ? evento.ubicacion.nombre
                      : 'San Benito'}
                  </div>
                  <Link href={`/agenda/${evento.id}`} className="btn btn-primary btn-sm">
                    Ver más
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Paginación real mejorada */}
        {eventos.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="join">
              {/* Botón Anterior */}
              <Link
                href={`?page=${eventos.prevPage || 1}`}
                className="join-item btn btn-outline"
                aria-disabled={!eventos.hasPrevPage}
                tabIndex={!eventos.hasPrevPage ? -1 : undefined}
                style={!eventos.hasPrevPage ? { pointerEvents: 'none', opacity: 0.5 } : {}}
              >
                Anterior
              </Link>
              {/* Números de página */}
              {Array.from({ length: eventos.totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={`?page=${n}`}
                  className={`join-item btn btn-outline${eventos.page === n ? 'btn-active' : ''}`}
                  aria-current={eventos.page === n ? 'page' : undefined}
                >
                  {n}
                </Link>
              ))}
              {/* Botón Siguiente */}
              <Link
                href={`?page=${eventos.nextPage || eventos.totalPages}`}
                className="join-item btn btn-outline"
                aria-disabled={!eventos.hasNextPage}
                tabIndex={!eventos.hasNextPage ? -1 : undefined}
                style={!eventos.hasNextPage ? { pointerEvents: 'none', opacity: 0.5 } : {}}
              >
                Siguiente
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
