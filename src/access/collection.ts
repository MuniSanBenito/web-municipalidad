import { ROL_ADMIN_VALUE } from '@/constants/roles'
import type { Access } from 'payload'

export const isAdminCollectionAccess: Access = ({ req }) =>
  req?.user?.rol?.includes(ROL_ADMIN_VALUE) ?? false
