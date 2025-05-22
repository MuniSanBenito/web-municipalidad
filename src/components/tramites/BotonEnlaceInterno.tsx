import Link from 'next/link'
import React from 'react'

interface BotonEnlaceInternoProps {
  href: string
  titulo: string
  Icono?: React.ComponentType<{ size?: number; stroke?: number; className?: string }>
  className?: string
  // descripcion?: string; // Prop opcional, no usada en la implementación actual del botón simple
}

export const BotonEnlaceInterno: React.FC<BotonEnlaceInternoProps> = ({
  href,
  titulo,
  Icono,
  className = 'btn-primary', // Default to btn-primary if no className is provided
}) => {
  const baseClasses = 'btn gap-2 shadow-md transition-all duration-300 hover:scale-105'
  
  return (
    <Link href={href} className={`${baseClasses} ${className}`}>
      {Icono && <Icono size={20} stroke={2} />}
      <span className="font-medium">{titulo}</span>
    </Link>
  )
}
