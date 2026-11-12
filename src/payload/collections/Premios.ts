import type { CollectionConfig } from 'payload'
import { isComunicacionOrAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'
import { revalidateParticipacionHooks } from '../hooks/revalidate-participacion'

export const Premios: CollectionConfig = {
  slug: 'premios',
  labels: {
    singular: 'Premio',
    plural: 'Premios',
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
    defaultColumns: ['nombre', 'stock', 'peso', 'campana'],
  },
  hooks: revalidateParticipacionHooks,
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
      required: false,
      admin: {
        description: 'Se muestra en la ruleta, ej: 🎁',
      },
    },
    {
      type: 'upload',
      name: 'imagen',
      label: 'Imagen del premio',
      relationTo: 'imagenes',
      required: false,
      admin: {
        description: 'Se muestra al ganar el premio',
      },
    },
    {
      type: 'number',
      name: 'stock',
      label: 'Stock disponible',
      required: true,
      defaultValue: 0,
      min: 0,
      admin: {
        description: 'Se descuenta automáticamente cada vez que alguien gana este premio',
      },
    },
    {
      type: 'number',
      name: 'peso',
      label: 'Peso (probabilidad relativa)',
      required: true,
      defaultValue: 1,
      min: 0,
      admin: {
        description: 'Un premio con peso 2 sale el doble de veces que uno con peso 1',
      },
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
        description: 'Si se deja vacío, el premio estará disponible para todas las campañas',
      },
    },
  ],
}
