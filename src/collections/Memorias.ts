import { CreatedBy } from '@/fields/created_by'
import { accessCreate, accessDelete, accessRead, accessUpdate } from '@/globals/Permisos'
import type { CollectionConfig } from 'payload'

const SLUG = 'memorias'

export const Memorias: CollectionConfig = {
  slug: SLUG,
  labels: {
    singular: 'Memoria',
    plural: 'Memorias',
  },
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
      type: 'upload',
      name: 'archivo',
      label: 'Archivo',
      relationTo: 'archivos',
      required: true,
    },
    {
      type: 'text',
      name: 'nombre',
      label: 'Nombre',
      required: true,
      unique: true,
    },
  ],
}
