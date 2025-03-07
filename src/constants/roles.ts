export const ROLES = ['ADMIN', 'CIUDADANO', 'PUBLICO'] as const
type Rol = (typeof ROLES)[number]

export const ROL_DEFAULT_VALUE: Rol = 'CIUDADANO'
export const ROL_ADMIN_VALUE: Rol = 'ADMIN'
export const ROL_CIUDADANO_VALUE: Rol = 'CIUDADANO'
