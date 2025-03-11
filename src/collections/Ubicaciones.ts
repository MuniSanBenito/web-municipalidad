import { getAccess } from '@/globals/Permisos'
import type { CollectionConfig } from 'payload'

const SLUG = 'ubicaciones'

const access = getAccess({ collection: SLUG })

export const Ubicaciones: CollectionConfig = {
  slug: 'ubicaciones',
  labels: { plural: 'Ubicaciones', singular: 'Ubicación' },
  admin: {
    useAsTitle: 'nombre',
  },
  access,
  fields: [
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
