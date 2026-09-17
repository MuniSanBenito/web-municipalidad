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
    defaultColumns: ['nombre', 'razonSocial', 'rubro', 'fechaAlta', 'fechaVencimiento', 'fechaBaja'],
    description:
      'Para renovaciones históricas: crear o buscar el ciudadano, asignarle el módulo HABILITACIONES y vincularlo en Titulares.',
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create') {
          const token = crypto.randomUUID()
          data.tokenValidacion = token
          data.urlValidacion = `${process.env.NEXT_PUBLIC_SERVER_URL}/validar/${token}`

          // Autogenerar solo si staff no cargó el nro. papel del expediente histórico.
          if (!data.numeroHabilitacion) {
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
        position: 'sidebar',
        description:
          'Si se deja vacío al crear, se genera HB-{año}-{correlativo}. En comercios históricos se puede cargar el nro. del expediente papel.',
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
