import type { CollectionConfig } from 'payload'
import {
  ciudadanoCreateAccess,
  ciudadanoDeleteAccess,
  ciudadanoReadAccess,
  ciudadanoStaffFieldAccess,
  ciudadanoUpdateAccess,
} from '../access/ciudadanos'
import { HIDE_API_URL } from '../config'

export const PERMISOS_CIUDADANO = ['HABILITACIONES'] as const
export type PermisoCiudadano = (typeof PERMISOS_CIUDADANO)[number]

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
  access: {
    create: ciudadanoCreateAccess,
    read: ciudadanoReadAccess,
    update: ciudadanoUpdateAccess,
    delete: ciudadanoDeleteAccess,
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
        create: ciudadanoStaffFieldAccess,
        update: ciudadanoStaffFieldAccess,
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
      type: 'select',
      name: 'permisos',
      label: 'Permisos de Módulos',
      hasMany: true,
      options: PERMISOS_CIUDADANO.map((p) => ({ label: p, value: p })),
      defaultValue: [],
      admin: {
        position: 'sidebar',
        description: 'Módulos habilitados para este ciudadano en el portal.',
      },
      access: {
        create: ciudadanoStaffFieldAccess,
        read: () => true,
        update: ciudadanoStaffFieldAccess,
      },
    },
    {
      type: 'join',
      name: 'curriculum',
      label: 'Curriculum',
      collection: 'curriculums',
      on: 'ciudadano',
      hasMany: false,
    },
  ],
}
