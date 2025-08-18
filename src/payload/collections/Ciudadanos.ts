import type { CollectionConfig } from 'payload'
import { HIDE_API_URL } from '../config'

export const Ciudadanos: CollectionConfig = {
  slug: 'ciudadanos',
  labels: {
    singular: 'Ciudadano',
    plural: 'Ciudadanos',
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
    hideAPIURL: HIDE_API_URL,
  },
  fields: [
    {
      type: 'checkbox',
      name: 'activo',
      label: 'Activo',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
      access: {
        // create: ({ req }) => {},
        read: () => true,
        // update: isAdminFieldAccess,
      },
    },
    {
      type: 'upload',
      relationTo: 'avatares',
      name: 'avatar',
      label: 'Avatar',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'text',
      name: 'nombre',
      label: 'Nombre',
    },
    {
      type: 'text',
      name: 'apellido',
      label: 'Apellido',
    },
    {
      type: 'text',
      name: 'dni',
      label: 'DNI',
      required: true,
    },
    {
      type: 'text',
      name: 'domicilio',
      label: 'Domicilio',
    },
    {
      type: 'date',
      name: 'fecha_nacimiento',
      label: 'Fecha de Nacimiento',
    },
    {
      type: 'text',
      name: 'ciudad',
      label: 'Ciudad',
    },
    {
      type: 'text',
      name: 'telefono',
      label: 'Teléfono',
    },
    {
      type: 'join',
      name: 'curriculum',
      label: 'Curriculum',
      collection: 'curriculums',
      on: 'ciudadano',
    },
  ],
}
