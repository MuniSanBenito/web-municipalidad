'use client'

export default function GestionPage() {
  return (
    <main className="bg-base-100 min-h-screen p-6">
      <section className="hero bg-base-200 rounded-lg p-10 text-center shadow-lg">
        <header className="container mx-auto">
          <h1 className="text-4xl font-bold">Nuestra Visión</h1>
          <p className="mt-4 text-lg">
            Nuestra visión es la de una ciudad dispuesta a trabajar colectivamente por un futuro
            mejor de la comunidad.
          </p>
          <p className="mt-4 text-lg">
            <strong>El San Benito</strong> que se propone es un lugar con{' '}
            <strong>oportunidades</strong>, atractiva para visitantes,
            <strong>segura</strong>, bien comunicada y <strong>sustentable</strong>.
          </p>
        </header>
      </section>

      <section className="container mx-auto my-10 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Plan Estratégico de Gestión 2023-2027</h2>
        <p>
          La formulación estratégica se consolida en el{' '}
          <strong>Plan Estratégico de Gestión 2023-2027</strong>, el cual responde a los compromisos
          asumidos y busca diseñar un Modelo de Gobierno Municipal orientado a un{' '}
          <strong>desarrollo integral</strong> del Municipio de San Benito.
        </p>
      </section>
    </main>
  )
}
