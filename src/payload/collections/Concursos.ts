import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import { isHaciendaOrAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const Concursos: CollectionConfig = {
  slug: 'concursos',
  labels: {
    singular: 'Concurso',
    plural: 'Concursos',
  },
  access: {
    create: isHaciendaOrAdminCollectionAccess,
    read: isPublicAccess,
    update: isHaciendaOrAdminCollectionAccess,
    delete: isHaciendaOrAdminCollectionAccess,
  },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'fecha', 'estado'],
    hideAPIURL: HIDE_API_URL,
  },
  fields: [
    CreatedBy,
    {
      type: 'text',
      name: 'titulo',
      label: 'Título',
      required: true,
    },
    {
      type: 'richText',
      name: 'descripcion',
      label: 'Descripción',
      required: true,
    },
    {
      type: 'date',
      name: 'fecha',
      label: 'Fecha',
      required: true,
    },
    {
      type: 'select',
      name: 'estado',
      label: 'Estado',
      options: [
        { label: 'Abierto', value: 'abierto' },
        { label: 'En evaluación', value: 'en_evaluacion' },
        { label: 'Finalizado', value: 'finalizado' },
        { label: 'Cancelado', value: 'cancelado' },
      ],
      required: true,
    },
    {
      type: 'upload',
      name: 'documento',
      label: 'Documento',
      relationTo: 'archivos',
      required: true,
    },
    {
      type: 'array',
      name: 'archivos_adicionales',
      label: 'Archivos Adicionales',
      fields: [
        {
          type: 'upload',
          name: 'archivo',
          label: 'Archivo',
          relationTo: 'archivos',
          required: true,
        },
        {
          type: 'text',
          name: 'descripcion',
          label: 'Descripción',
        },
      ],
    },
  ],
}
