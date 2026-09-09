import { isAdminCollectionAccess, isPublicAccess } from '@/payload/access/collection'
import type { CollectionConfig } from 'payload'
import { HIDE_API_URL } from '../config'

/**
 * Colección para almacenar conversaciones completas del chatbot
 * Guarda toda la conversación con sus mensajes y feedbacks asociados
 */
export const ChatbotConversations: CollectionConfig = {
  slug: 'chatbot-conversations',
  labels: {
    singular: 'Conversación del Chatbot',
    plural: 'Conversaciones del Chatbot',
  },
  admin: {
    useAsTitle: 'sessionId',
    hideAPIURL: HIDE_API_URL,
    defaultColumns: ['sessionId', 'messageCount', 'satisfaction', 'mainTopic', 'createdAt'],
    listSearchableFields: ['sessionId', 'mainTopic'],
    group: 'Analytics',
    description: 'Historial de conversaciones completas del chatbot municipal',
  },
  access: {
    // Cualquiera puede crear y actualizar (el chatbot guarda las conversaciones)
    create: isPublicAccess,
    update: isPublicAccess,
    // Solo admins pueden ver y eliminar
    read: isAdminCollectionAccess,
    delete: isAdminCollectionAccess,
  },
  fields: [
    {
      name: 'sessionId',
      type: 'text',
      label: 'ID de Sesión',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Identificador único de la sesión del usuario',
      },
    },
    {
      name: 'messages',
      type: 'array',
      label: 'Mensajes',
      admin: {
        description: 'Historial completo de mensajes de la conversación',
      },
      fields: [
        {
          name: 'id',
          type: 'text',
          label: 'ID del Mensaje',
          required: true,
        },
        {
          name: 'role',
          type: 'select',
          label: 'Rol',
          options: [
            { label: '👤 Usuario', value: 'user' },
            { label: '🤖 Asistente', value: 'assistant' },
          ],
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Contenido',
          required: true,
        },
        {
          name: 'timestamp',
          type: 'number',
          label: 'Timestamp',
          required: true,
        },
        {
          name: 'provider',
          type: 'select',
          label: 'Proveedor',
          options: [
            { label: '📚 Knowledge Base', value: 'knowledge-base' },
            { label: '🤖 Gemini', value: 'gemini' },
            { label: '⚠️ Fallback', value: 'fallback' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.role === 'assistant',
          },
        },
        {
          name: 'topic',
          type: 'select',
          label: 'Tema',
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
        },
        {
          name: 'feedback',
          type: 'group',
          label: 'Feedback',
          admin: {
            condition: (_, siblingData) => siblingData?.role === 'assistant',
          },
          fields: [
            {
              name: 'rating',
              type: 'select',
              label: 'Calificación',
              options: [
                { label: '👍 Positivo', value: 'positive' },
                { label: '👎 Negativo', value: 'negative' },
              ],
            },
            {
              name: 'comment',
              type: 'text',
              label: 'Comentario',
            },
            {
              name: 'submittedAt',
              type: 'number',
              label: 'Fecha de Feedback',
            },
          ],
        },
      ],
    },
    {
      name: 'messageCount',
      type: 'number',
      label: 'Cantidad de Mensajes',
      admin: {
        description: 'Número total de mensajes en la conversación',
        position: 'sidebar',
      },
    },
    {
      name: 'mainTopic',
      type: 'select',
      label: 'Tema Principal',
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
        description: 'Tema más frecuente de la conversación',
        position: 'sidebar',
      },
    },
    {
      name: 'satisfaction',
      type: 'select',
      label: 'Satisfacción General',
      options: [
        { label: '😊 Positiva', value: 'positive' },
        { label: '😐 Mixta', value: 'mixed' },
        { label: '😞 Negativa', value: 'negative' },
        { label: '➖ Sin feedback', value: 'none' },
      ],
      defaultValue: 'none',
      admin: {
        description: 'Resumen de satisfacción basado en los feedbacks',
        position: 'sidebar',
      },
    },
    {
      name: 'startedAt',
      type: 'number',
      label: 'Inicio de Conversación',
      admin: {
        description: 'Timestamp de inicio de la conversación',
        position: 'sidebar',
      },
    },
    {
      name: 'lastUpdated',
      type: 'number',
      label: 'Última Actualización',
      admin: {
        description: 'Timestamp de última actividad',
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
