import type { TaskConfig } from 'payload'

type EnviarNotificacionHabilitacionTask = {
  input: {
    destinatarios: { email: string }[]
    asunto: string
    texto: string
    html: string
    expedienteId: string
    fase: number
    tipoEvento: string
    claveEvento: string
  }
  output: {
    enviados: number
  }
}

export const EnviarNotificacionHabilitacion: TaskConfig<EnviarNotificacionHabilitacionTask> = {
  slug: 'enviarNotificacionHabilitacion',
  label: 'Enviar notificación de habilitación',
  retries: {
    attempts: 3,
    backoff: {
      delay: 30_000,
      type: 'exponential',
    },
  },
  inputSchema: [
    {
      name: 'destinatarios',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
    },
    { name: 'asunto', type: 'text', required: true },
    { name: 'texto', type: 'textarea', required: true },
    { name: 'html', type: 'textarea', required: true },
    { name: 'expedienteId', type: 'text', required: true },
    { name: 'fase', type: 'number', required: true },
    { name: 'tipoEvento', type: 'text', required: true },
    { name: 'claveEvento', type: 'text', required: true },
  ],
  outputSchema: [{ name: 'enviados', type: 'number', required: true }],
  handler: async ({ input, req }) => {
    const destinatarios = input.destinatarios.map(({ email }) => email)
    await req.payload.sendEmail({
      to: destinatarios,
      subject: input.asunto,
      text: input.texto,
      html: input.html,
    })
    return { output: { enviados: destinatarios.length } }
  },
}
