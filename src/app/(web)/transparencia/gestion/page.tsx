'use client'

export default function GestionPage() {
  return (
    <main className="container mx-auto p-6">
      <section className="hero bg-base-200 rounded-lg p-10 text-center shadow-lg">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-5xl font-bold">Nuestra Visión</h1>
            <p className="mt-4 text-lg leading-relaxed">
              Nuestra visión es la de una ciudad dispuesta a trabajar colectivamente por un futuro
              mejor de la comunidad.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              <strong>El San Benito</strong> que se propone es un lugar con{' '}
              <strong>oportunidades</strong>, atractiva para visitantes,{' '}
              <strong>segura</strong>, bien comunicada y <strong>sustentable</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-3xl font-semibold">Plan Estratégico de Gestión 2023-2027</h2>
          <p className="text-lg leading-relaxed">
            La formulación estratégica se consolida en el{' '}
            <strong>Plan Estratégico de Gestión 2023-2027</strong>, el cual responde a los compromisos
            asumidos y busca diseñar un Modelo de Gobierno Municipal orientado a un{' '}
            <strong>desarrollo integral</strong> del Municipio de San Benito.
          </p>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-3xl font-semibold">Objetivos Estratégicos</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              'Mejorar la calidad de vida de los ciudadanos',
              'Fortalecer la infraestructura municipal',
              'Promover el desarrollo económico local',
              'Garantizar la transparencia en la gestión pública',
              'Implementar políticas de sustentabilidad ambiental',
              'Modernizar los servicios municipales'
            ].map((objetivo, index) => (
              <div
                key={index}
                className="bg-base-200 rounded-md p-4 shadow transition-shadow hover:shadow-md"
              >
                {objetivo}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
