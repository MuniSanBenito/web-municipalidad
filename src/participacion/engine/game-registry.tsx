import type { ActivityId } from '@/participacion/types'
import { IconBallFootball, IconHelpHexagon, IconMapPin2, IconScale, IconTournament, IconTrees } from '@tabler/icons-react'
import type { ReactNode } from 'react'

export interface GameMetadata {
  id: ActivityId
  title: string
  desc: string
  emoji: string
  icon: ReactNode
  color?: string
}

export const GAME_METADATA: Record<ActivityId, GameMetadata> = {
  deportes: {
    id: 'deportes',
    title: 'Deportes',
    desc: '¿Con qué deporte se identifica tu barrio?',
    emoji: '⚽',
    icon: <IconBallFootball size={32} />,
  },
  arboles: {
    id: 'arboles',
    title: 'Árboles',
    desc: '¿Qué árboles te gustaría ver?',
    emoji: '🌳',
    icon: <IconTrees size={32} />,
  },
  plaza: {
    id: 'plaza',
    title: 'Plaza',
    desc: 'Diseñá tu plaza ideal',
    emoji: '🏞️',
    icon: <IconMapPin2 size={32} />,
  },
  presupuesto: {
    id: 'presupuesto',
    title: 'Mi barrio ideal',
    desc: 'Invertí en tu barrio',
    emoji: '🏘️',
    icon: <IconScale size={32} />,
  },
  quiz: {
    id: 'quiz',
    title: 'Quiz del barrio',
    desc: 'Respondé y aprendé sobre San Benito',
    emoji: '❓',
    icon: <IconHelpHexagon size={32} />,
  },
  'caza-tesoro': {
    id: 'caza-tesoro',
    title: 'Caza del tesoro',
    desc: 'Buscá QR en la plaza y sumá puntos',
    emoji: '🧩',
    icon: <IconTournament size={32} />,
  },
}

export function getGameMetadata(activityId: ActivityId): GameMetadata {
  return GAME_METADATA[activityId]
}
