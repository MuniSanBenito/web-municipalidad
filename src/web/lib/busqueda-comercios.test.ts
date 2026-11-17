import assert from 'node:assert/strict'
import { test } from 'node:test'
import { comercioCoincide, etiquetaTitulares } from './busqueda-comercios'

const comercio = {
  nombre: 'Fantasía',
  titulares: [{ apellido: 'García', nombre: 'Juan' }],
  actividades: [{ id: 'act-1', nombre: 'Carnicería' }],
}

test('encuentra por nombre de fantasía sin importar acentos', () => {
  assert.equal(comercioCoincide(comercio, 'fantasia', ''), true)
  assert.equal(comercioCoincide(comercio, 'kiosco', ''), false)
})

test('encuentra por apellido y nombre del titular en cualquier orden', () => {
  assert.equal(comercioCoincide(comercio, 'juan garcia', ''), true)
  assert.equal(comercioCoincide(comercio, 'García', ''), true)
})

test('combina la búsqueda con la actividad', () => {
  assert.equal(comercioCoincide(comercio, 'fantasia', 'act-1'), true)
  assert.equal(comercioCoincide(comercio, 'fantasia', 'otra'), false)
  assert.equal(comercioCoincide(comercio, '', 'act-1'), true)
})

test('arma la etiqueta del titular', () => {
  assert.equal(etiquetaTitulares(comercio.titulares), 'García, Juan')
})
