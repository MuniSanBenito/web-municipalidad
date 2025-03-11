import { accessRead, accessUpdate } from '@/access/collection'
import { CreatedBy } from '@/fields/created_by'
import type { GlobalConfig } from 'payload'

const SLUG = 'autoridades'

export const Autoridades: GlobalConfig = {
  slug: 'autoridades',
  label: 'Autoridades',
  access: {
    read: async (args) => await accessRead({ ...args, collection: SLUG }),
    update: async (args) => await accessUpdate({ ...args, collection: SLUG }),
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
