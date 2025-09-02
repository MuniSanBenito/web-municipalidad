'use client'

import type { Ciudadano, Curriculum } from '@/payload-types'
import { CurriculumEditForm } from './curriculum-edit-form'

interface CurriculumManagerProps {
  curriculum: Curriculum | null
  ciudadano: Ciudadano
}

export function CurriculumManager({ curriculum, ciudadano }: CurriculumManagerProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-primary mb-2 text-3xl font-bold">
          {curriculum ? 'Editar Curriculum' : 'Crear Curriculum'}
        </h1>
        <p className="text-base-content/70">
          {curriculum
            ? 'Actualiza la información de tu curriculum profesional'
            : 'Completa tu información profesional para crear tu curriculum'}
        </p>
      </div>

      {/* Formulario único para crear/editar */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <CurriculumEditForm ciudadano={ciudadano} curriculum={curriculum} />
        </div>
      </div>
    </div>
  )
}
