import { accessCreate, accessDelete, accessRead, accessUpdate } from '@/access/collection'
import { CreatedBy } from '@/fields/created_by'
import type { CollectionConfig } from 'payload'

const SLUG = 'contabilidad'

export const Contabilidad: CollectionConfig = {
  slug: SLUG,
  labels: {
    singular: 'Contabilidad',
    plural: 'Contabilidad',
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
    {
      type: 'date',
      name: 'fecha',
      label: 'Fecha',
      required: true,
    },
  ],
}
