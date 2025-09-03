import type { Field } from 'payload'

export const CreatedBy: Field = {
  name: 'created_by',
  label: 'Creado por',
  type: 'relationship',
  relationTo: ['users', 'ciudadanos'],
  required: true,
  admin: {
    hidden: true,
  },
  hasMany: false,
  unique: false,
  hooks: {
    beforeChange: [
      ({ req }) =>
        req.user
          ? {
              relationTo: req.user?.collection,
              value: req.user?.id,
            }
          : undefined,
    ],
  },
}
