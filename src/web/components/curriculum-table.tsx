'use client'

import type { Curriculum } from '@/payload-types'
import Link from 'next/link'

interface CurriculumTableProps {
  curriculums: Curriculum[]
  onEditCurriculum: (curriculum: Curriculum) => void
}

export function CurriculumTable({ curriculums, onEditCurriculum }: CurriculumTableProps) {
  return (
    <div className="card bg-base-100 mb-8 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-primary">Mis Currículums</h2>
        <div className="overflow-x-auto">
          <table className="table-zebra table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Última Actualización</th>
                <th>Categorías</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {curriculums.map((curriculum) => (
                <tr key={curriculum.id}>
                  <td>
                    <div className="font-bold">{curriculum.titulo || 'Sin título'}</div>
                  </td>
                  <td>{new Date(curriculum.updatedAt).toLocaleDateString('es-AR')}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {curriculum.categorias?.slice(0, 2).map((categoria, index) => (
                        <div
                          key={categoria.id || index}
                          className="badge badge-secondary badge-outline badge-xs"
                        >
                          {categoria.nombre}
                        </div>
                      ))}
                      {curriculum.categorias && curriculum.categorias.length > 2 && (
                        <div className="badge badge-ghost badge-xs">
                          +{curriculum.categorias.length - 2}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() => onEditCurriculum(curriculum)}
                      >
                        Editar
                      </button>
                      <Link
                        href={`/perfil/curriculum/${curriculum.id}`}
                        className="btn btn-ghost btn-xs"
                      >
                        Ver
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
