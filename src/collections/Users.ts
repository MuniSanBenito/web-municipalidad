import { isAdminFieldAccess } from '@/access/fields'
import type { Access, CollectionConfig } from 'payload'

const isUsuarioCollectionAccess: Access = ({ req }) => {
  const { user } = req

  if (user?.rol === 'USUARIO') {
    return false
  }

  return true
}

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
    // usarios con rol "USUARIO" no pueden crear, editar ni borrar, solo pueden leer
    create: isUsuarioCollectionAccess,
    read: () => true,
    update: isUsuarioCollectionAccess,
    delete: isUsuarioCollectionAccess,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      type: 'select',
      name: 'rol',
      label: 'Rol',
      defaultValue: 'CIUDADANO',
      options: ['USUARIO', 'ADMIN', 'CIUDADANO'],
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
      type: 'group',
      name: 'datos_ciudadano',
      label: 'Datos del Ciudadano',
      admin: {
        condition: (_, siblingData) => siblingData.rol === 'CIUDADANO',
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
      ],
    },
  ],
}
