'use server'

import { basePayload } from '@/web/lib/payload'
import { headers as nextHeaders } from 'next/headers'

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

async function getAuthenticatedCiudadano() {
  const headers = await nextHeaders()
  const { user } = await basePayload.auth({ headers, canSetHeaders: false })
  if (!user || user.collection !== 'ciudadanos') return null
  return user
}

async function uploadArchivoLocal(file: File, user: any): Promise<string | null> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const doc = await basePayload.create({
      collection: 'archivos',
      overrideAccess: false,
      user,
      data: {} as any,
      file: {
        data: buffer,
        mimetype: file.type || 'application/octet-stream',
        name: file.name,
        size: file.size,
      },
    })
    return (doc as any).id ?? null
  } catch (e) {
    console.error('[uploadArchivoLocal] Error al subir archivo:', e)
    return null
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Fase I — Permiso de Uso
// ─────────────────────────────────────────────────────────────────────────────

export async function submitFaseI(formData: FormData): Promise<{ error?: string; id?: string }> {
  const ciudadano = await getAuthenticatedCiudadano()
  if (!ciudadano) return { error: 'Debés iniciar sesión para continuar.' }

  const email = formData.get('email')?.toString().trim()
  const apellido = formData.get('apellido')?.toString().trim()
  const nombre = formData.get('nombre')?.toString().trim()
  const dni = formData.get('dni')?.toString().trim()
  const telefono = formData.get('telefono')?.toString().trim()
  const domicilio = formData.get('domicilio')?.toString().trim()
  const barrio = formData.get('barrio')?.toString().trim()

  const formularioFile = formData.get('formulario') as File | null
  const docInmuebleFile = formData.get('docInmueble') as File | null
  const planoLocalFile = formData.get('planoLocal') as File | null
  const certElectricoFile = formData.get('certElectrico') as File | null
  const facturaEnergiaFile = formData.get('facturaEnergia') as File | null
  const planchetaFile = formData.get('plancheta') as File | null

  if (!email || !apellido || !nombre || !dni || !telefono || !domicilio || !barrio) {
    return { error: 'Completá todos los campos obligatorios.' }
  }
  if (!formularioFile || formularioFile.size === 0) {
    return { error: 'Debés adjuntar el formulario de Permiso de Uso completado.' }
  }
  if (
    !docInmuebleFile?.size ||
    !planoLocalFile?.size ||
    !planchetaFile?.size
  ) {
    return { error: 'Debés adjuntar toda la documentación obligatoria.' }
  }
  if (!certElectricoFile?.size && !facturaEnergiaFile?.size) {
    return {
      error:
        'Debés adjuntar el certificado de instalaciones eléctricas o la factura de energía eléctrica (al menos uno).',
    }
  }

  // Evitar expedientes duplicados: si ya existe uno del ciudadano, no crear otro.
  const { docs: existentes } = await basePayload.find({
    collection: 'expedientes-habilitacion' as any,
    where: { 'created_by.value': { equals: ciudadano.id } },
    limit: 1,
    depth: 0,
  })
  if (existentes.length > 0) {
    return {
      error: 'Ya tenés un trámite de habilitación en curso.',
      id: existentes[0].id as string,
    }
  }

  // Subir secuencialmente: en paralelo, las transacciones de MongoDB chocan
  // entre sí y devuelven WriteConflict (code 112), perdiéndose archivos.
  const formularioId = await uploadArchivoLocal(formularioFile, ciudadano)
  const docInmuebleId = await uploadArchivoLocal(docInmuebleFile, ciudadano)
  const planoLocalId = await uploadArchivoLocal(planoLocalFile, ciudadano)
  const certElectricoId = certElectricoFile?.size
    ? await uploadArchivoLocal(certElectricoFile, ciudadano)
    : null
  const facturaEnergiaId = facturaEnergiaFile?.size
    ? await uploadArchivoLocal(facturaEnergiaFile, ciudadano)
    : null
  const planchetaId = await uploadArchivoLocal(planchetaFile, ciudadano)

  if (!formularioId || !docInmuebleId || !planoLocalId || !planchetaId) {
    return { error: 'Error al subir uno o más archivos. Intentá nuevamente.' }
  }

  try {
    const doc = await basePayload.create({
      collection: 'expedientes-habilitacion' as any,
      overrideAccess: false,
      user: ciudadano,
      data: {
        faseIEmail: email,
        faseIApellido: apellido,
        faseINombre: nombre,
        faseIDNI: dni,
        faseITelefono: telefono,
        faseIDireccionLocal: domicilio,
        faseIBarrio: barrio,
        faseIDeclaracionJurada: true,
        faseIFormularioAdjunto: formularioId,
        faseIDocInmueble: docInmuebleId,
        faseIPlanoLocal: planoLocalId,
        ...(certElectricoId ? { faseICertElectrico: certElectricoId } : {}),
        ...(facturaEnergiaId ? { faseIFacturaEnergia: facturaEnergiaId } : {}),
        faseIPlancheta: planchetaId,
      } as any,
    })
    return { id: doc.id as string }
  } catch (e: any) {
    return { error: e?.message ?? 'Error al enviar la solicitud.' }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Fase I — Actualización (edición)
// ─────────────────────────────────────────────────────────────────────────────

export async function updateFaseI(
  expedienteId: string,
  formData: FormData,
): Promise<{ error?: string }> {
  const ciudadano = await getAuthenticatedCiudadano()
  if (!ciudadano) return { error: 'Debés iniciar sesión para continuar.' }

  const email = formData.get('email')?.toString().trim()
  const apellido = formData.get('apellido')?.toString().trim()
  const nombre = formData.get('nombre')?.toString().trim()
  const dni = formData.get('dni')?.toString().trim()
  const telefono = formData.get('telefono')?.toString().trim()
  const domicilio = formData.get('domicilio')?.toString().trim()
  const barrio = formData.get('barrio')?.toString().trim()

  if (!email || !apellido || !nombre || !dni || !telefono || !domicilio || !barrio) {
    return { error: 'Completá todos los campos obligatorios.' }
  }

  const formularioFile = formData.get('formulario') as File | null
  const docInmuebleFile = formData.get('docInmueble') as File | null
  const planoLocalFile = formData.get('planoLocal') as File | null
  const certElectricoFile = formData.get('certElectrico') as File | null
  const facturaEnergiaFile = formData.get('facturaEnergia') as File | null
  const planchetaFile = formData.get('plancheta') as File | null

  const uploadIfNew = (f: File | null) =>
    f && f.size > 0 ? uploadArchivoLocal(f, ciudadano) : Promise.resolve(null)

  // Secuencial: en paralelo las transacciones de MongoDB chocan (WriteConflict, code 112).
  const formularioId = await uploadIfNew(formularioFile)
  const docInmuebleId = await uploadIfNew(docInmuebleFile)
  const planoLocalId = await uploadIfNew(planoLocalFile)
  const certElectricoId = await uploadIfNew(certElectricoFile)
  const facturaEnergiaId = await uploadIfNew(facturaEnergiaFile)
  const planchetaId = await uploadIfNew(planchetaFile)

  const data: Record<string, unknown> = {
    faseIEmail: email,
    faseIApellido: apellido,
    faseINombre: nombre,
    faseIDNI: dni,
    faseITelefono: telefono,
    faseIDireccionLocal: domicilio,
    faseIBarrio: barrio,
  }
  if (formularioId) data.faseIFormularioAdjunto = formularioId
  if (docInmuebleId) data.faseIDocInmueble = docInmuebleId
  if (planoLocalId) data.faseIPlanoLocal = planoLocalId
  if (certElectricoId) data.faseICertElectrico = certElectricoId
  if (facturaEnergiaId) data.faseIFacturaEnergia = facturaEnergiaId
  if (planchetaId) data.faseIPlancheta = planchetaId

  try {
    await basePayload.update({
      collection: 'expedientes-habilitacion' as any,
      id: expedienteId,
      overrideAccess: false,
      user: ciudadano,
      data: data as any,
    })
    return {}
  } catch (e: any) {
    return { error: e?.message ?? 'Error al actualizar la solicitud.' }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Fase II — Habilitación Comercial
// ─────────────────────────────────────────────────────────────────────────────

export async function submitFaseII(
  expedienteId: string,
  formData: FormData,
): Promise<{ error?: string }> {
  const ciudadano = await getAuthenticatedCiudadano()
  if (!ciudadano) return { error: 'Debés iniciar sesión para continuar.' }

  const nombreFantasia = formData.get('nombreFantasia')?.toString().trim()
  const razonSocial = formData.get('razonSocial')?.toString().trim()
  const cuit = formData.get('cuit')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const telefono = formData.get('telefono')?.toString().trim()
  const rubro = formData.get('rubro')?.toString().trim()
  const descripcionActividad = formData.get('descripcionActividad')?.toString().trim()
  const superficieRaw = formData.get('superficie')?.toString().trim()
  const empleadosRaw = formData.get('empleados')?.toString().trim()
  const horario = formData.get('horario')?.toString().trim()

  const manipulacionAlimentos = formData.get('manipulacionAlimentos') === 'si'
  const higieneSeguridad = formData.get('higieneSeguridad') === 'si'
  const seguroRC = formData.get('seguroRC') === 'si'
  const buenaConducta = formData.get('buenaConducta') === 'si'
  const tituloProfesional = formData.get('tituloProfesional') === 'si'
  const planoEvacuacion = formData.get('planoEvacuacion') === 'si'
  const residuosPeligrosos = formData.get('residuosPeligrosos') === 'si'
  const declaracionJurada = formData.get('declaracionJurada') === 'true'

  if (!nombreFantasia || !razonSocial || !cuit || !telefono || !rubro) {
    return { error: 'Completá todos los campos obligatorios.' }
  }

  // Upload multiple files
  const archivosFiles = formData.getAll('adjuntos') as File[]
  const adjuntosIds: string[] = []
  for (const file of archivosFiles) {
    if (file && file.size > 0) {
      const fileId = await uploadArchivoLocal(file, ciudadano)
      if (fileId) adjuntosIds.push(fileId)
    }
  }

  // Al editar, los archivos nuevos se SUMAN a los ya cargados en lugar de
  // reemplazar todo el array (evita perder documentación previa).
  let adjuntosFinales: string[] = adjuntosIds
  if (adjuntosIds.length > 0) {
    try {
      const actual = await basePayload.findByID({
        collection: 'expedientes-habilitacion' as any,
        id: expedienteId,
        depth: 0,
        overrideAccess: false,
        user: ciudadano,
      })
      const existentes = Array.isArray((actual as any)?.faseIIAdjuntos)
        ? ((actual as any).faseIIAdjuntos as unknown[])
            .map((a) => (typeof a === 'string' ? a : (a as any)?.id))
            .filter((id): id is string => typeof id === 'string')
        : []
      adjuntosFinales = [...existentes, ...adjuntosIds]
    } catch {
      adjuntosFinales = adjuntosIds
    }
  }

  try {
    await basePayload.update({
      collection: 'expedientes-habilitacion' as any,
      id: expedienteId,
      overrideAccess: false,
      user: ciudadano,
      data: {
        faseIINombreFantasia: nombreFantasia,
        faseIIRazonSocial: razonSocial,
        faseIICuit: cuit,
        faseIIEmail: email || undefined,
        faseIITelefono: telefono,
        faseIIRubro: rubro,
        faseIIDescripcionActividad: descripcionActividad || undefined,
        faseIISuperficieAfectada: superficieRaw ? Number(superficieRaw) : undefined,
        faseIICantidadEmpleados: empleadosRaw ? Number(empleadosRaw) : undefined,
        faseIIHorarioFuncionamiento: horario || undefined,
        faseIIManipulacionAlimentos: manipulacionAlimentos,
        faseIIHigieneSeguridad: higieneSeguridad,
        faseIISeguroRC: seguroRC,
        faseIIBuenaConducta: buenaConducta,
        faseIITituloProfesional: tituloProfesional,
        faseIIPlanoEvacuacion: planoEvacuacion,
        faseIIResiduosPeligrosos: residuosPeligrosos,
        faseIIDeclaracionJurada: declaracionJurada,
        ...(adjuntosIds.length > 0 ? { faseIIAdjuntos: adjuntosFinales } : {}),
      } as any,
    })
    return {}
  } catch (e: any) {
    return { error: e?.message ?? 'Error al enviar la solicitud.' }
  }
}

