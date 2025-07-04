import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import { isComunicacionOrAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const Eventos: CollectionConfig = {
  slug: 'eventos',
  labels: {
    singular: 'Evento',
    plural: 'Eventos',
  },
  access: {
    create: isComunicacionOrAdminCollectionAccess,
    read: isPublicAccess,
    update: isComunicacionOrAdminCollectionAccess,
    delete: isComunicacionOrAdminCollectionAccess,
  },
  admin: {
    useAsTitle: 'nombre',
    hideAPIURL: HIDE_API_URL,
  },
  fields: [
    CreatedBy,
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre',
      required: true,
      unique: true,
    },
    {
      type: 'text',
      name: 'descripcion',
      label: 'Descripción Corta',
      required: true,
      maxLength: 256,
    },
    {
      type: 'date',
      name: 'fecha',
      label: 'Fecha',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'ubicacion',
      type: 'relationship',
      relationTo: 'ubicaciones',
      required: true,
      label: 'Ubicación',
    },
    {
      type: 'text',
      name: 'entradas',
      label: 'Entradas',
      required: true,
      admin: {
        description: 'Enlace a la página de entradas o información adicional',
        placeholder: 'Entrada libre y gratuita',
      },
    },
    {
      type: 'text',
      name: 'organiza',
      label: 'Organiza',
      required: true,
      admin: {
        description: 'Nombre de la organización o persona que organiza el evento',
        placeholder: 'Municipalidad de San Benito',
      },
    },
    {
      type: 'relationship',
      name: 'tags',
      label: 'Etiquetas',
      required: false,
      hasMany: true,
      relationTo: 'eventos-tags',
    },
    {
      name: 'imagen',
      type: 'upload',
      label: 'Imagen',
      required: false,
      relationTo: 'imagenes',
    },
    {
      name: 'archivos',
      type: 'upload',
      label: 'Archivos',
      required: false,
      relationTo: 'archivos',
      hasMany: true,
    },
  ],
}
