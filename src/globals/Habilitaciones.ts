import type { GlobalConfig } from 'payload'

export const VariablesHabilitaciones: GlobalConfig = {
  slug: 'variablesHabilitaciones',
  label: 'Variables Habilitaciones',
  access: {
    update: () => false,
  },
  fields: [
    {
      type: 'number',
      name: 'precioPorM2',
      label: 'Precio por m2',
      defaultValue: 10,
    },
  ],
}
