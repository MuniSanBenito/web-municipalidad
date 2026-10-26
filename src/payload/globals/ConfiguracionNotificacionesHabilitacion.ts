import type { GlobalConfig } from 'payload'
import { isAdminCollectionAccess } from '../access/collection'
import { HIDE_API_URL } from '../config'

const emailList = (name: string, label: string, description: string) => ({
  name,
  type: 'array' as const,
  label,
  labels: {
    singular: 'Correo',
    plural: 'Correos',
  },
  admin: { description },
  fields: [
    {
      name: 'email',
      type: 'email' as const,
      label: 'Correo electrónico',
      required: true,
    },
  ],
})

export const ConfiguracionNotificacionesHabilitacion: GlobalConfig = {
  slug: 'configuracion-notificaciones-habilitacion',
  label: 'Notificaciones de Habilitaciones',
  access: {
    read: isAdminCollectionAccess,
    update: isAdminCollectionAccess,
  },
  admin: {
    hideAPIURL: HIDE_API_URL,
    group: 'Habilitaciones',
  },
  fields: [
    {
      name: 'notificacionesActivas',
      type: 'checkbox',
      label: 'Activar notificaciones por correo',
      defaultValue: false,
      admin: {
        description: 'Activar después de configurar los destinatarios y verificar el SMTP.',
      },
    },
    emailList(
      'emailsObrasPrivadas',
      'Correos de Obras Privadas',
      'Reciben novedades de la Fase I.',
    ),
    emailList(
      'emailsHabilitaciones',
      'Correos de Habilitaciones',
      'Reciben novedades de la Fase II y Fase III.',
    ),
    emailList(
      'emailsHacienda',
      'Correos de Hacienda',
      'Reciben el traspaso de Fase II aprobada y novedades de Fase III.',
    ),
  ],
}
