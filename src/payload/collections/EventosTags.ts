import type { CollectionConfig } from 'payload'

export const EventosTags: CollectionConfig = {
  slug: 'eventos-tags',
  labels: {
    singular: 'Etiqueta de Evento',
    plural: 'Etiquetas de Eventos',
  },
  admin: {
    useAsTitle: 'nombre',
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre',
      required: true,
      unique: true,
    },
    {
      type: 'text',
      name: 'descripcion',
      label: 'Descripción Corta',
      required: true,
      maxLength: 256,
    },
  ],
}
