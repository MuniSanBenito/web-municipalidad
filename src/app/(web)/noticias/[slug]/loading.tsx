import { IconArrowLeft } from '@tabler/icons-react'

export default function Loading() {
  return (
    <main className="bg-base-100 min-h-screen animate-pulse">
      {/* Skeleton de la Portada */}
      <div className="h-96 w-full bg-base-300"></div>

      <div className="container mx-auto max-w-4xl px-4 py-4 sm:px-6">
        {/* Skeleton del Botón Volver */}
        <div className="btn btn-link mb-4 pl-0">
          <IconArrowLeft size={16} />
          Volver a Noticias
        </div>

        {/* Skeleton del Título */}
        <div className="mb-2 h-10 w-5/6 rounded bg-base-300"></div>
        <div className="h-6 w-1/3 rounded bg-base-300"></div>

        {/* Skeleton de la Fecha */}
        <div className="mt-4 h-4 w-1/4 rounded bg-base-300"></div>
      </div>

      {/* Skeleton del Contenido */}
      <section className="container mx-auto max-w-4xl space-y-4 px-4 py-8 sm:px-6">
        <div className="h-5 w-full rounded bg-base-300"></div>
        <div className="h-5 w-full rounded bg-base-300"></div>
        <div className="h-5 w-11/12 rounded bg-base-300"></div>
        <div className="h-5 w-full rounded bg-base-300"></div>
        <div className="h-5 w-5/6 rounded bg-base-300"></div>
        <div className="h-5 w-full rounded bg-base-300"></div>
      </section>

      {/* Skeleton de Archivos Adjuntos */}
      <section className="container mx-auto max-w-4xl px-4 pb-8 sm:px-6">
        <div className="mb-4 h-8 w-1/2 rounded bg-base-300"></div>
        <div className="space-y-3">
          <div className="h-6 w-3/4 rounded bg-base-300"></div>
          <div className="h-6 w-2/3 rounded bg-base-300"></div>
        </div>
      </section>
    </main>
  )
}
