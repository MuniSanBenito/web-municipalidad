import type { User } from '@/payload-types'
import { ROL_ADMIN_VALUE, ROLES } from '@/payload/constants/roles'
import type { Access } from 'payload'

export function isPublicAccess() {
  return true
}

export const isAdminCollectionAccess: Access = ({ req }) =>
  req?.user?.rol?.includes(ROL_ADMIN_VALUE) ?? false

export const isAdminOrMeCollectionAccess: Access<User> = ({ req, id }) => {
  if (req?.user?.id === id) {
    return true
  }
  if (req?.user?.rol?.includes(ROL_ADMIN_VALUE)) {
    return true
  }
  return false
}

export const isCiudadanoOrMoreCollectionAccess: Access = ({ req }) => {
  let canCreate = false

  for (const rol of ROLES) {
    if (req.user?.rol.includes(rol)) {
      canCreate = true
      break
    }
  }

  return canCreate
}

export const isHaciendaOrAdminCollectionAccess: Access = ({ req }) => {
  return (
    (req?.user?.rol?.includes('HACIENDA') || req?.user?.rol?.includes(ROL_ADMIN_VALUE)) ?? false
  )
}

export const isAdminOrCreatedByAccess: Access = async ({ req, data }) => {
  if (req?.user?.rol?.includes(ROL_ADMIN_VALUE)) {
    return true
  }
  // si no hay datos, se permite la creación
  if (!data) {
    return true
  }

  if (data?.created_by === req?.user?.id) {
    return true
  }

  return false
}

export const isComunicacionOrAdminCollectionAccess: Access = ({ req }) => {
  return (
    (req?.user?.rol?.includes('COMUNICACION') || req?.user?.rol?.includes(ROL_ADMIN_VALUE)) ?? false
  )
}

export const isHabilitacionesOrAdminCollectionAccess: Access = ({ req }) => {
  return (
    (req?.user?.rol?.includes('HABILITACIONES') || req?.user?.rol?.includes(ROL_ADMIN_VALUE)) ??
    false
  )
}

export const isJuzgadoOrAdminCollectionAccess: Access = ({ req }) => {
  return (req?.user?.rol?.includes('JUZGADO') || req?.user?.rol?.includes(ROL_ADMIN_VALUE)) ?? false
}

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

Avatares
- C: admin o a si mismo (createdBy)
- R: admin o a si mismo (createdBy)
- U: admin o a si mismo (createdBy)
- D: admin o a si mismo (createdBy)

Balances mensuales (idem a contabilidad)
- C: admin y hacienda
- R: publico
- U: admin y hacienda
- D: admin y hacienda

Concursos (idem a contabilidad)
- C: admin y hacienda
- R: publico
- U: admin y hacienda
- D: admin y hacienda

Contabilidad
- C: admin y hacienda
- R: publico
- U: admin y hacienda
- D: admin y hacienda

Curriculums (idem a avatares)
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

Licitaciones (idem a contabilidad)
- C: admin y hacienda
- R: publico
- U: admin y hacienda
- D: admin y hacienda

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
