import { CreatedBy } from '@/fields/created_by'
import { accessCreate, accessDelete, accessRead, accessUpdate } from '@/globals/Permisos'
import type { CollectionConfig } from 'payload'

const SLUG = 'eventos'

export const Eventos: CollectionConfig = {
  slug: SLUG,
  labels: {
    singular: 'Evento',
    plural: 'Eventos',
  },
  admin: {
    useAsTitle: 'nombre',
  },
  access: {
    create: async (args) => await accessCreate({ ...args, collection: SLUG }),
    read: async (args) => await accessRead({ ...args, collection: SLUG }),
    update: async (args) => await accessUpdate({ ...args, collection: SLUG }),
    delete: async (args) => await accessDelete({ ...args, collection: SLUG }),
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
      type: 'textarea',
      name: 'descripcion',
      label: 'Descripción',
      required: true,
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
