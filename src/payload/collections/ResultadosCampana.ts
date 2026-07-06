import type { CollectionConfig } from 'payload'
import { isAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const ResultadosCampana: CollectionConfig = {
  slug: 'resultados-campana',
  labels: {
    singular: 'Resultado de Campaña',
    plural: 'Resultados de Campañas',
  },
  access: {
    create: isPublicAccess,
    read: isAdminCollectionAccess,
    update: isAdminCollectionAccess,
    delete: isAdminCollectionAccess,
  },
  admin: {
    useAsTitle: 'opcionNombre',
    hideAPIURL: HIDE_API_URL,
    group: 'Participación',
    defaultColumns: ['campana', 'actividad', 'opcionNombre', 'votos'],
  },
  fields: [
    {
      type: 'relationship',
      name: 'campana',
      label: 'Campaña',
      relationTo: 'campanas',
      required: true,
    },
    {
      type: 'select',
      name: 'actividad',
      label: 'Actividad',
      required: true,
      options: [
        { label: 'Deportes', value: 'deportes' },
        { label: 'Árboles', value: 'arboles' },
        { label: 'Plaza', value: 'plaza' },
        { label: 'Presupuesto', value: 'presupuesto' },
      ],
    },
    {
      type: 'text',
      name: 'opcionId',
      label: 'ID de opción',
      required: true,
      admin: {
        description: 'ID o nombre de la opción seleccionada',
      },
    },
    {
      type: 'text',
      name: 'opcionNombre',
      label: 'Nombre de opción',
      required: true,
    },
    {
      type: 'number',
      name: 'votos',
      label: 'Votos',
      required: true,
      defaultValue: 0,
    },
  ],
}
