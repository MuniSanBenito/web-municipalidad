import type { Arbole, Campana, Deporte, ElementosPlaza, OpcionesPresupuesto } from '@/payload-types'

export type Campaign = Campana
export type Sport = Deporte
export type Tree = Arbole
export type BudgetOption = OpcionesPresupuesto
export type PlazaElement = ElementosPlaza

export type StepId =
  | 'welcome'
  | 'sports'
  | 'trees'
  | 'plaza'
  | 'budget'
  | 'celebration'

export type ActivityId = 'deportes' | 'arboles' | 'plaza' | 'presupuesto' | 'quiz' | 'caza-tesoro'
export type AnalyticsActivity = 'deportes' | 'arboles' | 'plaza' | 'presupuesto' | 'quiz' | 'caza-tesoro'

export interface CampaignData {
  campaign: Campaign
  sports: Sport[]
  trees: Tree[]
  budgetOptions: BudgetOption[]
  plazaElements: PlazaElement[]
}

export interface ActiveSteps {
  sports: boolean
  trees: boolean
  plaza: boolean
  budget: boolean
}

export interface PlacedElement {
  id: string
  elementId: string
  name: string
  emoji: string
  x: number
  y: number
}

export interface AnalyticsEntry {
  actividad: AnalyticsActivity
  opcionId: string
  opcionNombre: string
  votos: number
  metadata?: Record<string, unknown> | null
}

export interface AnalyticsPayload {
  campaignSlug: string
  sessionId: string
  edad: string | null
  entries: AnalyticsEntry[]
}
