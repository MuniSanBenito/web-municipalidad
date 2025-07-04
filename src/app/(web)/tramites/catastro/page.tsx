import { IconBuildingCommunity, IconMap2, IconRulerMeasure } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Catastro Municipal - San Benito',
}

export default function PageCatastro() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="hero bg-base-200 rounded-xl p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-12">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Catastro Municipal</h1>
            <p className="mt-6 text-base leading-relaxed text-base-content/80 md:text-lg">
              El área de Catastro Municipal se encarga de mantener actualizado el registro de
              propiedades, realizar mediciones y valuaciones, y gestionar la información territorial
              del municipio para garantizar una planificación urbana eficiente.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-8">
        <div className="bg-base-100 rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            Servicios Disponibles
          </h2>

          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
            <Link
              href="#"
              className="btn btn-primary gap-2 shadow-md transition-all duration-300 hover:scale-102 hover:shadow-lg"
            >
              <IconMap2 size={22} />
              <span>Consulta Catastral</span>
            </Link>

            <Link
              href="#"
              className="btn btn-accent gap-2 shadow-md transition-all duration-300 hover:scale-102 hover:shadow-lg"
            >
              <IconRulerMeasure size={22} />
              <span>Medición y Relevamiento</span>
            </Link>

            <Link
              href="#"
              className="btn btn-secondary gap-2 shadow-md transition-all duration-300 hover:scale-102 hover:shadow-lg"
            >
              <IconBuildingCommunity size={22} />
              <span>Certificados Catastrales</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trámites administrativos */}
      <section className="mt-12">
        <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
          Trámites Administrativos
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Inscripción de Títulos */}
          <div className="bg-base-100 rounded-xl p-8 shadow-lg transition-all duration-300 hover:bg-base-200/50 hover:shadow-xl">
            <h3 className="mb-4 text-xl font-bold">Inscripción de Títulos</h3>
            <ul className="text-base-content mb-2 ml-5 list-disc">
              <li>
                Tener en mano <strong>escritura original</strong> +{' '}
                <strong>formulario original</strong> (de no tenerlo, se puede retirar en la
                oficina).
              </li>
              <li>
                El formulario debe estar <strong>firmado y sellado</strong> por el escribano/a que
                realiza la escritura o por otro.
              </li>
              <li>
                Llevar dinero para abonar los <strong>sellados</strong> dentro del municipio el
                mismo día.
              </li>
              <li>Verificar montos actualizados el día del trámite.</li>
              <li>
                Consultar si no se requiere alguna inscripción anterior. En ese caso, presentar los
                formularios y abonar los sellados correspondientes.
              </li>
            </ul>
            <div className="alert alert-info mt-2 text-sm">
              Ante cualquier duda, consulte en la oficina antes de iniciar el trámite.
            </div>
          </div>

          {/* Cambio de domicilio postal */}
          <div className="bg-base-100 rounded-xl p-8 shadow-lg transition-all duration-300 hover:bg-base-200/50 hover:shadow-xl">
            <h3 className="mb-4 text-xl font-bold">Cambio de domicilio postal</h3>
            <ul className="text-base-content mb-2 ml-5 list-disc">
              <li>
                El titular o nuevo comprador debe completar y firmar el formulario que se anexa.
              </li>
              <li>Adjuntar fotocopia de DNI.</li>
              <li>
                Entregarlo personalmente o a través de un tercero en la oficina para cargarlo en la
                base de datos catastral.
              </li>
            </ul>
          </div>

          {/* Plancheta catastral */}
          <div className="bg-base-100 rounded-xl p-6 shadow-md">
            <h3 className="mb-2 text-xl font-semibold">Plancheta catastral</h3>
            <ul className="text-base-content mb-2 ml-5 list-disc">
              <li>
                El titular o nuevo comprador debe estar cargado en la base de datos catastral.
              </li>
              <li>
                Si no está cargado, debe presentar: escritura, boleto de compra-venta, fotocopia de
                DNI.
              </li>
              <li>Abonar el sellado el mismo día del trámite.</li>
              <li>Puede ser realizado a través de un tercero.</li>
            </ul>
          </div>

          {/* Cálculo de numeración oficial */}
          <div className="bg-base-100 rounded-xl p-6 shadow-md">
            <h3 className="mb-2 text-xl font-semibold">
              Cálculo de numeración oficial de vivienda habitable
            </h3>
            <ul className="text-base-content mb-2 ml-5 list-disc">
              <li>
                El lote debe tener declaración de superficie edificada o mejoras de construcción
                (VEP, plano de mensura, DDJJ de proyecto o relevamiento, presentado por
                profesional).
              </li>
              <li>Si no cuenta con estos, debe acercarse a la oficina de Obras Privadas.</li>
              <li>
                El titular o nuevo comprador debe firmar el formulario otorgado en la oficina.
              </li>
              <li>
                <strong>No se abona sellado.</strong>
              </li>
            </ul>
          </div>

          {/* Cambio de datos catastrales */}
          <div className="bg-base-100 rounded-xl p-6 shadow-md md:col-span-2">
            <h3 className="mb-2 text-xl font-semibold">Cambio de datos catastrales</h3>
            <ul className="text-base-content mb-2 ml-5 list-disc">
              <li>
                Se reciben: boletos de compra-venta nuevos, cesión de derechos posesorios, primera
                copia de la escritura (trámite recién hecho), escritura nueva (trámite registrado).
              </li>
              <li>
                Todo debe estar con sus sellados y actas correspondientes (sellado de ATER y acta
                redactada por escribano/a).
              </li>
              <li>La documentación puede ser presentada por un tercero.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="mt-10">
        <div className="bg-base-200 flex flex-col items-center justify-between gap-4 rounded-lg p-6 md:flex-row">
          <div>
            <h3 className="mb-1 text-lg font-semibold">¿Dudas o consultas?</h3>
            <p className="mb-1">
              Email:{' '}
              <a
                href="mailto:catastro@munisanbenito.gov.ar"
                className="hover:text-primary font-medium underline dark:text-white"
              >
                catastro@munisanbenito.gov.ar
              </a>
            </p>
            <p className="mb-1">
              Teléfono fijo:{' '}
              <a
                href="tel:03434973454"
                className="hover:text-primary font-medium underline dark:text-white"
              >
                4973454
              </a>
            </p>
            <p className="mb-1">
              CAV:{' '}
              <a
                href="tel:3436127013"
                className="hover:text-primary font-medium underline dark:text-white"
              >
                3436127013
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
