import type { CollectionConfig } from 'payload'

export const Ubicaciones: CollectionConfig = {
  slug: 'ubicaciones',
  labels: { plural: 'Ubicaciones', singular: 'Ubicación' },
  admin: {
    useAsTitle: 'nombre',
  },
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
