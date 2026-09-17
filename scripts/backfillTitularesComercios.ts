import config from '@payload-config'
import { getPayload } from 'payload'
import './loadEnv'

function relationId(value: unknown): string | null {
  if (!value) return null
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null && 'id' in value) {
    return String((value as { id: string }).id)
  }
  return null
}

async function backfill() {
  const payload = await getPayload({ config })
  const { docs: expedientes } = await payload.find({
    collection: 'expedientes-habilitacion',
    where: { faseIIIComercioHabilitado: { exists: true } },
    pagination: false,
    depth: 0,
    overrideAccess: true,
  })

  let comerciosActualizados = 0
  let ciudadanosConPermiso = 0
  const ciudadanosIds = new Set<string>()

  for (const expediente of expedientes) {
    const comercioId = relationId((expediente as any).faseIIIComercioHabilitado)
    const createdBy = (expediente as any).created_by
    const ciudadanoId =
      createdBy?.relationTo === 'ciudadanos' ? relationId(createdBy.value) : null

    if (!comercioId || !ciudadanoId) continue
    ciudadanosIds.add(ciudadanoId)

    const comercio = await payload.findByID({
      collection: 'comercios-habilitados',
      id: comercioId,
      depth: 0,
      overrideAccess: true,
    })

    const actuales = Array.isArray(comercio.titulares)
      ? comercio.titulares.map(relationId).filter((id): id is string => Boolean(id))
      : []

    if (actuales.includes(ciudadanoId)) continue

    await payload.update({
      collection: 'comercios-habilitados',
      id: comercioId,
      data: { titulares: [...actuales, ciudadanoId] },
      overrideAccess: true,
    })
    comerciosActualizados += 1
    console.log(`Comercio ${comercio.nombre} ← titular ${ciudadanoId}`)
  }

  const { docs: comerciosConTitulares } = await payload.find({
    collection: 'comercios-habilitados',
    where: { titulares: { exists: true } },
    pagination: false,
    depth: 0,
    overrideAccess: true,
  })
  for (const comercio of comerciosConTitulares) {
    const ids = Array.isArray(comercio.titulares)
      ? comercio.titulares.map(relationId).filter((id): id is string => Boolean(id))
      : []
    for (const id of ids) ciudadanosIds.add(id)
  }

  const { docs: todosExpedientes } = await payload.find({
    collection: 'expedientes-habilitacion',
    pagination: false,
    depth: 0,
    overrideAccess: true,
  })
  for (const expediente of todosExpedientes) {
    const createdBy = (expediente as any).created_by
    if (createdBy?.relationTo === 'ciudadanos') {
      const id = relationId(createdBy.value)
      if (id) ciudadanosIds.add(id)
    }
  }

  for (const ciudadanoId of ciudadanosIds) {
    const ciudadano = await payload.findByID({
      collection: 'ciudadanos',
      id: ciudadanoId,
      depth: 0,
      overrideAccess: true,
    })
    const permisos = Array.isArray(ciudadano.permisos) ? [...ciudadano.permisos] : []
    if (permisos.includes('HABILITACIONES')) continue

    await payload.update({
      collection: 'ciudadanos',
      id: ciudadanoId,
      data: { permisos: [...permisos, 'HABILITACIONES'] },
      overrideAccess: true,
    })
    ciudadanosConPermiso += 1
    console.log(`Ciudadano ${ciudadano.email} ← permiso HABILITACIONES`)
  }

  console.log(
    `Listo. Expedientes revisados: ${expedientes.length}. Comercios vinculados: ${comerciosActualizados}. Permisos asignados: ${ciudadanosConPermiso}.`,
  )
  process.exit(0)
}

backfill().catch((error) => {
  console.error(error)
  process.exit(1)
})
