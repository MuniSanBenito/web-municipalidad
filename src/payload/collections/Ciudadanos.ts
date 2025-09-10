import type { Ciudadano } from '@/payload-types'
import type { Access, CollectionConfig, FieldAccess } from 'payload'
import { isGestorCiudadanoOrAdminCollectionAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

const isMyselfGestorCiudadanoOrAdmin: Access<Ciudadano> = ({ req, id }) => {
  if (req.user?.collection === 'ciudadanos') {
    return req.user.id === id
  }

  return req.user?.rol.includes('GESTOR CIUDADANO') || req.user?.rol.includes('ADMIN') || false
}

const isGestorOrAdminFieldAccess: FieldAccess<Ciudadano> = ({ req, data, id }) => {
  if (req.user?.collection !== 'users') return false

  return req.user?.rol.includes('GESTOR CIUDADANO') || req.user?.rol.includes('ADMIN') || false
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
    create: isGestorCiudadanoOrAdminCollectionAccess,
    read: isMyselfGestorCiudadanoOrAdmin,
    update: isMyselfGestorCiudadanoOrAdmin,
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
        create: isGestorOrAdminFieldAccess,
        update: isGestorOrAdminFieldAccess,
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
      hasMany: false,
    },
  ],
}
