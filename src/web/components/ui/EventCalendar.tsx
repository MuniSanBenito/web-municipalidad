'use client'

import { IconCalendar } from '@tabler/icons-react'
import Link from 'next/link'

import type { Evento } from '@/types/evento'

type FormattedEvento = {
  id: string
  titulo: string
  fecha: string
  lugar: string
  descripcion?: string
}

function formatEvento(evento: Evento): FormattedEvento {
  return {
    id: evento.id,
    titulo: evento.nombre,
    fecha: new Date(evento.fecha).toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    lugar: evento.ubicacion.nombre,
    descripcion: evento.descripcion,
  }
}

type EventCalendarProps = {
  events: Evento[]
  highlightToday?: boolean
  highlightNext?: boolean
  backgroundImage?: 'agenda1' | 'agenda2'
}

export function EventCalendar({
  events,
  highlightToday = false,
  highlightNext = false,
  backgroundImage = 'agenda1',
}: EventCalendarProps) {
  // Filtrar y ordenar eventos: solo futuros y ordenados por fecha ascendente
  const now = new Date()
  const eventosFuturos = events
    .filter((ev) => new Date(ev.fecha) >= new Date(now.toDateString()))
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
  const formattedEvents = eventosFuturos.map(formatEvento)

  // Encuentra el índice del próximo evento (el más cercano en el futuro)
  let nextIdx = -1
  if (highlightNext && formattedEvents.length > 0) {
    nextIdx = 0 // el primero ya es el más próximo
  }

  const todayStr = new Date().toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Determinar la imagen de fondo
  const bgUrl = backgroundImage === 'agenda2' ? '/images/agenda2.jpg' : '/images/agenda1.jpg'

  return (
    <section className="w-full">
      {/* Hero con imagen de fondo y overlay */}
      <div
        className="relative flex min-h-[260px] w-full flex-col items-center justify-center overflow-hidden rounded-xl md:min-h-[340px]"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: '0 10%',
        }}
      >
        {/* Overlay degradado para mejor contraste */}

        {/* Contenido centrado sobre la imagen */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-10 text-center md:py-16">
          <h2 className="mb-2 text-3xl font-extrabold text-white drop-shadow-xl md:text-5xl">
            Agenda
          </h2>
          <p className="mb-6 text-white/80 drop-shadow md:text-xl">
            Conocé todo lo que sucede en la ciudad
          </p>
          <Link href="/agenda" className="btn btn-primary btn-lg gap-2 shadow-xl">
            <IconCalendar size={22} />
            Ver Calendario Completo
          </Link>
        </div>
      </div>
      {/* Cards flotantes de eventos */}
      <div className="relative z-20 -mt-8 mb-4 flex w-full flex-col items-center px-2 md:-mt-16 md:px-8">
        {formattedEvents.length === 0 ? (
          <div className="bg-base-100/90 flex flex-col items-center justify-center gap-6 rounded-xl py-16 shadow-lg">
            <IconCalendar size={48} className="text-primary/60" />
            <h3 className="text-base-content/80 text-2xl font-bold">
              No hay eventos próximos, ¡volvé pronto!
            </h3>
            <div className="mt-2 flex gap-4">
              <Link href="/noticias" className="btn btn-primary btn-md rounded-full">
                Ver noticias
              </Link>
              <Link href="/" className="btn btn-outline btn-md rounded-full">
                Volver al inicio
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex w-full gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible lg:grid-cols-3">
            {formattedEvents.map((event, idx) => {
              const isToday = highlightToday && event.fecha.includes(todayStr)
              const isNext = highlightNext && idx === nextIdx
              return (
                <article
                  key={event.id}
                  className={`card bg-base-100/70 relative max-w-sm min-w-[320px] rounded-2xl border shadow-lg transition-all duration-200 hover:scale-[1.025] hover:shadow-2xl md:min-w-0 ${isNext ? 'border-primary/70 bg-primary/20 scale-[1.03] shadow-xl' : 'border-base-200 hover:border-primary/40'}`}
                  style={{
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <div className="card-body px-5 py-4 md:px-6 md:py-5">
                    <div className="mb-2 flex items-center gap-2">
                      <time className="text-primary text-xs font-semibold drop-shadow-sm">
                        {event.fecha}
                      </time>
                      {isToday && <span className="badge badge-success badge-sm">Hoy</span>}
                      {isNext && <span className="badge badge-primary badge-sm">Próximo</span>}
                    </div>
                    <h3 className="card-title text-base-content mb-1 text-lg font-bold drop-shadow-md">
                      {event.titulo}
                    </h3>
                    <p className="text-base-content/70 mb-1 text-sm drop-shadow-sm">
                      {event.lugar}
                    </p>
                    {event.descripcion && (
                      <p className="text-base-content/80 mt-1 text-xs drop-shadow-sm">
                        {event.descripcion}
                      </p>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
