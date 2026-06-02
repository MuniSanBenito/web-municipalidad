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
    !certElectricoFile?.size ||
    !facturaEnergiaFile?.size ||
    !planchetaFile?.size
  ) {
    return { error: 'Debés adjuntar toda la documentación obligatoria.' }
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

  const [
    formularioId,
    docInmuebleId,
    planoLocalId,
    certElectricoId,
    facturaEnergiaId,
    planchetaId,
  ] = await Promise.all([
    uploadArchivoLocal(formularioFile, ciudadano),
    uploadArchivoLocal(docInmuebleFile, ciudadano),
    uploadArchivoLocal(planoLocalFile, ciudadano),
    uploadArchivoLocal(certElectricoFile, ciudadano),
    uploadArchivoLocal(facturaEnergiaFile, ciudadano),
    uploadArchivoLocal(planchetaFile, ciudadano),
  ])

  if (!formularioId) return { error: 'Error al subir el formulario. Intentá nuevamente.' }

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
        ...(formularioId ? { faseIFormularioAdjunto: formularioId } : {}),
        ...(docInmuebleId ? { faseIDocInmueble: docInmuebleId } : {}),
        ...(planoLocalId ? { faseIPlanoLocal: planoLocalId } : {}),
        ...(certElectricoId ? { faseICertElectrico: certElectricoId } : {}),
        ...(facturaEnergiaId ? { faseIFacturaEnergia: facturaEnergiaId } : {}),
        ...(planchetaId ? { faseIPlancheta: planchetaId } : {}),
      } as any,
    })
    return { id: doc.id as string }
  } catch (e: any) {
    return { error: e?.message ?? 'Error al enviar la solicitud.' }
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
  const direccion = formData.get('direccion')?.toString().trim()
  const telefono = formData.get('telefono')?.toString().trim()
  const rubro = formData.get('rubro')?.toString().trim()
  const actividades = formData.getAll('actividades').map(String).filter(Boolean)
  const descripcionActividad = formData.get('descripcionActividad')?.toString().trim()

  if (!nombreFantasia || !razonSocial || !cuit || !direccion || !telefono || !rubro) {
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
        faseIIDireccion: direccion,
        faseIITelefono: telefono,
        faseIIRubro: rubro,
        faseIIActividades: actividades.length > 0 ? actividades : undefined,
        faseIIDescripcionActividad: descripcionActividad || undefined,
        ...(adjuntosIds.length > 0 ? { faseIIAdjuntos: adjuntosIds } : {}),
      } as any,
    })
    return {}
  } catch (e: any) {
    return { error: e?.message ?? 'Error al enviar la solicitud.' }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Fase III — Alta Fiscal
// ─────────────────────────────────────────────────────────────────────────────

export async function submitFaseIII(
  expedienteId: string,
  formData: FormData,
): Promise<{ error?: string }> {
  const ciudadano = await getAuthenticatedCiudadano()
  if (!ciudadano) return { error: 'Debés iniciar sesión para continuar.' }

  const confirmacion = formData.get('confirmacion') === 'on'
  const observaciones = formData.get('observaciones')?.toString().trim()

  if (!confirmacion) {
    return { error: 'Debés confirmar que los datos declarados son correctos.' }
  }

  // Upload libre deuda
  const libreDeudaFile = formData.get('libreDeuda') as File | null
  const libreDeudaId =
    libreDeudaFile && libreDeudaFile.size > 0
      ? await uploadArchivoLocal(libreDeudaFile, ciudadano)
      : null

  try {
    await basePayload.update({
      collection: 'expedientes-habilitacion' as any,
      id: expedienteId,
      overrideAccess: false,
      user: ciudadano,
      data: {
        faseIIIConfirmacionDatos: true,
        faseIIIObservaciones: observaciones || undefined,
        ...(libreDeudaId ? { faseIIILibreDeudaAdjunto: libreDeudaId } : {}),
      } as any,
    })
    return {}
  } catch (e: any) {
    return { error: e?.message ?? 'Error al enviar la solicitud.' }
  }
}
