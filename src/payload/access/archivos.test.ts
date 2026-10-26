import assert from 'node:assert/strict'
import { test } from 'node:test'
import { archivoOwnerOrAdminAccess, archivoReadAccess, protectCitizenUpload } from './archivos'

const user = (collection: string, rol: string[] = [], id = 'user-1') =>
  ({ collection, rol, id }) as any

const request = (currentUser?: ReturnType<typeof user>) => ({ req: { user: currentUser } }) as any

test('un visitante solo puede leer archivos públicos', () => {
  assert.deepEqual(archivoReadAccess(request()), {
    esPrivado: { not_equals: true },
  })
})

test('un ciudadano puede leer sus privados pero no los de otro ciudadano', () => {
  assert.deepEqual(archivoReadAccess(request(user('ciudadanos', [], 'ciudadano-1'))), {
    or: [
      { esPrivado: { not_equals: true } },
      {
        and: [{ esPrivado: { equals: true } }, { propietarioCiudadano: { equals: 'ciudadano-1' } }],
      },
    ],
  })
  assert.deepEqual(archivoOwnerOrAdminAccess(request(user('ciudadanos', [], 'ciudadano-1'))), {
    propietarioCiudadano: { equals: 'ciudadano-1' },
  })
})

test('las áreas autorizadas pueden leer archivos privados', () => {
  for (const rol of ['ADMIN', 'OBRAS PRIVADAS', 'HABILITACIONES', 'HACIENDA']) {
    assert.equal(archivoReadAccess(request(user('users', [rol]))), true)
  }
  assert.deepEqual(archivoReadAccess(request(user('users', ['COMUNICACION']))), {
    esPrivado: { not_equals: true },
  })
})

test('las cargas ciudadanas se fuerzan a privadas y se asignan a su propietario', () => {
  const data = { esPrivado: false, propietarioCiudadano: 'otro-ciudadano' }
  const protectedData = protectCitizenUpload({
    data,
    req: { user: user('ciudadanos', [], 'ciudadano-1') },
  })

  assert.equal(protectedData.esPrivado, true)
  assert.equal(protectedData.propietarioCiudadano, 'ciudadano-1')
})
