import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  construirCorreoNotificacion,
  correosAreas,
  correosCiudadano,
  detectarEventosNotificacion,
  normalizarBaseUrl,
} from './notificaciones'

const baseDoc = {
  id: 'exp-1',
  updatedAt: '2026-09-10T10:00:00.000Z',
  faseIEstado: 'INICIADO',
  faseIEmail: 'declarado@example.com',
}

test('la creación de Fase I notifica a Obras y al ciudadano', () => {
  const events = detectarEventosNotificacion({
    doc: baseDoc,
    operation: 'create',
    actorCollection: 'ciudadanos',
  })

  assert.equal(events.length, 1)
  assert.equal(events[0].fase, 1)
  assert.equal(events[0].tipo, 'PRESENTACION')
  assert.deepEqual(events[0].areas, ['OBRAS_PRIVADAS'])
  assert.equal(events[0].notificarCiudadano, true)
})

test('una actualización ciudadana sin cambio de estado notifica solo al área', () => {
  const events = detectarEventosNotificacion({
    doc: { ...baseDoc, faseITelefono: '3434000000' },
    previousDoc: { ...baseDoc, faseITelefono: '3434111111' },
    operation: 'update',
    actorCollection: 'ciudadanos',
  })

  assert.equal(events.length, 1)
  assert.equal(events[0].tipo, 'ACTUALIZACION_CIUDADANA')
  assert.deepEqual(events[0].areas, ['OBRAS_PRIVADAS'])
  assert.equal(events[0].notificarCiudadano, false)
})

test('una actualización de Fase II no se confunde con Fase I', () => {
  const events = detectarEventosNotificacion({
    doc: { ...baseDoc, faseIIEstado: 'PENDIENTE', faseIITelefono: '3434000000' },
    previousDoc: { ...baseDoc, faseIIEstado: 'PENDIENTE', faseIITelefono: '3434111111' },
    operation: 'update',
    actorCollection: 'ciudadanos',
  })

  assert.equal(events.length, 1)
  assert.equal(events[0].fase, 2)
  assert.equal(events[0].tipo, 'ACTUALIZACION_CIUDADANA')
})

test('los cambios reales de estado notifican al área y al ciudadano', () => {
  const events = detectarEventosNotificacion({
    doc: { ...baseDoc, faseIEstado: 'APROBADO' },
    previousDoc: baseDoc,
    operation: 'update',
    actorCollection: 'users',
  })

  assert.equal(events.length, 1)
  assert.equal(events[0].tipo, 'CAMBIO_ESTADO')
  assert.equal(events[0].estadoAnterior, 'INICIADO')
  assert.equal(events[0].estadoNuevo, 'APROBADO')
  assert.equal(events[0].notificarCiudadano, true)
})

test('Fase II aprobada notifica a Habilitaciones y Hacienda', () => {
  const events = detectarEventosNotificacion({
    doc: { ...baseDoc, faseIIEstado: 'APROBADO' },
    previousDoc: { ...baseDoc, faseIIEstado: 'PENDIENTE' },
    operation: 'update',
    actorCollection: 'users',
  })

  assert.deepEqual(events[0].areas, ['HABILITACIONES', 'HACIENDA'])
})

test('una actualización técnica sin cambio de estado no genera notificaciones', () => {
  const events = detectarEventosNotificacion({
    doc: { ...baseDoc, faseIIIComercioHabilitado: 'comercio-1' },
    previousDoc: baseDoc,
    operation: 'update',
    actorCollection: 'users',
  })

  assert.deepEqual(events, [])
})

test('deduplica el correo de login y el declarado', () => {
  assert.deepEqual(
    correosCiudadano({
      loginEmail: ' Persona@Example.com ',
      doc: { faseIEmail: 'persona@example.com' },
      fase: 1,
    }),
    ['persona@example.com'],
  )
})

test('combina y deduplica los correos de las áreas', () => {
  assert.deepEqual(
    correosAreas(
      {
        emailsHabilitaciones: [{ email: 'habilitaciones@example.com' }],
        emailsHacienda: [
          { email: 'HABILITACIONES@example.com' },
          { email: 'hacienda@example.com' },
        ],
      },
      ['HABILITACIONES', 'HACIENDA'],
    ),
    ['habilitaciones@example.com', 'hacienda@example.com'],
  )
})

test('normaliza la URL pública del servidor y rechaza URLs inválidas', () => {
  assert.equal(normalizarBaseUrl('https://sanbenito.gob.ar/'), 'https://sanbenito.gob.ar')
  assert.throws(() => normalizarBaseUrl(''), /NEXT_PUBLIC_SERVER_URL/)
  assert.throws(() => normalizarBaseUrl('sanbenito.gob.ar'), /http o https/)
})

test('los enlaces del correo son absolutos y apuntan al destino correcto', () => {
  const event = detectarEventosNotificacion({
    doc: baseDoc,
    operation: 'create',
    actorCollection: 'ciudadanos',
  })[0]
  const citizenEmail = construirCorreoNotificacion({
    event,
    expedienteId: 'exp/1',
    audience: 'CIUDADANO',
    baseUrl: 'https://sanbenito.gob.ar/',
  })
  const areaEmail = construirCorreoNotificacion({
    event,
    expedienteId: 'exp/1',
    audience: 'AREA',
    baseUrl: 'https://sanbenito.gob.ar/',
  })

  assert.equal(citizenEmail.html.includes('https://sanbenito.gob.ar/habilitaciones'), true)
  assert.equal(
    areaEmail.html.includes(
      'https://sanbenito.gob.ar/admin/collections/expedientes-habilitacion/exp%2F1',
    ),
    true,
  )
  assert.equal(areaEmail.html.includes('https://sanbenito.gob.ar/images/escudo.webp'), true)
})

test('el correo no expone datos sensibles ni enlaces a archivos', () => {
  const event = detectarEventosNotificacion({
    doc: baseDoc,
    operation: 'create',
    actorCollection: 'ciudadanos',
  })[0]
  const email = construirCorreoNotificacion({
    event,
    expedienteId: 'exp-1',
    audience: 'CIUDADANO',
    baseUrl: 'https://municipio.example.com',
  })

  assert.equal(email.html.includes('12345678'), false)
  assert.equal(email.html.includes('/api/archivos/'), false)
  assert.equal(email.html.includes('/habilitaciones'), true)
  assert.equal(email.html.includes('Municipalidad de San Benito'), true)
  assert.equal(email.html.includes('Ver mi trámite'), true)
})
