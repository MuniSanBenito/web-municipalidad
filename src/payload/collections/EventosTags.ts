import type { CollectionConfig } from 'payload'
import { isComunicacionOrAdminCollectionAccess, isPublicAccess } from '../access/collection'

export const EventosTags: CollectionConfig = {
  slug: 'eventos-tags',
  labels: {
    singular: 'Etiqueta de Evento',
    plural: 'Etiquetas de Eventos',
  },
  access: {
    create: isComunicacionOrAdminCollectionAccess,
    read: isPublicAccess,
    update: isComunicacionOrAdminCollectionAccess,
    delete: isComunicacionOrAdminCollectionAccess,
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
