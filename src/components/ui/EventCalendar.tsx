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

export function EventCalendar({ events }: { events: Evento[] }) {
  const formattedEvents = events.map(formatEvento)
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
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {formattedEvents.map((event) => (
          <article
            key={event.id}
            className="card bg-base-100 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="card-body">
              <time className="text-primary text-sm font-medium">{event.fecha}</time>
              <h3 className="card-title">{event.titulo}</h3>
              <p className="text-base-content/70 text-sm">{event.lugar}</p>
              {event.descripcion && (
                <p className="text-base-content/80 mt-2 text-sm">{event.descripcion}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
