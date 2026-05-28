import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import { isHabilitacionesOrAdminCollectionAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

export const ESTADOS_SOLICITUD = [
  'PENDIENTE',
  'EN_REVISION',
  'APROBADO_FASE_I',
  'APROBADO_FASE_II',
  'APROBADO_FASE_III',
  'OBSERVADO',
  'RECHAZADO',
] as const

export type EstadoSolicitud = (typeof ESTADOS_SOLICITUD)[number]

const isCiudadanoOrHabilitacionesOrAdmin = ({ req }: { req: any }) => {
  if (!req.user) return false
  if (req.user.collection === 'ciudadanos') return true
  return (
    req.user?.rol?.includes('HABILITACIONES') || req.user?.rol?.includes('ADMIN') || false
  )
}

const readAccess = ({ req }: { req: any }) => {
  if (!req.user) return false

  if (req.user.collection === 'ciudadanos') {
    return {
      'created_by.value': { equals: req.user.id },
    }
  }

  return (
    req.user?.rol?.includes('HABILITACIONES') ||
    req.user?.rol?.includes('OBRAS PRIVADAS') ||
    req.user?.rol?.includes('ADMIN') ||
    false
  )
}

export const SolicitudesHabilitacion: CollectionConfig = {
  slug: 'solicitudes-habilitacion',
  labels: {
    singular: 'Solicitud de Habilitación',
    plural: 'Solicitudes de Habilitación',
  },
  access: {
    create: isCiudadanoOrHabilitacionesOrAdmin,
    read: readAccess,
    update: isHabilitacionesOrAdminCollectionAccess,
    delete: isHabilitacionesOrAdminCollectionAccess,
  },
  admin: {
    useAsTitle: 'nombreFantasia',
    hideAPIURL: HIDE_API_URL,
    defaultColumns: ['nombreFantasia', 'estado', 'rubro', 'updatedAt'],
  },
  fields: [
    {
      name: 'estado',
      type: 'select',
      label: 'Estado',
      required: true,
      defaultValue: 'PENDIENTE',
      options: ESTADOS_SOLICITUD.map((e) => ({ label: e.replace(/_/g, ' '), value: e })),
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'observacionesInternas',
      type: 'textarea',
      label: 'Observaciones internas',
      admin: {
        position: 'sidebar',
        description: 'Visible solo para el equipo municipal.',
      },
    },
    {
      name: 'nombreFantasia',
      type: 'text',
      label: 'Nombre de Fantasía del Comercio',
      required: true,
    },
    {
      name: 'razonSocial',
      type: 'text',
      label: 'Razón Social o Nombre del Titular',
      required: true,
    },
    {
      name: 'cuit',
      type: 'text',
      label: 'CUIT / CUIL',
      required: true,
    },
    {
      name: 'direccion',
      type: 'text',
      label: 'Dirección del Local',
      required: true,
    },
    {
      name: 'rubro',
      type: 'relationship',
      label: 'Rubro',
      relationTo: 'rubros-comercios',
      required: true,
      hasMany: false,
    },
    {
      name: 'actividades',
      type: 'relationship',
      label: 'Actividades',
      relationTo: 'actividades-comercios',
      hasMany: true,
    },
    {
      name: 'descripcionActividad',
      type: 'textarea',
      label: 'Descripción de la actividad comercial',
      admin: {
        description: 'Describí brevemente qué vas a comercializar o qué servicio vas a brindar.',
      },
    },
    {
      name: 'telefono',
      type: 'text',
      label: 'Teléfono de contacto',
      required: true,
    },
    {
      name: 'adjuntos',
      type: 'upload',
      label: 'Documentación adjunta',
      relationTo: 'archivos',
      hasMany: true,
      admin: {
        description: 'Permiso de Uso, croquis del local, DNI u otros documentos requeridos.',
      },
    },
    CreatedBy,
  ],
}
