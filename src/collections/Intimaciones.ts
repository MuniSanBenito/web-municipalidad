import { getAccess } from '@/globals/Permisos'
import type { CollectionConfig } from 'payload'

const SLUG = 'intimaciones'

const access = getAccess({ collection: SLUG })

export const Intimaciones: CollectionConfig = {
  slug: SLUG,
  labels: {
    singular: 'Intimación',
    plural: 'Intimaciones',
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
