import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import { HIDE_API_URL } from '../config'

export const ESTADOS_FASE_HABILITACION = ['INICIADO', 'PENDIENTE', 'APROBADO'] as const
export type EstadoFaseHabilitacion = (typeof ESTADOS_FASE_HABILITACION)[number]

const FASE_OPTIONS = ESTADOS_FASE_HABILITACION.map((e) => ({
  label: e.charAt(0) + e.slice(1).toLowerCase(),
  value: e,
}))

const isNotCiudadano = ({ req }: { req: any }) => {
  if (!req.user) return false
  return req.user.collection !== 'ciudadanos'
}

const readAccess = ({ req }: { req: any }) => {
  if (!req.user) return false
  if (req.user.collection === 'ciudadanos') {
    return { 'created_by.value': { equals: req.user.id } }
  }
  return (
    req.user?.rol?.includes('OBRAS PRIVADAS') ||
    req.user?.rol?.includes('HABILITACIONES') ||
    req.user?.rol?.includes('HACIENDA') ||
    req.user?.rol?.includes('ADMIN') ||
    false
  )
}

export const ExpedientesHabilitacion: CollectionConfig = {
  slug: 'expedientes-habilitacion',
  labels: {
    singular: 'Expediente de Habilitación',
    plural: 'Expedientes de Habilitación',
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    read: readAccess,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.rol?.includes('ADMIN') ?? false,
  },
  admin: {
    useAsTitle: 'titulo',
    hideAPIURL: HIDE_API_URL,
    group: 'Habilitaciones',
    defaultColumns: ['titulo', 'faseIEstado', 'faseIIEstado', 'faseIIIEstado', 'updatedAt'],
  },
  hooks: {
    beforeChange: [
      ({ req, data, originalDoc }) => {
        // Auto-set titulo from available data
        if (!data.titulo && !originalDoc?.titulo) {
          const rubro = data.faseIRubro || originalDoc?.faseIRubro || ''
          const dir = data.faseIDireccionLocal || originalDoc?.faseIDireccionLocal || ''
          const nombreFantasia =
            data.faseIINombreFantasia || originalDoc?.faseIINombreFantasia || ''
          const apellido = data.faseIApellido || originalDoc?.faseIApellido || ''
          const nombre = data.faseINombre || originalDoc?.faseINombre || ''
          if (nombreFantasia) data.titulo = nombreFantasia
          else if (apellido || nombre) data.titulo = [apellido, nombre].filter(Boolean).join(', ')
          else if (rubro || dir) data.titulo = [rubro, dir].filter(Boolean).join(' — ')
        }
        // Sync titulo when nombreFantasia is provided in Fase II
        if (data.faseIINombreFantasia && !originalDoc?.faseIINombreFantasia) {
          data.titulo = data.faseIINombreFantasia
        }

        // Citizen-specific estado protection
        if (req.user?.collection !== 'ciudadanos') return data

        // Preserve admin-managed estados — citizen cannot change them once set
        if (originalDoc?.faseIEstado !== undefined && originalDoc.faseIEstado !== null) {
          data.faseIEstado = originalDoc.faseIEstado
        }
        if (originalDoc?.faseIIEstado !== undefined && originalDoc.faseIIEstado !== null) {
          data.faseIIEstado = originalDoc.faseIIEstado
        }
        if (originalDoc?.faseIIIEstado !== undefined && originalDoc.faseIIIEstado !== null) {
          data.faseIIIEstado = originalDoc.faseIIIEstado
        }

        // Auto-set INICIADO when citizen first submits each phase
        if (
          !originalDoc?.faseIEstado &&
          (data.faseIDireccionLocal || data.faseIRubro || data.faseIApellido)
        ) {
          data.faseIEstado = 'INICIADO'
        }
        if (!originalDoc?.faseIIEstado && (data.faseIINombreFantasia || data.faseIIRazonSocial)) {
          data.faseIIEstado = 'INICIADO'
        }
        if (!originalDoc?.faseIIIEstado && data.faseIIIConfirmacionDatos) {
          data.faseIIIEstado = 'INICIADO'
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      label: 'Identificación del Expediente',
      admin: {
        position: 'sidebar',
        description: 'Se genera automáticamente. Editable por el equipo municipal.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        // ─── FASE I — Permiso de Uso ───────────────────────────────────
        {
          label: 'Fase I — Permiso de Uso',
          description:
            'Verificación de zonificación y aptitud edilicia. Responsable: Obras Privadas.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'faseIEstado',
                  type: 'select',
                  label: 'Estado Fase I',
                  options: FASE_OPTIONS,
                  access: { update: isNotCiudadano },
                  admin: {
                    width: '50%',
                    description: 'Gestionado por Obras Privadas.',
                  },
                },
              ],
            },
            {
              name: 'faseINotaCiudadano',
              type: 'textarea',
              label: 'Nota para el ciudadano (Fase I)',
              access: { update: isNotCiudadano },
              admin: {
                description: 'Mensaje visible al ciudadano sobre esta fase.',
              },
            },
            {
              name: 'faseINotaInterna',
              type: 'textarea',
              label: 'Nota interna — Obras Privadas',
              access: {
                read: isNotCiudadano,
                update: isNotCiudadano,
              },
              admin: {
                description: 'Solo visible para el equipo municipal.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'faseIDireccionLocal',
                  type: 'text',
                  label: 'Dirección del local',
                  admin: { width: '60%' },
                },
                {
                  name: 'faseITelefono',
                  type: 'text',
                  label: 'Teléfono de contacto',
                  admin: { width: '40%' },
                },
              ],
            },
            {
              name: 'faseIRubro',
              type: 'text',
              label: 'Rubro / Actividad comercial',
            },
            {
              name: 'faseIDescripcion',
              type: 'textarea',
              label: 'Descripción de la actividad',
            },
            {
              name: 'faseIFormularioAdjunto',
              type: 'upload',
              label: 'Formulario de Permiso de Uso completado',
              relationTo: 'archivos',
              admin: {
                description: 'Formulario completado y firmado (PDF o imagen).',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'faseIEmail',
                  type: 'text',
                  label: 'Correo electrónico del solicitante',
                  admin: { width: '50%' },
                },
                {
                  name: 'faseIDNI',
                  type: 'text',
                  label: 'DNI del solicitante',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'faseIApellido',
                  type: 'text',
                  label: 'Apellido',
                  admin: { width: '50%' },
                },
                {
                  name: 'faseINombre',
                  type: 'text',
                  label: 'Nombre',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'faseIBarrio',
              type: 'text',
              label: 'Barrio',
            },
            {
              name: 'faseIDocInmueble',
              type: 'upload',
              label: 'Documentación del inmueble',
              relationTo: 'archivos',
              admin: {
                description:
                  'Título de propiedad, contrato de locación o autorización del propietario.',
              },
            },
            {
              name: 'faseIPlanoLocal',
              type: 'upload',
              label: 'Plano o croquis del local',
              relationTo: 'archivos',
            },
            {
              name: 'faseICertElectrico',
              type: 'upload',
              label: 'Certificado de instalaciones eléctricas',
              relationTo: 'archivos',
              admin: {
                description: 'Emitido por profesional matriculado.',
              },
            },
            {
              name: 'faseIFacturaEnergia',
              type: 'upload',
              label: 'Factura de energía eléctrica',
              relationTo: 'archivos',
            },
            {
              name: 'faseIPlancheta',
              type: 'upload',
              label: 'Plancheta catastral',
              relationTo: 'archivos',
            },
            {
              name: 'faseIDeclaracionJurada',
              type: 'checkbox',
              label: 'Declaración jurada aceptada por el solicitante',
            },
          ],
        },

        // ─── FASE II — Habilitación Comercial ─────────────────────────
        {
          label: 'Fase II — Habilitación Comercial',
          description:
            'Requisitos de Habilitaciones y Bromatología. Disponible una vez aprobada la Fase I.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'faseIIEstado',
                  type: 'select',
                  label: 'Estado Fase II',
                  options: FASE_OPTIONS,
                  access: { update: isNotCiudadano },
                  admin: {
                    width: '50%',
                    description: 'Gestionado por Habilitaciones Comerciales.',
                  },
                },
              ],
            },
            {
              name: 'faseIINotaCiudadano',
              type: 'textarea',
              label: 'Nota para el ciudadano (Fase II)',
              access: { update: isNotCiudadano },
              admin: {
                description: 'Mensaje visible al ciudadano sobre esta fase.',
              },
            },
            {
              name: 'faseIINotaInterna',
              type: 'textarea',
              label: 'Nota interna — Habilitaciones',
              access: {
                read: isNotCiudadano,
                update: isNotCiudadano,
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'faseIINombreFantasia',
                  type: 'text',
                  label: 'Nombre de Fantasía del Comercio',
                  admin: { width: '50%' },
                },
                {
                  name: 'faseIIRazonSocial',
                  type: 'text',
                  label: 'Razón Social / Nombre del Titular',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'faseIICuit',
                  type: 'text',
                  label: 'CUIT / CUIL',
                  admin: { width: '50%' },
                },
                {
                  name: 'faseIITelefono',
                  type: 'text',
                  label: 'Teléfono de contacto',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'faseIIDireccion',
              type: 'text',
              label: 'Dirección del Local',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'faseIIRubro',
                  type: 'relationship',
                  label: 'Rubro principal',
                  relationTo: 'rubros-comercios',
                  hasMany: false,
                  admin: { width: '50%' },
                },
                {
                  name: 'faseIIActividades',
                  type: 'relationship',
                  label: 'Actividades',
                  relationTo: 'actividades-comercios',
                  hasMany: true,
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'faseIIDescripcionActividad',
              type: 'textarea',
              label: 'Descripción de la actividad comercial',
              admin: {
                description:
                  'Describí brevemente qué vas a comercializar o qué servicio vas a brindar.',
              },
            },
            {
              name: 'faseIIAdjuntos',
              type: 'upload',
              label: 'Documentación adjunta',
              relationTo: 'archivos',
              hasMany: true,
              admin: {
                description:
                  'Permiso de Uso aprobado, DNI, CUIT, Libre Deuda, Boleta de Tasa Inmobiliaria y otros documentos requeridos.',
              },
            },
          ],
        },

        // ─── FASE III — Alta Fiscal ────────────────────────────────────
        {
          label: 'Fase III — Alta Fiscal',
          description:
            'Alta fiscal y emisión del Certificado de Habilitación. Responsable: Rentas.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'faseIIIEstado',
                  type: 'select',
                  label: 'Estado Fase III',
                  options: FASE_OPTIONS,
                  access: { update: isNotCiudadano },
                  admin: {
                    width: '50%',
                    description: 'Gestionado por el área de Rentas.',
                  },
                },
              ],
            },
            {
              name: 'faseIIINotaCiudadano',
              type: 'textarea',
              label: 'Nota para el ciudadano (Fase III)',
              access: { update: isNotCiudadano },
              admin: {
                description: 'Mensaje visible al ciudadano sobre esta fase.',
              },
            },
            {
              name: 'faseIIINotaInterna',
              type: 'textarea',
              label: 'Nota interna — Rentas',
              access: {
                read: isNotCiudadano,
                update: isNotCiudadano,
              },
            },
            {
              name: 'faseIIILibreDeudaAdjunto',
              type: 'upload',
              label: 'Libre Deuda del inmueble (Rentas Municipal)',
              relationTo: 'archivos',
              admin: {
                description: 'Documento de Libre Deuda vigente.',
              },
            },
            {
              name: 'faseIIIConfirmacionDatos',
              type: 'checkbox',
              label: 'Confirmo que los datos declarados son correctos y verídicos',
            },
            {
              name: 'faseIIIObservaciones',
              type: 'textarea',
              label: 'Observaciones adicionales',
              admin: {
                description: 'Cualquier información adicional relevante para el alta fiscal.',
              },
            },
          ],
        },
      ],
    },
    CreatedBy,
  ],
}
