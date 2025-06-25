import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import {
  isAdminOrCreatedByAccess,
  isCiudadanoOrMoreCollectionAccess,
  isPublicAccess,
} from '../access/collection'

export const Archivos: CollectionConfig = {
  slug: 'archivos',
  labels: {
    singular: 'Archivo',
    plural: 'Archivos',
  },
  access: {
    create: isCiudadanoOrMoreCollectionAccess,
    read: isPublicAccess,
    update: isAdminOrCreatedByAccess,
    delete: isAdminOrCreatedByAccess,
  },
  admin: {
    group: 'Almacenamiento',
  },
  fields: [CreatedBy],
  upload: {
    crop: false,
  },
}
