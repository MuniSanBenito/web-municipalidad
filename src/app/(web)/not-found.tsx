import {
  IconArrowLeft,
  IconFileText,
  IconHome,
  IconNews,
  IconShieldCheck,
} from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="bg-base-100 relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-primary absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full opacity-[0.08] blur-3xl" />
        <div className="bg-neutral absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/3 rounded-full opacity-[0.08] blur-3xl" />
      </div>

      {/* Giant 404 watermark */}
      <span className="text-primary/4 pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[38vw] leading-none font-black select-none">
        404
      </span>

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        {/* SVG Illustration */}
        <div className="mb-8 drop-shadow-xl">
          <svg
            width="210"
            height="210"
            viewBox="0 0 210 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Outer ring */}
            <circle cx="105" cy="105" r="98" fill="#b6c54412" />
            <circle
              cx="105"
              cy="105"
              r="98"
              stroke="#b6c544"
              strokeWidth="1.5"
              strokeDasharray="7 5"
              opacity="0.5"
            />

            {/* Ground shadow */}
            <ellipse cx="105" cy="178" rx="55" ry="6" fill="#07663318" />

            {/* Building body */}
            <rect x="55" y="100" width="100" height="75" rx="4" fill="#07663322" />

            {/* Building top band */}
            <rect x="65" y="85" width="80" height="18" rx="3" fill="#07663330" />

            {/* Roof */}
            <polygon points="105,58 58,85 152,85" fill="#b6c544" opacity="0.55" />

            {/* Flagpole */}
            <line x1="105" y1="58" x2="105" y2="42" stroke="#076633" strokeWidth="2.5" />
            <rect x="105" y="42" width="20" height="13" rx="2" fill="#b6c544" />

            {/* Windows row */}
            <rect x="64" y="104" width="20" height="20" rx="3" fill="#b6c544" opacity="0.65" />
            <rect x="93" y="104" width="20" height="20" rx="3" fill="#b6c544" opacity="0.65" />
            <rect x="122" y="104" width="20" height="20" rx="3" fill="#b6c544" opacity="0.65" />

            {/* Door */}
            <rect x="89" y="135" width="28" height="40" rx="5" fill="#076633" opacity="0.35" />
            <circle cx="114" cy="155" r="2.5" fill="#b6c544" opacity="0.8" />

            {/* Question mark badge */}
            <circle cx="158" cy="52" r="24" fill="#076633" />
            <circle cx="158" cy="52" r="21" fill="#b6c544" />
            <text
              x="158"
              y="61"
              textAnchor="middle"
              fontSize="26"
              fontWeight="900"
              fill="#076633"
              fontFamily="system-ui, sans-serif"
            >
              ?
            </text>

            {/* Decorative floating dots */}
            <circle cx="42" cy="82" r="5" fill="#b6c544" opacity="0.5" />
            <circle cx="170" cy="130" r="4" fill="#076633" opacity="0.35" />
            <circle cx="33" cy="140" r="3.5" fill="#b6c544" opacity="0.4" />
            <circle cx="175" cy="75" r="3" fill="#b6c544" opacity="0.3" />
          </svg>
        </div>

        {/* Error badge */}
        <div
          className="badge border-primary text-primary mb-5 px-4 py-3 text-sm font-bold"
          style={{ border: '1.5px solid' }}
        >
          Error 404
        </div>

        {/* Heading */}
        <h1 className="text-base-content mb-4 text-4xl font-black sm:text-5xl">
          ¡Ups! Esta página <span className="text-primary">no existe</span>
        </h1>

        {/* Description */}
        <p className="text-base-content/60 mb-10 max-w-md text-lg leading-relaxed">
          La página que buscás no existe o fue movida a otro lugar. Podés volver al inicio o navegar
          por las secciones del sitio.
        </p>

        {/* Quick nav cards */}
        <div className="mb-10 grid w-full max-w-sm grid-cols-2 gap-3 sm:max-w-lg sm:grid-cols-4">
          {(
            [
              { href: '/', label: 'Inicio', Icon: IconHome },
              { href: '/tramites', label: 'Trámites', Icon: IconFileText },
              { href: '/noticias', label: 'Noticias', Icon: IconNews },
              { href: '/transparencia', label: 'Transparencia', Icon: IconShieldCheck },
            ] as const
          ).map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group bg-base-200 hover:bg-primary/10 hover:ring-primary/30 flex flex-col items-center gap-2 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-2"
            >
              <Icon
                size={24}
                className="text-primary transition-transform duration-200 group-hover:scale-110"
              />
              <span className="text-base-content/60 text-xs font-semibold">{label}</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="btn btn-primary btn-lg gap-2 rounded-full px-8 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        >
          <IconArrowLeft size={20} />
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
