import { CreatedBy } from '@/payload/fields/created_by'
import {
  numeroIngresado,
  siguienteNumeroHabilitacion,
} from '@/payload/habilitaciones/numero-habilitacion'
import type { CollectionConfig, PayloadRequest } from 'payload'
import { isHabilitacionesOrAdminCollectionAccess, isPublicAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

async function generarNumeroHabilitacion(req: PayloadRequest): Promise<string> {
  const year = new Date().getFullYear()
  const { docs } = await req.payload.find({
    collection: 'comercios-habilitados',
    where: { numeroHabilitacion: { contains: `HB-${year}-` } },
    limit: 1000,
    depth: 0,
  })
  const existentes = docs.flatMap((doc) =>
    typeof doc.numeroHabilitacion === 'string' ? [doc.numeroHabilitacion] : [],
  )
  return siguienteNumeroHabilitacion(existentes, year)
}

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
    defaultColumns: [
      'nombre',
      'numeroHabilitacion',
      'razonSocial',
      'rubro',
      'fechaAlta',
      'fechaVencimiento',
      'fechaBaja',
    ],
    description:
      'Para renovaciones históricas: crear o buscar el ciudadano, asignarle el módulo HABILITACIONES y vincularlo en Titulares.',
  },
  hooks: {
    beforeValidate: [
      ({ data, operation, originalDoc }) => {
        if (!data) return data

        const manual = numeroIngresado(data.numeroHabilitacion)
        if (manual) {
          data.numeroHabilitacion = manual
          return data
        }

        if (operation === 'update') {
          const previo = numeroIngresado(originalDoc?.numeroHabilitacion)
          if (previo) data.numeroHabilitacion = previo
        }

        return data
      },
    ],
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create') {
          const token = crypto.randomUUID()
          data.tokenValidacion = token
          data.urlValidacion = `${process.env.NEXT_PUBLIC_SERVER_URL}/validar/${token}`

          const manual = numeroIngresado(data.numeroHabilitacion)
          data.numeroHabilitacion = manual ?? (await generarNumeroHabilitacion(req))
        }
        return data
      },
    ],
  },
  endpoints: [
    {
      path: '/validar/:token',
      method: 'get',
      handler: async (req) => {
        const token = req.routeParams?.token as string | undefined

        if (!token) {
          return Response.json({ error: 'Token requerido' }, { status: 400 })
        }

        const result = await req.payload.find({
          collection: 'comercios-habilitados',
          where: { tokenValidacion: { equals: token } },
          depth: 1,
          limit: 1,
        })

        if (result.docs.length === 0) {
          return Response.json({ error: 'Habilitación no encontrada' }, { status: 404 })
        }

        const comercio = result.docs[0]
        const rubroNombre = typeof comercio.rubro === 'object' ? comercio.rubro.nombre : null

        return Response.json({
          nombre: comercio.nombre,
          razonSocial: comercio.razonSocial,
          cuit: comercio.cuit,
          numeroHabilitacion: comercio.numeroHabilitacion ?? comercio.id,
          rubro: rubroNombre,
          direccion: comercio.direccion,
          fechaAlta: comercio.fechaAlta ?? null,
          fechaVencimiento: comercio.fechaVencimiento ?? comercio.fechaBaja ?? null,
        })
      },
    },
  ],
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
      name: 'numeroHabilitacion',
      type: 'text',
      label: 'Número de Habilitación',
      unique: true,
      index: true,
      admin: {
        placeholder: 'Ej: 1523/2019',
        description:
          'Escribí el número del expediente. Si lo dejás vacío al crear el comercio, al guardar se genera uno automático (HB-año-0001).',
      },
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
      name: 'fechaVencimiento',
      type: 'date',
      label: 'Fecha de Vencimiento',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
        position: 'sidebar',
        description: 'Vigencia de la habilitación. Se actualiza al aprobar una renovación.',
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
        description: 'Completar solo si el comercio fue dado de baja (cierre).',
      },
    },
    {
      name: 'titulares',
      type: 'relationship',
      relationTo: 'ciudadanos',
      label: 'Titulares',
      hasMany: true,
      admin: {
        description:
          'Ciudadanos que pueden ver este comercio en el portal y iniciar su renovación. Crear el ciudadano antes si no existe y asignarle el módulo HABILITACIONES.',
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
          'En Google Maps, clic derecho sobre el local. El primer número es la latitud (cerca de -31,78) y el segundo la longitud (cerca de -60,43). Cargá la longitud en el primer campo y la latitud en el segundo. Sin estas coordenadas el comercio no aparece en el mapa.',
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
    {
      name: 'tokenValidacion',
      type: 'text',
      label: 'Token de Validación',
      unique: true,
      index: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'urlValidacion',
      type: 'text',
      label: 'URL de Validación',
      admin: {
        readOnly: true,
        description:
          'URL única para verificar la habilitación. Se genera automáticamente al crear.',
      },
    },
    CreatedBy,
  ],
}
