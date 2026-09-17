import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import {
  renovacionCitizenFieldAccess,
  renovacionReadAccess,
  renovacionStaffFieldAccess,
  renovacionUpdateAccess,
} from '../access/expedientes-renovacion'
import { HIDE_API_URL } from '../config'
import {
  HIGIENE_SEGURIDAD_ITEMS,
  LIBROS_TAPA_DURA_OPTIONS,
} from '../constants/renovacion'

export const ESTADOS_RENOVACION = [
  'INICIADO',
  'PENDIENTE',
  'OBSERVADO',
  'VISITA_PROGRAMADA',
  'APROBADO',
] as const
export type EstadoRenovacion = (typeof ESTADOS_RENOVACION)[number]

const ESTADOS_EDITABLES_CIUDADANO: EstadoRenovacion[] = ['INICIADO', 'OBSERVADO']

const ESTADO_OPTIONS = ESTADOS_RENOVACION.map((e) => ({
  label: e
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase()),
  value: e,
}))

function relationId(value: unknown): string | null {
  if (!value) return null
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null && 'id' in value) {
    return String((value as { id: string }).id)
  }
  return null
}

function addOneYear(from: Date): string {
  const next = new Date(from)
  next.setFullYear(next.getFullYear() + 1)
  return next.toISOString()
}

