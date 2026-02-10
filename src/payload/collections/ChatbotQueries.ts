import { isAdminCollectionAccess, isPublicAccess } from '@/payload/access/collection'
import type { CollectionConfig } from 'payload'
import { HIDE_API_URL } from '../config'

/**
 * Colección para almacenar las consultas del chatbot
 * Permite a los administradores ver qué preguntan los usuarios
 */
export const ChatbotQueries: CollectionConfig = {
  slug: 'chatbot-queries',
  labels: {
    singular: 'Consulta del Chatbot',
    plural: 'Consultas del Chatbot',
  },
  admin: {
    useAsTitle: 'query',
    hideAPIURL: HIDE_API_URL,
    defaultColumns: ['query', 'provider', 'topic', 'satisfaction', 'createdAt'],
    listSearchableFields: ['query', 'response', 'topic'],
    group: 'Analytics',
    description: 'Historial de consultas realizadas al chatbot municipal',
  },
  access: {
    // Cualquiera puede crear (el chatbot guarda las consultas)
    create: isPublicAccess,
    // Solo admins pueden ver, actualizar y eliminar
    read: isAdminCollectionAccess,
    update: isAdminCollectionAccess,
    delete: isAdminCollectionAccess,
  },
  fields: [
    {
      name: 'query',
      type: 'text',
      label: 'Consulta',
      required: true,
      admin: {
        description: 'La pregunta realizada por el usuario',
      },
    },
    {
      name: 'response',
      type: 'textarea',
      label: 'Respuesta',
      admin: {
        description: 'La respuesta generada por el chatbot',
      },
    },
    {
      name: 'provider',
      type: 'select',
      label: 'Proveedor',
      options: [
        { label: '🤖 Groq/Llama', value: 'groq' },
        { label: '📚 Knowledge Base', value: 'knowledge-base' },
        { label: '⚠️ Fallback', value: 'fallback' },
      ],
      defaultValue: 'groq',
      admin: {
        description: 'Fuente que generó la respuesta',
      },
    },
    {
      name: 'satisfaction',
      type: 'select',
      label: 'Satisfacción',
      options: [
        { label: '👍 Positivo', value: 'positive' },
        { label: '👎 Negativo', value: 'negative' },
        { label: '➖ Sin feedback', value: 'none' },
      ],
      defaultValue: 'none',
      admin: {
        description: 'Feedback del usuario sobre la respuesta',
      },
    },
    {
      name: 'topic',
      type: 'select',
      label: 'Tema',
      hasMany: false,
      options: [
        { label: '💰 Rentas', value: 'rentas' },
        { label: '🚗 Licencias', value: 'licencias' },
        { label: '🏗️ Obras Privadas', value: 'obras' },
        { label: '🏪 Habilitaciones', value: 'habilitaciones' },
        { label: '⚽ Deportes', value: 'deportes' },
        { label: '📋 CAV/Reclamos', value: 'cav' },
        { label: '📚 Punto Digital', value: 'punto-digital' },
        { label: '💜 Área Mujer', value: 'area-mujer' },
        { label: '📞 Contacto General', value: 'contacto' },
        { label: '🕒 Horarios', value: 'horarios' },
        { label: '❓ Otro', value: 'otro' },
      ],
      defaultValue: 'otro',
      admin: {
        description: 'Tema detectado de la consulta',
      },
    },
    {
      name: 'sessionId',
      type: 'text',
      label: 'ID de Sesión',
      admin: {
        description: 'Identificador único de la sesión del usuario',
        position: 'sidebar',
      },
    },
    {
      name: 'responseTime',
      type: 'number',
      label: 'Tiempo de Respuesta (ms)',
      admin: {
        description: 'Milisegundos que tardó en responder',
        position: 'sidebar',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'User Agent',
      admin: {
        description: 'Navegador/dispositivo del usuario',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
