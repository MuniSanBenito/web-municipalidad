import { GameShell } from '@/participacion/components/game-shell'
import type { CampaignData } from '@/participacion/types'
import config from '@/payload.config'
import { getPayload } from 'payload'

const SEED_SPORTS = [
  { nombre: 'Fútbol', emoji: '⚽', orden: 1 },
  { nombre: 'Vóley', emoji: '🏐', orden: 2 },
  { nombre: 'Básquet', emoji: '🏀', orden: 3 },
  { nombre: 'Hockey', emoji: '🏑', orden: 4 },
  { nombre: 'Patín', emoji: '🛼', orden: 5 },
  { nombre: 'Atletismo', emoji: '🏃', orden: 6 },
  { nombre: 'Gimnasia', emoji: '🤸', orden: 7 },
  { nombre: 'Ciclismo', emoji: '🚴', orden: 8 },
  { nombre: 'Artes marciales', emoji: '🥋', orden: 9 },
]

const SEED_TREES = [
  { nombre: 'Jacarandá', caracteristicas: 'Flores violetas en primavera', emoji: '🌳', orden: 1 },
  { nombre: 'Tipa', caracteristicas: 'Da buena sombra, crece rápido', emoji: '🌲', orden: 2 },
  { nombre: 'Palo borracho', caracteristicas: 'Floración rosada, tronco grueso', emoji: '🌴', orden: 3 },
  { nombre: 'Cedro', caracteristicas: 'Madera noble, sombra densa', emoji: '🌲', orden: 4 },
  { nombre: 'Naranjo', caracteristicas: 'Flores blancas perfumadas', emoji: '🍊', orden: 5 },
  { nombre: 'Lapacho', caracteristicas: 'Flores rosadas espectaculares', emoji: '🌸', orden: 6 },
]

const SEED_BUDGET = [
  { nombre: 'Calles', emoji: '🛣️', descripcion: 'Pavimento y repavimentación', orden: 1 },
  { nombre: 'Veredas', emoji: '🚶', descripcion: 'Reparación de veredas', orden: 2 },
  { nombre: 'Iluminación', emoji: '💡', descripcion: 'Luminarias LED', orden: 3 },
  { nombre: 'Seguridad', emoji: '🚨', descripcion: 'Cámaras y vigilancia', orden: 4 },
  { nombre: 'Plazas', emoji: '🏞️', descripcion: 'Juegos y mantenimiento', orden: 5 },
  { nombre: 'Árboles', emoji: '🌳', descripcion: 'Forestación urbana', orden: 6 },
  { nombre: 'Deportes', emoji: '⚽', descripcion: 'Canchas y equipamiento', orden: 7 },
  { nombre: 'Cultura', emoji: '🎭', descripcion: 'Talleres y eventos', orden: 8 },
  { nombre: 'Educación', emoji: '📚', descripcion: 'Apoyo escolar', orden: 9 },
  { nombre: 'Limpieza', emoji: '🧹', descripcion: 'Recolección y barrido', orden: 10 },
  { nombre: 'Salud', emoji: '🏥', descripcion: 'Centro de salud', orden: 11 },
  { nombre: 'Ambiente', emoji: '🌱', descripcion: 'Espacios verdes', orden: 12 },
]

const SEED_PLAZA = [
  { nombre: 'Hamacas', emoji: '🛝', ancho: 1, alto: 1, orden: 1 },
  { nombre: 'Tobogán', emoji: '🎢', ancho: 1, alto: 1, orden: 2 },
  { nombre: 'Cancha', emoji: '⚽', ancho: 1, alto: 1, orden: 3 },
  { nombre: 'Árbol', emoji: '🌳', ancho: 1, alto: 1, orden: 4 },
  { nombre: 'Banco', emoji: '🪑', ancho: 1, alto: 1, orden: 5 },
  { nombre: 'Bebedero', emoji: '🚰', ancho: 1, alto: 1, orden: 6 },
  { nombre: 'Gimnasio', emoji: '🏋️', ancho: 1, alto: 1, orden: 7 },
  { nombre: 'Luces', emoji: '💡', ancho: 1, alto: 1, orden: 8 },
  { nombre: 'Cestos', emoji: '🗑️', ancho: 1, alto: 1, orden: 9 },
  { nombre: 'Bicicletero', emoji: '🚲', ancho: 1, alto: 1, orden: 10 },
  { nombre: 'Baños', emoji: '🚻', ancho: 1, alto: 1, orden: 11 },
]

async function seedDemo() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'campanas',
    where: { slug: { equals: 'demo' } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    const campaign = existing.docs[0]
    const [sports, trees, budget, plaza] = await Promise.all([
      payload.find({ collection: 'deportes', limit: 20, sort: 'orden' }),
      payload.find({ collection: 'arboles', limit: 20, sort: 'orden' }),
      payload.find({ collection: 'opciones-presupuesto', limit: 20, sort: 'orden' }),
      payload.find({ collection: 'elementos-plaza', limit: 20, sort: 'orden' }),
    ])
    return { campaign, sports: sports.docs, trees: trees.docs, budgetOptions: budget.docs, plazaElements: plaza.docs }
  }

  const campaign = await payload.create({
    collection: 'campanas',
    data: {
      nombre: 'Imaginemos juntos nuestro barrio',
      slug: 'demo',
      descripcion: 'Experiencia interactiva de participación ciudadana',
      barrio: 'San Benito Centro',
      colorPrincipal: '#10b981',
      fechaInicio: new Date().toISOString(),
      fechaFin: new Date(Date.now() + 30 * 86400000).toISOString(),
      estado: 'activa',
      deportesActivo: true,
      arbolesActivo: true,
      plazaActivo: true,
      presupuestoActivo: true,
      publico: 'mixto',
      sessionUnica: true,
      resultadosPublicos: true,
    },
  })

  const [sports, trees, budget, plaza] = await Promise.all([
    Promise.all(SEED_SPORTS.map((s) => payload.create({ collection: 'deportes', data: { ...s, campana: campaign.id } }))),
    Promise.all(SEED_TREES.map((t) => payload.create({ collection: 'arboles', data: { ...t, campana: campaign.id } }))),
    Promise.all(SEED_BUDGET.map((b) => payload.create({ collection: 'opciones-presupuesto', data: { ...b, campana: campaign.id } }))),
    Promise.all(SEED_PLAZA.map((p) => payload.create({ collection: 'elementos-plaza', data: { ...p, campana: campaign.id } }))),
  ])

  return { campaign, sports, trees, budgetOptions: budget, plazaElements: plaza }
}

export default async function DemoPage() {
  const data = await seedDemo()
  return <GameShell data={data as CampaignData} />
}
