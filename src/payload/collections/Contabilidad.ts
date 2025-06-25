import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import { isHaciendaOrAdminCollectionAccess, isPublicAccess } from '../access/collection'

export const Contabilidad: CollectionConfig = {
  slug: 'contabilidad',
  labels: {
    singular: 'Contabilidad',
    plural: 'Contabilidad',
  },
  access: {
    create: isHaciendaOrAdminCollectionAccess,
    read: isPublicAccess,
    update: isHaciendaOrAdminCollectionAccess,
    delete: isHaciendaOrAdminCollectionAccess,
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
