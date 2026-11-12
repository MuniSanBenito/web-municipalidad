import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  ciudadanoCreateAccess,
  ciudadanoDeleteAccess,
  ciudadanoReadAccess,
  ciudadanoStaffFieldAccess,
  ciudadanoUpdateAccess,
} from './ciudadanos'

const user = (collection: string, rol: string[] = [], id = 'user-1') =>
  ({
    collection,
    id,
    rol,
  }) as any

const request = (currentUser: ReturnType<typeof user> | undefined, id?: string) =>
  ({ req: { user: currentUser }, id }) as any

test('permite ver y crear ciudadanos al rol de habilitaciones', () => {
  const habilitaciones = user('users', ['HABILITACIONES'])

  assert.equal(ciudadanoCreateAccess(request(habilitaciones)), true)
  assert.equal(ciudadanoReadAccess(request(habilitaciones)), true)
  assert.equal(ciudadanoUpdateAccess(request(habilitaciones)), false)
  assert.equal(ciudadanoDeleteAccess(request(habilitaciones)), false)
  assert.equal(ciudadanoStaffFieldAccess(request(habilitaciones)), true)
  assert.equal(ciudadanoStaffFieldAccess(request(habilitaciones, 'ciudadano-1')), false)
})

test('mantiene la gestión completa para admin y gestor ciudadano', () => {
  for (const rol of ['ADMIN', 'GESTOR CIUDADANO']) {
    const staff = user('users', [rol])

    assert.equal(ciudadanoCreateAccess(request(staff)), true)
    assert.equal(ciudadanoReadAccess(request(staff)), true)
    assert.equal(ciudadanoUpdateAccess(request(staff)), true)
    assert.equal(ciudadanoDeleteAccess(request(staff)), true)
    assert.equal(ciudadanoStaffFieldAccess(request(staff, 'ciudadano-1')), true)
  }
})

test('limita a un ciudadano a su propio registro', () => {
  const ciudadano = user('ciudadanos', [], 'ciudadano-1')

  assert.equal(ciudadanoCreateAccess(request(ciudadano)), false)
  assert.equal(ciudadanoReadAccess(request(ciudadano, 'ciudadano-1')), true)
  assert.equal(ciudadanoReadAccess(request(ciudadano, 'ciudadano-2')), false)
  assert.equal(ciudadanoUpdateAccess(request(ciudadano, 'ciudadano-1')), true)
  assert.equal(ciudadanoUpdateAccess(request(ciudadano, 'ciudadano-2')), false)
  assert.equal(ciudadanoDeleteAccess(request(ciudadano)), false)
  assert.equal(ciudadanoStaffFieldAccess(request(ciudadano)), false)
})

test('bloquea al resto de los roles municipales', () => {
  const comunicacion = user('users', ['COMUNICACION'])

  assert.equal(ciudadanoCreateAccess(request(comunicacion)), false)
  assert.equal(ciudadanoReadAccess(request(comunicacion)), false)
  assert.equal(ciudadanoCreateAccess(request(undefined)), false)
  assert.equal(ciudadanoReadAccess(request(undefined)), false)
})
