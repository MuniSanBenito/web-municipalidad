import { CreatedBy } from '@/payload/fields/created_by'
import type { CollectionConfig } from 'payload'
import { HIDE_API_URL } from '../config'

export const ESTADOS_PERMISO_USO = ['PENDIENTE', 'EN_REVISION', 'APROBADO', 'OBSERVADO', 'RECHAZADO'] as const

export type EstadoPermisoUso = (typeof ESTADOS_PERMISO_USO)[number]

const isCiudadanoOrObrasOrAdmin = ({ req }: { req: any }) => {
  if (!req.user) return false
  if (req.user.collection === 'ciudadanos') return true
  return req.user?.rol?.includes('OBRAS PRIVADAS') || req.user?.rol?.includes('ADMIN') || false
}

const readAccess = ({ req }: { req: any }) => {
  if (!req.user) return false
  if (req.user.collection === 'ciudadanos') {
    return { 'created_by.value': { equals: req.user.id } }
  }
  return (
    req.user?.rol?.includes('OBRAS PRIVADAS') ||
    req.user?.rol?.includes('HABILITACIONES') ||
    req.user?.rol?.includes('ADMIN') ||
    false
  )
}

const isObrasOrAdmin = ({ req }: { req: any }) => {
  if (!req.user) return false
  return req.user?.rol?.includes('OBRAS PRIVADAS') || req.user?.rol?.includes('ADMIN') || false
}

export const SolicitudesPermisoUso: CollectionConfig = {
  slug: 'solicitudes-permiso-uso',
  labels: {
    singular: 'Solicitud de Permiso de Uso',
    plural: 'Solicitudes de Permiso de Uso',
  },
  access: {
    create: isCiudadanoOrObrasOrAdmin,
    read: readAccess,
    update: isObrasOrAdmin,
    delete: isObrasOrAdmin,
  },
  admin: {
    useAsTitle: 'direccionLocal',
    hideAPIURL: HIDE_API_URL,
    defaultColumns: ['direccionLocal', 'rubro', 'estado', 'updatedAt'],
    group: 'Habilitaciones',
  },
  fields: [
    {
      name: 'estado',
      type: 'select',
      label: 'Estado',
      required: true,
      defaultValue: 'PENDIENTE',
      options: ESTADOS_PERMISO_USO.map((e) => ({ label: e.replace(/_/g, ' '), value: e })),
      admin: { position: 'sidebar' },
    },
    {
      name: 'observacionesInternas',
      type: 'textarea',
      label: 'Observaciones internas',
      admin: {
        position: 'sidebar',
        description: 'Visible solo para el equipo de Obras Privadas.',
      },
    },
    {
      name: 'notaParaCiudadano',
      type: 'textarea',
      label: 'Nota para el ciudadano',
      admin: {
        position: 'sidebar',
        description: 'Mensaje visible al ciudadano sobre el estado de su solicitud.',
      },
    },
    {
      name: 'direccionLocal',
      type: 'text',
      label: 'Dirección del local',
      required: true,
    },
    {
      name: 'rubro',
      type: 'text',
      label: 'Rubro / Actividad comercial',
      required: true,
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción de la actividad',
    },
    {
      name: 'telefono',
      type: 'text',
      label: 'Teléfono de contacto',
      required: true,
    },
    {
      name: 'formularioAdjunto',
      type: 'upload',
      label: 'Formulario de Permiso de Uso completado',
      relationTo: 'archivos',
      required: true,
      admin: {
        description: 'Formulario completado y firmado (PDF o imagen).',
      },
    },
    CreatedBy,
  ],
}
