import type { ExpedientesHabilitacion } from '@/payload-types'
import type { Access, FieldAccess } from 'payload'

const ADMIN = 'ADMIN'
const OBRAS_PRIVADAS = 'OBRAS PRIVADAS'
const HABILITACIONES = 'HABILITACIONES'
const HACIENDA = 'HACIENDA'

type RequestContext = {
  req: { user?: { collection?: string; id?: string; rol?: string[] } | null }
}

function isCiudadano(req: RequestContext['req']) {
  return req.user?.collection === 'ciudadanos'
}

function hasRole(req: RequestContext['req'], ...roles: string[]) {
  return req.user?.collection === 'users' && roles.some((role) => req.user?.rol?.includes(role))
}

function isLocked(estado?: string | null) {
  return estado === 'VISITA_PROGRAMADA' || estado === 'APROBADO'
}

export const expedienteUpdateAccess: Access = ({ req }) => {
  if (!req.user) return false
  if (isCiudadano(req)) {
    return { 'created_by.value': { equals: req.user.id } }
  }
  return hasRole(req, ADMIN, OBRAS_PRIVADAS, HABILITACIONES, HACIENDA)
}

export const expedienteMunicipalFieldAccess: FieldAccess<ExpedientesHabilitacion> = ({ req }) =>
  hasRole(req, ADMIN, OBRAS_PRIVADAS, HABILITACIONES, HACIENDA)

export const faseIFieldAccess: FieldAccess<ExpedientesHabilitacion> = ({ req, doc }) => {
  if (isCiudadano(req)) return !isLocked(doc?.faseIEstado)
  return hasRole(req, ADMIN, OBRAS_PRIVADAS)
}

export const faseIAdminFieldAccess: FieldAccess<ExpedientesHabilitacion> = ({ req }) =>
  hasRole(req, ADMIN, OBRAS_PRIVADAS)

export const faseIIFieldAccess: FieldAccess<ExpedientesHabilitacion> = ({ req, doc }) => {
  if (isCiudadano(req)) {
    return doc?.faseIEstado === 'APROBADO' && !isLocked(doc?.faseIIEstado)
  }
  return hasRole(req, ADMIN, HABILITACIONES)
}

export const faseIIAdminFieldAccess: FieldAccess<ExpedientesHabilitacion> = ({ req }) =>
  hasRole(req, ADMIN, HABILITACIONES)

export const faseIIIAdminFieldAccess: FieldAccess<ExpedientesHabilitacion> = ({ req }) =>
  hasRole(req, ADMIN, HABILITACIONES, HACIENDA)

export const expedienteReadInternalFieldAccess: FieldAccess<ExpedientesHabilitacion> = ({ req }) =>
  hasRole(req, ADMIN, OBRAS_PRIVADAS, HABILITACIONES, HACIENDA)
