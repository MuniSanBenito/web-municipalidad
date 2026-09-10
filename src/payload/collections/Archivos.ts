import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import {
  archivoClassificationFieldAccess,
  archivoOwnerOrAdminAccess,
  archivoReadAccess,
  protectCitizenUpload,
} from '../access/archivos'
import { isCiudadanoOrMoreCollectionAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const Archivos: CollectionConfig = {
  slug: 'archivos',
  labels: {
    singular: 'Archivo',
    plural: 'Archivos',
  },
  access: {
    create: isCiudadanoOrMoreCollectionAccess,
    read: archivoReadAccess,
    update: archivoOwnerOrAdminAccess,
    delete: archivoOwnerOrAdminAccess,
  },
  hooks: {
    beforeChange: [protectCitizenUpload],
  },
  admin: {
    group: 'Almacenamiento',
    hideAPIURL: HIDE_API_URL,
  },
  fields: [
    {
      name: 'esPrivado',
      type: 'checkbox',
      label: 'Archivo privado',
      defaultValue: false,
      access: {
        create: archivoClassificationFieldAccess,
        update: archivoClassificationFieldAccess,
      },
      admin: {
        position: 'sidebar',
        description:
          'Los archivos privados solo pueden ser vistos por su propietario y personal autorizado.',
      },
    },
    {
      name: 'propietarioCiudadano',
      type: 'relationship',
      label: 'Propietario ciudadano',
      relationTo: 'ciudadanos',
      access: {
        create: archivoClassificationFieldAccess,
        update: archivoClassificationFieldAccess,
      },
      admin: {
        position: 'sidebar',
        description: 'Se completa automáticamente para las cargas realizadas por ciudadanos.',
      },
    },
    CreatedBy,
  ],
  upload: {
    crop: false,
  },
}
