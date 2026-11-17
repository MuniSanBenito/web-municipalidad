import assert from 'node:assert/strict'
import { test } from 'node:test'
import { completarNombreCiudadano, etiquetaCiudadano } from './etiqueta'

test('arma la etiqueta con apellido, nombre y dni', () => {
  assert.equal(
    etiquetaCiudadano({ apellido: 'García', nombre: 'Juan', dni: '30111222' }),
    'García, Juan · DNI 30111222',
  )
})

test('tolera espacios y datos incompletos', () => {
  assert.equal(etiquetaCiudadano({ dni: '30111222' }), 'DNI 30111222')
  assert.equal(
    etiquetaCiudadano({ nombre: '  Juan ', dni: ' 30111222 ' }),
    'Juan · DNI 30111222',
  )
  assert.equal(etiquetaCiudadano({}), '')
})

test('en un update parcial conserva apellido y dni anteriores', () => {
  const data = { nombre: 'Ana' }
  const result = completarNombreCiudadano({
    data,
    originalDoc: { nombre: 'Juan', apellido: 'García', dni: '30111222' },
  } as never)

  assert.equal(result?.nombreCompleto, 'García, Ana · DNI 30111222')
})
