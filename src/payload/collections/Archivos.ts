import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import {
  isAdminOrCreatedByWithDataAccess,
  isCiudadanoOrMoreCollectionAccess,
  isPublicAccess,
} from '../access/collection'
import { HIDE_API_URL } from '../config'

export const Archivos: CollectionConfig = {
  slug: 'archivos',
  labels: {
    singular: 'Archivo',
    plural: 'Archivos',
  },
  access: {
    create: isCiudadanoOrMoreCollectionAccess,
    read: isPublicAccess,
    update: isAdminOrCreatedByWithDataAccess,
    delete: isAdminOrCreatedByWithDataAccess,
  },
  admin: {
    group: 'Almacenamiento',
    hideAPIURL: HIDE_API_URL,
  },
  fields: [CreatedBy],
  upload: {
    crop: false,
  },
}
