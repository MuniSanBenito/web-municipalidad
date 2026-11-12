'use client'

import type { ActiveSteps, StepId } from '@/participacion/types'
import confetti from 'canvas-confetti'
import { useCallback, useMemo, useState } from 'react'

const ACTIVITY_STEPS: (keyof ActiveSteps & StepId)[] = ['sports', 'trees', 'plaza', 'budget', 'roulette']

export function useStepper(activeSteps: ActiveSteps) {
  const stepsKey = ACTIVITY_STEPS.filter((s) => activeSteps[s]).join(',')
  const steps = useMemo<StepId[]>(
    () => ['welcome', ...(stepsKey ? (stepsKey.split(',') as StepId[]) : []), 'celebration'],
    [stepsKey],
  )
  const [currentStep, setCurrentStep] = useState(0)
  const [startTime] = useState(() => Date.now())
  const [endTime, setEndTime] = useState<number | null>(null)

  const step = steps[currentStep]
  const totalSteps = steps.length
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const progress = useMemo(() => {
    if (currentStep === 0) return 0
    return Math.round((currentStep / (totalSteps - 1)) * 100)
  }, [currentStep, totalSteps])

  const next = useCallback(() => {
    setCurrentStep((prev) => (prev >= steps.length - 1 ? prev : prev + 1))
  }, [steps])

  const back = useCallback(() => {
    setCurrentStep((prev) => (prev <= 0 ? prev : prev - 1))
  }, [])

  const goTo = useCallback((stepId: StepId) => {
    const idx = steps.indexOf(stepId)
    if (idx >= 0) setCurrentStep(idx)
  }, [steps])

  const finish = useCallback(() => setEndTime(Date.now()), [])

  const elapsedSeconds = useMemo(() => {
    const end = endTime ?? Date.now()
    return Math.round((end - startTime) / 1000)
  }, [startTime, endTime])

  return { step, stepIndex: currentStep, totalSteps, progress, isFirstStep, isLastStep, next, back, goTo, finish, elapsedSeconds }
}

export function useConfetti() {
  const burst = useCallback((colors?: string[]) => {
    const defaults = { spread: 360, ticks: 80, gravity: 0.8, decay: 0.94, startVelocity: 35, colors: colors ?? ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'] }
    confetti({ ...defaults, particleCount: 60, scalar: 1.2, shapes: ['circle', 'square'] })
    confetti({ ...defaults, particleCount: 40, scalar: 0.9, shapes: ['star'] })
  }, [])

  const celebration = useCallback((colors?: string[]) => {
    const colorsArr = colors ?? ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']
    const duration = 2500
    const animationEnd = Date.now() + duration
    const frame = () => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return
      confetti({ startVelocity: 30, spread: 360, ticks: 60, origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() - 0.2 }, colors: colorsArr, particleCount: 50 * (timeLeft / duration), scalar: 1.1 })
      requestAnimationFrame(frame)
    }
    frame()
  }, [])

  const smallBurst = useCallback((x = 0.5, y = 0.5, colors?: string[]) => {
    confetti({ particleCount: 20, spread: 70, origin: { x, y }, colors: colors ?? ['#10b981', '#3b82f6'], scalar: 0.8 })
  }, [])

  return { burst, celebration, smallBurst }
}

