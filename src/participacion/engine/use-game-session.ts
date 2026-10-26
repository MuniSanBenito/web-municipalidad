'use client'

import { getEdad, getSessionId, setEdad as setStoredEdad } from '@/participacion/engine/session-store'
import type { AnalyticsEntry, AnalyticsPayload } from '@/participacion/types'
import { useCallback, useMemo, useRef, useState } from 'react'

export function useGameSession(campaignSlug: string) {
  const sessionId = useMemo(() => getSessionId(campaignSlug), [campaignSlug])
  const [edad, setEdadState] = useState<string | null>(getEdad(campaignSlug))
  const entriesRef = useRef<AnalyticsEntry[]>([])

  const setEdad = useCallback(
    (value: string | null) => {
      setEdadState(value)
      setStoredEdad(campaignSlug, value)
    },
    [campaignSlug],
  )

  const recordVote = useCallback(
    (actividad: AnalyticsEntry['actividad'], opcionId: string, opcionNombre: string, votos = 1, metadata?: AnalyticsEntry['metadata']) => {
      const existing = entriesRef.current.find((e) => e.actividad === actividad && e.opcionId === opcionId)
      if (existing) {
        existing.votos += votos
        if (metadata !== undefined) existing.metadata = metadata
      } else {
        entriesRef.current.push({ actividad, opcionId, opcionNombre, votos, metadata })
      }
    },
    [],
  )

  const resetActivity = useCallback((actividad: AnalyticsEntry['actividad']) => {
    entriesRef.current = entriesRef.current.filter((e) => e.actividad !== actividad)
  }, [])

  const setVotes = useCallback(
    (actividad: AnalyticsEntry['actividad'], entries: { opcionId: string; opcionNombre: string; votos: number; metadata?: AnalyticsEntry['metadata'] }[]) => {
      entriesRef.current = entriesRef.current.filter((e) => e.actividad !== actividad)
      entries.forEach((e) => entriesRef.current.push({ actividad, ...e }))
    },
    [],
  )

  const getPayload = useCallback(
    (): AnalyticsPayload => ({
      campaignSlug,
      sessionId,
      edad,
      entries: [...entriesRef.current],
    }),
    [campaignSlug, sessionId, edad],
  )

  return { sessionId, edad, setEdad, recordVote, resetActivity, setVotes, getPayload }
}
