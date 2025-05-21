'use client'
import Image from 'next/image'

export default function BanderaPage() {
  return (
    <main className="container mx-auto space-y-4 p-4 sm:space-y-10 sm:p-6">
      <section className="hero bg-base-200 rounded-lg p-6 text-center shadow-lg sm:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold sm:text-5xl">Bandera de San Benito</h1>
            <p className="mt-3 text-base leading-relaxed sm:mt-4 sm:text-lg">
              La Bandera Municipal de San Benito, creada por Ordenanza N°409/14 HCDSB, es un símbolo
              que concentra la identidad de los vecinos sanbenitenses y representa nuestra autonomía
              municipal.
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <div className="bg-base-100 rounded-lg p-5 shadow-md sm:p-6">
          <h2 className="mb-3 text-2xl font-semibold sm:mb-4 sm:text-3xl">Descripción</h2>
          <p className="text-base leading-relaxed sm:text-lg">
            La Bandera está conformada por un fondo blanco y en el centro el Escudo Municipal, el
            cual representa en una forma oval el horizonte conformado por una línea curva y sobre
            ella el sol. En un plano diferente, dos palomas llevan en su pico laureles que
            representan la gloria por los logros obtenidos.
          </p>
          <p className="mt-3 text-base leading-relaxed sm:mt-4 sm:text-lg">
            En la parte inferior se encuentra un mazo de trigo producto de la tierra, cuyo origen se
            representa en un moño con los colores patrios y en su centro una escarapela con los
            colores de la Bandera de Entre Ríos.
          </p>
        </div>

        <div className="bg-base-100 flex flex-col items-center justify-center rounded-lg p-5 shadow-md sm:p-6">
          <h2 className="mb-3 text-2xl font-semibold sm:mb-4 sm:text-3xl">Escudo Municipal</h2>
          <Image
            src="/images/escudo.webp"
            alt="Escudo Municipal de San Benito"
            width={300}
            height={300}
            className="rounded-lg shadow-lg"
            priority
          />
        </div>

        <div className="bg-base-100 col-span-1 rounded-lg p-5 shadow-md sm:p-6 md:col-span-2">
          <h2 className="mb-3 text-2xl font-semibold sm:mb-4 sm:text-3xl">Uso Protocolar</h2>
          <p className="text-base leading-relaxed sm:text-lg">
            Según la Ordenanza N° 493, la Bandera Municipal debe estar presente en:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-base sm:mt-4 sm:space-y-2 sm:text-lg">
            <li>
              Todo acto cívico, protocolar, de seguridad y escolar que se realice en la Ciudad de
              San Benito, acompañando al Pabellón Nacional y la Bandera de Entre Ríos.
            </li>
            <li>
              Cada institución educativa de la ciudad cuenta con una Bandera Municipal otorgada por
              el Municipio.
            </li>
            <li>
              La Bandera se encuentra presente en el Honorable Concejo Deliberante y demás sedes
              municipales.
            </li>
          </ul>
        </div>
      </div>

      <section className="bg-base-100 rounded-lg p-5 shadow-md sm:p-6">
        <h2 className="mb-3 text-center text-2xl font-semibold sm:mb-4 sm:text-3xl">Marco Legal</h2>
        <div className="text-base leading-relaxed sm:text-lg">
          <p>
            La Bandera Municipal fue creada mediante la Ordenanza N°409/14 HCDSB, como continuidad
            del acervo institucional iniciado con el Escudo Municipal (Ordenanza N° 67/90 JFSB).
            Posteriormente, la Ordenanza N° 493 estableció el protocolo de uso y disposición de los
            símbolos municipales.
          </p>
        </div>
      </section>
    </main>
  )
}
