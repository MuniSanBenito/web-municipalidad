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
      ({ req, operation, value, originalDoc }) => {
        // Solo asignar el propietario al CREAR el registro.
        if (operation === 'create') {
          return req.user ? { relationTo: req.user.collection, value: req.user.id } : value
        }

        // En updates NUNCA reasignar: preservamos el propietario original.
        // (evita que un admin que edita el registro se convierta en el "creado por")
        const existing = originalDoc?.created_by ?? value
        if (existing && typeof existing === 'object') {
          return {
            relationTo: existing.relationTo,
            value:
              typeof existing.value === 'object' && existing.value !== null
                ? existing.value.id
                : existing.value,
          }
        }
        return existing
      },
    ],
  },
}
