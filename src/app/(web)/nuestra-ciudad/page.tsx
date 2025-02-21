import { LineasColectivos } from '@/components/lineas-colectivos'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'San Benito - Historia',
}

export default function PageNuestraCiudad() {
  return (
    <>
      <main className="container mx-auto p-6">
        <section className="hero bg-base-200 rounded-lg p-10 text-center shadow-lg">
          <div className="hero-content">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-5xl font-bold">San Benito</h1>
              <p className="mt-4 text-lg leading-relaxed">
                Es una ciudad centenaria y es una mezcla de ciudad y campo, ya que gran parte de
                esta localidad es zona rural. ubicada en el Departamento Paraná, a 12 km de la
                capital de la Provincia de Entre Ríos. Su origen se remonta a 1879, cuando arriba a
                la zona un contingente de inmigrantes llegados del Friuli (Austria e Italia), a
                radicarse en lo que originariamente se conoció como Colonia 3 de Febrero.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-6">
          {[
            {
              title: 'Economía',
              content:
                'La ciudad está dividida por el Arroyo Las Tunas y cuenta con varias instituciones y servicios. Su economía se basa en el empleo administrativo y en algunos trabajadores del parque industrial de Paraná.',
            },
            {
              title: 'Historia',
              content:
                'San Benito nació con la llegada de inmigrantes italianos, eslovenos y austríacos en 1879. La colonia "3 de Febrero" fue el primer asentamiento, evolucionando con la construcción de la capilla en la Concesión N° 11.',
            },
            {
              title: 'Gobierno',
              content:
                'Desde 1968 comenzó como Junta de Gobierno y en 1987 se estableció como municipio. Aquí una lista de intendentes a cargo:',
            },
          ].map(({ title, content }) => (
            <div key={title} className="bg-base-100 rounded-lg p-6 shadow-md">
              <h2 className="text-3xl font-semibold">{title}</h2>
              <p className="text-lg leading-relaxed">{content}</p>
            </div>
          ))}

          <div className="bg-base-100 rounded-lg p-6 shadow-md">
            <h2 className="text-3xl font-semibold">Intendentes de San Benito</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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
              ].map((intendente) => (
                <div key={intendente} className="bg-base-200 rounded-md p-3 shadow">
                  {intendente}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-base-100 rounded-lg p-6 shadow-md">
            <h2 className="text-3xl font-semibold">Barrios</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                '22 Viviendas',
                'San Pedro',
                'Las Marias',
                'San Sebastián',
                'Casino',
                'Jardines',
                'La Loma',
                'Las Rejas',
                'Mercantil',
                'Policial',
                'San Martín',
                'San Benito Centro',
                'Altos de San Benito',
                'Virgencita',
                'Posta del sol',
                'Cachaca',
                'Falco',
                'Mainini',
                'Aires del Sur',
                'Altos del Este',
                'Solvencia',
                'San Miguel',
              ].map((barrio) => (
                <div key={barrio} className="bg-base-200 rounded-lg p-4 shadow">
                  {barrio}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-base-100 rounded-lg p-6 shadow-md">
            <h2 className="text-3xl font-semibold">Transporte</h2>
            <p className="text-lg leading-relaxed">
              San Benito se conecta con Paraná mediante las líneas de colectivo{' '}
              <span className="font-semibold">4, 20, 22 y AM</span>, facilitando el acceso a
              distintos puntos de la región.
            </p>
            <LineasColectivos />
          </div>
        </section>
      </main>
    </>
  )
}
