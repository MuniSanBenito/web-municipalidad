import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import { isHaciendaOrAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const Memorias: CollectionConfig = {
  slug: 'memorias',
  labels: {
    singular: 'Memoria',
    plural: 'Memorias',
  },
  access: {
    create: isHaciendaOrAdminCollectionAccess,
    read: isPublicAccess,
    update: isHaciendaOrAdminCollectionAccess,
    delete: isHaciendaOrAdminCollectionAccess,
  },
  admin: {
    useAsTitle: 'nombre',
    hideAPIURL: HIDE_API_URL,
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
  ],
}
