'use client'

import type { Ciudadano } from '@/payload-types'
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
import { useState } from 'react'
import { toast } from 'sonner'

interface EditarPerfilFormProps {
  ciudadano: Ciudadano
}

export function EditarPerfilForm({ ciudadano }: EditarPerfilFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeSection, setActiveSection] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)

    // Extraer datos del formulario
    const data = {
      nombre: formData.get('nombre')?.toString().trim(),
      apellido: formData.get('apellido')?.toString().trim(),
      dni: formData.get('dni')?.toString().trim(),
      domicilio: formData.get('domicilio')?.toString().trim(),
      fecha_nacimiento: formData.get('fecha_nacimiento')?.toString(),
      ciudad: formData.get('ciudad')?.toString().trim(),
      telefono: formData.get('telefono')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
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

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      return date.toISOString().split('T')[0]
    } catch {
      return ''
    }
  }

  const InputField = ({
    name,
    label,
    type = 'text',
    defaultValue,
    icon,
    placeholder,
    required = false,
    className = '',
    ...props
  }: {
    name: string
    label: string
    type?: string
    defaultValue?: string
    icon?: React.ReactNode
    placeholder?: string
    required?: boolean
    className?: string
    [key: string]: any
  }) => {
    const hasError = errors[name]
    const isFocused = activeSection === name

    return (
      <div className={`form-control group ${className}`}>
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
            defaultValue={defaultValue || ''}
            placeholder={placeholder}
            required={required}
            disabled={isSubmitting}
            onFocus={() => setActiveSection(name)}
            onBlur={() => setActiveSection(null)}
            className={`input input-bordered w-full transition-all duration-300 ease-in-out ${
              hasError
                ? 'input-error border-error focus:border-error'
                : isFocused
                  ? 'border-primary shadow-primary/20 scale-[1.02] shadow-lg'
                  : 'hover:border-primary/50 hover:shadow-md'
            } ${isFocused ? 'bg-base-100' : 'bg-base-50'} placeholder:text-base-content/40`}
            {...props}
          />
          {isFocused && (
            <div className="ring-primary/30 ring-offset-base-100 pointer-events-none absolute inset-0 rounded-lg ring-2 ring-offset-2 transition-all duration-300" />
          )}
        </div>
        {hasError && (
          <label className="label">
            <span className="label-text-alt text-error flex animate-pulse items-center gap-1">
              <IconX size={14} />
              {hasError}
            </span>
          </label>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header con gradiente y animación */}
        <div className="from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 shadow-xl">
          <div className="from-primary/5 absolute inset-0 animate-pulse bg-gradient-to-r to-transparent" />
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
        <div className="card from-base-100 to-base-200/50 border-base-300/50 border bg-gradient-to-br shadow-2xl backdrop-blur-sm">
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
                defaultValue={ciudadano.nombre || ''}
                icon={<IconUser size={18} />}
                placeholder="Tu nombre"
                required
              />

              <InputField
                name="apellido"
                label="Apellido"
                defaultValue={ciudadano.apellido || ''}
                icon={<IconUser size={18} />}
                placeholder="Tu apellido"
                required
              />

              <InputField
                name="dni"
                label="DNI"
                defaultValue={ciudadano.dni}
                icon={<IconId size={18} />}
                placeholder="12.345.678"
                required
              />

              <InputField
                name="fecha_nacimiento"
                label="Fecha de Nacimiento"
                type="date"
                defaultValue={formatDate(ciudadano.fecha_nacimiento)}
                icon={<IconCalendar size={18} />}
              />

              <InputField
                name="email"
                label="Email"
                type="email"
                defaultValue={ciudadano.email}
                icon={<IconMail size={18} />}
                placeholder="tu@email.com"
                required
                className="md:col-span-2"
              />
            </div>
          </div>
        </div>

        {/* Sección de Información de Contacto */}
        <div className="card from-base-100 to-base-200/50 border-base-300/50 border bg-gradient-to-br shadow-2xl backdrop-blur-sm">
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
                defaultValue={ciudadano.telefono || ''}
                icon={<IconPhone size={18} />}
                placeholder="+54 9 11 1234-5678"
              />

              <InputField
                name="ciudad"
                label="Ciudad"
                defaultValue={ciudadano.ciudad || ''}
                icon={<IconMapPin size={18} />}
                placeholder="San Benito"
              />

              <InputField
                name="domicilio"
                label="Domicilio"
                defaultValue={ciudadano.domicilio || ''}
                icon={<IconHome size={18} />}
                placeholder="Calle 123, N° 456"
                className="md:col-span-2"
              />
            </div>
          </div>
        </div>

        {/* Botones de Acción con diseño mejorado */}
        <div className="card from-base-100 to-base-200/30 border-base-300/30 border bg-gradient-to-r shadow-xl">
          <div className="card-body p-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary h-14 flex-1 transform gap-3 text-lg transition-all duration-300 ${
                  isSubmitting
                    ? 'scale-95'
                    : 'hover:shadow-primary/30 hover:scale-105 hover:shadow-2xl'
                } from-primary to-primary-focus relative overflow-hidden border-0 bg-gradient-to-r`}
              >
                {isSubmitting && (
                  <div className="from-primary/50 to-primary-focus/50 absolute inset-0 animate-pulse bg-gradient-to-r" />
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
