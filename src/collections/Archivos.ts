import { accessCreate, accessDelete, accessRead, accessUpdate } from '@/access/collection'
import { CreatedBy } from '@/fields/created_by'

import type { CollectionConfig } from 'payload'

const SLUG = 'archivos'

export const Archivos: CollectionConfig = {
  slug: SLUG,
  labels: {
    singular: 'Archivo',
    plural: 'Archivos',
  },
  admin: {
    group: 'Almacenamiento',
  },
  access: {
    create: async (args) => await accessCreate({ ...args, collection: SLUG }),
    read: async (args) => await accessRead({ ...args, collection: SLUG }),
    update: async (args) => await accessUpdate({ ...args, collection: SLUG }),
    delete: async (args) => await accessDelete({ ...args, collection: SLUG }),
  },
  fields: [CreatedBy],
  upload: {
    crop: false,
  },
}
