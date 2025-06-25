import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import {
  isAdminOrCreatedByAccess,
  isAdminOrCreatedByWithDataAccess,
  isCiudadanoOrMoreCollectionAccess,
} from '../access/collection'
import { HIDE_API_URL } from '../config'

export const Avatares: CollectionConfig = {
  slug: 'avatares',
  labels: {
    singular: 'Avatar',
    plural: 'Avatares',
  },
  typescript: {
    interface: 'Avatar',
  },
  access: {
    create: isCiudadanoOrMoreCollectionAccess,
    read: isAdminOrCreatedByAccess,
    update: isAdminOrCreatedByWithDataAccess,
    delete: isAdminOrCreatedByWithDataAccess,
  },
  admin: {
    group: 'Almacenamiento',
    hideAPIURL: HIDE_API_URL,
  },
  fields: [
    CreatedBy,
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
    mimeTypes: ['image/*'],
  },
}
