import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import { isHabilitacionesOrAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const ComerciosHabilitados: CollectionConfig = {
  slug: 'comercios-habilitados',
  labels: {
    singular: 'Comercio Habilitado',
    plural: 'Comercios Habilitados',
  },
  access: {
    create: isHabilitacionesOrAdminCollectionAccess,
    read: isPublicAccess,
    update: isHabilitacionesOrAdminCollectionAccess,
    delete: isHabilitacionesOrAdminCollectionAccess,
  },
  admin: {
    useAsTitle: 'nombre',
    hideAPIURL: HIDE_API_URL,
    defaultColumns: ['nombre', 'razonSocial', 'rubro', 'fechaAlta', 'fechaBaja'],
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre de Fantasía',
      required: true,
    },
    {
      name: 'razonSocial',
      type: 'text',
      label: 'Razón Social',
      required: true,
    },
    {
      name: 'cuit',
      type: 'text',
      label: 'CUIT / CUIL',
      required: true,
    },
    {
      name: 'fechaAlta',
      type: 'date',
      label: 'Fecha de Alta',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'fechaBaja',
      type: 'date',
      label: 'Fecha de Baja',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
        position: 'sidebar',
        description: 'Completar solo si la habilitación fue dada de baja.',
      },
    },
    {
      name: 'direccion',
      type: 'text',
      label: 'Dirección',
      required: true,
    },
    {
      name: 'localizacion',
      type: 'point',
      label: 'Localización (Mapa)',
      admin: {
        description:
          'Coordenadas GPS del local. Se obtienen en Google Maps con clic derecho sobre el punto.',
      },
    },
    {
      name: 'rubro',
      type: 'relationship',
      relationTo: 'rubros-comercios',
      label: 'Rubro',
      required: true,
      hasMany: false,
    },
    {
      name: 'actividades',
      type: 'relationship',
      relationTo: 'actividades-comercios',
      label: 'Actividades',
      hasMany: true,
    },
    CreatedBy,
  ],
}
