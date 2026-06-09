import ShareButton from '@/web/components/ShareButton'
import { basePayload } from '@/web/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{
    id: string
  }>
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
  archivos?: Array<{
    id: string
    filename: string
    url: string
    mimeType: string
    filesize: number
    width?: number
    height?: number
    thumbnailURL?: string | null
    [key: string]: any
  }>
  tags?: Array<{
    id: string
    nombre: string
    descripcion?: string
    [key: string]: any
  }>
  banner?: string // URL de imagen/banner principal
  createdAt: string
  updatedAt: string
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params
    const eventos = await basePayload.find({
      collection: 'eventos',
      where: {
        id: { equals: id },
      },
      depth: 1,
    })

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
  const { id } = await params

  if (!id) {
    return notFound()
  }

  try {
    const eventos = await basePayload.find({
      collection: 'eventos',
      where: {
        id: { equals: id },
      },
      depth: 3,
    })

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
      <main className="from-base-100 to-base-200 min-h-screen bg-linear-to-br">
        {/* Banner principal mejorado */}
        <div className="relative h-80 max-h-96 w-full overflow-hidden shadow-2xl md:rounded-b-3xl">
          <img
            src={
              evento.imagen?.url ||
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
            }
            alt={evento.nombre}
            className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105 dark:brightness-90"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 p-6">
            <div>
              <h1 className="mb-2 text-4xl leading-tight font-extrabold text-white drop-shadow-2xl md:text-6xl">
                {evento.nombre}
              </h1>
              <div className="flex items-center gap-2 text-white/90">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3M16 7V3M4 11h16M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time dateTime={evento.fecha} className="text-lg font-medium">
                  {fechaFormateada}
                </time>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <section className="container mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Columna principal */}
            <div className="space-y-8 lg:col-span-2">
              {/* Descripción mejorada */}
              <div className="bg-base-100 border-base-300 rounded-2xl border p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <svg
                      className="text-primary h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-primary text-2xl font-bold">{evento.nombre}</h2>
                </div>
                {evento.descripcion && typeof evento.descripcion === 'object' ? (
                  <div className="prose prose-lg prose-headings:text-primary prose-links:text-secondary hover:prose-links:text-secondary/80 max-w-none">
                    <RichText data={evento.descripcion} className="space-y-6" />
                  </div>
                ) : (
                  <p className="text-base-content/80 text-lg leading-relaxed">
                    {evento.descripcion}
                  </p>
                )}
              </div>
              {/* Información clave */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Fecha */}
                <div className="group from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 text-primary border-primary/20 flex items-center gap-3 rounded-xl border bg-linear-to-br px-4 py-4 font-medium shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="bg-primary/20 group-hover:bg-primary/30 rounded-lg p-2 transition-colors">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3M16 7V3M4 11h16M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-primary/70 text-sm font-medium">Fecha</p>
                    <time dateTime={evento.fecha} className="text-sm font-semibold">
                      {fechaFormateada}
                    </time>
                  </div>
                </div>

                {/* Ubicación */}
                {evento.ubicacion && evento.ubicacion.nombre && (
                  <div className="group from-secondary/10 to-secondary/5 hover:from-secondary/20 hover:to-secondary/10 text-secondary border-secondary/20 flex items-center gap-3 rounded-xl border bg-linear-to-br px-4 py-4 font-medium shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="bg-secondary/20 group-hover:bg-secondary/30 rounded-lg p-2 transition-colors">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                        />
                        <circle cx="12" cy="11" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-secondary/70 text-sm font-medium">Ubicación</p>
                      <span className="text-sm font-semibold">{evento.ubicacion.nombre}</span>
                    </div>
                  </div>
                )}

                {/* Organizador */}
                {evento.organiza && (
                  <div className="group from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10 text-accent border-accent/20 flex items-center gap-3 rounded-xl border bg-linear-to-br px-4 py-4 font-medium shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="bg-accent/20 group-hover:bg-accent/30 rounded-lg p-2 transition-colors">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-accent/70 text-sm font-medium">Organiza</p>
                      <span className="text-sm font-semibold">{evento.organiza}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar con información adicional */}
            <div className="space-y-6">
              {/* Información de entradas */}
              {evento.entradas && (
                <div className="bg-base-100 border-base-300 rounded-2xl border p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="bg-success/10 rounded-lg p-2">
                      <svg
                        className="text-success h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-primary text-lg font-semibold">Entradas</h3>
                  </div>
                  <p className="text-base-content/80">{evento.entradas}</p>
                </div>
              )}

              {/* Tags del evento */}
              {evento.tags && evento.tags.length > 0 && (
                <div className="bg-base-100 border-base-300 rounded-2xl border p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="bg-warning/10 rounded-lg p-2">
                      <svg
                        className="text-warning h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-primary text-lg font-semibold">Categorías</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {evento.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-3 py-1 text-sm font-medium transition-colors"
                      >
                        {tag.nombre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón de compartir */}
              <ShareButton
                title={evento.nombre}
                url={`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/agenda/${id}`}
                type="evento"
              />
            </div>
          </div>

          {/* Mapa mejorado */}
          {evento.ubicacion && evento.ubicacion.geolocalizacion && (
            <div className="mt-12">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-secondary/10 rounded-xl p-3">
                  <svg
                    className="text-secondary h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                    <circle cx="12" cy="11" r="3" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-primary text-3xl font-bold">Ubicación del Evento</h2>
                  <p className="text-base-content/60">
                    Encuentra el lugar exacto donde se realizará
                  </p>
                </div>
              </div>
              <div className="bg-base-100 border-base-300 overflow-hidden rounded-2xl border shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="aspect-video w-full">
                  <iframe
                    title="Mapa del evento"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps?q=${evento.ubicacion.geolocalizacion[0]},${evento.ubicacion.geolocalizacion[1]}&z=15&output=embed`}
                    allowFullScreen
                    className="rounded-2xl"
                  />
                </div>
                <div className="bg-base-200/50 p-4">
                  <p className="text-base-content/70 flex items-center gap-2 text-sm">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                      />
                      <circle cx="12" cy="11" r="3" />
                    </svg>
                    {evento.ubicacion.nombre}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Galería de archivos - al final */}
          {evento.archivos && evento.archivos.length > 0 && (
            <div className="mt-12">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-info/10 rounded-xl p-3">
                  <svg
                    className="text-info h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-primary text-3xl font-bold">Galería del Evento</h2>
                  <p className="text-base-content/60">
                    Imágenes y archivos relacionados con el evento
                  </p>
                </div>
              </div>

              {/* Separar imágenes de otros archivos */}
              {(() => {
                const imagenes = evento.archivos.filter((archivo) =>
                  archivo.mimeType?.startsWith('image/'),
                )
                const otrosArchivos = evento.archivos.filter(
                  (archivo) => !archivo.mimeType?.startsWith('image/'),
                )

                return (
                  <div className="space-y-8">
                    {/* Galería de imágenes */}
                    {imagenes.length > 0 && (
                      <div className="bg-base-100 border-base-300 rounded-2xl border p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
                        <h3 className="text-primary mb-4 flex items-center gap-2 text-xl font-semibold">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Imágenes
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {imagenes.map((imagen, index) => (
                            <a
                              key={imagen.id}
                              href={imagen.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group border-base-300 bg-base-50 hover:border-primary/30 relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg"
                            >
                              <div className="aspect-video w-full overflow-hidden">
                                <img
                                  src={imagen.thumbnailURL || imagen.url}
                                  alt={imagen.filename}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                              </div>
                              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                              <div className="absolute right-0 bottom-0 left-0 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <p className="truncate text-sm font-medium">{imagen.filename}</p>
                                <p className="text-xs text-white/80">
                                  {(imagen.filesize / 1024).toFixed(1)} KB • {imagen.width}×
                                  {imagen.height}
                                </p>
                              </div>
                              <div className="absolute top-2 right-2 rounded-full bg-black/50 p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <svg
                                  className="h-4 w-4 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Otros archivos */}
                    {otrosArchivos.length > 0 && (
                      <div className="bg-base-100 border-base-300 rounded-2xl border p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
                        <h3 className="text-primary mb-4 flex items-center gap-2 text-xl font-semibold">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Documentos
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {otrosArchivos.map((archivo, index) => {
                            const fileSize = (archivo.filesize / 1024).toFixed(1) + ' KB'

                            return (
                              <a
                                key={archivo.id}
                                href={archivo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group border-base-300 bg-base-50 hover:border-primary/30 hover:bg-primary/5 flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 hover:shadow-md"
                              >
                                <div className="bg-secondary/10 text-secondary flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                                  <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-base-content group-hover:text-primary truncate text-sm font-medium">
                                    {archivo.filename}
                                  </p>
                                  <p className="text-base-content/60 text-xs">
                                    {fileSize} • {archivo.mimeType}
                                  </p>
                                </div>
                                <div className="shrink-0">
                                  <svg
                                    className="text-base-content/40 group-hover:text-primary h-4 w-4 transition-colors"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                </div>
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })()}
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
