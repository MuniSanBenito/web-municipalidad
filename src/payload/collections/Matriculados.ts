import type { CollectionConfig } from 'payload'
import { isObrasPrivadasOrAdminCollectionAccess, isPublicAccess } from '../access/collection'

export const Matriculados: CollectionConfig = {
  slug: 'matriculados',
  labels: {
    singular: 'Matriculado',
    plural: 'Matriculados',
  },
  access: {
    create: isObrasPrivadasOrAdminCollectionAccess,
    read: isPublicAccess,
    update: isObrasPrivadasOrAdminCollectionAccess,
    delete: isObrasPrivadasOrAdminCollectionAccess,
  },
  admin: {
    useAsTitle: 'nombreCompleto',
  },

  fields: [
    {
      name: 'dni',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'nombreCompleto',
      type: 'text',
      required: true,
    },
    {
      name: 'matricula',
      type: 'text',
      required: true,
    },
    {
      name: 'direccion',
      type: 'text',
      required: true,
    },
    {
      name: 'telefono',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'profesion',
      type: 'text',
      required: true,
    },
    {
      name: 'habilitado',
      type: 'checkbox',
      label: 'Habilitado',
      defaultValue: true,
    },
  ],
}
