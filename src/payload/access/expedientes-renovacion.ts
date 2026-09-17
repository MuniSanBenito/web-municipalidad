import type { Access, FieldAccess } from 'payload'

const ADMIN = 'ADMIN'
const HABILITACIONES = 'HABILITACIONES'

type RequestContext = {
  req: { user?: { collection?: string; id?: string; rol?: string[] } | null }
}

function isCiudadano(req: RequestContext['req']) {
  return req.user?.collection === 'ciudadanos'
}

function hasRole(req: RequestContext['req'], ...roles: string[]) {
  return req.user?.collection === 'users' && roles.some((role) => req.user?.rol?.includes(role))
}

export const renovacionReadAccess: Access = ({ req }) => {
  if (!req.user) return false
  if (isCiudadano(req)) {
    return { 'created_by.value': { equals: req.user.id } }
  }
  return hasRole(req, ADMIN, HABILITACIONES)
}

export const renovacionUpdateAccess: Access = ({ req }) => {
  if (!req.user) return false
  if (isCiudadano(req)) {
    return { 'created_by.value': { equals: req.user.id } }
  }
  return hasRole(req, ADMIN, HABILITACIONES)
}

export const renovacionStaffFieldAccess: FieldAccess = ({ req }) => hasRole(req, ADMIN, HABILITACIONES)

const ESTADOS_EDITABLES_CIUDADANO = ['INICIADO', 'OBSERVADO']

export const renovacionCitizenFieldAccess: FieldAccess<any> = ({ req, doc }) => {
  if (isCiudadano(req)) {
    const estado = doc?.estado as string | undefined
    return !estado || ESTADOS_EDITABLES_CIUDADANO.includes(estado)
  }
  return hasRole(req, ADMIN, HABILITACIONES)
}
