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
      label: "DNI",
    },
    {
      name: 'nombreCompleto',
      type: 'text',
      required: true,
      label: 'Nombre Completo',
    },
    {
      name: 'matricula',
      type: 'text',
      required: true,
      label: 'Matrícula',
    },
    {
      name: 'direccion',
      type: 'text',
      required: true,
      label: 'Dirección',
    },
    {
      name: 'telefono',
      type: 'text',
      required: true,
      label: 'Teléfono',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'profesion',
      type: 'text',
      required: true,
      label: 'Profesión',
    },
    {
      name: 'habilitado',
      type: 'checkbox',
      label: 'Habilitado',
      defaultValue: true,
    },
  ],
}
