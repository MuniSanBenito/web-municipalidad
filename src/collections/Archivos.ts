import { getAccess } from '@/globals/Permisos'
import type { CollectionConfig } from 'payload'

const SLUG = 'archivos'

const access = getAccess({ collection: SLUG })

export const Archivos: CollectionConfig = {
  slug: SLUG,
  labels: {
    singular: 'Archivo',
    plural: 'Archivos',
  },
  admin: {
    group: 'Almacenamiento',
  },
  access,
  fields: [],
  upload: {
    crop: false,
  },
}