export const ExpedientesRenovacion: CollectionConfig = {
  slug: 'expedientes-renovacion',
  labels: {
    singular: 'Expediente de Renovación',
    plural: 'Expedientes de Renovación',
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    read: renovacionReadAccess,
    update: renovacionUpdateAccess,
    delete: ({ req }) => {
      if (!req.user || req.user.collection === 'ciudadanos') return false
      return req.user.rol?.includes('ADMIN') ?? false
    },
  },
  admin: {
    useAsTitle: 'titulo',
    hideAPIURL: HIDE_API_URL,
    group: 'Habilitaciones',
    defaultColumns: ['titulo', 'comercio', 'estado', 'updatedAt'],
    description:
      'Trámite de una sola fase a cargo de Habilitaciones. El comercio y el titular deben existir previamente.',
  },
  hooks: {
    beforeChange: [
      async ({ req, data, originalDoc, operation }) => {
        if (req.user?.collection === 'ciudadanos') {
          if (originalDoc?.estado !== undefined && originalDoc.estado !== null) {
            data.estado = originalDoc.estado === 'OBSERVADO' ? 'INICIADO' : originalDoc.estado
          }

          if (originalDoc?.comercio) {
            data.comercio = originalDoc.comercio
          }

          const estadoActual = (data.estado ?? originalDoc?.estado) as string | undefined
          if (
            estadoActual &&
            !ESTADOS_EDITABLES_CIUDADANO.includes(estadoActual as EstadoRenovacion)
          ) {
            throw new Error('Este trámite de renovación ya no admite modificaciones.')
          }
        }

        if (operation === 'create' && !data.estado) {
          data.estado = 'INICIADO'
        }

        const comercioId = relationId(data.comercio ?? originalDoc?.comercio)
        if (operation === 'create' && comercioId) {
          const comercio = await req.payload.findByID({
            collection: 'comercios-habilitados',
            id: comercioId,
            depth: 0,
            overrideAccess: true,
          })

          if (req.user?.collection === 'ciudadanos') {
            const titulares = Array.isArray((comercio as any).titulares)
              ? ((comercio as any).titulares as unknown[]).map(relationId)
              : []
            if (!titulares.includes(req.user.id)) {
              throw new Error('No sos titular de este comercio.')
            }

            const { docs: abiertos } = await req.payload.find({
              collection: 'expedientes-renovacion',
              where: {
                and: [
                  { comercio: { equals: comercioId } },
                  { 'created_by.value': { equals: req.user.id } },
                  { estado: { not_equals: 'APROBADO' } },
                ],
              },
              limit: 1,
              depth: 0,
              overrideAccess: true,
            })
            if (abiertos.length > 0) {
              throw new Error('Ya tenés una renovación en curso para este comercio.')
            }
          }

          if (!data.titulo) {
            data.titulo = `Renovación — ${(comercio as any).nombre ?? 'comercio'}`
          }
        }

        if (!data.titulo && !originalDoc?.titulo) {
          data.titulo = 'Renovación de habilitación'
        }

        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, req, operation }) => {
        if (operation !== 'update') return doc

        const nuevoEstado = (doc as any).estado
        const estadoAnterior = (previousDoc as any)?.estado
        if (nuevoEstado !== 'APROBADO' || estadoAnterior === 'APROBADO') return doc

        const comercioId = relationId((doc as any).comercio)
        if (!comercioId) {
          req.payload.logger.warn(
            `[ExpedientesRenovacion] Renovación ${doc.id} aprobada sin comercio vinculado.`,
          )
          return doc
        }

        const vencimiento =
          (doc as any).fechaVencimientoNueva || addOneYear(new Date())

        try {
          await req.payload.update({
            collection: 'comercios-habilitados',
            id: comercioId,
            data: {
              fechaVencimiento: vencimiento,
            },
            overrideAccess: true,
          })
          req.payload.logger.info(
            `[ExpedientesRenovacion] Comercio ${comercioId}: vencimiento actualizado por renovación ${doc.id}`,
          )
        } catch (error) {
          req.payload.logger.error(
            `[ExpedientesRenovacion] No se pudo actualizar el vencimiento del comercio ${comercioId}: ${error}`,
          )
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      label: 'Identificación del expediente',
      access: { create: renovacionStaffFieldAccess, update: renovacionStaffFieldAccess },
      admin: {
        position: 'sidebar',
        description: 'Se completa al iniciar. Editable por Habilitaciones.',
      },
    },
    {
      name: 'comercio',
      type: 'relationship',
      relationTo: 'comercios-habilitados',
      label: 'Comercio a renovar',
      required: true,
      access: {
        create: renovacionCitizenFieldAccess,
        update: renovacionStaffFieldAccess,
      },
    },
    {
      name: 'estado',
      type: 'select',
      label: 'Estado',
      options: ESTADO_OPTIONS,
      defaultValue: 'INICIADO',
      access: { create: renovacionStaffFieldAccess, update: renovacionStaffFieldAccess },
      admin: {
        position: 'sidebar',
        description: 'Gestionado por Habilitaciones Comerciales.',
      },
    },
    {
      name: 'notaCiudadano',
      type: 'textarea',
      label: 'Nota para el ciudadano',
      access: { create: renovacionStaffFieldAccess, update: renovacionStaffFieldAccess },
      admin: {
        description: 'Mensaje visible en el portal (observaciones, visita, etc.).',
      },
    },
    {
      name: 'fechaVisita',
      type: 'date',
      label: 'Fecha de visita',
      access: { create: renovacionStaffFieldAccess, update: renovacionStaffFieldAccess },
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd/MM/yyyy HH:mm',
        },
      },
    },
    {
      name: 'fechaVencimientoNueva',
      type: 'date',
      label: 'Nueva fecha de vencimiento',
      access: { create: renovacionStaffFieldAccess, update: renovacionStaffFieldAccess },
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
        description:
          'Si se deja vacío al aprobar, se asigna un año a partir de la fecha de aprobación.',
      },
    },
    {
      name: 'resolucion',
      type: 'upload',
      relationTo: 'archivos',
      label: 'Resolución / constancia',
      access: { create: renovacionStaffFieldAccess, update: renovacionStaffFieldAccess },
    },
    {
      name: 'notaInterna',
      type: 'textarea',
      label: 'Nota interna — Habilitaciones',
      access: {
        read: renovacionStaffFieldAccess,
        create: renovacionStaffFieldAccess,
        update: renovacionStaffFieldAccess,
      },
    },
    {
      type: 'collapsible',
      label: 'Datos del solicitante',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'solicitanteNombre',
          type: 'text',
          label: 'Nombre y apellido del solicitante',
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
        },
        {
          name: 'solicitanteDni',
          type: 'text',
          label: 'DNI del solicitante',
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
        },
        {
          name: 'solicitanteDomicilio',
          type: 'text',
          label: 'Domicilio legal del solicitante',
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
        },
        {
          name: 'solicitanteTelefono',
          type: 'text',
          label: 'Teléfono del solicitante',
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
        },
        {
          name: 'solicitanteEmail',
          type: 'email',
          label: 'Correo del solicitante',
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
          admin: {
            description:
              'El correo declarado será utilizado como domicilio fiscal electrónico para enviar notificaciones.',
          },
        },
        {
          name: 'numeroExpedienteAnterior',
          type: 'text',
          label: 'Número de expediente anterior (si lo conoce)',
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Documentación del ciudadano',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'dniAdjunto',
          type: 'upload',
          relationTo: 'archivos',
          label: 'Foto DNI actualizada',
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
        },
        {
          name: 'formularioInicio',
          type: 'upload',
          relationTo: 'archivos',
          label: 'Formulario de Inicio firmado',
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
          admin: {
            description: 'Descargar, completar, firmar y adjuntar el Formulario 1 INICIO.',
          },
        },
        {
          name: 'comprobanteSellado',
          type: 'upload',
          relationTo: 'archivos',
          label: 'Comprobante de pago del sellado municipal (Carpeta Técnica)',
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
          admin: {
            description: 'Pago en Rentas o por WhatsApp 3436127015.',
          },
        },
        {
          name: 'libreDeuda',
          type: 'upload',
          relationTo: 'archivos',
          label: 'Estado de deuda Rentas',
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
          admin: {
            description: 'Solicitar en Rentas o por WhatsApp 3436127015.',
          },
        },
        {
          name: 'certResiduosPeligrosos',
          type: 'upload',
          relationTo: 'archivos',
          label: 'Certificación Medio Ambiente Provincia',
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
          admin: {
            description: 'Obligatorio si el comercio genera residuos peligrosos.',
          },
        },
        {
          name: 'adjuntosOtros',
          type: 'upload',
          relationTo: 'archivos',
          hasMany: true,
          label: 'Otra documentación',
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Declaraciones',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'librosTapaDura',
          type: 'select',
          label: '¿Tiene libros de quejas y habilitaciones tapa dura?',
          options: [...LIBROS_TAPA_DURA_OPTIONS],
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
        },
        {
          name: 'higieneSeguridad',
          type: 'select',
          hasMany: true,
          label: 'Declaración jurada de higiene y seguridad',
          options: HIGIENE_SEGURIDAD_ITEMS.map((i) => ({ label: i.label, value: i.value })),
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
          admin: {
            description:
              'Declaro contar con lo siguiente o comprometerme a regularizarlo antes de la inspección (Ley 19.587, CAA 18.284, Ord. 355/13).',
          },
        },
        {
          name: 'generaResiduosPeligrosos',
          type: 'select',
          label: '¿Genera residuos peligrosos?',
          options: [
            { label: 'Sí', value: 'SI' },
            { label: 'No', value: 'NO' },
          ],
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
        },
        {
          name: 'declaracionJurada',
          type: 'checkbox',
          label: 'Declaración jurada aceptada',
          access: { create: renovacionCitizenFieldAccess, update: renovacionCitizenFieldAccess },
          admin: {
            description:
              'Datos veraces. Falsedad, ocultamiento u omisión anulan el trámite. Ord. N° 355/13 HCDSB.',
          },
        },
      ],
    },
    CreatedBy,
  ],
}
