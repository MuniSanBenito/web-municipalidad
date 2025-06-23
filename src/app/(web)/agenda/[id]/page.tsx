import { basePayload } from '@/web/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

// Definir el tipo para los eventos de Payload
interface EventoDoc {
  id: string
  slug?: string
  nombre: string
  fecha: string
  descripcion?: any
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
    [key: string]: any
  }
  banner?: string // URL de imagen/banner principal
  createdAt: string
  updatedAt: string
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    console.log('Generating metadata for id:', params.id)
    const eventos = await basePayload.find({
      collection: 'eventos',
      where: {
        id: { equals: params.id },
      },
      depth: 1,
    })

    console.log('Metadata search result:', eventos)

    const evento = eventos.docs[0]

    if (!evento) {
      return {
        title: 'Evento no encontrado - San Benito',
      }
    }

    return {
      title: `${evento.nombre} - Agenda Cultural San Benito`,
      description: evento.descripcion || 'Detalles del evento',
    }
  } catch (error) {
    return {
      title: 'Error - San Benito',
    }
  }
}

export default async function EventoPage({ params }: Props) {
  if (!params.id) {
    return notFound()
  }

  try {
    console.log('Fetching event with id:', params.id)
    const eventos = await basePayload.find({
      collection: 'eventos',
      where: {
        id: { equals: params.id },
      },
      depth: 3,
    })

    console.log('Event search result:', eventos)

    if (eventos.docs.length === 0) {
      return notFound()
    }

    const evento = eventos.docs[0] as EventoDoc
    const fecha = new Date(evento.fecha)
    const fechaFormateada = fecha.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })

    return (
      <main className="bg-base-100 min-h-screen">
        {/* Banner principal */}
        <div className="relative h-64 w-full max-h-96 overflow-hidden md:rounded-b-3xl shadow-md">
          <img
            src={evento.imagen?.url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'}
            alt={evento.nombre}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              {evento.nombre}
            </h1>
          </div>
        </div>

        {/* Info principal */}
        <section className="container mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Fecha */}
            <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-4 py-2 text-primary font-medium shadow">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3M16 7V3M4 11h16M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <time dateTime={evento.fecha}>{fechaFormateada}</time>
            </div>
            {/* Lugar */}
            {evento.ubicacion && evento.ubicacion.nombre && (
              <div className="flex items-center gap-2 bg-secondary/10 rounded-lg px-4 py-2 text-secondary font-medium shadow">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" /></svg>
                <span>{evento.ubicacion.nombre}</span>
              </div>
            )}
          </div>

          {/* Descripción */}
          <div className="bg-base-200 rounded-xl shadow-lg p-6 mb-8">
            {evento.descripcion && typeof evento.descripcion === 'object' ? (
              <div className="prose-lg max-w-none">
                <RichText data={evento.descripcion} className="space-y-6" />
              </div>
            ) : (
              <p className="text-base-content/80 text-lg leading-relaxed">{evento.descripcion}</p>
            )}
          </div>

          {/* Mapa */}
          {evento.ubicacion && evento.ubicacion.geolocalizacion && (
            <div className="mt-8">
              <h2 className="text-primary mb-4 text-2xl font-semibold">Ubicación</h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow">
                <iframe
                  title="Mapa del evento"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${evento.ubicacion.geolocalizacion[0]},${evento.ubicacion.geolocalizacion[1]}&z=15&output=embed`}
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </section>
      </main>
    )
  } catch (error: any) {
    console.error('Error al cargar el evento:', error?.stack || error)
    return notFound()
  }
}
