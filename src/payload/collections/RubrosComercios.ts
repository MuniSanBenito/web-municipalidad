import type { CollectionConfig } from 'payload'
import { isHabilitacionesOrAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const RubrosComercios: CollectionConfig = {
  slug: 'rubros-comercios',
  labels: {
    singular: 'Rubro de Comercio',
    plural: 'Rubros de Comercios',
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
  },
  fields: [
    {
      name: 'codigo',
      type: 'text',
      label: 'Código ARCA/CLAE',
      required: true,
      unique: true,
      admin: {
        description: 'Código del nomenclador de actividades económicas (ej: 471110)',
      },
    },
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre del Rubro',
      required: true,
      unique: true,
    },
    {
      name: 'categoria',
      type: 'text',
      label: 'Categoría',
      required: true,
      admin: {
        description: 'Categoría principal del nomenclador (ej: Comercio al por mayor y al por menor)',
      },
    },
    {
      name: 'subcategoria',
      type: 'text',
      label: 'Subcategoría',
      required: true,
      admin: {
        description: 'Subcategoría dentro de la categoría (ej: Venta al por menor de productos alimenticios)',
      },
    },
  ],
}
