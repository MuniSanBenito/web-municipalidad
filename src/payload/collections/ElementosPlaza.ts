import type { CollectionConfig } from 'payload'
import { isComunicacionOrAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const ElementosPlaza: CollectionConfig = {
  slug: 'elementos-plaza',
  labels: {
    singular: 'Elemento de Plaza',
    plural: 'Elementos de Plaza',
  },
  access: {
    create: isComunicacionOrAdminCollectionAccess,
    read: isPublicAccess,
    update: isComunicacionOrAdminCollectionAccess,
    delete: isComunicacionOrAdminCollectionAccess,
  },
  admin: {
    useAsTitle: 'nombre',
    hideAPIURL: HIDE_API_URL,
    group: 'Participación',
  },
  fields: [
    {
      type: 'text',
      name: 'nombre',
      label: 'Nombre',
      required: true,
    },
    {
      type: 'text',
      name: 'emoji',
      label: 'Emoji',
      required: true,
      admin: {
        description: 'Emoji que representa el elemento, ej: 🛝',
      },
    },
    {
      type: 'number',
      name: 'ancho',
      label: 'Ancho (grid units)',
      required: true,
      defaultValue: 1,
      admin: {
        description: 'Ancho en unidades de grilla del canvas',
      },
    },
    {
      type: 'number',
      name: 'alto',
      label: 'Alto (grid units)',
      required: true,
      defaultValue: 1,
      admin: {
        description: 'Alto en unidades de grilla del canvas',
      },
    },
    {
      type: 'number',
      name: 'orden',
      label: 'Orden',
      required: false,
    },
  ],
}
