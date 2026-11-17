import config from '@payload-config'
import { getPayload } from 'payload'
import { etiquetaCiudadano } from '../src/payload/ciudadanos/etiqueta'
import './loadEnv'

type ObjectIdCtor = new (id: string) => object

async function backfill() {
  const payload = await getPayload({ config })
  const modelo = payload.db.collections['ciudadanos']
  const muestraId = await modelo.collection.findOne({}, { projection: { _id: 1 } })
  if (!muestraId?._id) {
    console.log('No hay ciudadanos para actualizar.')
    process.exit(0)
  }

  const ObjectId = muestraId._id.constructor as ObjectIdCtor
  const operaciones: {
    updateOne: {
      filter: { _id: object }
      update: { $set: { nombreCompleto: string } }
    }
  }[] = []

  let page = 1
  let revisados = 0
  let control: { id: string; dni: string } | null = null

  while (true) {
    const resultado = await payload.find({
      collection: 'ciudadanos',
      page,
      limit: 100,
      depth: 0,
      overrideAccess: true,
    })

    for (const ciudadano of resultado.docs) {
      revisados += 1
      const etiqueta = etiquetaCiudadano(ciudadano)
      if (!control && ciudadano.dni && etiqueta.includes(ciudadano.dni)) {
        control = { id: ciudadano.id, dni: ciudadano.dni }
      }
      if (!etiqueta || ciudadano.nombreCompleto === etiqueta) continue

      operaciones.push({
        updateOne: {
          filter: { _id: new ObjectId(ciudadano.id) },
          update: { $set: { nombreCompleto: etiqueta } },
        },
      })
    }

    if (!resultado.hasNextPage) break
    page += 1
  }

  if (operaciones.length > 0) {
    await modelo.collection.bulkWrite(operaciones)
  }

  let busquedaOk = !control
  if (control) {
    const busqueda = await payload.find({
      collection: 'ciudadanos',
      where: { nombreCompleto: { like: control.dni } },
      limit: 5,
      depth: 0,
      select: { nombreCompleto: true },
      overrideAccess: true,
    })
    busquedaOk = busqueda.docs.some(
      (doc) => doc.id === control?.id && doc.nombreCompleto?.includes(control.dni),
    )
  }

  console.log(
    `Listo. Ciudadanos revisados: ${revisados}. Etiquetas actualizadas: ${operaciones.length}. Búsqueda por DNI: ${busquedaOk ? 'ok' : 'falló'}.`,
  )
  if (!busquedaOk) process.exit(1)
  process.exit(0)
}

backfill().catch((error) => {
  console.error(error)
  process.exit(1)
})
