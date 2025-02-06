import type { CollectionConfig } from 'payload'

export const Curriculums: CollectionConfig = {
  slug: 'curriculums',
  labels: {
    singular: 'Curriculum',
    plural: 'Curriculums',
  },
  admin: {
    useAsTitle: 'user',
  },
  fields: [
    {
      type: 'relationship',
      name: 'user',
      label: 'Usuario',
      relationTo: 'users',
      unique: true,
      filterOptions: {
        rol: {
          equals: 'CIUDADANO',
        },
      },
    },
    {
      type: 'array',
      name: 'estudios',
      label: 'Estudios',
      fields: [
        {
          type: 'text',
          name: 'instutucion',
          label: 'Institución',
        },
        {
          type: 'date',
          name: 'fecha_inicio',
          label: 'Fecha Inicio',
        },
        {
          type: 'date',
          name: 'fecha_finalizacion',
          label: 'Fecha Finalización',
        },
        {
          type: 'text',
          name: 'nivel',
          label: 'Nivel',
        },
        {
          type: 'textarea',
          name: 'descripcion',
          label: 'Descripción',
        },
        {
          type: 'checkbox',
          name: 'is_old',
          label: 'Es antiguo',
          defaultValue: false,
          admin: {
            disabled: true,
          },
        },
        {
          type: 'text',
          name: 'nivel_old',
          label: 'Nivel Antiguo',
          admin: {
            disabled: true,
          },
        },
      ],
    },
    {
      type: 'array',
      name: 'experiencias',
      label: 'Experiencias',
      fields: [
        {
          type: 'text',
          name: 'instutucion',
          label: 'Institución',
        },
        {
          type: 'date',
          name: 'fecha_inicio',
          label: 'Fecha Inicio',
        },
        {
          type: 'date',
          name: 'fecha_finalizacion',
          label: 'Fecha Finalización',
        },
        {
          type: 'text',
          name: 'puesto',
          label: 'Puesto',
        },
        {
          type: 'text',
          name: 'descripcion',
          label: 'Descripción',
        },
      ],
    },
    {
      type: 'array',
      name: 'referencias',
      label: 'Referencias',
      fields: [
        {
          type: 'text',
          name: 'nombre',
          label: 'Nombre',
        },
        {
          type: 'text',
          name: 'telefono',
          label: 'Teléfono',
        },
        {
          type: 'text',
          name: 'email',
          label: 'Email',
        },
        {
          type: 'textarea',
          name: 'descripcion',
          label: 'Descripción',
        },
      ],
    },
    {
      type: 'array',
      name: 'categorias',
      label: 'Categorias',
      fields: [
        {
          type: 'text',
          name: 'nombre',
          label: 'Nombre',
        },
      ],
    },
  ],
}
