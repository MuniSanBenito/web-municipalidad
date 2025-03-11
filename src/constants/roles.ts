export const ROL_ADMIN_VALUE = 'ADMIN'
export const ROL_CIUDADANO_VALUE = 'CIUDADANO'
export const ROL_PUBLICO_VALUE = 'PUBLICO'
export const ROL_OWN_VALUE = 'A SI MISMO'

export const ROLES = [
  ROL_ADMIN_VALUE,
  ROL_CIUDADANO_VALUE,
  ROL_PUBLICO_VALUE,
  ROL_OWN_VALUE,
  'COMUNICACION',
] as const
export type Rol = (typeof ROLES)[number]

export const ROL_DEFAULT_VALUE: Rol = 'CIUDADANO'
