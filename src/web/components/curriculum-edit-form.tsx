'use client'
import type { Ciudadano, Curriculum } from '@/payload-types'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface CurriculumEditFormProps {
  ciudadano: Ciudadano
  curriculum: Curriculum | null
}

interface EstudioForm {
  id?: string
  institucion: string
  fecha_inicio: string
  fecha_finalizacion: string
  nivel: 'PRIMARIO' | 'SECUNDARIO' | 'TERCIARIO' | 'GRADO' | 'POSTGRADO' | 'CURSO/TALLER' | ''
  descripcion: string
}

interface ExperienciaForm {
  id?: string
  institucion: string
  fecha_inicio: string
  fecha_finalizacion: string
  puesto: string
  descripcion: string
}

interface ReferenciaForm {
  id?: string
  nombre: string
  telefono: string
  email: string
  descripcion: string
}

interface CategoriaForm {
  id?: string
  nombre: string
}

// Función para convertir fecha ISO a formato YYYY-MM-DD para inputs tipo date
const formatDateForInput = (dateString: string | undefined | null): string => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  } catch {
    return ''
  }
}

export function CurriculumEditForm({ ciudadano, curriculum }: CurriculumEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const [editingId, setEditingId] = useState<string | null>(null)

  // Estados del formulario
  const [titulo, setTitulo] = useState(curriculum?.titulo || '')
  const [estudios, setEstudios] = useState<EstudioForm[]>(
    curriculum?.estudios?.map((e) => ({
      id: e.id || undefined,
      institucion: e.institucion || '',
      fecha_inicio: formatDateForInput(e.fecha_inicio),
      fecha_finalizacion: formatDateForInput(e.fecha_finalizacion),
      nivel: (e.nivel as any) || '',
      descripcion: e.descripcion || '',
    })) || [
      { institucion: '', fecha_inicio: '', fecha_finalizacion: '', nivel: '', descripcion: '' },
    ],
  )

  const [experiencias, setExperiencias] = useState<ExperienciaForm[]>(
    curriculum?.experiencias?.map((e) => ({
      id: e.id || undefined,
      institucion: e.institucion || '',
      fecha_inicio: formatDateForInput(e.fecha_inicio),
      fecha_finalizacion: formatDateForInput(e.fecha_finalizacion),
      puesto: e.puesto || '',
      descripcion: e.descripcion || '',
    })) || [
      { institucion: '', fecha_inicio: '', fecha_finalizacion: '', puesto: '', descripcion: '' },
    ],
  )
  const [referencias, setReferencias] = useState<ReferenciaForm[]>(
    curriculum?.referencias?.map((r) => ({
      id: r.id || undefined,
      nombre: r.nombre || '',
      telefono: r.telefono || '',
      email: r.email || '',
      descripcion: r.descripcion || '',
    })) || [{ nombre: '', telefono: '', email: '', descripcion: '' }],
  )
  const [categorias, setCategorias] = useState<CategoriaForm[]>(
    curriculum?.categorias?.map((c) => ({
      id: c.id || undefined,
      nombre: c.nombre || '',
    })) || [{ nombre: '' }],
  )

  // Funciones para agregar/remover elementos
  const addEstudio = () => {
    setEstudios([
      ...estudios,
      { institucion: '', fecha_inicio: '', fecha_finalizacion: '', nivel: '', descripcion: '' },
    ])
  }

  const removeEstudio = (index: number) => {
    setEstudios(estudios.filter((_, i) => i !== index))
  }

  const addExperiencia = () => {
    setExperiencias([
      ...experiencias,
      { institucion: '', fecha_inicio: '', fecha_finalizacion: '', puesto: '', descripcion: '' },
    ])
  }

  const removeExperiencia = (index: number) => {
    setExperiencias(experiencias.filter((_, i) => i !== index))
  }

  const addReferencia = () => {
    setReferencias([...referencias, { nombre: '', telefono: '', email: '', descripcion: '' }])
  }

  const removeReferencia = (index: number) => {
    setReferencias(referencias.filter((_, i) => i !== index))
  }

  const addCategoria = () => {
    setCategorias([...categorias, { nombre: '' }])
  }

  const removeCategoria = (index: number) => {
    setCategorias(categorias.filter((_, i) => i !== index))
  }

  // Limpiar formulario
  const clearForm = () => {
    // setEditingId(null)
    setTitulo('')
    setEstudios([
      { institucion: '', fecha_inicio: '', fecha_finalizacion: '', nivel: '', descripcion: '' },
    ])
    setExperiencias([
      { institucion: '', fecha_inicio: '', fecha_finalizacion: '', puesto: '', descripcion: '' },
    ])
    setReferencias([{ nombre: '', telefono: '', email: '', descripcion: '' }])
    setCategorias([{ nombre: '' }])
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const data = {
        titulo,
        ciudadano: ciudadano.id,
        estudios: estudios.filter((e) => e.institucion.trim() !== ''),
        experiencias: experiencias.filter((e) => e.institucion.trim() !== ''),
        referencias: referencias.filter((r) => r.nombre.trim() !== ''),
        categorias: categorias.filter((c) => c.nombre.trim() !== ''),
      }

      const url = curriculum ? `/api/curriculums/${curriculum.id}` : '/api/curriculums'

      const method = curriculum ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success(
          curriculum ? 'Currículum actualizado exitosamente' : 'Currículum creado exitosamente',
        )
        // Recargar la página para mostrar los cambios
        window.location.reload()
      } else {
        throw new Error('Error al guardar el currículum')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al guardar el currículum. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id="curriculum-edit-form">
      <form id="curriculum-form" onSubmit={handleSubmit} className="space-y-8">
        {/* Header del formulario */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">
            {curriculum ? 'Editando Currículum' : 'Nuevo Currículum'}
          </h3>
          {curriculum && (
            <button type="button" onClick={clearForm} className="btn btn-ghost btn-sm">
              Crear Nuevo
            </button>
          )}
        </div>

        {/* Título del currículum */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Título del Currículum</span>
          </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Currículum para Desarrollo de Software"
            className="input input-bordered"
            required
          />
        </div>

        {/* Categorías */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Áreas de Interés</span>
          </label>
          {categorias.map((categoria, index) => (
            <div key={index} className="mb-2 flex gap-2">
              <input
                type="text"
                value={categoria.nombre}
                onChange={(e) => {
                  const newCategorias = [...categorias]
                  newCategorias[index].nombre = e.target.value
                  setCategorias(newCategorias)
                }}
                placeholder="Ej: Desarrollo Web, Administración"
                className="input input-bordered flex-1"
              />
              {categorias.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCategoria(index)}
                  className="btn btn-ghost btn-sm"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addCategoria} className="btn btn-outline btn-sm mt-2">
            + Agregar Categoría
          </button>
        </div>

        {/* Estudios */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Formación Académica</span>
          </label>
          {estudios.map((estudio, index) => (
            <div key={index} className="card bg-base-200 mb-4 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-medium">Estudio #{index + 1}</h4>
                {estudios.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEstudio(index)}
                    className="btn btn-ghost btn-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Institución</span>
                  </label>
                  <input
                    type="text"
                    value={estudio.institucion}
                    onChange={(e) => {
                      const newEstudios = [...estudios]
                      newEstudios[index].institucion = e.target.value
                      setEstudios(newEstudios)
                    }}
                    placeholder="Nombre de la institución"
                    className="input input-bordered input-sm"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nivel</span>
                  </label>
                  <select
                    value={estudio.nivel}
                    onChange={(e) => {
                      const newEstudios = [...estudios]
                      newEstudios[index].nivel = e.target.value as any
                      setEstudios(newEstudios)
                    }}
                    className="select select-bordered select-sm"
                  >
                    <option value="">Seleccionar nivel</option>
                    <option value="PRIMARIO">Primario</option>
                    <option value="SECUNDARIO">Secundario</option>
                    <option value="TERCIARIO">Terciario</option>
                    <option value="GRADO">Grado</option>
                    <option value="POSTGRADO">Postgrado</option>
                    <option value="CURSO/TALLER">Curso/Taller</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Fecha Inicio</span>
                  </label>
                  <input
                    type="date"
                    value={estudio.fecha_inicio}
                    onChange={(e) => {
                      const newEstudios = [...estudios]
                      newEstudios[index].fecha_inicio = e.target.value
                      setEstudios(newEstudios)
                    }}
                    className="input input-bordered input-sm"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Fecha Finalización</span>
                  </label>
                  <input
                    type="date"
                    value={estudio.fecha_finalizacion}
                    onChange={(e) => {
                      const newEstudios = [...estudios]
                      newEstudios[index].fecha_finalizacion = e.target.value
                      setEstudios(newEstudios)
                    }}
                    className="input input-bordered input-sm"
                  />
                </div>
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Descripción</span>
                </label>
                <textarea
                  value={estudio.descripcion}
                  onChange={(e) => {
                    const newEstudios = [...estudios]
                    newEstudios[index].descripcion = e.target.value
                    setEstudios(newEstudios)
                  }}
                  placeholder="Descripción adicional (opcional)"
                  className="textarea textarea-bordered textarea-sm"
                  rows={2}
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addEstudio} className="btn btn-outline btn-sm">
            + Agregar Estudio
          </button>
        </div>

        {/* Experiencias */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Experiencia Laboral</span>
          </label>
          {experiencias.map((experiencia, index) => (
            <div key={index} className="card bg-base-200 mb-4 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-medium">Experiencia #{index + 1}</h4>
                {experiencias.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperiencia(index)}
                    className="btn btn-ghost btn-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Empresa/Institución</span>
                  </label>
                  <input
                    type="text"
                    value={experiencia.institucion}
                    onChange={(e) => {
                      const newExperiencias = [...experiencias]
                      newExperiencias[index].institucion = e.target.value
                      setExperiencias(newExperiencias)
                    }}
                    placeholder="Nombre de la empresa"
                    className="input input-bordered input-sm"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Puesto</span>
                  </label>
                  <input
                    type="text"
                    value={experiencia.puesto}
                    onChange={(e) => {
                      const newExperiencias = [...experiencias]
                      newExperiencias[index].puesto = e.target.value
                      setExperiencias(newExperiencias)
                    }}
                    placeholder="Título del puesto"
                    className="input input-bordered input-sm"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Fecha Inicio</span>
                  </label>
                  <input
                    type="date"
                    value={experiencia.fecha_inicio}
                    onChange={(e) => {
                      const newExperiencias = [...experiencias]
                      newExperiencias[index].fecha_inicio = e.target.value
                      setExperiencias(newExperiencias)
                    }}
                    className="input input-bordered input-sm"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Fecha Finalización</span>
                  </label>
                  <input
                    type="date"
                    value={experiencia.fecha_finalizacion}
                    onChange={(e) => {
                      const newExperiencias = [...experiencias]
                      newExperiencias[index].fecha_finalizacion = e.target.value
                      setExperiencias(newExperiencias)
                    }}
                    className="input input-bordered input-sm"
                  />
                </div>
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Descripción</span>
                </label>
                <textarea
                  value={experiencia.descripcion}
                  onChange={(e) => {
                    const newExperiencias = [...experiencias]
                    newExperiencias[index].descripcion = e.target.value
                    setExperiencias(newExperiencias)
                  }}
                  placeholder="Responsabilidades y logros (opcional)"
                  className="textarea textarea-bordered textarea-sm"
                  rows={2}
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addExperiencia} className="btn btn-outline btn-sm">
            + Agregar Experiencia
          </button>
        </div>

        {/* Referencias */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Referencias</span>
          </label>
          {referencias.map((referencia, index) => (
            <div key={index} className="card bg-base-200 mb-4 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-medium">Referencia #{index + 1}</h4>
                {referencias.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeReferencia(index)}
                    className="btn btn-ghost btn-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nombre</span>
                  </label>
                  <input
                    type="text"
                    value={referencia.nombre}
                    onChange={(e) => {
                      const newReferencias = [...referencias]
                      newReferencias[index].nombre = e.target.value
                      setReferencias(newReferencias)
                    }}
                    placeholder="Nombre completo"
                    className="input input-bordered input-sm"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Teléfono</span>
                  </label>
                  <input
                    type="tel"
                    value={referencia.telefono}
                    onChange={(e) => {
                      const newReferencias = [...referencias]
                      newReferencias[index].telefono = e.target.value
                      setReferencias(newReferencias)
                    }}
                    placeholder="Número de teléfono"
                    className="input input-bordered input-sm"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    value={referencia.email}
                    onChange={(e) => {
                      const newReferencias = [...referencias]
                      newReferencias[index].email = e.target.value
                      setReferencias(newReferencias)
                    }}
                    placeholder="Correo electrónico"
                    className="input input-bordered input-sm"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Relación</span>
                  </label>
                  <input
                    type="text"
                    value={referencia.descripcion}
                    onChange={(e) => {
                      const newReferencias = [...referencias]
                      newReferencias[index].descripcion = e.target.value
                      setReferencias(newReferencias)
                    }}
                    placeholder="Ej: Ex-supervisor, Colega"
                    className="input input-bordered input-sm"
                  />
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={addReferencia} className="btn btn-outline btn-sm">
            + Agregar Referencia
          </button>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 pt-6">
          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Guardando...
              </>
            ) : curriculum ? (
              'Actualizar Currículum'
            ) : (
              'Crear Currículum'
            )}
          </button>

          {curriculum && (
            <button type="button" onClick={clearForm} className="btn btn-ghost">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
