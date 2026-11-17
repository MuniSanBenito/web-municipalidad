import assert from 'node:assert/strict'
import { test } from 'node:test'
import { comercioCoincide, etiquetaTitulares, hrefFicha, hrefListado, paginar } from './busqueda-comercios'

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

test('pagina el listado y deja el resto fuera de la página', () => {
  const items = ['a', 'b', 'c', 'd', 'e']
  const primera = paginar(items, 1, 2)
  const segunda = paginar(items, 2, 2)
  const ultima = paginar(items, 99, 2)

  assert.deepEqual(primera.items, ['a', 'b'])
  assert.equal(primera.total, 5)
  assert.equal(primera.desde, 1)
  assert.equal(primera.hasta, 2)
  assert.equal(primera.hasNextPage, true)
  assert.deepEqual(segunda.items, ['c', 'd'])
  assert.deepEqual(ultima.items, ['e'])
  assert.equal(ultima.page, 3)
  assert.equal(ultima.hasNextPage, false)
})

test('la ficha vuelve al listado con la misma búsqueda', () => {
  assert.equal(hrefListado('  ', '', 1), '/tramites/habilitaciones/comercios-habilitados')
  const listado = hrefListado('fantasía', 'act-1', 2)
  assert.equal(
    listado,
    '/tramites/habilitaciones/comercios-habilitados?q=fantas%C3%ADa&actividad=act-1&page=2',
  )
  assert.equal(
    hrefFicha('abc', 'fantasía', 'act-1', 2),
    '/tramites/habilitaciones/comercios-habilitados/abc?q=fantas%C3%ADa&actividad=act-1&page=2',
  )
})

test('una búsqueda vacía queda en una sola página', () => {
  const vacia = paginar([], 4, 10)
  assert.deepEqual(vacia.items, [])
  assert.equal(vacia.page, 1)
  assert.equal(vacia.totalPages, 1)
  assert.equal(vacia.desde, 0)
})
