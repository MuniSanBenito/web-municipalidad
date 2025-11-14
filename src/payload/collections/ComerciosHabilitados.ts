import type { CollectionConfig } from 'payload'

export const ComerciosHabilitados: CollectionConfig = {
  slug: 'comercios-habilitados',
  labels: {
    singular: 'Comercio Habilitado',
    plural: 'Comercios Habilitados',
  },
  admin: {
    useAsTitle: 'nombre',
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre de Fantasía',
      required: true,
    },
    {
      name: 'cuit',
      type: 'text',
      label: 'CUIT',
      required: true,
    },
    {
      name: 'razonSocial',
      type: 'text',
      label: 'Razón Social',
      required: true,
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
      required: true,
      admin: {
        description:
          'Se puede obtener ubicando el punto en Google Maps y copiando las coordenadas que se muestran apretando clic derecho.',
      },
    },
    {
      name: 'rubros',
      type: 'relationship',
      relationTo: 'rubros-comercios',
      label: 'Rubros',
      hasMany: true,
    },
  ],
}
