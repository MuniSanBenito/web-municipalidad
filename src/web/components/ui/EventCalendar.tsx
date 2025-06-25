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
}

export function EventCalendar({
  events,
  highlightToday = false,
  highlightNext = false,
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

  return (
    <section className="container mx-auto my-8 px-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Agenda Municipal</h2>
          <p className="text-base-content/70">Próximos eventos en San Benito</p>
        </div>
        <Link href="/agenda" className="btn btn-primary btn-sm gap-2">
          <IconCalendar size={18} />
          Ver Calendario Completo
        </Link>
      </div>
      {formattedEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-16">
          <IconCalendar size={48} className="text-primary/60" />
          <h3 className="text-2xl font-bold text-base-content/80">No hay eventos próximos, ¡volvé pronto!</h3>
          <div className="flex gap-4 mt-2">
            <Link href="/noticias" className="btn btn-primary btn-md rounded-full">Ver noticias</Link>
            <Link href="/" className="btn btn-outline btn-md rounded-full">Volver al inicio</Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {formattedEvents.map((event, idx) => {
            const isToday = highlightToday && event.fecha.includes(todayStr)
            const isNext = highlightNext && idx === nextIdx
            return (
              <article
                key={event.id}
                className={`card relative bg-base-100 border transition-all duration-300 hover:shadow-xl ${isNext ? 'border-primary/60 bg-primary/5 shadow-lg scale-[1.01]' : 'border-base-200 shadow-sm hover:border-primary/40'}`}
              >
                <div className="card-body">
                  <div className="flex items-center gap-2 mb-1">
                    <time className="text-primary text-sm font-medium">{event.fecha}</time>
                    {isToday && (
                      <span className="badge badge-success badge-sm">Hoy</span>
                    )}
                    {isNext && (
                      <span className="badge badge-primary badge-sm">Próximo</span>
                    )}
                  </div>
                  <h3 className="card-title">{event.titulo}</h3>
                  <p className="text-base-content/70 text-sm">{event.lugar}</p>
                  {event.descripcion && (
                    <p className="text-base-content/80 mt-2 text-sm">{event.descripcion}</p>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}

    </section>
  )
}
