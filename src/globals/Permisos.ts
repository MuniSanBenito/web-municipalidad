import { isAdminCollectionAccess } from '@/access/collection'
import { Archivos } from '@/collections/Archivos'
import { Avatares } from '@/collections/Avatares'
import { Contabilidad } from '@/collections/Contabilidad'
import { Curriculums } from '@/collections/Curriculums'
import { Eventos } from '@/collections/Eventos'
import { Imagenes } from '@/collections/Imagenes'
import { Intimaciones } from '@/collections/Intimaciones'
import { Memorias } from '@/collections/Memorias'
import { Noticias } from '@/collections/Noticias'
import { Ubicaciones } from '@/collections/Ubicaciones'
import { Users } from '@/collections/Users'
import { ROL_ADMIN_VALUE, ROLES } from '@/constants/roles'
import type { GlobalConfig } from 'payload'
import { Autoridades } from './Autoridades'

export const COLLECTIONS = [
  Users,
  Noticias,
  Imagenes,
  Curriculums,
  Archivos,
  Avatares,
  Memorias,
  Contabilidad,
  Intimaciones,
  Ubicaciones,
  Eventos,
]

export const GLOBALS = [Autoridades]

export const Permisos: GlobalConfig = {
  slug: 'permisos',
  label: 'Permisos',
  access: {
    read: () => true,
    update: isAdminCollectionAccess,
  },
  fields: [...COLLECTIONS, ...GLOBALS].map((collection) => ({
    type: 'group',
    name: collection.slug,
    label: collection.slug,
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'crear',
            type: 'select',
            options: [...ROLES],
            hasMany: true,
            defaultValue: ROL_ADMIN_VALUE,
            label: 'Crear',
          },
          {
            name: 'leer',
            type: 'select',
            options: [...ROLES],
            hasMany: true,
            defaultValue: ROL_ADMIN_VALUE,
            label: 'Leer',
          },
          {
            name: 'actualizar',
            type: 'select',
            options: [...ROLES],
            hasMany: true,
            defaultValue: ROL_ADMIN_VALUE,
            label: 'Actualizar',
          },
          {
            name: 'borrar',
            type: 'select',
            options: [...ROLES],
            hasMany: true,
            defaultValue: ROL_ADMIN_VALUE,
            label: 'Borrar',
          },
        ],
      },
    ],
  })),
}

/*  {
      name: 'permisos',
      type: 'group',
      label: 'Permisos',
      fields: [
        {
          name: 'create',
          type: 'select',
          options: [...ROLES],
          hasMany: true,
          defaultValue: ROL_ADMIN_VALUE,
        },
      ],
    }, */
