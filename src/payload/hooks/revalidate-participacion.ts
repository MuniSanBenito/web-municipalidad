import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

function revalidateParticipacion() {
  try {
    revalidatePath('/participacion/[slug]', 'page')
  } catch (error) {
    // revalidatePath falla fuera de un request de Next (scripts, seeds o durante el render)
    console.warn('[revalidateParticipacion] No se pudo revalidar:', error)
  }
}

const afterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateParticipacion()
  return doc
}

const afterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateParticipacion()
  return doc
}

export const revalidateParticipacionHooks = {
  afterChange: [afterChange],
  afterDelete: [afterDelete],
}
