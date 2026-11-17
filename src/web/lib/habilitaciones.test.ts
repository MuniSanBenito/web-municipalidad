import assert from 'node:assert/strict'
import { test } from 'node:test'
import { coordenadasComercio, comercioEstaEnSanBenito } from './habilitaciones'

test('lee el punto como longitud y latitud', () => {
  const coords = coordenadasComercio([-60.441, -31.779])
  assert.ok(coords)
  assert.equal(coords.lng, -60.441)
  assert.equal(coords.lat, -31.779)
  assert.equal(comercioEstaEnSanBenito(coords), true)
})

test('corrige los registros viejos cargados al revés', () => {
  const coords = coordenadasComercio([-31.779, -60.441])
  assert.ok(coords)
  assert.equal(coords.lat, -31.779)
  assert.equal(coords.lng, -60.441)
})

test('descarta coordenadas imposibles', () => {
  assert.equal(coordenadasComercio([null, null]), null)
  assert.equal(coordenadasComercio([]), null)
})
