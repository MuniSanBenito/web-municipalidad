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
import {
  PERMISO_ACCION_ACTUALIZAR,
  PERMISO_ACCION_BORRAR,
  PERMISO_ACCION_CREAR,
  PERMISO_ACCION_LEER,
} from '@/constants/acciones_permisos'
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
    read: isAdminCollectionAccess,
    update: isAdminCollectionAccess,
  },
  fields: [...COLLECTIONS, ...GLOBALS].map((collection) => ({
    type: 'group',
    name: collection.slug,
    label: collection.slug.toUpperCase(),
    admin: {},
    interfaceName: 'PermisoActions',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: PERMISO_ACCION_CREAR,
            type: 'select',
            options: [...ROLES],
            hasMany: true,
            defaultValue: ROL_ADMIN_VALUE,
            label: 'Crear',
            interfaceName: 'PermisoRoles',
          },
          {
            name: PERMISO_ACCION_LEER,
            type: 'select',
            options: [...ROLES],
            hasMany: true,
            defaultValue: ROL_ADMIN_VALUE,
            label: 'Leer',
            interfaceName: 'PermisoRoles',
          },
          {
            name: PERMISO_ACCION_ACTUALIZAR,
            type: 'select',
            options: [...ROLES],
            hasMany: true,
            defaultValue: ROL_ADMIN_VALUE,
            label: 'Actualizar',
            interfaceName: 'PermisoRoles',
          },
          {
            name: PERMISO_ACCION_BORRAR,
            type: 'select',
            options: [...ROLES],
            hasMany: true,
            defaultValue: ROL_ADMIN_VALUE,
            label: 'Borrar',
            interfaceName: 'PermisoRoles',
          },
        ],
      },
    ],
  })),
}
