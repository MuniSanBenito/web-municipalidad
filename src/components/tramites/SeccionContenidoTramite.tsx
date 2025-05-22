import React from 'react'

interface SeccionContenidoTramiteProps {
  tituloSeccion: string
  children: React.ReactNode
  className?: string
}

export const SeccionContenidoTramite: React.FC<SeccionContenidoTramiteProps> = ({
  tituloSeccion,
  children,
  className = '',
}) => {
  return (
    <section className={`mt-8 space-y-6 ${className}`}>
      <div className="bg-base-100 rounded-lg p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">{tituloSeccion}</h2>
        <div className="prose max-w-none dark:prose-invert">{children}</div>
      </div>
    </section>
  )
}
