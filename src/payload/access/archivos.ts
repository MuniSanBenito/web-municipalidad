import type { Access, FieldAccess, Where } from 'payload'

const ADMIN = 'ADMIN'
const OBRAS_PRIVADAS = 'OBRAS PRIVADAS'
const HABILITACIONES = 'HABILITACIONES'
const HACIENDA = 'HACIENDA'

function isMunicipal(req: any) {
  return req.user?.collection === 'users'
}

function hasRole(req: any, role: string) {
  return isMunicipal(req) && req.user?.rol?.includes(role)
}

function hasMunicipalRole(req: any) {
  return [ADMIN, OBRAS_PRIVADAS, HABILITACIONES, HACIENDA].some((role) => hasRole(req, role))
}

const publicFilesConstraint: Where = { esPrivado: { not_equals: true } }

export const archivoReadAccess: Access = ({ req }) => {
  if (hasMunicipalRole(req)) return true
  if (req.user?.collection === 'ciudadanos') {
    return {
      or: [
        publicFilesConstraint,
        {
          and: [{ esPrivado: { equals: true } }, { propietarioCiudadano: { equals: req.user.id } }],
        },
      ],
    }
  }
  return publicFilesConstraint
}

export const archivoOwnerOrAdminAccess: Access = ({ req }) => {
  if (hasRole(req, ADMIN)) return true
  if (req.user?.collection === 'ciudadanos' && req.user.id) {
    return { propietarioCiudadano: { equals: req.user.id } } as Where
  }
  if (isMunicipal(req) && req.user?.id) {
    return { 'created_by.value': { equals: req.user.id } } as Where
  }
  return false
}

export const archivoClassificationFieldAccess: FieldAccess<any> = ({ req }) => hasMunicipalRole(req)

export const isCitizenRequest = (req: { user?: { collection?: string } | null }) =>
  req.user?.collection === 'ciudadanos'

export function protectCitizenUpload({ data, req }: { data: any; req: any }) {
  if (isCitizenRequest(req)) {
    data.esPrivado = true
    data.propietarioCiudadano = req.user?.id
  }
  return data
}
