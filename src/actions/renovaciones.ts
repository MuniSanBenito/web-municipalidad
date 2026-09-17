'use server'

import {
  ciudadanoTieneModuloHabilitaciones,
  esTitularDelComercio,
  relationId,
} from '@/web/lib/habilitaciones'
import { HIGIENE_SEGURIDAD_VALUES } from '@/payload/constants/renovacion'
import { basePayload } from '@/web/lib/payload'
import { headers as nextHeaders } from 'next/headers'

const ESTADOS_EDITABLES = ['INICIADO', 'OBSERVADO']

async function getAuthenticatedCiudadanoHabilitaciones() {
  const headers = await nextHeaders()
  const { user } = await basePayload.auth({ headers, canSetHeaders: false })
  if (!user || user.collection !== 'ciudadanos') return null
  if (!ciudadanoTieneModuloHabilitaciones(user)) return null
  return user
}

async function uploadArchivoLocal(file: File, user: any): Promise<string | null> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const doc = await basePayload.create({
      collection: 'archivos',
      overrideAccess: false,
      user,
      data: {
        esPrivado: true,
        propietarioCiudadano: user.id,
      } as any,
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

function fileId(value: unknown): string | null {
  return relationId(value)
}

async function parseRenovacionForm(formData: FormData, ciudadano: any, existing?: any) {
  const solicitanteNombre = formData.get('solicitanteNombre')?.toString().trim()
  const solicitanteDni = formData.get('solicitanteDni')?.toString().trim()
  const solicitanteDomicilio = formData.get('solicitanteDomicilio')?.toString().trim()
  const solicitanteTelefono = formData.get('solicitanteTelefono')?.toString().trim()
  const solicitanteEmail = formData.get('solicitanteEmail')?.toString().trim()
  const numeroExpedienteAnterior = formData.get('numeroExpedienteAnterior')?.toString().trim()
  const librosTapaDura = formData.get('librosTapaDura')?.toString().trim()
  const generaResiduosPeligrosos = formData.get('generaResiduosPeligrosos')?.toString().trim()
  const declaracionJurada = formData.get('declaracionJurada') === 'true'
  const higieneSeguridad = formData.getAll('higieneSeguridad').map((v) => String(v))

  if (
    !solicitanteNombre ||
    !solicitanteDni ||
    !solicitanteDomicilio ||
    !solicitanteTelefono ||
    !solicitanteEmail
  ) {
    return { error: 'Completá todos los datos del solicitante.' }
  }

  if (librosTapaDura !== 'SI' && librosTapaDura !== 'LOS_TRAMITARE') {
    return { error: 'Indicá si tenés los libros tapa dura o si los vas a tramitar.' }
  }

  if (higieneSeguridad.length !== HIGIENE_SEGURIDAD_VALUES.length) {
    return {
      error:
        'Debés declarar todos los ítems de higiene y seguridad (contar con ellos o regularizarlos antes de la inspección).',
    }
  }
  const higieneSet = new Set(higieneSeguridad)
  if (HIGIENE_SEGURIDAD_VALUES.some((v) => !higieneSet.has(v))) {
    return { error: 'La declaración de higiene y seguridad está incompleta.' }
  }

  if (generaResiduosPeligrosos !== 'SI' && generaResiduosPeligrosos !== 'NO') {
    return { error: 'Indicá si el comercio genera residuos peligrosos.' }
  }

  if (!declaracionJurada) {
    return { error: 'Debés aceptar la declaración jurada.' }
  }

  const uploadIfNew = (f: File | null) =>
    f && f.size > 0 ? uploadArchivoLocal(f, ciudadano) : Promise.resolve(null)

  const dniFile = formData.get('dniAdjunto') as File | null
  const formularioFile = formData.get('formularioInicio') as File | null
  const selladoFile = formData.get('comprobanteSellado') as File | null
  const libreDeudaFile = formData.get('libreDeuda') as File | null
  const certResiduosFile = formData.get('certResiduosPeligrosos') as File | null

  const dniId = await uploadIfNew(dniFile)
  const formularioId = await uploadIfNew(formularioFile)
  const selladoId = await uploadIfNew(selladoFile)
  const libreDeudaId = await uploadIfNew(libreDeudaFile)
  const certResiduosId = await uploadIfNew(certResiduosFile)

  const dniFinal = dniId ?? fileId(existing?.dniAdjunto)
  const formularioFinal = formularioId ?? fileId(existing?.formularioInicio)
  const selladoFinal = selladoId ?? fileId(existing?.comprobanteSellado)
  const libreDeudaFinal = libreDeudaId ?? fileId(existing?.libreDeuda)
  const certResiduosFinal = certResiduosId ?? fileId(existing?.certResiduosPeligrosos)

  if (!dniFinal || !formularioFinal || !selladoFinal || !libreDeudaFinal) {
    return {
      error:
        'Debés adjuntar DNI, Formulario de Inicio firmado, comprobante de sellado y estado de deuda de Rentas.',
    }
  }

  if (generaResiduosPeligrosos === 'SI' && !certResiduosFinal) {
    return {
      error: 'Si genera residuos peligrosos, adjuntá la certificación de Medio Ambiente de la Provincia.',
    }
  }

  const archivosFiles = formData.getAll('adjuntosOtros') as File[]
  const nuevosOtros: string[] = []
  for (const file of archivosFiles) {
    if (file && file.size > 0) {
      const id = await uploadArchivoLocal(file, ciudadano)
      if (id) nuevosOtros.push(id)
    }
  }

  const existentesOtros = Array.isArray(existing?.adjuntosOtros)
    ? (existing.adjuntosOtros as unknown[])
        .map(fileId)
        .filter((id): id is string => typeof id === 'string')
    : []
  const adjuntosOtros =
    nuevosOtros.length > 0 ? [...existentesOtros, ...nuevosOtros] : existentesOtros

  return {
    data: {
      solicitanteNombre,
      solicitanteDni,
      solicitanteDomicilio,
      solicitanteTelefono,
      solicitanteEmail,
      numeroExpedienteAnterior: numeroExpedienteAnterior || undefined,
      dniAdjunto: dniFinal,
      formularioInicio: formularioFinal,
      comprobanteSellado: selladoFinal,
      libreDeuda: libreDeudaFinal,
      ...(certResiduosFinal ? { certResiduosPeligrosos: certResiduosFinal } : {}),
      ...(adjuntosOtros.length > 0 ? { adjuntosOtros } : {}),
      librosTapaDura,
      higieneSeguridad,
      generaResiduosPeligrosos,
      declaracionJurada,
    },
  }
}

export async function submitRenovacion(
  formData: FormData,
): Promise<{ error?: string; id?: string }> {
  const ciudadano = await getAuthenticatedCiudadanoHabilitaciones()
  if (!ciudadano) return { error: 'No tenés acceso al módulo de Habilitaciones.' }

  const comercioId = formData.get('comercioId')?.toString().trim()
  if (!comercioId) return { error: 'Falta el comercio a renovar.' }

  let comercio: any
  try {
    comercio = await basePayload.findByID({
      collection: 'comercios-habilitados',
      id: comercioId,
      depth: 0,
      overrideAccess: false,
      user: ciudadano,
    })
  } catch {
    return { error: 'No se encontró el comercio.' }
  }

  if (!esTitularDelComercio(comercio.titulares, ciudadano.id)) {
    return { error: 'No sos titular de este comercio.' }
  }

  if (comercio.fechaBaja && new Date(comercio.fechaBaja) <= new Date()) {
    return { error: 'Este comercio está dado de baja y no se puede renovar.' }
  }

  const { docs: abiertos } = await basePayload.find({
    collection: 'expedientes-renovacion',
    where: {
      and: [
        { comercio: { equals: comercioId } },
        { 'created_by.value': { equals: ciudadano.id } },
        { estado: { not_equals: 'APROBADO' } },
      ],
    },
    limit: 1,
    depth: 0,
  })
  if (abiertos.length > 0) {
    return {
      error: 'Ya tenés una renovación en curso para este comercio.',
      id: abiertos[0].id as string,
    }
  }

  const parsed = await parseRenovacionForm(formData, ciudadano)
  if ('error' in parsed && parsed.error) return { error: parsed.error }

  try {
    const doc = await basePayload.create({
      collection: 'expedientes-renovacion',
      overrideAccess: false,
      user: ciudadano,
      data: {
        comercio: comercioId,
        ...(parsed as { data: Record<string, unknown> }).data,
      } as any,
    })
    return { id: doc.id as string }
  } catch (e: any) {
    return { error: e?.message ?? 'Error al enviar la renovación.' }
  }
}

export async function updateRenovacion(
  renovacionId: string,
  formData: FormData,
): Promise<{ error?: string }> {
  const ciudadano = await getAuthenticatedCiudadanoHabilitaciones()
  if (!ciudadano) return { error: 'No tenés acceso al módulo de Habilitaciones.' }

  let actual: any
  try {
    actual = await basePayload.findByID({
      collection: 'expedientes-renovacion',
      id: renovacionId,
      depth: 0,
      overrideAccess: false,
      user: ciudadano,
    })
  } catch {
    return { error: 'No se pudo acceder al trámite.' }
  }

  if (!ESTADOS_EDITABLES.includes(actual.estado)) {
    return { error: 'Esta renovación ya no admite modificaciones.' }
  }

  const parsed = await parseRenovacionForm(formData, ciudadano, actual)
  if ('error' in parsed && parsed.error) return { error: parsed.error }

  try {
    await basePayload.update({
      collection: 'expedientes-renovacion',
      id: renovacionId,
      overrideAccess: false,
      user: ciudadano,
      data: (parsed as { data: Record<string, unknown> }).data as any,
    })
    return {}
  } catch (e: any) {
    return { error: e?.message ?? 'Error al actualizar la renovación.' }
  }
}
