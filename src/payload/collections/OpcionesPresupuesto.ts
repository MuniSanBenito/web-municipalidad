import type { CollectionConfig } from 'payload'
import { isComunicacionOrAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const OpcionesPresupuesto: CollectionConfig = {
  slug: 'opciones-presupuesto',
  labels: {
    singular: 'Opción de Presupuesto',
    plural: 'Opciones de Presupuesto',
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
        description: 'Emoji que representa la opción, ej: 🛣️',
      },
    },
    {
      type: 'text',
      name: 'icono',
      label: 'Ícono Tabler',
      required: false,
    },
    {
      type: 'text',
      name: 'descripcion',
      label: 'Descripción',
      required: false,
      maxLength: 150,
    },
    {
      type: 'number',
      name: 'orden',
      label: 'Orden',
      required: false,
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
