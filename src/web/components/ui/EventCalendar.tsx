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
          <div 
            className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-lg"
            style={{
              backdropFilter: 'blur(6px)',
              backgroundColor: typeof window !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
                ? 'rgba(7,102,51,0.45)'
                : 'rgba(7,102,51,0.85)'
            }}
          >
            <div className="px-6 py-12 text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-primary/20"></div>
                  <div className="relative rounded-full bg-base-100/95 p-4">
                    <IconCalendar size={48} className="text-primary" />
                  </div>
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">
                No hay eventos programados
              </h3>
              <p className="mb-8 text-white">
                ¡Mantente atento! Pronto publicaremos nuevos eventos en la agenda municipal.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/noticias" 
                  className="btn btn-primary btn-md gap-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Ver noticias
                </Link>
                <Link 
                  href="/" 
                  className="btn btn-outline text-white border-white btn-md gap-2 rounded-full hover:bg-white/10 transition-all duration-200"
                >
                  Volver al inicio
                </Link>
              </div>
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
                  className={`card relative max-w-sm min-w-[320px] rounded-2xl border shadow-lg transition-all duration-200 hover:scale-[1.025] hover:shadow-2xl md:min-w-0 text-white ${isNext ? 'border-primary/70 bg-primary/20 scale-[1.03] shadow-xl' : 'border-base-200 hover:border-primary/40'}`}
                  style={{
                    backdropFilter: 'blur(6px)',
                    background:
                      "var(--color-neutral, #076633)" +
                      (typeof window !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
                        ? 'b3'
                        : 'e6'),
                    backgroundColor:
                      typeof window !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
                        ? 'rgba(7,102,51,0.45)'
                        : 'rgba(7,102,51,0.85)',
                  }}
                >
                  <div className="card-body px-5 py-4 md:px-6 md:py-5 text-white">
                    <div className="mb-2 flex items-center gap-2">
                      <time className="text-primary text-xs font-semibold drop-shadow-sm">
                        {event.fecha}
                      </time>
                      {isToday && <span className="badge badge-success badge-sm">Hoy</span>}
                      {isNext && <span className="badge badge-primary badge-sm">Próximo</span>}
                    </div>
                    <h3 className="card-title mb-1 text-lg font-bold drop-shadow-md text-white">
                      {event.titulo}
                    </h3>
                    <p className="mb-1 text-sm drop-shadow-sm text-white/90">
                      {event.lugar}
                    </p>
                    {event.descripcion && (
                      <p className="mt-1 text-xs drop-shadow-sm text-white/80">
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
