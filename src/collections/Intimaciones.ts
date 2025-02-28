import type { CollectionConfig } from 'payload'

export const Intimaciones: CollectionConfig = {
  slug: 'intimaciones',
  labels: {
    singular: 'Intimación',
    plural: 'Intimaciones',
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
      admin: {
        description: 'Indicar nombres y apellidos completos del intimado',
      },
    },
    {
      type: 'date',
      name: 'fecha',
      label: 'Fecha',
      required: true,
    },
  ],
}
