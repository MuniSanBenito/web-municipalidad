import { getAccess } from '@/globals/Permisos'
import type { CollectionConfig } from 'payload'

const SLUG = 'memorias'

const access = getAccess({ collection: SLUG })

export const Memorias: CollectionConfig = {
  slug: SLUG,
  labels: {
    singular: 'Memoria',
    plural: 'Memorias',
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
  ],
}
