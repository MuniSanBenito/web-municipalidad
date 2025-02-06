import type { CollectionConfig } from 'payload'

export const Archivos: CollectionConfig = {
  slug: 'archivos',
  labels: {
    singular: 'Archivo',
    plural: 'Archivos',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Almacenamiento',
  },
  fields: [],
  upload: {
    crop: false,
  },
}
