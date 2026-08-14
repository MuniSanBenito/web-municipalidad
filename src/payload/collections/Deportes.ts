import type { CollectionConfig } from 'payload'
import { isComunicacionOrAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const Deportes: CollectionConfig = {
  slug: 'deportes',
  labels: {
    singular: 'Deporte',
    plural: 'Deportes',
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
        description: 'Emoji que representa al deporte, ej: ⚽',
      },
    },
    {
      type: 'text',
      name: 'icono',
      label: 'Ícono Tabler',
      required: false,
      admin: {
        description: 'Nombre del ícono de Tabler Icons, ej: ball-football',
      },
    },
    {
      type: 'number',
      name: 'orden',
      label: 'Orden',
      required: false,
      admin: {
        description: 'Orden de aparición (menor = primero)',
      },
    },
    {
      type: 'relationship',
      name: 'campana',
      label: 'Campaña',
      relationTo: 'campanas',
      required: false,
      admin: {
        description: 'Si se deja vacío, la opción estará disponible para todas las campañas',
      },
    },
  ],
}
