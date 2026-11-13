import assert from 'node:assert/strict'
import { test } from 'node:test'
import { numeroIngresado, siguienteNumeroHabilitacion } from './numero-habilitacion'

test('un número escrito se guarda tal cual, sin espacios', () => {
  assert.equal(numeroIngresado('  1523/2019  '), '1523/2019')
  assert.equal(numeroIngresado('HB-2020-0007'), 'HB-2020-0007')
})

test('vacío no cuenta como número cargado', () => {
  assert.equal(numeroIngresado(''), null)
  assert.equal(numeroIngresado('   '), null)
  assert.equal(numeroIngresado(null), null)
  assert.equal(numeroIngresado(undefined), null)
})

test('si no hay números automáticos del año, arranca en 0001', () => {
  assert.equal(siguienteNumeroHabilitacion(['1523/2019', 'EXP-8'], 2026), 'HB-2026-0001')
})

test('el correlativo sigue al mayor HB del año y no pisa un número de papel', () => {
  assert.equal(
    siguienteNumeroHabilitacion(
      ['HB-2026-0002', '1523/2019', 'HB-2026-0010', 'HB-2025-0099'],
      2026,
    ),
    'HB-2026-0011',
  )
})
