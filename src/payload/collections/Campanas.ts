import type { CollectionConfig, FieldHook } from 'payload'
import { isComunicacionOrAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

const beforeChangeSlug: FieldHook = ({ value }) => {
  const slug = String(value || Date.now())
  return slug
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
}

export const Campanas: CollectionConfig = {
  slug: 'campanas',
  labels: {
    singular: 'Campaña',
    plural: 'Campañas',
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
    group: 'Participación',
  },
  fields: [
    {
      type: 'text',
      name: 'nombre',
      label: 'Nombre',
      required: true,
    },
    {
      type: 'text',
      name: 'slug',
      label: 'Slug',
      required: true,
      unique: true,
      defaultValue: () => Date.now().toString(),
      hooks: { beforeValidate: [beforeChangeSlug] },
    },
    {
      type: 'textarea',
      name: 'descripcion',
      label: 'Descripción',
      required: true,
      maxLength: 256,
    },
    {
      type: 'text',
      name: 'barrio',
      label: 'Barrio',
      required: true,
    },
    {
      type: 'text',
      name: 'colorPrincipal',
      label: 'Color Principal (hex)',
      required: true,
      defaultValue: '#10b981',
      admin: {
        description: 'Color en formato hex, ej: #10b981',
      },
    },
    {
      type: 'upload',
      name: 'imagen',
      label: 'Imagen de la campaña',
      relationTo: 'imagenes',
      required: false,
    },
    {
      type: 'date',
      name: 'fechaInicio',
      label: 'Fecha de inicio',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      type: 'date',
      name: 'fechaFin',
      label: 'Fecha de fin',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      type: 'select',
      name: 'estado',
      label: 'Estado',
      required: true,
      defaultValue: 'borrador',
      options: [
        { label: 'Borrador', value: 'borrador' },
        { label: 'Activa', value: 'activa' },
        { label: 'Finalizada', value: 'finalizada' },
      ],
    },
    {
      type: 'checkbox',
      name: 'deportesActivo',
      label: 'Actividad: Deportes',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      name: 'arbolesActivo',
      label: 'Actividad: Árboles',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      name: 'plazaActivo',
      label: 'Actividad: Plaza',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      name: 'presupuestoActivo',
      label: 'Actividad: Presupuesto',
      defaultValue: true,
    },
    {
      type: 'select',
      name: 'publico',
      label: 'Público objetivo',
      required: true,
      defaultValue: 'mixto',
      options: [
        { label: 'Niños', value: 'niños' },
        { label: 'Adultos', value: 'adultos' },
        { label: 'Mixto', value: 'mixto' },
      ],
    },
    {
      type: 'checkbox',
      name: 'sessionUnica',
      label: 'Permitir solo un envío por sesión',
      defaultValue: true,
    },
    {
      type: 'checkbox',
      name: 'resultadosPublicos',
      label: 'Resultados públicos',
      defaultValue: true,
    },
  ],
}
