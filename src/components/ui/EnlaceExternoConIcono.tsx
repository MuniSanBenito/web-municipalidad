import React from 'react'
import { IconExternalLink } from '@tabler/icons-react'

interface EnlaceExternoConIconoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  className?: string
}

export const EnlaceExternoConIcono: React.FC<EnlaceExternoConIconoProps> = ({
  href,
  children,
  className = '',
  ...props
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
      <IconExternalLink size={props.size || '1em'} className="ml-1.5 inline-block" stroke={props.stroke || 1.5} />
    </a>
  )
}
