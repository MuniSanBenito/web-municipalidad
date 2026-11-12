import type { Access, FieldAccess } from 'payload'

const ADMIN = 'ADMIN'
const GESTOR_CIUDADANO = 'GESTOR CIUDADANO'
const HABILITACIONES = 'HABILITACIONES'

type RequestContext = {
  req: { user?: { collection?: string; id?: string; rol?: string[] } | null }
  id?: string | number
}

function hasRole(req: RequestContext['req'], ...roles: string[]) {
  return req.user?.collection === 'users' && roles.some((role) => req.user?.rol?.includes(role))
}

export const ciudadanoCreateAccess: Access = ({ req }) =>
  hasRole(req, ADMIN, GESTOR_CIUDADANO, HABILITACIONES)

export const ciudadanoReadAccess: Access = ({ req, id }) => {
  if (req.user?.collection === 'ciudadanos') {
    return req.user.id === id
  }

  return hasRole(req, ADMIN, GESTOR_CIUDADANO, HABILITACIONES)
}

export const ciudadanoUpdateAccess: Access = ({ req, id }) => {
  if (req.user?.collection === 'ciudadanos') {
    return req.user.id === id
  }

  return hasRole(req, ADMIN, GESTOR_CIUDADANO)
}

export const ciudadanoDeleteAccess: Access = ({ req }) => hasRole(req, ADMIN, GESTOR_CIUDADANO)

export const ciudadanoStaffFieldAccess: FieldAccess = ({ req, id }) => {
  if (hasRole(req, ADMIN, GESTOR_CIUDADANO)) return true
  return !id && hasRole(req, HABILITACIONES)
}
