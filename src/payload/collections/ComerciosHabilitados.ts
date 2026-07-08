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
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create') {
          const token = crypto.randomUUID()
          data.tokenValidacion = token
          data.urlValidacion = `${process.env.NEXT_PUBLIC_SERVER_URL}/validar/${token}`

          // Generar número de habilitación secuencial: HB-{año}-{correlativo}
          const year = new Date().getFullYear()
          const { totalDocs } = await req.payload.find({
            collection: 'comercios-habilitados',
            where: {
              and: [
                { numeroHabilitacion: { exists: true } },
                { numeroHabilitacion: { contains: `HB-${year}-` } },
              ],
            },
            limit: 0,
            depth: 0,
          })
          const correlativo = String((totalDocs ?? 0) + 1).padStart(4, '0')
          data.numeroHabilitacion = `HB-${year}-${correlativo}`
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

        const comercio = result.docs[0] as any
        const rubroNombre =
          comercio.rubro && typeof comercio.rubro === 'object'
            ? (comercio.rubro as { nombre: string }).nombre
            : null

        return Response.json({
          nombre: comercio.nombre,
          razonSocial: comercio.razonSocial,
          cuit: comercio.cuit,
          numeroHabilitacion: comercio.numeroHabilitacion ?? comercio.id,
          rubro: rubroNombre,
          direccion: comercio.direccion,
          fechaAlta: comercio.fechaAlta ?? null,
          fechaVencimiento: comercio.fechaBaja ?? null,
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
    {
      name: 'numeroHabilitacion',
      type: 'text',
      label: 'Número de Habilitación',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Se genera automáticamente al crear. Formato: HB-{año}-{correlativo}.',
      },
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
