import type { Field } from 'payload'

export const CreatedBy: Field = {
  name: 'created_by',
  label: 'Creado por',
  type: 'relationship',
  relationTo: 'users',
  required: true,
  admin: {
    readOnly: true,
    hidden: true,
  },
  hooks: {
    beforeChange: [async ({ req }) => req?.user?.id],
  },
}
