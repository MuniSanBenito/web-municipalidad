import { ROL_ADMIN_VALUE } from '@/payload/constants/roles'
import type { Access } from 'payload'

export const isAdminCollectionAccess: Access = ({ req }) =>
  req?.user?.rol?.includes(ROL_ADMIN_VALUE) ?? false

// type PermisoCollection = keyof Permiso
// type PermisoAction = keyof PermisoActions

// const permisosAccess = async (
//   args: AccessArgs & { collection: PermisoCollection; accion: PermisoAction },
// ): Promise<AccessResult> => {
//   const { req, collection, accion } = args

//   const permisosGlobales = await req.payload.findGlobal({
//     slug: 'permisos',
//   })
//   const permisosCollection = permisosGlobales[collection] as PermisoActions // {crear: [...], leer: [...], ...}
//   if (!permisosCollection || Object.keys(permisosCollection).length === 0) {
//     return false
//   }

//   const rolesPermitidosPorAccion = permisosCollection[accion] // ['ADMIN', 'PUBLICO', ...]
//   if (!rolesPermitidosPorAccion || rolesPermitidosPorAccion.length === 0) {
//     return false
//   }

//   const isPublic = rolesPermitidosPorAccion?.includes(ROL_PUBLICO_VALUE)
//   if (isPublic) {
//     return true
//   }

//   if (!req?.user?.rol || !req?.user?.rol.length) {
//     return false
//   }

//   let tienePermiso = false
//   for (const userRol of req.user.rol) {
//     if (rolesPermitidosPorAccion.includes(userRol)) {
//       tienePermiso = true
//       break
//     }
//   }

//   return tienePermiso
// }

// export const accessCreate = async (
//   args: AccessArgs & { collection: PermisoCollection },
// ): Promise<AccessResult> => {
//   return await permisosAccess({
//     ...args,
//     collection: args.collection,
//     accion: PERMISO_ACCION_CREAR,
//   })
// }
// export const accessRead = async (
//   args: AccessArgs & { collection: PermisoCollection },
// ): Promise<AccessResult> => {
//   return await permisosAccess({
//     ...args,
//     collection: args.collection,
//     accion: PERMISO_ACCION_LEER,
//   })
// }
// export const accessUpdate = async (
//   args: AccessArgs & { collection: PermisoCollection },
// ): Promise<AccessResult> => {
//   return await permisosAccess({
//     ...args,
//     collection: args.collection,
//     accion: PERMISO_ACCION_ACTUALIZAR,
//   })
// }
// export const accessDelete = async (
//   args: AccessArgs & { collection: PermisoCollection },
// ): Promise<AccessResult> => {
//   return await permisosAccess({
//     ...args,
//     collection: args.collection,
//     accion: PERMISO_ACCION_BORRAR,
//   })
// }

/*
GLOBALS
Autoridades
- C: admin
- R: publico
- U: admin
- D: admin

COLLECTIONS
Archivos
- C: ciudadano o mas
- R: publico
- U: admin
- D: admin

Avatares (idem a users)
- C: admin o a si mismo (createdBy)
- R: admin o a si mismo (createdBy)
- U: admin o a si mismo (createdBy)
- D: admin o a si mismo (createdBy)

Balances mensuales
- C: 
- R: 
- U: 
- D: 

Concursos
- C: 
- R: 
- U: 
- D: 

Contabilidad
- C: admin y hacienda
- R: publico
- U: admin y hacienda
- D: admin y hacienda

Curriculums (ideam a avatares)
- C: admin o a si mismo (createdBy)
- R: admin o a si mismo (createdBy)
- U: admin o a si mismo (createdBy)
- D: admin o a si mismo (createdBy)

Eventos
- C: admin y comunicacion
- R: publico
- U: admin y comunicacion
- D: admin y comunicacion

EventosTags (idem a eventos)
- C: admin y comunicacion
- R: publico
- U: admin y comunicacion
- D: admin y comunicacion

Habilitaciones
- C: admin y habilitaciones
- R: publico
- U: admin y habilitaciones
- D: admin y habilitaciones

Imagenes (idem a archivos)
- C: ciudadano o mas
- R: publico
- U: admin
- D: admin

Intimaciones
- C: admin y juzgado
- R: publico
- U: admin y juzgado
- D: admin y juzgado

Licitaciones
- C: 
- R: 
- U: 
- D: 

Memorias (idem contabilidad)
- C: admin y hacienda
- R: publico
- U: admin y hacienda
- D: admin y hacienda

Noticias (idem a eventos)
- C: admin y comunicacion
- R: publico
- U: admin y comunicacion
- D: admin y comunicacion

Ubicaciones (idem a eventos)
- C: admin y comunicacion
- R: publico
- U: admin y comunicacion
- D: admin y comunicacion

Users
- C: admin
- R: admin o a si mismo (createdBy)
- U: admin o a si mismo (createdBy)
- D: admin

*/
