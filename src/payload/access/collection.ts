import type { Permiso, PermisoActions } from '@/payload-types'
import {
  PERMISO_ACCION_ACTUALIZAR,
  PERMISO_ACCION_BORRAR,
  PERMISO_ACCION_CREAR,
  PERMISO_ACCION_LEER,
} from '@/payload/constants/acciones_permisos'
import { ROL_ADMIN_VALUE, ROL_PUBLICO_VALUE } from '@/payload/constants/roles'
import type { Access, AccessArgs, AccessResult } from 'payload'

export const isAdminCollectionAccess: Access = ({ req }) =>
  req?.user?.rol?.includes(ROL_ADMIN_VALUE) ?? false

type PermisoCollection = keyof Permiso
type PermisoAction = keyof PermisoActions

const permisosAccess = async (
  args: AccessArgs & { collection: PermisoCollection; accion: PermisoAction },
): Promise<AccessResult> => {
  const { req, collection, accion } = args

  const permisosGlobales = await req.payload.findGlobal({
    slug: 'permisos',
  })
  const permisosCollection = permisosGlobales[collection] as PermisoActions // {crear: [...], leer: [...], ...}
  if (!permisosCollection || Object.keys(permisosCollection).length === 0) {
    return false
  }

  const rolesPermitidosPorAccion = permisosCollection[accion] // ['ADMIN', 'PUBLICO', ...]
  if (!rolesPermitidosPorAccion || rolesPermitidosPorAccion.length === 0) {
    return false
  }

  const isPublic = rolesPermitidosPorAccion?.includes(ROL_PUBLICO_VALUE)
  if (isPublic) {
    return true
  }

  if (!req?.user?.rol || !req?.user?.rol.length) {
    return false
  }

  let tienePermiso = false
  for (const userRol of req.user.rol) {
    if (rolesPermitidosPorAccion.includes(userRol)) {
      tienePermiso = true
      break
    }
  }

  return tienePermiso
}

export const accessCreate = async (
  args: AccessArgs & { collection: PermisoCollection },
): Promise<AccessResult> => {
  return await permisosAccess({
    ...args,
    collection: args.collection,
    accion: PERMISO_ACCION_CREAR,
  })
}
export const accessRead = async (
  args: AccessArgs & { collection: PermisoCollection },
): Promise<AccessResult> => {
  return await permisosAccess({
    ...args,
    collection: args.collection,
    accion: PERMISO_ACCION_LEER,
  })
}
export const accessUpdate = async (
  args: AccessArgs & { collection: PermisoCollection },
): Promise<AccessResult> => {
  return await permisosAccess({
    ...args,
    collection: args.collection,
    accion: PERMISO_ACCION_ACTUALIZAR,
  })
}
export const accessDelete = async (
  args: AccessArgs & { collection: PermisoCollection },
): Promise<AccessResult> => {
  return await permisosAccess({
    ...args,
    collection: args.collection,
    accion: PERMISO_ACCION_BORRAR,
  })
}
