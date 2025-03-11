import { CreatedBy } from '@/fields/created_by'
import { accessCreate, accessDelete, accessRead, accessUpdate } from '@/globals/Permisos'
import type { CollectionConfig } from 'payload'

const SLUG = 'ubicaciones'

export const Ubicaciones: CollectionConfig = {
  slug: 'ubicaciones',
  labels: { plural: 'Ubicaciones', singular: 'Ubicación' },
  admin: {
    useAsTitle: 'nombre',
  },
  access: {
    create: async (args) => await accessCreate({ ...args, collection: SLUG }),
    read: async (args) => await accessRead({ ...args, collection: SLUG }),
    update: async (args) => await accessUpdate({ ...args, collection: SLUG }),
    delete: async (args) => await accessDelete({ ...args, collection: SLUG }),
  },
  fields: [
    CreatedBy,
    {
      type: 'text',
      name: 'nombre',
      label: 'Nombre',
      required: true,
    },
    {
      type: 'point',
      name: 'geolocalizacion',
      required: false,
      label: 'Geolocalización',
    },
  ],
}
