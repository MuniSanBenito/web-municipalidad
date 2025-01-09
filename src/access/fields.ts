import type { FieldAccess } from 'payload'

export const isAdminFieldAccess: FieldAccess = ({ req }) => req.user?.rol === 'ADMIN'
