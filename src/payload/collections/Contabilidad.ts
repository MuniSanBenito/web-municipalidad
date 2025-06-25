import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'

const SLUG = 'contabilidad'

export const Contabilidad: CollectionConfig = {
  slug: SLUG,
  labels: {
    singular: 'Contabilidad',
    plural: 'Contabilidad',
  },
  admin: {
    useAsTitle: 'nombre',
  },
  fields: [
    CreatedBy,
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
