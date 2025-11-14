import type { CollectionConfig } from 'payload'

export const RubrosComercios: CollectionConfig = {
  slug: 'rubros-comercios',
  labels: {
    singular: 'Rubro de Comercio',
    plural: 'Rubros de Comercios',
  },
  admin: {
    useAsTitle: 'nombre',
    hidden: true,
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre del Rubro',
      required: true,
      unique: true,
    },
  ],
}
