import { getAccess } from '@/globals/Permisos'
import type { CollectionConfig } from 'payload'

const SLUG = 'eventos'

const access = getAccess({ collection: SLUG })

export const Eventos: CollectionConfig = {
  slug: SLUG,
  labels: {
    singular: 'Evento',
    plural: 'Eventos',
  },
  admin: {
    useAsTitle: 'nombre',
  },
  access,
  fields: [
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
