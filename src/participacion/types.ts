import type { Arbole, Campana, Deporte, ElementosPlaza, OpcionesPresupuesto, Premio } from '@/payload-types'

export type Campaign = Campana
export type Sport = Deporte
export type Tree = Arbole
export type BudgetOption = OpcionesPresupuesto
export type PlazaElement = ElementosPlaza
export type Prize = Premio

export type StepId =
  | 'welcome'
  | 'sports'
  | 'trees'
  | 'plaza'
  | 'budget'
  | 'roulette'
  | 'celebration'

export type ActivityId = 'deportes' | 'arboles' | 'plaza' | 'presupuesto' | 'ruleta' | 'quiz' | 'caza-tesoro'
export type AnalyticsActivity = 'deportes' | 'arboles' | 'plaza' | 'presupuesto' | 'ruleta' | 'quiz' | 'caza-tesoro'

export interface CampaignData {
  campaign: Campaign
  sports: Sport[]
  trees: Tree[]
  budgetOptions: BudgetOption[]
  plazaElements: PlazaElement[]
  prizes: Prize[]
}

export interface ActiveSteps {
  sports: boolean
  trees: boolean
  plaza: boolean
  budget: boolean
  roulette: boolean
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

export type SpinResult =
  | { success: true; prize: { id: string; nombre: string }; repetido: boolean }
  | { success: false; agotado?: boolean; error: string }
