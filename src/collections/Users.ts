import { isAdminCollectionAccess } from '@/access/collection'
import {
  ROL_ADMIN_VALUE,
  ROL_CIUDADANO_VALUE,
  ROL_DEFAULT_VALUE,
  ROL_OWN_VALUE,
  ROL_PUBLICO_VALUE,
  ROLES,
} from '@/constants/roles'
import type { User } from '@/payload-types'
import type { Access, CollectionConfig, Condition, FieldAccess } from 'payload'

const isAdminOrMeCollectionAccess: Access<User> = ({ req, id }) => {
  if (req?.user?.id === id) {
    return true
  }
  if (req?.user?.rol?.includes(ROL_ADMIN_VALUE)) {
    return true
  }
  return false
}

const isAdminFieldAccess: FieldAccess<User> = ({ req }) =>
  req?.user?.rol?.includes(ROL_ADMIN_VALUE) ?? false

const datosCiudadanoCondition: Condition<User, User> = (_, siblingData) =>
  siblingData?.rol?.includes(ROL_CIUDADANO_VALUE) ?? false

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: isAdminCollectionAccess,
    read: isAdminOrMeCollectionAccess,
    update: isAdminOrMeCollectionAccess,
    delete: isAdminCollectionAccess,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      type: 'select',
      name: 'rol',
      label: 'Rol',
      options: ROLES.filter((rol) => rol !== ROL_OWN_VALUE && rol !== ROL_PUBLICO_VALUE),
      defaultValue: ROL_DEFAULT_VALUE,
      required: true,
      hasMany: true,
      access: {
        create: isAdminFieldAccess,
        read: () => true,
        update: isAdminFieldAccess,
      },
    },
    {
      type: 'checkbox',
      name: 'activo',
      label: 'Activo',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
      access: {
        create: isAdminFieldAccess,
        read: () => true,
        update: isAdminFieldAccess,
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
      type: 'group',
      name: 'datos_ciudadano',
      label: 'Datos del Ciudadano',
      admin: {
        condition: datosCiudadanoCondition,
      },
      fields: [
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
          name: 'curriculums',
          label: 'Curriculums',
          collection: 'curriculums',
          on: 'user',
        },
      ],
    },
  ],
}
