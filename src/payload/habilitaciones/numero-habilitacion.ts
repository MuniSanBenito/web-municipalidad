/** Texto ingresado en el admin. Vacío o solo espacios cuenta como “sin número”. */
export function numeroIngresado(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const numero = value.trim()
  return numero.length > 0 ? numero : null
}

/**
 * Siguiente correlativo HB-{año}-0001.
 * Solo mira números con ese formato. Un número de expediente papel no entra en la serie.
 */
export function siguienteNumeroHabilitacion(existentes: readonly string[], year: number): string {
  const patron = new RegExp(`^HB-${year}-(\\d+)$`)
  let maximo = 0

  for (const valor of existentes) {
    const coincidencia = patron.exec(valor.trim())
    if (!coincidencia) continue
    const correlativo = Number(coincidencia[1])
    if (Number.isFinite(correlativo) && correlativo > maximo) maximo = correlativo
  }

  return `HB-${year}-${String(maximo + 1).padStart(4, '0')}`
}
