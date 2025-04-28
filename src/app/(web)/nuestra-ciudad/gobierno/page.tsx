import { basePayload } from '@/web/lib/payload'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Gobierno - San Benito',
}

export default async function PageGobierno() {
  const autoridades: any = await basePayload.findGlobal({ slug: 'autoridades' })
  return (
    <main className="container mx-auto p-6">
      <section className="hero bg-base-200 rounded-lg p-10 text-center shadow-lg">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-5xl font-bold">Gobierno Municipal</h1>
            <p className="mt-4 text-lg leading-relaxed">
              Desde 1968 comenzó como Junta de Gobierno y en 1987 se estableció como municipio. A lo
              largo de su historia, San Benito ha sido dirigido por diversos intendentes que han
              contribuido al desarrollo y crecimiento de nuestra ciudad.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-3xl font-semibold">Intendentes de San Benito</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              '1987-1995: Aníbal González (UCR)',
              '1995-1999: Oscar Acosta (PJ)',
              '1999-2003: Oscar Acosta (PJ)',
              '2003-2007: Ángel Vazquez (FPV)',
              '2007-2011: Ángel Vazquez (FPV)',
              '2011-2015: Ángel Vazquez (hijo) (FPV)',
              '2015-2019: Exequiel Donda (UNA)',
              '2019-2023: Exequiel Donda (UNA)',
              '2023-2027: Ariel Voeffray (JPC)',
            ].map((intendente, index, array) => (
              <div
                key={intendente}
                className={`bg-base-200 rounded-md p-4 shadow transition-shadow hover:shadow-md ${index === array.length - 1 ? 'border-primary relative border-2' : ''}`}
              >
                {index === array.length - 1 && (
                  <span className="bg-primary text-primary-content absolute -top-3 right-2 rounded-full px-2 py-1 text-sm font-bold">
                    Actual
                  </span>
                )}
                {intendente}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-3xl font-semibold">Estructura de Gobierno</h2>
          <p className="mb-4 text-lg leading-relaxed">
            El gobierno municipal de San Benito está compuesto por el Departamento Ejecutivo
            Municipal (DEM) y el Honorable Concejo Deliberante (HCD), trabajando en conjunto para el
            desarrollo y bienestar de nuestra comunidad.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-base-200 rounded-md p-6">
              <h3 className="mb-3 text-2xl font-semibold">Departamento Ejecutivo</h3>
              <p className="mb-4 text-lg">
                Liderado por el Intendente, es responsable de la administración general del
                municipio y la ejecución de las políticas públicas.
              </p>
              <div className="mt-4 space-y-4">
                <div className="border-primary border-l-4 pl-4">
                  <h4 className="text-xl font-semibold">Secretarías</h4>
                  <ul className="mt-2 space-y-2">
                    <li className="text-lg">• Secretaría de Obras y Servicios Públicos</li>
                    <li className="text-lg">• Secretaría de Gobierno</li>
                    <li className="text-lg">• Secretaría de Hacienda</li>
                  </ul>
                </div>
                <div className="border-primary border-l-4 pl-4">
                  <h4 className="text-xl font-semibold">Asesorías</h4>
                  <ul className="mt-2 space-y-2">
                    <li className="text-lg">
                      • Asesoría en Relaciones Políticas e Institucionales, Legal y Técnica
                    </li>
                    <li className="text-lg">• Asesoría en Modernización Municipal</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-base-200 rounded-md p-6">
              <h3 className="mb-3 text-2xl font-semibold">Concejo Deliberante</h3>
              <p className="mb-4 text-lg">
                Órgano legislativo que debate y aprueba las ordenanzas municipales, ejerciendo el
                control sobre el ejecutivo municipal.
              </p>
              <div className="space-y-4">
                <div className="border-primary border-l-4 pl-4">
                  <h4 className="text-xl font-semibold">Autoridades</h4>
                  <ul className="mt-2 space-y-2">
                    <li className="text-lg">• Presidente: {autoridades.presidente}</li>
                    <li className="text-lg">• Secretario: {autoridades.secretario}</li>
                  </ul>
                </div>
                <div className="border-primary mt-4 border-l-4 pl-4">
                  <h4 className="text-xl font-semibold">Bloques</h4>
                  <div className="mt-2 space-y-2">
                    {autoridades.bloques.map((bloque: any) => (
                      <div key={bloque.id} className="mb-2">
                        <h5 className="font-semibold">{bloque.nombre}</h5>
                        <ul className="pl-4">
                          {bloque.concejales.map((concejal: any, index: number) => (
                            <li key={index} className="text-base">
                              • {concejal.concejal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
