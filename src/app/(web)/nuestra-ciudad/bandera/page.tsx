'use client'
import Image from 'next/image'

export default function BanderaPage() {
  return (
    <main className="container mx-auto p-6">
      <section className="hero bg-base-200 rounded-lg p-10 text-center shadow-lg">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-5xl font-bold">Bandera de San Benito</h1>
            <p className="mt-4 text-lg leading-relaxed">
              La Bandera Municipal de San Benito, creada por Ordenanza N°409/14 HCDSB, es un símbolo
              que concentra la identidad de los vecinos sanbenitenses y representa nuestra autonomía
              municipal.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-3xl font-semibold">Descripción</h2>
          <p className="text-lg leading-relaxed">
            La Bandera está conformada por un fondo blanco y en el centro el Escudo Municipal, el
            cual representa en una forma oval el horizonte conformado por una línea curva y sobre
            ella el sol. En un plano diferente, dos palomas llevan en su pico laureles que
            representan la gloria por los logros obtenidos.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            En la parte inferior se encuentra un mazo de trigo producto de la tierra, cuyo origen se
            representa en un moño con los colores patrios y en su centro una escarapela con los
            colores de la Bandera de Entre Ríos.
          </p>
        </div>

        <div className="bg-base-100 flex flex-col items-center justify-center rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-3xl font-semibold">Escudo Municipal</h2>
          <Image
            src="/images/escudo.webp"
            alt="Escudo Municipal de San Benito"
            width={300}
            height={300}
            className="rounded-lg shadow-lg"
            priority
          />
        </div>

        <div className="bg-base-100 col-span-2 rounded-lg p-6 shadow-md">
          <h2 className="mb-4 text-3xl font-semibold">Uso Protocolar</h2>
          <p className="text-lg leading-relaxed">
            Según la Ordenanza N° 493, la Bandera Municipal debe estar presente en:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-lg">
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
      </section>

      <section className="bg-base-100 mt-10 rounded-lg p-6 shadow-md">
        <h2 className="mb-4 text-center text-3xl font-semibold">Marco Legal</h2>
        <div className="text-lg leading-relaxed">
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
