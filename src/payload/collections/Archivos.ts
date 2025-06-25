import { CreatedBy } from '@/payload/fields/created_by'

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
  fields: [CreatedBy],
  upload: {
    crop: false,
  },
}
