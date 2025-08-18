import type { User } from '@/payload-types'
import { isAdminCollectionAccess, isAdminOrMeCollectionAccess } from '@/payload/access/collection'
import { ROL_ADMIN_VALUE, ROL_DEFAULT_VALUE, ROLES } from '@/payload/constants/roles'
import type { CollectionConfig, FieldAccess } from 'payload'
import { HIDE_API_URL } from '../config'

const isAdminFieldAccess: FieldAccess<User> = ({ req }) => {
  return (req?.user as User)?.rol?.includes(ROL_ADMIN_VALUE) ?? false
}

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios',
  },
  admin: {
    useAsTitle: 'email',
    hideAPIURL: HIDE_API_URL,
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
      options: [...ROLES],
      defaultValue: [ROL_DEFAULT_VALUE],
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
  ],
}
