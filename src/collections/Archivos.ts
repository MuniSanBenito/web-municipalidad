import type { CollectionConfig } from 'payload'

export const Archivos: CollectionConfig = {
  slug: 'archivos',
  labels: {
    singular: 'Archivo',
    plural: 'Archivos',
  },
  admin: {
    group: 'Almacenamiento',
  },
  fields: [],
  upload: {
    crop: false,
  },
}
