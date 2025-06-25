import type { Curriculum } from '@/payload-types'
import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import {
  isAdminOrCreatedByAccess,
  isAdminOrCreatedByWithDataAccess,
  isCiudadanoOrMoreCollectionAccess,
} from '../access/collection'
import { HIDE_API_URL } from '../config'

const beforeChange: CollectionBeforeChangeHook<Curriculum> = async ({ data, req }) => {
  let { user } = data
  if (typeof user === 'string') {
    user = await req.payload.findByID({
      collection: 'users',
      id: user,
    })
  }
  const titulo = `${user?.datos_ciudadano?.nombre} ${user?.datos_ciudadano?.apellido}`

  return { ...data, titulo }
}

export const Curriculums: CollectionConfig = {
  slug: 'curriculums',
  labels: {
    singular: 'Curriculum',
    plural: 'Curriculums',
  },
  access: {
    create: isCiudadanoOrMoreCollectionAccess,
    read: isAdminOrCreatedByAccess,
    update: isAdminOrCreatedByWithDataAccess,
    delete: isAdminOrCreatedByWithDataAccess,
  },
  admin: {
    useAsTitle: 'titulo',
    hideAPIURL: HIDE_API_URL,
  },
  hooks: {
    beforeChange: [beforeChange],
  },
  fields: [
    CreatedBy,
    {
      type: 'text',
      name: 'titulo',
      label: 'Titulo',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      type: 'relationship',
      name: 'user',
      label: 'Usuario',
      relationTo: 'users',
      unique: true,
      required: true,
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
          name: 'institucion',
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
          type: 'select',
          name: 'nivel',
          label: 'Nivel',
          options: ['PRIMARIO', 'SECUNDARIO', 'TERCIARIO', 'GRADO', 'POSTGRADO', 'CURSO/TALLER'],
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
          name: 'institucion',
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
