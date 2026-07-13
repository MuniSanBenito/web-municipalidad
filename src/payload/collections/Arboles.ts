import type { CollectionConfig } from 'payload'
import { isComunicacionOrAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const Arboles: CollectionConfig = {
  slug: 'arboles',
  labels: {
    singular: 'Árbol',
    plural: 'Árboles',
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
      type: 'textarea',
      name: 'caracteristicas',
      label: 'Características',
      required: true,
      maxLength: 200,
    },
    {
      type: 'text',
      name: 'emoji',
      label: 'Emoji',
      required: true,
      admin: {
        description: 'Emoji que representa al árbol, ej: 🌳',
      },
    },
    {
      type: 'upload',
      name: 'imagen',
      label: 'Imagen del árbol',
      relationTo: 'imagenes',
      required: false,
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
