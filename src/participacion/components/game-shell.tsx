'use client'

import { submitResults } from '@/participacion/actions'
import { BudgetScreen } from '@/participacion/components/screens/budget-screen'
import { CelebrationScreen } from '@/participacion/components/screens/celebration-screen'
import { PlazaScreen } from '@/participacion/components/screens/plaza-screen'
import { SportsScreen } from '@/participacion/components/screens/sports-screen'
import { TreesScreen } from '@/participacion/components/screens/trees-screen'
import { WelcomeScreen } from '@/participacion/components/screens/welcome-screen'
import { ContinueButton, StepLayout } from '@/participacion/components/ui'
import { useGameSession } from '@/participacion/engine/use-game-session'
import { useConfetti, useStepper } from '@/participacion/hooks'
import type { ActiveSteps, BudgetOption, CampaignData, Sport, Tree } from '@/participacion/types'
import { AnimatePresence } from 'framer-motion'
import { useCallback, useState } from 'react'

interface GameShellProps {
  data: CampaignData
}

export function GameShell({ data }: GameShellProps) {
  const { campaign, sports, trees, budgetOptions, plazaElements } = data
  const stepper = useStepper()
  const { recordVote, setVotes, getPayload } = useGameSession(campaign.slug)
  const { smallBurst } = useConfetti()

  const [completed, setCompleted] = useState(false)

  const ACCENT_COLORS = ['#5A7A3E', '#D98A4E', '#F4B840', '#7AC2D4']

  const activeSteps: ActiveSteps = {
    sports: campaign.deportesActivo ?? false,
    trees: campaign.arbolesActivo ?? false,
    plaza: campaign.plazaActivo ?? false,
    budget: campaign.presupuestoActivo ?? false,
  }

  const handleFinish = useCallback(async () => {
    const payload = getPayload()
    const result = await submitResults(payload)
    if (!result.success) {
      console.warn('[participacion] submitResults falló:', result.error)
    }
    window.location.href = `/participacion/${campaign.slug}/resultados`
  }, [getPayload, campaign.slug])

  const handleSportSelect = useCallback(
    (sport: Sport) => {
      recordVote('deportes', sport.id, sport.nombre)
      smallBurst(0.5, 0.5, ACCENT_COLORS)
      setCompleted(true)
    },
    [recordVote, smallBurst, campaign.colorPrincipal],
  )

  const handleTreeSelect = useCallback(
    (selectedTrees: Tree[]) => {
      setCompleted(selectedTrees.length > 0)
      setVotes('arboles', selectedTrees.map((t) => ({ opcionId: t.id, opcionNombre: t.nombre, votos: 1 })))
    },
    [setVotes],
  )

  const handlePlazaComplete = useCallback(
    (selectedIds: string[]) => {
      const selected = plazaElements.filter((el) => selectedIds.includes(el.id))
      setVotes('plaza', selected.map((el) => ({ opcionId: el.id, opcionNombre: el.nombre, votos: 1 })))
      smallBurst(0.5, 0.5, ACCENT_COLORS)
    },
    [setVotes, smallBurst, campaign.colorPrincipal, plazaElements],
  )

  const handleBudgetAllocate = useCallback(
    (allocations: { option: BudgetOption; fichas: number }[]) => {
      setCompleted(allocations.length > 0)
      setVotes('presupuesto', allocations.map(({ option, fichas }) => ({ opcionId: option.id, opcionNombre: option.nombre, votos: fichas })))
    },
    [setVotes],
  )

  const handleRestart = useCallback(() => {
    window.location.reload()
  }, [])

  const handleNext = useCallback(() => {
    setCompleted(false)
    stepper.next()
  }, [stepper])

  const handleBack = useCallback(() => {
    setCompleted(false)
    stepper.back()
  }, [stepper])

  const activitiesCompleted = [
    activeSteps.sports,
    activeSteps.trees,
    activeSteps.plaza,
    activeSteps.budget,
  ].filter(Boolean).length

  return (
    <div className="flex h-full w-full flex-col">
      <AnimatePresence mode="wait">
        {stepper.step === 'welcome' && (
          <StepLayout key="welcome" stepKey="welcome" showProgress={false}>
            <WelcomeScreen
              onStart={stepper.next}
              barrio={campaign.barrio}
            />
          </StepLayout>
        )}

        {stepper.step === 'sports' && activeSteps.sports && (
          <StepLayout
            key="sports"
            stepKey="sports"
            showProgress={true}
            progress={stepper.progress}
            stepIndex={stepper.stepIndex}
            totalSteps={stepper.totalSteps}
            onBack={handleBack}
          >
            <SportsScreen
              sports={sports}
              colorPrincipal={campaign.colorPrincipal}
              onSelect={handleSportSelect}
            />
            {completed && (
              <ContinueButton onClick={handleNext} />
            )}
          </StepLayout>
        )}

        {stepper.step === 'trees' && activeSteps.trees && (
          <StepLayout
            key="trees"
            stepKey="trees"
            showProgress={true}
            progress={stepper.progress}
            stepIndex={stepper.stepIndex}
            totalSteps={stepper.totalSteps}
            onBack={handleBack}
          >
            <TreesScreen
              trees={trees}
              colorPrincipal={campaign.colorPrincipal}
              onSelect={handleTreeSelect}
            />
            {completed && (
              <ContinueButton onClick={handleNext} />
            )}
          </StepLayout>
        )}

        {stepper.step === 'plaza' && activeSteps.plaza && (
          <StepLayout
            key="plaza"
            stepKey="plaza"
            showProgress={true}
            progress={stepper.progress}
            stepIndex={stepper.stepIndex}
            totalSteps={stepper.totalSteps}
            onBack={handleBack}
          >
            <PlazaScreen
              elements={plazaElements}
              colorPrincipal={campaign.colorPrincipal}
              onComplete={(selectedIds) => {
                handlePlazaComplete(selectedIds)
                stepper.next()
              }}
            />
          </StepLayout>
        )}

        {stepper.step === 'budget' && activeSteps.budget && (
          <StepLayout
            key="budget"
            stepKey="budget"
            showProgress={true}
            progress={stepper.progress}
            stepIndex={stepper.stepIndex}
            totalSteps={stepper.totalSteps}
            onBack={handleBack}
          >
            <BudgetScreen
              options={budgetOptions}
              colorPrincipal={campaign.colorPrincipal}
              onAllocate={handleBudgetAllocate}
            />
            {completed && (
              <ContinueButton onClick={handleNext} />
            )}
          </StepLayout>
        )}

        {stepper.step === 'celebration' && (
          <StepLayout key="celebration" stepKey="celebration" showProgress={false}>
            <CelebrationScreen
              elapsedSeconds={stepper.elapsedSeconds}
              activitiesCompleted={activitiesCompleted}
              onFinish={handleFinish}
              onRestart={handleRestart}
            />
          </StepLayout>
        )}
      </AnimatePresence>
    </div>
  )
}
