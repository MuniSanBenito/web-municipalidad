import { CreatedBy } from '@/fields/created_by'
import type { GlobalConfig } from 'payload'

export const Autoridades: GlobalConfig = {
  slug: 'autoridades',
  label: 'Autoridades',
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
