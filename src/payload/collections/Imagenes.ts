import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import {
  isAdminOrCreatedByAccess,
  isCiudadanoOrMoreCollectionAccess,
  isPublicAccess,
} from '../access/collection'

export const Imagenes: CollectionConfig = {
  slug: 'imagenes',
  labels: {
    singular: 'Imagen',
    plural: 'Imagenes',
  },
  typescript: {
    interface: 'Imagen',
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
