import { getAccess } from '@/globals/Permisos'
import type { CollectionConfig } from 'payload'

const SLUG = 'contabilidad'

const access = getAccess({ collection: SLUG })

export const Contabilidad: CollectionConfig = {
  slug: SLUG,
  labels: {
    singular: 'Contabilidad',
    plural: 'Contabilidad',
  },
  admin: {
    useAsTitle: 'nombre',
  },
  access,
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
