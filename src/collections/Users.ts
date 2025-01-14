import { isAdminFieldAccess } from '@/access/fields'
import type { User } from '@/payload-types'
import type { Access, CollectionConfig } from 'payload'

// COLLECTION ACCESS
const isAdminCollectionAccess: Access<User> = ({ req }) => req.user?.rol === 'ADMIN'
const isAdminOrMeCollectionAccess: Access<User> = ({ req, id }) =>
  req.user?.rol === 'ADMIN' || req.user?.id === id

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
    // Solo los ADMIN puede crear y borrar. se puede editar asi mismo o siendo admin
    create: isAdminCollectionAccess,
    read: () => true,
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
      defaultValue: 'CIUDADANO',
      options: ['USUARIO', 'ADMIN', 'CIUDADANO'],
      required: true,
      access: {
        // el rol solo lo pueden modificar los ADMIN
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
