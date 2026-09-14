'use client'

import type { Ciudadano } from '@/payload-types'
import { IconEye, IconEyeOff, IconLock } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface CambiarContrasenaFormProps {
  ciudadano: Ciudadano
}

export function CambiarContrasenaForm({ ciudadano }: CambiarContrasenaFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [errors, setErrors] = useState<{
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
    general?: string
  }>({})

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const currentPassword = formData.get('currentPassword')?.toString()
    const newPassword = formData.get('newPassword')?.toString()
    const confirmPassword = formData.get('confirmPassword')?.toString()

    // Validaciones del lado cliente
    const newErrors: typeof errors = {}

    if (!currentPassword) {
      newErrors.currentPassword = 'La contraseña actual es requerida'
    }

    if (!newPassword) {
      newErrors.newPassword = 'La nueva contraseña es requerida'
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'La nueva contraseña debe tener al menos 6 caracteres'
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'La confirmación de contraseña es requerida'
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    if (currentPassword === newPassword) {
      newErrors.newPassword = 'La nueva contraseña debe ser diferente a la actual'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      // Verificar contraseña actual usando el endpoint de login de Payload
      const loginResponse = await fetch('/api/ciudadanos/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: ciudadano.email,
          password: currentPassword,
        }),
      })

      if (!loginResponse.ok) {
        setErrors({ currentPassword: 'La contraseña actual es incorrecta' })
        return
      }

      // Si la verificación es exitosa, proceder a cambiar la contraseña
      const response = await fetch(`/api/ciudadanos/${ciudadano.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Manejo de errores específicos
        if (response.status === 401) {
          setErrors({
            general: 'No tienes permisos para realizar esta acción. Inicia sesión nuevamente.',
          })
        } else if (response.status === 400 && data.errors) {
          // Errores de validación de Payload
          const fieldErrors: typeof errors = {}
          data.errors.forEach((error: any) => {
            if (error.field === 'password') {
              fieldErrors.newPassword = error.message
            }
          })
          setErrors(
            fieldErrors.newPassword
              ? fieldErrors
              : { general: data.message || 'Error de validación' },
          )
        } else {
          setErrors({ general: data.message || 'Error al cambiar la contraseña' })
        }
        return
      }

      toast.success('¡Contraseña actualizada exitosamente!')

      // Pequeña pausa antes de redirigir
      setTimeout(() => {
        router.push('/perfil')
      }, 500)
    } catch (error) {
      console.error('Error al cambiar contraseña:', error)
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : 'Error de conexión. Por favor, inténtalo de nuevo.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errors.general}</span>
        </div>
      )}

      {/* Current Password Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text flex items-center gap-2 font-medium">
            <IconLock size={18} className="text-primary" />
            Contraseña Actual
          </span>
        </label>
        <div className="relative">
          <input
            type={showPasswords.current ? 'text' : 'password'}
            name="currentPassword"
            required
            placeholder="••••••••"
            className={`input input-bordered focus:input-primary w-full pr-12 transition-all duration-200 ${
              errors.currentPassword ? 'input-error' : ''
            }`}
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('current')}
            className="text-base-content/50 hover:text-base-content group absolute top-1/2 right-3 -translate-y-1/2 transition-colors duration-200"
          >
            <div className="rounded p-1 transition-transform duration-200 group-hover:scale-110">
              {showPasswords.current ? (
                <IconEyeOff size={20} className="text-current" />
              ) : (
                <IconEye size={20} className="text-current" />
              )}
            </div>
          </button>
        </div>
        {errors.currentPassword && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.currentPassword}</span>
          </label>
        )}
      </div>

      {/* New Password Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text flex items-center gap-2 font-medium">
            <IconLock size={18} className="text-secondary" />
            Nueva Contraseña
          </span>
        </label>
        <div className="relative">
          <input
            type={showPasswords.new ? 'text' : 'password'}
            name="newPassword"
            required
            placeholder="••••••••"
            className={`input input-bordered focus:input-primary w-full pr-12 transition-all duration-200 ${
              errors.newPassword ? 'input-error' : ''
            }`}
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('new')}
            className="text-base-content/50 hover:text-base-content group absolute top-1/2 right-3 -translate-y-1/2 transition-colors duration-200"
          >
            <div className="rounded p-1 transition-transform duration-200 group-hover:scale-110">
              {showPasswords.new ? (
                <IconEyeOff size={20} className="text-current" />
              ) : (
                <IconEye size={20} className="text-current" />
              )}
            </div>
          </button>
        </div>
        {errors.newPassword && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.newPassword}</span>
          </label>
        )}
        <label className="label">
          <span className="label-text-alt text-base-content/60">
            Mínimo 6 caracteres. Usa una combinación de letras, números y símbolos.
          </span>
        </label>
      </div>

      {/* Confirm Password Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text flex items-center gap-2 font-medium">
            <IconLock size={18} className="text-accent" />
            Confirmar Nueva Contraseña
          </span>
        </label>
        <div className="relative">
          <input
            type={showPasswords.confirm ? 'text' : 'password'}
            name="confirmPassword"
            required
            placeholder="••••••••"
            className={`input input-bordered focus:input-primary w-full pr-12 transition-all duration-200 ${
              errors.confirmPassword ? 'input-error' : ''
            }`}
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('confirm')}
            className="text-base-content/50 hover:text-base-content group absolute top-1/2 right-3 -translate-y-1/2 transition-colors duration-200"
          >
            <div className="rounded p-1 transition-transform duration-200 group-hover:scale-110">
              {showPasswords.confirm ? (
                <IconEyeOff size={20} className="text-current" />
              ) : (
                <IconEye size={20} className="text-current" />
              )}
            </div>
          </button>
        </div>
        {errors.confirmPassword && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.confirmPassword}</span>
          </label>
        )}
      </div>

      {/* Security Tips */}
      <div className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 className="font-bold">Consejos para una contraseña segura:</h3>
          <div className="text-xs">
            • Usa al menos 8 caracteres • Combina letras mayúsculas y minúsculas • Incluye números y
            símbolos • Evita información personal
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={() => router.push('/perfil')}
          className="btn btn-ghost"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="from-primary to-secondary btn bg-gradient-to-r text-white hover:scale-105"
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Actualizando...
            </>
          ) : (
            'Cambiar Contraseña'
          )}
        </button>
      </div>
    </form>
  )
}
