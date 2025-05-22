import React from 'react'

interface HeroTramiteProps {
  titulo: string
  descripcionIntro: string | React.ReactNode
}

export const HeroTramite: React.FC<HeroTramiteProps> = ({ titulo, descripcionIntro }) => {
  return (
    <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold md:text-4xl">{titulo}</h1>
          {typeof descripcionIntro === 'string' ? (
            <p className="py-6 text-sm md:text-base">{descripcionIntro}</p>
          ) : (
            <div className="py-6 text-sm md:text-base">{descripcionIntro}</div>
          )}
        </div>
      </div>
    </section>
  )
}
