import type { CollectionConfig } from 'payload'
import { isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const ImagenesArboles: CollectionConfig = {
  slug: 'imagenes-arboles',
  labels: {
    singular: 'Imagen de Árbol',
    plural: 'Imágenes de Árboles',
  },
  typescript: {
    interface: 'ImagenArbol',
  },
  access: {
    read: isPublicAccess,
  },
  admin: {
    group: 'Almacenamiento',
    hideAPIURL: HIDE_API_URL,
    useAsTitle: 'nombreComun',
  },
  fields: [
    {
      name: 'nombreComun',
      type: 'text',
      label: 'Nombre Común',
      required: true,
    },
    {
      name: 'nombreCientifico',
      type: 'text',
      label: 'Nombre Científico',
      required: false,
    },
    {
      name: 'tipoVereda',
      type: 'select',
      label: 'Tipo de Vereda',
      required: true,
      options: [
        { label: 'Angosta (menos de 2,5 m)', value: 'angosta' },
        { label: 'Mediana (2,5 - 4,5 m)', value: 'mediana' },
        { label: 'Ancha (más de 4,5 m)', value: 'ancha' },
      ],
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción',
      required: false,
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Texto Alternativo (ALT)',
      required: true,
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
    mimeTypes: ['image/*'],
  },
}
