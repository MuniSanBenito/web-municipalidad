import { accessCreate, accessDelete, accessRead, accessUpdate } from '@/access/collection'
import { CreatedBy } from '@/fields/created_by'
import type { CollectionConfig } from 'payload'

const SLUG = 'avatares'

export const Avatares: CollectionConfig = {
  slug: SLUG,
  labels: {
    singular: 'Avatar',
    plural: 'Avatares',
  },
  typescript: {
    interface: 'Avatar',
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
  access: {
    create: async (args) => await accessCreate({ ...args, collection: SLUG }),
    read: async (args) => await accessRead({ ...args, collection: SLUG }),
    update: async (args) => await accessUpdate({ ...args, collection: SLUG }),
    delete: async (args) => await accessDelete({ ...args, collection: SLUG }),
  },
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
