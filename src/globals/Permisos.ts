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
import { ROL_ADMIN_VALUE, ROL_OWN_VALUE, ROL_PUBLICO_VALUE, ROLES } from '@/constants/roles'
import type { Field, GlobalConfig } from 'payload'
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

function fieldAccion(args: { name: string; label: string }): Field {
  const { name, label } = args
  return {
    type: 'select',
    name,
    label,
    options: [...ROLES, ROL_OWN_VALUE, ROL_PUBLICO_VALUE],
    hasMany: true,
    defaultValue: ROL_ADMIN_VALUE,
    interfaceName: 'PermisoRoles',
  }
}

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
    interfaceName: 'PermisoActions',
    fields: [
      {
        type: 'row',
        fields: [
          fieldAccion({ name: PERMISO_ACCION_CREAR, label: 'Crear' }),
          fieldAccion({ name: PERMISO_ACCION_LEER, label: 'Leer' }),
          fieldAccion({ name: PERMISO_ACCION_ACTUALIZAR, label: 'Actualizar' }),
          fieldAccion({ name: PERMISO_ACCION_BORRAR, label: 'Borrar' }),
        ],
      },
    ],
  })),
}
