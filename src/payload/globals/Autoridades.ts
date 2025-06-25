import { CreatedBy } from '@/payload/fields/created_by'
import type { GlobalConfig } from 'payload'
import { isAdminCollectionAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const Autoridades: GlobalConfig = {
  slug: 'autoridades',
  label: 'Autoridades',
  access: {
    read: () => true,
    update: isAdminCollectionAccess,
  },
  admin: {
    hideAPIURL: HIDE_API_URL,
  },
  fields: [
    CreatedBy,
    {
      type: 'text',
      name: 'presidente',
      label: 'Presidente',
      required: true,
    },
    {
      type: 'text',
      name: 'secretario',
      label: 'Secretario',
      required: true,
    },
    {
      type: 'array',
      name: 'bloques',
      labels: {
        singular: 'Bloque',
        plural: 'Bloques',
      },
      fields: [
        {
          type: 'text',
          name: 'nombre',
          required: true,
          label: 'Nombre',
        },
        {
          type: 'array',
          name: 'concejales',
          labels: {
            singular: 'Concejal',
            plural: 'Concejales',
          },
          fields: [
            {
              type: 'text',
              name: 'concejal',
              label: 'Concejal',
            },
          ],
        },
      ],
    },
  ],
}
