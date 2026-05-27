'use client'

import type { Ciudadano, Curriculum } from '@/payload-types'
import {
  IconCalendar,
  IconCheck,
  IconDeviceFloppy,
  IconHome,
  IconId,
  IconMail,
  IconMapPin,
  IconPhone,
  IconUser,
  IconX,
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

interface EditarPerfilFormProps {
  ciudadano: Ciudadano
  cv: Curriculum | null
}

// Componente InputField separado para evitar re-creación
interface InputFieldProps {
  name: string
  label: string
  type?: string
  icon?: React.ReactNode
  placeholder?: string
  required?: boolean
  className?: string
  value: string
  onChange: (name: string, value: string) => void
  hasError?: string
  disabled?: boolean
}

function InputField({
  name,
  label,
  type = 'text',
  icon,
  placeholder,
  required = false,
  className = '',
  value,
  onChange,
  hasError,
  disabled,
  ...props
}: InputFieldProps) {
  return (
    <div className={`form-control ${className}`}>
      <label className="label">
        <span className="label-text text-base-content/80 flex items-center gap-2 font-semibold">
          {icon}
          {label}
          {required && <span className="text-error">*</span>}
        </span>
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={(e) => onChange(name, e.target.value)}
          className={`input input-bordered w-full ${
            hasError
              ? 'input-error border-error focus:border-error'
              : 'focus:border-primary hover:border-primary/50'
          } placeholder:text-base-content/40`}
          {...props}
        />
      </div>
      {hasError && (
        <label className="label">
          <span className="label-text-alt text-error flex items-center gap-1">
            <IconX size={14} />
            {hasError}
          </span>
        </label>
      )}
    </div>
  )
}

export function EditarPerfilForm({ ciudadano, cv }: EditarPerfilFormProps) {
  const router = useRouter()

  // Función para formatear fechas
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      return date.toISOString().split('T')[0]
    } catch {
      return ''
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Estado controlado para el formulario
  const [formData, setFormData] = useState({
    nombre: ciudadano.nombre || '',
    apellido: ciudadano.apellido || '',
    dni: ciudadano.dni || '',
    domicilio: ciudadano.domicilio || '',
    fecha_nacimiento: ciudadano.fecha_nacimiento ? formatDate(ciudadano.fecha_nacimiento) : '',
    ciudad: ciudadano.ciudad || '',
    telefono: ciudadano.telefono || '',
    email: ciudadano.email || '',
  })

  // Función para manejar cambios en los inputs
  const handleInputChange = useCallback(
    (name: string, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
      // Limpiar error cuando el usuario empiece a escribir
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: '',
        }))
      }
    },
    [errors],
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    // Usar el estado del formulario en lugar de FormData
    const data = {
      nombre: formData.nombre.trim(),
      apellido: formData.apellido.trim(),
      dni: formData.dni.trim(),
      domicilio: formData.domicilio.trim(),
      fecha_nacimiento: formData.fecha_nacimiento,
      ciudad: formData.ciudad.trim(),
      telefono: formData.telefono.trim(),
      email: formData.email.trim(),
    }

    // Validaciones básicas
    const newErrors: Record<string, string> = {}

    if (!data.nombre) newErrors.nombre = 'El nombre es requerido'
    if (!data.apellido) newErrors.apellido = 'El apellido es requerido'
    if (!data.dni) newErrors.dni = 'El DNI es requerido'
    if (!data.email) newErrors.email = 'El email es requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Formato de email inválido'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(`/api/ciudadanos/${ciudadano.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      if (response.ok) {
        await fetch(`/api/curriculums/${cv?.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            titulo: `${data.nombre} ${data.apellido}`,
            ciudadano: ciudadano.id,
          }),
        })

        toast.success('Perfil actualizado exitosamente')
        router.push('/perfil')
      } else {
        const errorData = await response.json()
        console.error('Error al actualizar:', errorData)

        if (errorData?.errors && Array.isArray(errorData.errors)) {
          const fieldErrors: Record<string, string> = {}
          errorData.errors.forEach((error: any) => {
            if (error.field) {
              fieldErrors[error.field] = error.message
            }
          })
          if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors)
          } else {
            toast.error('Error al actualizar el perfil')
          }
        } else {
          toast.error('Error al actualizar el perfil')
        }
      }
    } catch (error) {
      console.error('Error de red:', error)
      toast.error('Error de conexión. Intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header con gradiente y animación */}
        <div className="from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden rounded-2xl bg-linear-to-br p-8 shadow-xl">
          <div className="from-primary/5 absolute inset-0 animate-pulse bg-linear-to-r to-transparent" />
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-4">
              <div className="bg-primary/20 rounded-full p-3 backdrop-blur-sm">
                <IconUser size={32} className="text-primary" />
              </div>
              <div>
                <h1 className="text-primary text-3xl font-bold">Editar Perfil</h1>
                <p className="text-base-content/70 text-lg">
                  Mantén actualizada tu información personal
                </p>
              </div>
            </div>

            {/* Indicador de progreso */}
            <div className="text-base-content/60 flex items-center gap-2 text-sm">
              <div className="flex gap-1">
                <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
                <div className="bg-primary/60 h-2 w-2 animate-pulse rounded-full delay-150" />
                <div className="bg-primary/30 h-2 w-2 animate-pulse rounded-full delay-300" />
              </div>
              <span>Completar información</span>
            </div>
          </div>
        </div>

        {/* Sección de Información Personal */}
        <div className="card from-base-100 to-base-200/50 border-base-300/50 border bg-linear-to-br shadow-2xl backdrop-blur-sm">
          <div className="card-body p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-primary/10 rounded-lg p-2">
                <IconUser size={24} className="text-primary" />
              </div>
              <h2 className="text-primary text-2xl font-bold">Información Personal</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField
                name="nombre"
                label="Nombre"
                icon={<IconUser size={18} />}
                placeholder="Tu nombre"
                required
                value={formData.nombre}
                onChange={handleInputChange}
                hasError={errors.nombre}
                disabled={isSubmitting}
              />

              <InputField
                name="apellido"
                label="Apellido"
                icon={<IconUser size={18} />}
                placeholder="Tu apellido"
                required
                value={formData.apellido}
                onChange={handleInputChange}
                hasError={errors.apellido}
                disabled={isSubmitting}
              />

              <InputField
                name="dni"
                label="DNI"
                icon={<IconId size={18} />}
                placeholder="12.345.678"
                required
                value={formData.dni}
                onChange={handleInputChange}
                hasError={errors.dni}
                disabled={isSubmitting}
              />

              <InputField
                name="fecha_nacimiento"
                label="Fecha de Nacimiento"
                type="date"
                icon={<IconCalendar size={18} />}
                value={formData.fecha_nacimiento}
                onChange={handleInputChange}
                hasError={errors.fecha_nacimiento}
                disabled={isSubmitting}
              />

              <InputField
                name="email"
                label="Email"
                type="email"
                icon={<IconMail size={18} />}
                placeholder="tu@email.com"
                required
                className="md:col-span-2"
                value={formData.email}
                onChange={handleInputChange}
                hasError={errors.email}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Sección de Información de Contacto */}
        <div className="card from-base-100 to-base-200/50 border-base-300/50 border bg-linear-to-br shadow-2xl backdrop-blur-sm">
          <div className="card-body p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-secondary/10 rounded-lg p-2">
                <IconPhone size={24} className="text-secondary" />
              </div>
              <h2 className="text-secondary text-2xl font-bold">Información de Contacto</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField
                name="telefono"
                label="Teléfono"
                type="tel"
                icon={<IconPhone size={18} />}
                placeholder="+54 9 11 1234-5678"
                value={formData.telefono}
                onChange={handleInputChange}
                hasError={errors.telefono}
                disabled={isSubmitting}
              />

              <InputField
                name="ciudad"
                label="Ciudad"
                icon={<IconMapPin size={18} />}
                placeholder="San Benito"
                value={formData.ciudad}
                onChange={handleInputChange}
                hasError={errors.ciudad}
                disabled={isSubmitting}
              />

              <InputField
                name="domicilio"
                label="Domicilio"
                icon={<IconHome size={18} />}
                placeholder="Calle 123, N° 456"
                className="md:col-span-2"
                value={formData.domicilio}
                onChange={handleInputChange}
                hasError={errors.domicilio}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Botones de Acción con diseño mejorado */}
        <div className="card from-base-100 to-base-200/30 border-base-300/30 border bg-linear-to-r shadow-xl">
          <div className="card-body p-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary h-14 flex-1 transform gap-3 text-lg transition-all duration-300 ${
                  isSubmitting
                    ? 'scale-95'
                    : 'hover:shadow-primary/30 hover:scale-105 hover:shadow-2xl'
                } from-primary to-primary-focus relative overflow-hidden border-0 bg-linear-to-r`}
              >
                {isSubmitting && (
                  <div className="from-primary/50 to-primary-focus/50 absolute inset-0 animate-pulse bg-linear-to-r" />
                )}
                <div className="relative flex items-center gap-3">
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Guardando cambios...
                    </>
                  ) : (
                    <>
                      <IconCheck size={20} />
                      Guardar Cambios
                    </>
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => router.push('/perfil')}
                disabled={isSubmitting}
                className="btn btn-outline h-14 flex-1 gap-3 text-lg transition-transform duration-300 hover:scale-105"
              >
                <IconX size={20} />
                Cancelar
              </button>
            </div>

            <div className="divider my-4" />

            <div className="text-base-content/60 text-center text-sm">
              <p className="flex items-center justify-center gap-2">
                <IconDeviceFloppy size={16} />
                Los cambios se guardarán de forma segura
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
