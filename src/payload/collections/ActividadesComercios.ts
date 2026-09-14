import type { CollectionConfig } from 'payload'
import { isHabilitacionesOrAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const ActividadesComercios: CollectionConfig = {
  slug: 'actividades-comercios',
  labels: {
    singular: 'Actividad de Comercio',
    plural: 'Actividades de Comercios',
  },
  access: {
    create: isHabilitacionesOrAdminCollectionAccess,
    read: isPublicAccess,
    update: isHabilitacionesOrAdminCollectionAccess,
    delete: isHabilitacionesOrAdminCollectionAccess,
  },
  admin: {
    useAsTitle: 'nombre',
    hideAPIURL: HIDE_API_URL,
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre de la Actividad',
      required: true,
      unique: true,
    },
  ],
}
