'use client'

import { submitFaseII } from '@/actions/habilitaciones'
import type { RubrosComercio } from '@/payload-types'
import { RubroCombobox } from '@/web/components/rubro-combobox'
import {
  IconAlertTriangle,
  IconCheck,
  IconDownload,
  IconFileDescription,
  IconLoader2,
  IconUpload,
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  expedienteId: string
  isEdit?: boolean
  nroTramite?: string
  nroPermisoUso?: string
  apellidoNombre?: string
  cuitDefault?: string
  emailDefault?: string
  telefonoDefault?: string
  nombreFantasiaDefault?: string
  razonSocialDefault?: string
  rubroDefault?: string
  descripcionDefault?: string
  superficieDefault?: number
  empleadosDefault?: number
  horarioDefault?: string
  rubros: RubrosComercio[]
  adjuntosExistentes?: { url?: string | null; filename?: string | null }[]
}

function FileField({
  label,
  name,
  required = false,
}: {
  label: string
  name: string
  required?: boolean
}) {
  const [file, setFile] = useState<File | null>(null)
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-sm font-medium">
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>
      <div
        className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed p-3 transition-colors ${file ? 'border-success bg-success/5' : 'border-base-300 hover:border-primary/40'}`}
        onClick={() => ref.current?.click()}
      >
        <input
          ref={ref}
          type="file"
          name={name}
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <>
            <IconCheck size={16} className="text-success shrink-0" />
            <span className="text-success truncate text-xs">{file.name}</span>
          </>
        ) : (
          <>
            <IconUpload size={16} className="text-base-content/30 shrink-0" />
            <span className="text-base-content/40 text-xs">PDF, JPG o PNG · máx. 20 MB</span>
          </>
        )}
      </div>
    </div>
  )
}

function YesNoQ({
  q,
  value,
  onChange,
}: {
  q: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">{q}</p>
      <div className="flex gap-4">
        {[
          ['si', 'Sí'],
          ['no', 'No'],
        ].map(([val, label]) => (
          <label key={val} className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              className="radio radio-primary radio-sm"
              checked={value === val}
              onChange={() => onChange(val)}
            />
            <span className="text-sm">{label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export function ExpedienteFase2Form({
  expedienteId,
  isEdit = false,
  nroTramite,
  nroPermisoUso,
  apellidoNombre,
  cuitDefault,
  emailDefault,
  telefonoDefault,
  nombreFantasiaDefault,
  razonSocialDefault,
  rubroDefault,
  descripcionDefault,
  superficieDefault,
  empleadosDefault,
  horarioDefault,
  rubros,
  adjuntosExistentes = [],
}: Props) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [rubro, setRubro] = useState(rubroDefault ?? '')
  const [declaracion, setDeclaracion] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [manipAlimentos, setManipAlimentos] = useState('')
  const [higieneSeg, setHigieneSeg] = useState('')
  const [seguroRC, setSeguroRC] = useState('')
  const [buenaConducta, setBuenaConducta] = useState('')
  const [tituloProfesional, setTituloProfesional] = useState('')
  const [planoEvac, setPlanoEvac] = useState('')
  const [residuosPelig, setResiduosPelig] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    const newErrors: Record<string, string> = {}
    if (!fd.get('nombreFantasia')?.toString().trim()) newErrors.nombreFantasia = 'Requerido'
    if (!fd.get('razonSocial')?.toString().trim()) newErrors.razonSocial = 'Requerido'
    if (!fd.get('cuit')?.toString().trim()) newErrors.cuit = 'Requerido'
    if (!fd.get('telefono')?.toString().trim()) newErrors.telefono = 'Requerido'
    if (!rubro) newErrors.rubro = 'Seleccioná un rubro'
    if (!declaracion) newErrors.declaracion = 'Debés aceptar la declaración jurada'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error('Completá los campos obligatorios.')
      return
    }

    setIsPending(true)

    const combined = new FormData()
    combined.set('nombreFantasia', fd.get('nombreFantasia') as string)
    combined.set('razonSocial', fd.get('razonSocial') as string)
    combined.set('cuit', fd.get('cuit') as string)
    combined.set('telefono', fd.get('telefono') as string)
    combined.set('rubro', rubro)
    if (fd.get('email')) combined.set('email', fd.get('email') as string)
    if (fd.get('descripcionActividad'))
      combined.set('descripcionActividad', fd.get('descripcionActividad') as string)
    if (fd.get('superficie')) combined.set('superficie', fd.get('superficie') as string)
    if (fd.get('empleados')) combined.set('empleados', fd.get('empleados') as string)
    if (fd.get('horario')) combined.set('horario', fd.get('horario') as string)
    combined.set('manipulacionAlimentos', manipAlimentos)
    combined.set('higieneSeguridad', higieneSeg)
    combined.set('seguroRC', seguroRC)
    combined.set('buenaConducta', buenaConducta)
    combined.set('tituloProfesional', tituloProfesional)
    combined.set('planoEvacuacion', planoEvac)
    combined.set('residuosPeligrosos', residuosPelig)
    combined.set('declaracionJurada', String(declaracion))

    form.querySelectorAll<HTMLInputElement>('input[type="file"]').forEach((input) => {
      Array.from(input.files ?? []).forEach((file) => {
        if (file.size > 0) combined.append('adjuntos', file)
      })
    })

    let result: Awaited<ReturnType<typeof submitFaseII>>
    try {
      result = await submitFaseII(expedienteId, combined)
    } catch {
      toast.error('Ocurrió un error inesperado. Intentá nuevamente.')
      setIsPending(false)
      return
    }

    if (result.error) {
      toast.error(result.error)
      setIsPending(false)
      return
    }

    toast.success(
      isEdit
        ? '¡Documentación actualizada correctamente!'
        : '¡Fase II enviada! El área de Habilitaciones revisará tu documentación.',
    )
    router.push('/habilitaciones')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isEdit && (
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span className="text-sm">
            Estás editando tu documentación. Los archivos ya cargados se mantienen — solo adjuntá
            nuevos si querés reemplazarlos.
          </span>
        </div>
      )}
      {/* Alerta */}
      <div className="alert alert-warning">
        <IconAlertTriangle size={20} className="shrink-0" />
        <p className="text-sm">
          <strong>
            Esta instancia sólo puede completarse cuando el Permiso de Uso haya sido aprobado por el
            Área de Obras Privadas.
          </strong>
        </p>
      </div>

      {/* Información del Trámite */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-4 text-base">Información del Trámite</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Número de trámite</span>
              </label>
              <input
                type="text"
                readOnly
                value={nroTramite ?? expedienteId.slice(0, 8).toUpperCase()}
                className="input input-bordered bg-base-200 w-full cursor-default"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Número de Permiso de Uso</span>
              </label>
              <input
                type="text"
                readOnly
                value={nroPermisoUso ?? '—'}
                className="input input-bordered bg-base-200 w-full cursor-default"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Apellido y Nombre / Razón Social <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                name="razonSocial"
                defaultValue={razonSocialDefault ?? apellidoNombre ?? ''}
                placeholder="Ej: Pérez Juan o Comercio SRL"
                className={`input input-bordered w-full ${errors.razonSocial ? 'input-error' : ''}`}
              />
              {errors.razonSocial && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.razonSocial}</span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  CUIT <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                name="cuit"
                defaultValue={cuitDefault ?? ''}
                placeholder="Ej: 20-12345678-9"
                className={`input input-bordered w-full ${errors.cuit ? 'input-error' : ''}`}
              />
              {errors.cuit && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.cuit}</span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Correo electrónico</span>
              </label>
              <input
                type="email"
                name="email"
                defaultValue={emailDefault ?? ''}
                placeholder="correo@ejemplo.com"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Teléfono <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="tel"
                name="telefono"
                defaultValue={telefonoDefault ?? ''}
                placeholder="Ej: 3434123456"
                className={`input input-bordered w-full ${errors.telefono ? 'input-error' : ''}`}
              />
              {errors.telefono && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.telefono}</span>
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Datos de la Actividad */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-4 text-base">Datos de la Actividad</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="form-control sm:col-span-2">
              <label className="label">
                <span className="label-text font-medium">
                  Nombre de Fantasía <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                name="nombreFantasia"
                defaultValue={nombreFantasiaDefault ?? ''}
                placeholder="Ej: La Esquina de Juan"
                className={`input input-bordered w-full ${errors.nombreFantasia ? 'input-error' : ''}`}
              />
              {errors.nombreFantasia && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.nombreFantasia}</span>
                </label>
              )}
            </div>
            <div className="form-control sm:col-span-2">
              <label className="label">
                <span className="label-text font-medium">
                  Rubro Principal <span className="text-error">*</span>
                </span>
              </label>
              <RubroCombobox
                rubros={rubros}
                value={rubro}
                onChange={setRubro}
                error={!!errors.rubro}
              />
              {errors.rubro && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.rubro}</span>
                </label>
              )}
            </div>
            <div className="form-control sm:col-span-2">
              <label className="label">
                <span className="label-text font-medium">Descripción de la actividad</span>
              </label>
              <textarea
                name="descripcionActividad"
                rows={3}
                defaultValue={descripcionDefault ?? ''}
                placeholder="Describí brevemente qué vas a comercializar o qué servicio vas a brindar..."
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Superficie afectada (m²)</span>
              </label>
              <input
                type="number"
                name="superficie"
                min="1"
                defaultValue={superficieDefault ?? ''}
                placeholder="Ej: 80"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Cantidad de empleados</span>
              </label>
              <input
                type="number"
                name="empleados"
                min="0"
                defaultValue={empleadosDefault ?? ''}
                placeholder="Ej: 3"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control sm:col-span-2">
              <label className="label">
                <span className="label-text font-medium">Horario de funcionamiento</span>
              </label>
              <input
                type="text"
                name="horario"
                defaultValue={horarioDefault ?? ''}
                placeholder="Ej: Lunes a Viernes de 9:00 a 18:00 hs"
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Documentación General */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-1 text-base">Documentación General</h3>
          <p className="text-base-content/60 mb-4 text-sm">
            Formatos permitidos: PDF, JPG, PNG · Tamaño máximo: 20 MB por archivo.
          </p>
          <a
            href="https://sanbenito.gob.ar/api/archivos/file/Formulario%201%20INICIO.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm mb-5 w-full gap-2 sm:w-auto"
          >
            <IconDownload size={16} />
            Descargar Formulario Inicial de Habilitación
          </a>
          {adjuntosExistentes.length > 0 && (
            <div className="border-primary/20 bg-primary/5 mb-5 rounded-lg border p-4">
              <p className="text-primary mb-2 flex items-center gap-2 text-sm font-medium">
                <IconCheck size={16} className="shrink-0" />
                Documentación ya cargada
              </p>
              <p className="text-base-content/60 mb-3 text-xs">
                Estos archivos se conservan. Solo adjuntá nuevos abajo si querés sumar o reemplazar
                documentación.
              </p>
              <ul className="space-y-1.5">
                {adjuntosExistentes.map((adj, i) =>
                  adj.url ? (
                    <li key={i}>
                      <a
                        href={adj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary inline-flex items-center gap-1.5 text-xs hover:underline"
                      >
                        <IconFileDescription size={14} className="shrink-0" />
                        <span className="max-w-[260px] truncate">
                          {adj.filename ?? `Archivo ${i + 1}`}
                        </span>
                      </a>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FileField label="Formulario Inicial de Habilitación" name="doc_formulario" required />
            <FileField label="Libre Deuda Municipal" name="doc_libre_deuda" required />
            <FileField
              label="Comprobante de Sellado de Carpeta Técnica"
              name="doc_sellado"
              required
            />
            <FileField label="DNI" name="doc_dni" required />
            <FileField label="Constancia de inscripción ARCA" name="doc_arca" required />
            <FileField
              label="Boleta de Tasa Inmobiliaria Provincial"
              name="doc_tasa_prov"
              required
            />
            <FileField label="Boleta de Tasa Inmobiliaria Municipal" name="doc_tasa_mun" required />
          </div>
        </div>
      </div>

      {/* Requisitos Específicos */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body space-y-6">
          <h3 className="card-title text-primary text-base">
            Requisitos Específicos según el Rubro
          </h3>

          <div className="border-base-200 border-t pt-5">
            <YesNoQ
              q="¿La actividad implica elaboración o manipulación de alimentos?"
              value={manipAlimentos}
              onChange={setManipAlimentos}
            />
            {manipAlimentos === 'si' && (
              <div className="border-warning mt-3 space-y-3 border-l-2 pl-4">
                <a
                  href="https://sanbenito.gob.ar/api/archivos/file/Instrucciones%20para%20Informe%20T%C3%A9cnico%20Bromatologico.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-xs gap-1"
                >
                  <IconDownload size={13} />
                  Instrucciones Informe Bromatológico
                </a>
                <FileField label="Carnet de Manipulador de Alimentos" name="doc_carnet_alimentos" />
                <FileField label="Informe Técnico Bromatológico" name="doc_informe_bromatologico" />
              </div>
            )}
          </div>

          <div className="border-base-200 border-t pt-5">
            <YesNoQ
              q="¿El establecimiento posee más de 100 m² o cuenta con permanencia de personas?"
              value={higieneSeg}
              onChange={setHigieneSeg}
            />
            {higieneSeg === 'si' && (
              <div className="border-warning mt-3 space-y-3 border-l-2 pl-4">
                <a
                  href="https://sanbenito.gob.ar/api/archivos/file/Instrucciones%20de%20informe%20T%C3%A9cnico%20de%20Higiene%20y%20Seguridad.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-xs gap-1"
                >
                  <IconDownload size={13} />
                  Instrucciones Informe Higiene y Seguridad
                </a>
                <FileField
                  label="Informe Técnico de Higiene y Seguridad"
                  name="doc_informe_hygiene"
                />
              </div>
            )}
          </div>

          <div className="border-base-200 border-t pt-5">
            <YesNoQ
              q="¿La actividad requiere Seguro de Responsabilidad Civil?"
              value={seguroRC}
              onChange={setSeguroRC}
            />
            {seguroRC === 'si' && (
              <div className="border-warning mt-3 border-l-2 pl-4">
                <FileField
                  label="Póliza de Seguro de Responsabilidad Civil vigente"
                  name="doc_seguro_rc"
                />
              </div>
            )}
          </div>

          <div className="border-base-200 border-t pt-5">
            <YesNoQ
              q="¿La actividad involucra atención de menores, hotelería, eventos o actividades especiales?"
              value={buenaConducta}
              onChange={setBuenaConducta}
            />
            {buenaConducta === 'si' && (
              <div className="border-warning mt-3 border-l-2 pl-4">
                <FileField label="Certificado de Buena Conducta" name="doc_buena_conducta" />
              </div>
            )}
          </div>

          <div className="border-base-200 border-t pt-5">
            <YesNoQ
              q="¿La actividad requiere título profesional habilitante?"
              value={tituloProfesional}
              onChange={setTituloProfesional}
            />
            {tituloProfesional === 'si' && (
              <div className="border-warning mt-3 border-l-2 pl-4">
                <FileField label="Título profesional certificado" name="doc_titulo_profesional" />
              </div>
            )}
          </div>

          <div className="border-base-200 border-t pt-5">
            <YesNoQ
              q="¿El establecimiento posee más de 50 m²?"
              value={planoEvac}
              onChange={setPlanoEvac}
            />
            {planoEvac === 'si' && (
              <div className="border-warning mt-3 border-l-2 pl-4">
                <FileField label="Plano de Evacuación" name="doc_plano_evacuacion" />
              </div>
            )}
          </div>

          <div className="border-base-200 border-t pt-5">
            <YesNoQ
              q="¿La actividad genera residuos peligrosos?"
              value={residuosPelig}
              onChange={setResiduosPelig}
            />
            {residuosPelig === 'si' && (
              <div className="border-warning mt-3 border-l-2 pl-4">
                <FileField label="Certificación Ambiental Provincial" name="doc_cert_ambiental" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Declaración Jurada */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-primary mb-3 text-base">Declaración Jurada</h3>
          <label
            className={`flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors ${declaracion ? 'bg-success/10' : 'bg-base-200'} ${errors.declaracion ? 'ring-error ring-2' : ''}`}
          >
            <input
              type="checkbox"
              className="checkbox checkbox-primary mt-0.5 shrink-0"
              checked={declaracion}
              onChange={(e) => setDeclaracion(e.target.checked)}
            />
            <span className="text-sm leading-relaxed">
              Declaro que toda la documentación presentada es auténtica y corresponde a la actividad
              declarada. Asimismo, tomo conocimiento de que la aprobación de esta documentación no
              implica la habilitación automática, quedando sujeta a inspección y verificación por
              parte del Área de Habilitaciones Comerciales.
            </span>
          </label>
          {errors.declaracion && <p className="text-error mt-1 text-xs">{errors.declaracion}</p>}
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <a href="/habilitaciones" className="btn btn-ghost">
          Cancelar
        </a>
        <button type="submit" className="btn btn-primary gap-2" disabled={isPending}>
          {isPending ? (
            <>
              <IconLoader2 size={18} className="animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <IconFileDescription size={18} />
              Enviar Documentación — Fase II
            </>
          )}
        </button>
      </div>
    </form>
  )
}
