import type { CollectionConfig } from 'payload'

export const Contabilidad: CollectionConfig = {
  slug: 'contabilidad',
  labels: {
    singular: 'Contabilidad',
    plural: 'Contabilidad',
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
    {
      type: 'date',
      name: 'fecha',
      label: 'Fecha',
      required: true,
    },
  ],
}
