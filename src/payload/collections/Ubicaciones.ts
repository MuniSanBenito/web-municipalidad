import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'

const SLUG = 'ubicaciones'

export const Ubicaciones: CollectionConfig = {
  slug: 'ubicaciones',
  labels: { plural: 'Ubicaciones', singular: 'Ubicación' },
  admin: {
    useAsTitle: 'nombre',
  },
  fields: [
    CreatedBy,
    {
      type: 'text',
      name: 'nombre',
      label: 'Nombre',
      required: true,
    },
    {
      type: 'point',
      name: 'geolocalizacion',
      required: false,
      label: 'Geolocalización',
    },
  ],
}
