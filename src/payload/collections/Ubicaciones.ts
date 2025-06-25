import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import { isComunicacionOrAdminCollectionAccess, isPublicAccess } from '../access/collection'

export const Ubicaciones: CollectionConfig = {
  slug: 'ubicaciones',
  labels: { plural: 'Ubicaciones', singular: 'Ubicación' },
  access: {
    create: isComunicacionOrAdminCollectionAccess,
    read: isPublicAccess,
    update: isComunicacionOrAdminCollectionAccess,
    delete: isComunicacionOrAdminCollectionAccess,
  },
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
