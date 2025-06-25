import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import { isJuzgadoOrAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const Intimaciones: CollectionConfig = {
  slug: 'intimaciones',
  labels: {
    singular: 'Intimación',
    plural: 'Intimaciones',
  },
  access: {
    create: isJuzgadoOrAdminCollectionAccess,
    read: isPublicAccess,
    update: isJuzgadoOrAdminCollectionAccess,
    delete: isJuzgadoOrAdminCollectionAccess,
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
