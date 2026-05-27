'use client'
import { IconEye, IconEyeOff, IconLock, IconLogin, IconMail, IconUser } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')?.toString().trim()
    const password = formData.get('password')?.toString()

    // Validaciones del lado cliente
    const newErrors: typeof errors = {}

    if (!email) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Formato de email inválido'
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/ciudadanos/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('¡Bienvenido! Inicio de sesión exitoso')

        // Disparar evento personalizado para que RootLayout actualice el estado
        window.dispatchEvent(new CustomEvent('authStateChanged'))

        // Pequeña pausa para que se vea el toast antes de redirigir
        setTimeout(() => {
          router.push('/')
          router.refresh()
        }, 500)
      } else {
        console.error('Error en login:', data)

        // Manejo más específico de errores de Payload
        let errorMessage = 'Email o contraseña incorrectos'

        if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          // Si hay errores específicos en el array
          const error = data.errors[0]
          if (error && typeof error === 'object' && 'message' in error) {
            errorMessage = (error.message as string) || errorMessage
          }
        } else if (typeof data === 'object' && data && 'message' in data && data.message) {
          // Si hay un mensaje directo en la respuesta
          errorMessage = data.message as string
        } else if (response.status === 401) {
          errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.'
        } else if (response.status === 403) {
          errorMessage = 'Cuenta desactivada. Contacta al administrador.'
        } else if (response.status === 429) {
          errorMessage = 'Demasiados intentos. Intenta nuevamente más tarde.'
        } else if (response.status >= 500) {
          errorMessage = 'Error del servidor. Intenta nuevamente en unos momentos.'
        }

        toast.error(errorMessage)
      }
    } catch (error) {
      console.error('Error de red:', error)
      let errorMessage = 'Error de conexión. Por favor, inténtalo de nuevo.'

      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet.'
      } else if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`
      }

      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="from-primary/5 to-secondary/5 flex min-h-screen items-center justify-center bg-linear-to-br p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="from-primary to-secondary text-primary-content mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br shadow-lg">
            <IconUser size={32} />
          </div>
          <h1 className="text-base-content mb-2 text-3xl font-bold">Iniciar Sesión</h1>
          <p className="text-base-content/70">Accede a tu cuenta de ciudadano</p>
        </div>

        {/* Form Container */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2 font-medium">
                    <IconMail size={18} className="text-primary" />
                    Correo Electrónico
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="tu@email.com"
                    className={`input input-bordered focus:input-primary w-full pl-12 transition-all duration-200 ${errors.email ? 'input-error focus:input-error' : ''}`}
                    disabled={isSubmitting}
                  />
                  <div className="text-base-content/60 pointer-events-none absolute top-0 left-0 flex h-full items-center justify-center px-3">
                    <IconMail size={20} />
                  </div>
                </div>
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.email}</span>
                  </label>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2 font-medium">
                    <IconLock size={18} className="text-primary" />
                    Contraseña
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    placeholder="••••••••"
                    className={`input input-bordered focus:input-primary w-full pr-12 pl-12 transition-all duration-200 ${errors.password ? 'input-error focus:input-error' : ''}`}
                    disabled={isSubmitting}
                  />
                  <div className="text-base-content/60 pointer-events-none absolute top-0 left-0 flex h-full items-center justify-center px-3">
                    <IconLock size={20} />
                  </div>
                  <button
                    type="button"
                    className="text-base-content/60 hover:text-base-content hover:bg-base-200/50 group absolute top-0 right-0 flex h-full items-center justify-center rounded-r-lg px-3 transition-all duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    <div className="rounded p-1 transition-transform duration-200 group-hover:scale-110">
                      {showPassword ? (
                        <IconEyeOff size={20} className="text-current" />
                      ) : (
                        <IconEye size={20} className="text-current" />
                      )}
                    </div>
                  </button>
                </div>
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.password}</span>
                  </label>
                )}
              </div>

              {/* Remember me */}
              {/*  <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" className="checkbox checkbox-primary" />
                  <span className="label-text">Recordar mi sesión</span>
                </label>
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span className="animate-pulse">Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <IconLogin size={20} />
                    Iniciar Sesión
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            {/* <div className="divider opacity-60">o</div> */}

            {/* Additional Links */}
            {/* <div className="space-y-3 text-center">
              <p className="text-base-content/70 text-sm">
                ¿Olvidaste tu contraseña?{' '}
                <Link
                  href="/recuperar-password"
                  className="link link-primary hover:link-secondary transition-colors duration-200"
                >
                  Recuperar
                </Link>
              </p>
              <p className="text-base-content/70 text-sm">
                ¿No tienes cuenta?{' '}
                <Link
                  href="/registro"
                  className="link link-primary hover:link-secondary transition-colors duration-200"
                >
                  Registrarse
                </Link>
              </p>
            </div> */}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-base-content/50 text-xs">
            © 2025 Municipalidad de San Benito. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </section>
  )
}
