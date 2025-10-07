import type { Curriculum } from '@/payload-types'
import type { Access, CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import {
  isCiudadanoOrMoreCollectionAccess,
  isGestorCiudadanoOrAdminCollectionAccess,
} from '../access/collection'
import { HIDE_API_URL } from '../config'
import { ROL_ADMIN_VALUE } from '../constants/roles'

const isMyCvGestorCiudadanoOrAdmin: Access<Curriculum> = async ({ req, data }) => {
  if (req.user?.collection === 'ciudadanos') {
    let ciudadano = data?.ciudadano
    if (typeof ciudadano === 'string') {
      ciudadano = await req.payload.findByID({
        collection: 'ciudadanos',
        id: ciudadano,
      })
    }

    return ciudadano?.id === req.user.id
  }

  return (
    req.user?.rol.includes('GESTOR CIUDADANO') || req.user?.rol.includes(ROL_ADMIN_VALUE) || false
  )
}

const beforeChange: CollectionBeforeChangeHook<Curriculum> = async ({ data, req }) => {
  let { ciudadano } = data
  if (typeof ciudadano === 'string') {
    ciudadano = await req.payload.findByID({
      collection: 'ciudadanos',
      id: ciudadano,
    })
  }
  const titulo = `${ciudadano?.nombre} ${ciudadano?.apellido}`

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
    read: isMyCvGestorCiudadanoOrAdmin,
    update: isMyCvGestorCiudadanoOrAdmin,
    delete: isGestorCiudadanoOrAdminCollectionAccess,
  },
  admin: {
    useAsTitle: 'titulo',
    hideAPIURL: HIDE_API_URL,
  },
  hooks: {
    beforeChange: [beforeChange],
  },
  trash: true,
  fields: [
    // CreatedBy,
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
      name: 'ciudadano',
      label: 'Ciudadano',
      relationTo: 'ciudadanos',
      unique: true,
      required: true,
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
