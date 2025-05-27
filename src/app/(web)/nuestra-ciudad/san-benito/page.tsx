import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'San Benito - Ciudad',
}

export default function PageNuestraCiudad() {
  return (
    <main className="container mx-auto p-6">
      <section className="hero bg-base-200 rounded-lg p-10 text-center shadow-lg">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-5xl font-bold">San Benito</h1>
            <p className="mt-4 text-lg leading-relaxed">
              Es una ciudad centenaria que combina perfectamente lo urbano y lo rural, ubicada
              estratégicamente en el Departamento Paraná, a 12 km de la capital de la Provincia de
              Entre Ríos. Su rica historia comenzó en 1879, cuando un contingente de inmigrantes del
              Friuli (Austria e Italia) se estableció en lo que originariamente se conoció como
              Colonia 3 de Febrero.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-base-100 rounded-lg p-6 shadow-md transition-shadow hover:shadow-lg">
            <h2 className="mb-4 text-3xl font-semibold">Historia</h2>
            <p className="text-lg leading-relaxed">
              San Benito nació con la llegada de inmigrantes italianos, eslovenos y austríacos en
              1879. La colonia &quot;3 de Febrero&quot; fue el primer asentamiento, evolucionando
              con la construcción de la capilla en la Concesión N° 11, marcando el inicio de una
              próspera comunidad que hoy continúa creciendo y desarrollándose.
            </p>
          </div>

          <div className="bg-base-100 rounded-lg p-6 shadow-md transition-shadow hover:shadow-lg">
            <h2 className="mb-4 text-3xl font-semibold">Economía</h2>
            <p className="text-lg leading-relaxed">
              La ciudad está dividida naturalmente por el Arroyo Las Tunas y cuenta con diversas
              instituciones y servicios. Su economía se sustenta principalmente en el empleo
              administrativo y la participación activa de trabajadores en el parque industrial de
              Paraná, creando un equilibrio entre el desarrollo local y regional.
            </p>
          </div>
        </div>

        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-center text-3xl font-semibold">Nuestros Barrios</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[
              'Las Tunas',
              'Loteo Aguer Cavallo',
              'San Pedro',
              'La Loma',
              'San Miguel',
              'Loteo Dobanton Mizawak Martinez',
              'San Sebastián',
              'La Virgencita II',
              'Loteo Bizai',
              'San Martín',
              'Portal del Sol',
              'Senger',
              'Puesta del Sol',
              'Centro',
              'Loteo Furios',
              'Jardines',
              'Sur',
              'Loteo Cumini',
              'Altos del Este',
              'Solvencia',
              '250 Viviendas',
            ].map((barrio) => (
              <div
                key={barrio}
                className="bg-base-200 hover:bg-base-300 rounded-lg p-3 text-center shadow-sm transition-all duration-300 hover:shadow-md"
              >
                {barrio}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
