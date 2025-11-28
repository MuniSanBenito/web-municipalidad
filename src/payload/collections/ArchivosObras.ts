import type { CollectionConfig } from 'payload'
import { isAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const ArchivosObras: CollectionConfig = {
  slug: 'archivos-obras',
  labels: {
    singular: 'Archivo de Obras',
    plural: 'Archivos Obras',
  },
  access: {
    create: isAdminCollectionAccess,
    read: isPublicAccess,
    update: isAdminCollectionAccess,
    delete: isAdminCollectionAccess,
  },
  admin: {
    group: 'Almacenamiento',
    hideAPIURL: HIDE_API_URL,
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto Alternativo',
      type: 'text',
      required: true,
    },
    {
      name: 'categoria',
      label: 'Categoría',
      type: 'select',
      required: true,
      defaultValue: 'proyecto',
      options: [
        { label: 'Proyecto', value: 'proyecto' },
        { label: 'Relevamiento', value: 'relevamiento' },
      ],
      admin: {
        description: 'Indica a qué sección pertenece este archivo',
      },
    },
  ],
  upload: {
    crop: false,
  },
}
