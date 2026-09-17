import type { Ciudadano } from '@/payload-types'
import type { Access, CollectionConfig, FieldAccess } from 'payload'
import {
  isGestorCiudadanoOrAdminCollectionAccess,
  isGestorHabilitacionesOrAdminCollectionAccess,
} from '../access/collection'
import { HIDE_API_URL } from '../config'

export const PERMISOS_CIUDADANO = ['HABILITACIONES'] as const
export type PermisoCiudadano = (typeof PERMISOS_CIUDADANO)[number]

const isMyselfGestorHabilitacionesOrAdmin: Access<Ciudadano> = ({ req, id }) => {
  if (req.user?.collection === 'ciudadanos') {
    return req.user.id === id
  }

  return (
    req.user?.rol.includes('GESTOR CIUDADANO') ||
    req.user?.rol.includes('HABILITACIONES') ||
    req.user?.rol.includes('ADMIN') ||
    false
  )
}

const isGestorHabilitacionesOrAdminFieldAccess: FieldAccess<Ciudadano> = ({ req }) => {
  if (req.user?.collection !== 'users') return false

  return (
    req.user?.rol.includes('GESTOR CIUDADANO') ||
    req.user?.rol.includes('HABILITACIONES') ||
    req.user?.rol.includes('ADMIN') ||
    false
  )
}

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
    create: isGestorHabilitacionesOrAdminCollectionAccess,
    read: isMyselfGestorHabilitacionesOrAdmin,
    update: isMyselfGestorHabilitacionesOrAdmin,
    delete: isGestorCiudadanoOrAdminCollectionAccess,
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
        create: isGestorHabilitacionesOrAdminFieldAccess,
        update: isGestorHabilitacionesOrAdminFieldAccess,
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
        description:
          'Módulos habilitados para este ciudadano en el portal. Asignar HABILITACIONES para alta o renovación comercial.',
      },
      access: {
        create: isGestorHabilitacionesOrAdminFieldAccess,
        read: () => true,
        update: isGestorHabilitacionesOrAdminFieldAccess,
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
    {
      type: 'join',
      name: 'comercios',
      label: 'Comercios habilitados',
      collection: 'comercios-habilitados',
      on: 'titulares',
    },
  ],
}
