import type { CollectionConfig } from 'payload'

export const Memorias: CollectionConfig = {
  slug: 'memorias',
  labels: {
    singular: 'Memoria',
    plural: 'Memorias',
  },
  admin: {
    useAsTitle: 'nombre',
  },
  fields: [
    {
      type: 'upload',
      name: 'archivo',
      label: 'Archivo',
      relationTo: 'archivos',
      required: true,
    },
    {
      type: 'text',
      name: 'nombre',
      label: 'Nombre',
      required: true,
      unique: true,
    },
  ],
}
