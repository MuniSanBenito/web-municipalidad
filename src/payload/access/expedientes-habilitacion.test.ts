import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  expedienteUpdateAccess,
  faseIAdminFieldAccess,
  faseIFieldAccess,
  faseIIAdminFieldAccess,
  faseIIFieldAccess,
  faseIIIAdminFieldAccess,
} from './expedientes-habilitacion'

const user = (collection: string, rol: string[] = [], id = 'user-1') =>
  ({
    collection,
    id,
    rol,
  }) as any

const request = (currentUser: ReturnType<typeof user> | undefined) =>
  ({ req: { user: currentUser } }) as any

const context = (currentUser: ReturnType<typeof user>, doc?: Record<string, unknown>) =>
  ({
    req: { user: currentUser },
    doc,
  }) as any

test('permite a un ciudadano actualizar únicamente su propio expediente', () => {
  assert.deepEqual(expedienteUpdateAccess(request(user('ciudadanos', [], 'ciudadano-1'))), {
    'created_by.value': { equals: 'ciudadano-1' },
  })
  assert.equal(expedienteUpdateAccess(request(user('users', ['PUBLICO']))), false)
})

test('permite actualizar expedientes a los roles municipales autorizados', () => {
  for (const rol of ['ADMIN', 'OBRAS PRIVADAS', 'HABILITACIONES', 'HACIENDA']) {
    assert.equal(expedienteUpdateAccess(request(user('users', [rol]))), true)
  }
  assert.equal(expedienteUpdateAccess(request(user('users', ['COMUNICACION']))), false)
  assert.equal(expedienteUpdateAccess(request(undefined)), false)
})

test('separa la edición municipal por fase', () => {
  assert.equal(faseIAdminFieldAccess(context(user('users', ['OBRAS PRIVADAS']))), true)
  assert.equal(faseIAdminFieldAccess(context(user('users', ['HABILITACIONES']))), false)
  assert.equal(faseIIAdminFieldAccess(context(user('users', ['HABILITACIONES']))), true)
  assert.equal(faseIIAdminFieldAccess(context(user('users', ['HACIENDA']))), false)
  assert.equal(faseIIIAdminFieldAccess(context(user('users', ['HABILITACIONES']))), true)
  assert.equal(faseIIIAdminFieldAccess(context(user('users', ['HACIENDA']))), true)
  assert.equal(faseIIIAdminFieldAccess(context(user('users', ['OBRAS PRIVADAS']))), false)
})

test('bloquea a ciudadanos fuera de su fase editable', () => {
  const ciudadano = user('ciudadanos')

  assert.equal(faseIFieldAccess(context(ciudadano, { faseIEstado: 'INICIADO' })), true)
  assert.equal(faseIFieldAccess(context(ciudadano, { faseIEstado: 'APROBADO' })), false)
  assert.equal(faseIFieldAccess(context(ciudadano, { faseIEstado: 'VISITA_PROGRAMADA' })), false)
  assert.equal(faseIIFieldAccess(context(ciudadano, { faseIEstado: 'INICIADO' })), false)
  assert.equal(
    faseIIFieldAccess(context(ciudadano, { faseIEstado: 'APROBADO', faseIIEstado: 'INICIADO' })),
    true,
  )
  assert.equal(
    faseIIFieldAccess(context(ciudadano, { faseIEstado: 'APROBADO', faseIIEstado: 'APROBADO' })),
    false,
  )
  assert.equal(faseIIIAdminFieldAccess(context(ciudadano)), false)
})
