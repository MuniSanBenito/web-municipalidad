import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'

export const BalancesMensuales: CollectionConfig = {
  slug: 'balances-mensuales',
  labels: {
    singular: 'Balance Mensual',
    plural: 'Balances Mensuales',
  },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'fecha'],
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
      name: 'tipo',
      label: 'Tipo de Balance',
      options: [
        { label: 'Balance General', value: 'balance_general' },
        { label: 'Estado de Resultados', value: 'estado_resultados' },
        { label: 'Flujo de Efectivo', value: 'flujo_efectivo' },
        { label: 'Otro', value: 'otro' },
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
