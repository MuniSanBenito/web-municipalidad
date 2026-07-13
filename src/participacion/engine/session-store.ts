'use client'

const SESSION_KEY = (slug: string) => `participacion:session:${slug}`
const EDAD_KEY = (slug: string) => `participacion:edad:${slug}`
const PROGRESS_KEY = (slug: string) => `participacion:progress:${slug}`

function generateId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function getSessionId(campaignSlug: string): string {
  if (typeof window === 'undefined') return ''
  const stored = window.localStorage.getItem(SESSION_KEY(campaignSlug))
  if (stored) return stored
  const id = generateId()
  window.localStorage.setItem(SESSION_KEY(campaignSlug), id)
  return id
}

export function getEdad(campaignSlug: string): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(EDAD_KEY(campaignSlug))
}

export function setEdad(campaignSlug: string, edad: string | null) {
  if (typeof window === 'undefined') return
  if (edad) {
    window.localStorage.setItem(EDAD_KEY(campaignSlug), edad)
  } else {
    window.localStorage.removeItem(EDAD_KEY(campaignSlug))
  }
}

export function saveProgress(campaignSlug: string, step: string, entries: unknown[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(PROGRESS_KEY(campaignSlug), JSON.stringify({ step, entries, savedAt: Date.now() }))
}

export function loadProgress(campaignSlug: string): { step: string; entries: unknown[] } | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(PROGRESS_KEY(campaignSlug))
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    return { step: parsed.step, entries: parsed.entries ?? [] }
  } catch {
    return null
  }
}

export function clearProgress(campaignSlug: string) {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(PROGRESS_KEY(campaignSlug))
}
