'use client'

import type { Curriculum } from '@/payload-types'
import { useState } from 'react'
import { CurriculumEditForm } from './curriculum-edit-form'
import { CurriculumTable } from './curriculum-table'

interface CurriculumManagerProps {
  initialCurriculums: Curriculum[]
  ciudadano: any // Tipo Ciudadano del payload
}

export function CurriculumManager({ initialCurriculums, ciudadano }: CurriculumManagerProps) {
  const [curriculums, setCurriculums] = useState<Curriculum[]>(initialCurriculums)
  const [editingCurriculum, setEditingCurriculum] = useState<Curriculum | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleEditCurriculum = (curriculum: Curriculum) => {
    setEditingCurriculum(curriculum)
    setShowForm(true)
  }

  const handleCreateNew = () => {
    setEditingCurriculum(null)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingCurriculum(null)
  }

  const handleSaveSuccess = (curriculum: Curriculum) => {
    // Actualizar la lista de currículums
    if (editingCurriculum) {
      // Editando curriculum existente
      setCurriculums(curriculums.map((c) => (c.id === curriculum.id ? curriculum : c)))
    } else {
      // Nuevo curriculum
      setCurriculums([...curriculums, curriculum])
    }
    handleCloseForm()
  }

  return (
    <div className="space-y-6">
      {/* Botón para crear nuevo curriculum */}
      <div className="flex items-center justify-between">
        <h1 className="text-primary text-3xl font-bold">Gestión de Currículums</h1>
        <button onClick={handleCreateNew} className="btn btn-primary">
          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Curriculum
        </button>
      </div>

      {/* Tabla de currículums o formulario */}
      {showForm ? (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="card-title text-primary">
                {editingCurriculum ? 'Editar Curriculum' : 'Nuevo Curriculum'}
              </h2>
              <button onClick={handleCloseForm} className="btn btn-ghost btn-sm">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <CurriculumEditForm ciudadano={ciudadano} existingCurriculums={curriculums} />
          </div>
        </div>
      ) : (
        <>
          {curriculums.length > 0 ? (
            <CurriculumTable curriculums={curriculums} onEditCurriculum={handleEditCurriculum} />
          ) : (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <h2 className="card-title text-primary justify-center">No tienes currículums</h2>
                <p className="text-base-content/70 mb-4">
                  Comienza creando tu primer curriculum profesional
                </p>
                <button onClick={handleCreateNew} className="btn btn-primary">
                  Crear mi primer curriculum
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
