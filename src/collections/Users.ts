import type { CollectionConfig } from 'payload'

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
    },
    {
      type: 'checkbox',
      name: 'activo',
      label: 'Activo',
      defaultValue: true,
      admin: {
        position: 'sidebar',
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
