export const ROL_ADMIN_VALUE = 'ADMIN'
export const ROL_PUBLICO_VALUE = 'PUBLICO'
export const ROL_OWN_VALUE = 'A SI MISMO'

export const ROLES = [
  ROL_ADMIN_VALUE,
  'COMUNICACION',
  'HABILITACIONES',
  'HACIENDA',
  'JUZGADO',
  'GESTOR CIUDADANO',
  'OBRAS PRIVADAS',
] as const
export type Rol = (typeof ROLES)[number]

export const ROL_DEFAULT_VALUE: Rol = ROL_ADMIN_VALUE
