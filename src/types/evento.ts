interface Ubicacion {
  id: string
  nombre: string
  geolocalizacion?: [number, number] | null
}

export interface Evento {
  id: string
  slug: string
  nombre: string
  fecha: string
  ubicacion: Ubicacion
  descripcion: string
  entradas?: string
  organiza?: string
  createdAt: string
  updatedAt: string
}

export interface EventoPayload extends Omit<Evento, 'slug'> {
  slug?: string
}
