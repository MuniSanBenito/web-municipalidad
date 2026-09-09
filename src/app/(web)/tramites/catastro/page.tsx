import {
  IconBuildingCommunity,
  IconInfoCircle,
  IconMail,
  IconMap2,
  IconPhone,
  IconRulerMeasure,
} from '@tabler/icons-react'
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
            <div className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"></div>
            <p className="text-base-content mt-6 text-base leading-relaxed transition-colors duration-300 md:text-lg">
              El área de Catastro Municipal se encarga de mantener actualizado el registro de
              propiedades, realizar mediciones y valuaciones, y gestionar la información territorial
              del municipio para garantizar una planificación urbana eficiente.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-8">
        <div className="bg-base-100 rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
          <h2 className="text-primary mb-8 text-center text-2xl font-bold md:text-3xl">
            Servicios Disponibles
          </h2>

          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
            <Link
              href="#"
              className="btn btn-primary gap-2 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <IconMap2 size={22} />
              <span className="text-primary-content">Consulta Catastral</span>
            </Link>

            <Link
              href="#"
              className="btn btn-accent gap-2 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <IconRulerMeasure size={22} />
              <span className="text-accent-content">Medición y Relevamiento</span>
            </Link>

            <Link
              href="#"
              className="btn btn-secondary gap-2 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <IconBuildingCommunity size={22} />
              <span className="text-secondary-content">Certificados Catastrales</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Aviso atención presencial */}
      <section className="mt-10">
        <div className="alert alert-warning shadow-lg">
          <IconInfoCircle size={28} className="shrink-0" />
          <div>
            <h3 className="font-bold">Atención presencial obligatoria</h3>
            <p className="text-sm">
              Todos los trámites y la presentación de documentación se realizan{' '}
              <strong>exclusivamente de manera presencial</strong> en las oficinas del Área de
              Catastro Municipal. No se aceptan gestiones por correo electrónico ni por medios
              digitales.
            </p>
          </div>
        </div>
      </section>

      {/* Trámites administrativos */}
      <section className="mt-12">
        <h2 className="text-primary mb-8 text-center text-2xl font-bold md:text-3xl">
          Trámites Administrativos
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Inscripción de Títulos */}
          <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="card-body">
              <h3 className="card-title text-primary">Inscripción de Títulos</h3>
              <ul className="text-base-content list-disc space-y-2 pl-5">
                <li className="hover:text-primary transition-colors duration-300">
                  Tener en mano <strong>escritura original</strong> +{' '}
                  <strong>formulario original</strong> (de no tenerlo, se puede retirar en la
                  oficina).
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  El formulario debe estar <strong>firmado y sellado</strong> por el escribano/a que
                  realiza la escritura o por otro.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  Llevar dinero para abonar los <strong>sellados</strong> dentro del municipio el
                  mismo día.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  Verificar montos actualizados el día del trámite.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  Consultar si no se requiere alguna inscripción anterior. En ese caso, presentar
                  los formularios y abonar los sellados correspondientes.
                </li>
              </ul>
              <div className="alert alert-info mt-4 shadow-lg">
                <IconInfoCircle size={24} />
                <span>
                  Ante cualquier duda, consulte en la oficina antes de iniciar el trámite.
                </span>
              </div>
            </div>
          </div>

          {/* Cambio de domicilio postal */}
          <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="card-body">
              <h3 className="card-title text-primary">Cambio de domicilio postal</h3>
              <ul className="text-base-content list-disc space-y-2 pl-5">
                <li className="hover:text-primary transition-colors duration-300">
                  El titular o nuevo comprador debe completar y firmar el formulario que se anexa.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  Adjuntar fotocopia de DNI.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  Entregarlo personalmente o a través de un tercero en la oficina para cargarlo en
                  la base de datos catastral.
                </li>
              </ul>
            </div>
          </div>

          {/* Plancheta catastral */}
          <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="card-body">
              <h3 className="card-title text-primary">Plancheta catastral</h3>
              <ul className="text-base-content list-disc space-y-2 pl-5">
                <li className="hover:text-primary transition-colors duration-300">
                  El titular o nuevo comprador debe estar cargado en la base de datos catastral.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  Si no está cargado, debe presentar: escritura, boleto de compra-venta, fotocopia
                  de DNI.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  Abonar el sellado el mismo día del trámite.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  Puede ser realizado a través de un tercero.
                </li>
              </ul>
            </div>
          </div>

          {/* Cálculo de numeración oficial */}
          <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="card-body">
              <h3 className="card-title text-primary">
                Cálculo de numeración oficial de vivienda habitable
              </h3>
              <ul className="text-base-content list-disc space-y-2 pl-5">
                <li className="hover:text-primary transition-colors duration-300">
                  El lote debe tener declaración de superficie edificada o mejoras de construcción
                  (VEP, plano de mensura, DDJJ de proyecto o relevamiento, presentado por
                  profesional).
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  Si no cuenta con estos, debe acercarse a la oficina de Obras Privadas.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  El titular o nuevo comprador debe firmar el formulario otorgado en la oficina.
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  <strong>No se abona sellado.</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* Cambio de datos catastrales */}
          <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl md:col-span-2">
            <div className="card-body">
              <h3 className="card-title text-primary">Cambio de datos catastrales</h3>
              <ul className="text-base-content list-disc space-y-2 pl-5">
                <li className="hover:text-primary transition-colors duration-300">
                  Se reciben: boletos de compra-venta nuevos, cesión de derechos posesorios, primera
                  copia de la escritura (trámite recién hecho), escritura nueva (trámite
                  registrado).
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  Todo debe estar con sus sellados y actas correspondientes (sellado de ATER y acta
                  redactada por escribano/a).
                </li>
                <li className="hover:text-primary transition-colors duration-300">
                  La documentación puede ser presentada por un tercero.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="mt-12">
        <div className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="card-body">
            <h3 className="card-title text-primary">¿Dudas o consultas?</h3>
            <div className="text-base-content mt-2 space-y-2">
              <p className="flex items-center gap-2">
                <IconMail size={20} className="text-primary" />
                <span>Email:</span>
                <a href="mailto:catastro@munisanbenito.gov.ar" className="link-hover link">
                  catastro@munisanbenito.gov.ar
                </a>
              </p>
              <p className="flex items-center gap-2">
                <IconPhone size={20} className="text-primary" />
                <span>Teléfono fijo:</span>
                <a href="tel:03434973454" className="link-hover link">
                  4973454
                </a>
              </p>
              <p className="flex items-center gap-2">
                <IconPhone size={20} className="text-primary" />
                <span>CAV:</span>
                <a href="tel:3436127013" className="link-hover link">
                  3436127013
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
