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
import { ROL_ADMIN_VALUE, ROL_PUBLICO_VALUE, ROLES } from '@/constants/roles'
import type { Permiso, PermisoActions } from '@/payload-types'
import type { Access, AccessArgs, AccessResult, GlobalConfig } from 'payload'
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

const PERMISO_ACCION_CREAR = 'crear'
const PERMISO_ACCION_LEER = 'leer'
const PERMISO_ACCION_ACTUALIZAR = 'actualizar'
const PERMISO_ACCION_BORRAR = 'borrar'

type PermisoCollection = keyof Permiso
type PermisoAction = keyof PermisoActions

const permisosAccess = async (
  args: AccessArgs & { collection: PermisoCollection; accion: PermisoAction },
): Promise<AccessResult> => {
  const { req, collection, accion } = args

  const permisosGlobales = await req.payload.findGlobal({
    slug: 'permisos',
  })
  const permisoCollection = permisosGlobales[collection] // {crear: [...], leer: [...], ...}
  if (!permisoCollection || typeof permisoCollection !== 'object') return false

  const permisoAccionRoles = permisoCollection[accion] // ['ADMIN', 'PUBLICO', ...]
  if (!permisoAccionRoles) return false

  const isPublic = permisoAccionRoles?.includes(ROL_PUBLICO_VALUE)
  if (isPublic) return true

  if (!req?.user?.rol || !req?.user?.rol.length) return false

  let tienePermiso = false
  for (const userRol of req.user.rol) {
    if (permisoAccionRoles.includes(userRol)) {
      tienePermiso = true
      break
    }
  }

  return tienePermiso
}

type CustomAccess = {
  create: Access
  read: Access
  update: Access
  delete: Access
}

export function getAccess({ collection }: { collection: keyof Permiso }): CustomAccess {
  return {
    create: async (args) =>
      await permisosAccess({ ...args, collection, accion: PERMISO_ACCION_CREAR }),
    read: async (args) =>
      await permisosAccess({ ...args, collection, accion: PERMISO_ACCION_LEER }),
    update: async (args) =>
      await permisosAccess({ ...args, collection, accion: PERMISO_ACCION_ACTUALIZAR }),
    delete: async (args) =>
      await permisosAccess({ ...args, collection, accion: PERMISO_ACCION_BORRAR }),
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
