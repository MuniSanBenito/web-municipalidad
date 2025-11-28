import type { ArchivosObra } from '@/payload-types'
import { basePayload } from '@/web/lib/payload'
import { IconArrowLeft } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Presentación de Proyecto - Obras Privadas - San Benito',
}

async function getArchivosObras(): Promise<ArchivosObra[]> {
  const archivos = await basePayload.find({
    collection: 'archivos-obras',
    where: {
      or: [
        {
          categoria: {
            equals: 'proyecto',
          },
        },
        {
          categoria: {
            exists: false,
          },
        },
      ],
    },
    limit: 100,
  })
  return archivos.docs
}

function getArchivoByAlt(archivos: ArchivosObra[], alt: string): ArchivosObra | undefined {
  return archivos.find((archivo) => archivo.alt.toLowerCase() === alt.toLowerCase())
}

export default async function PagePresentacionProyecto() {
  const archivos = await getArchivosObras()

  console.log('=== ARCHIVOS PROYECTO ===')
  console.log('Total archivos:', archivos.length)
  archivos.forEach((archivo) => {
    console.log(`- alt: "${archivo.alt}" | categoria: ${archivo.categoria} | url: ${archivo.url}`)
  })
  console.log('=========================')

  // Obtener archivos por su texto alternativo (alt)
  const caratulaExpediente = getArchivoByAlt(archivos, 'CARATULA EXPEDIENTE')
  const solicitudConstruccion = getArchivoByAlt(archivos, 'SOLICITUD DE CONSTRUCCION')
  const planillaLocales = getArchivoByAlt(archivos, 'Modelo planilla de locales')
  const caratulaPlano = getArchivoByAlt(archivos, 'CARÁTULA DE PLANO')
  const planoSanitario = getArchivoByAlt(archivos, 'PLANO SANITARIO')
  const numeroDomiciliario = getArchivoByAlt(archivos, 'ND - NUMERO DOMICILIARIO')
  const inscripcionProfesional = getArchivoByAlt(archivos, 'INSCRIPCION PROFESIONAL')
  const retiros = getArchivoByAlt(archivos, 'Retiros')
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Obras Privadas</h1>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Presentación de Proyecto</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold md:text-3xl">
            Requisitos para Presentación: Proyecto de Construcción
          </h2>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <p className="mb-4 font-bold">
                En carpeta reunir y presentar la siguiente documentación:
              </p>
              <ol className="list-decimal space-y-3 pl-5">
                <li>
                  <strong>Sellado de Presentación:</strong>
                  <ul className="mt-1 list-disc pl-5">
                    <li>Se adquiere en Rentas Municipal</li>
                    <li>Se abona en Caja Municipal</li>
                  </ul>
                </li>
                <li>
                  <strong>Carátula de Expediente</strong>{' '}
                  {caratulaExpediente?.url && (
                    <a
                      href={caratulaExpediente.url}
                      className="link link-primary"
                      target="_blank"
                      download
                    >
                      <em>Descargar</em>
                    </a>
                  )}
                </li>
                <li>
                  <strong>Solicitud de Construcción:</strong> Se presenta por duplicado{' '}
                  {solicitudConstruccion?.url && (
                    <a
                      href={solicitudConstruccion.url}
                      className="link link-primary"
                      target="_blank"
                      download
                    >
                      <em>Descargar</em>
                    </a>
                  )}
                </li>
                <li>
                  <strong>Acreditación de Dominio:</strong> Incluye fotocopia de uno de los
                  siguientes:
                  <ul className="mt-1 list-disc pl-5">
                    <li>Escritura</li>
                    <li>Boleto de compra</li>
                    <li>Reserva de compra</li>
                    <li>Etc.</li>
                  </ul>
                </li>
                <li>
                  <strong>Fotocopia del Plano de Mensura del Lote</strong>
                </li>
                <li>
                  <strong>Planilla de Locales:</strong> Detalle de los locales incluidos en el
                  proyecto{' '}
                  {planillaLocales?.url && (
                    <a
                      href={planillaLocales.url}
                      className="link link-primary"
                      target="_blank"
                      download
                    >
                      <em>Descargar modelo</em>
                    </a>
                  )}
                </li>
                <li>
                  <strong>Plano de Construcción:</strong> Plano original en transparente y cuatro
                  copias, visados por el colegio de profesionales correspondiente. Este debe
                  incluir:
                  <ul className="mt-1 list-disc pl-5">
                    <li>Planta de cada piso acotado</li>
                    <li>Cortes (mínimo dos)</li>
                    <li>Fachada/s - Escala 1:50</li>
                    <li>Planos y planillas de estructura resistente</li>
                    <li>
                      Planos de instalación sanitaria{' '}
                      {planoSanitario?.url && (
                        <a
                          href={planoSanitario.url}
                          className="link link-primary"
                          target="_blank"
                          download
                        >
                          <em>Descargar modelo</em>
                        </a>
                      )}
                    </li>
                  </ul>
                  {caratulaPlano?.url && (
                    <p className="mt-2">
                      <a
                        href={caratulaPlano.url}
                        className="link link-primary"
                        target="_blank"
                        download
                      >
                        <em>Descargar Carátula de Plano</em>
                      </a>
                    </p>
                  )}
                </li>
                <li>
                  <strong>Solicitud de número domiciliario</strong>{' '}
                  {numeroDomiciliario?.url && (
                    <a
                      href={numeroDomiciliario.url}
                      className="link link-primary"
                      target="_blank"
                      download
                    >
                      <em>Descargar</em>
                    </a>
                  )}
                </li>
                <li>
                  <strong>Construcciones Industrializadas:</strong> Se requiere además de lo
                  indicado precedentemente una memoria descriptiva del sistema.
                </li>
              </ol>

              <div className="alert alert-info mt-6">
                <div>
                  <p className="text-sm">
                    <strong>Final de Obra:</strong> Al concluir la construcción, solicitar la
                    inspección correspondiente para obtener el Final de Obras y el registro de la
                    misma en el sistema municipal y provincial.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-4 text-center text-xl font-semibold">
              <strong>PROFESIONALES</strong>
            </h3>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <p className="mb-3">Los profesionales involucrados deben presentar:</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Formulario de Inscripción/Ratificación</li>
                  <li>
                    Constancia de pago de sellado de inscripción/ratificación en registro municipal
                  </li>
                  <li>Fotocopia del DNI (en caso de que sea la primera inscripción)</li>
                  <li>Constancia de ratificación de matrícula del colegio correspondiente</li>
                </ul>
                <div className="mt-4">
                  <Link
                    href="/tramites/obras-privadas/profesionales-matriculados"
                    className="btn btn-secondary btn-sm"
                  >
                    Ver listado de Profesionales Matriculados Habilitados
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="alert alert-warning">
              <div>
                <div>
                  <h4 className="font-bold">RETIROS SEGÚN ORDENANZA 250/00:</h4>
                  <p className="mt-1 text-sm">
                    <strong>LOTEOS ALTOS DEL ESTE Y SOLVENCIA:</strong> Corresponde retiro de 3,00m
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            {caratulaExpediente?.url && (
              <a
                href={caratulaExpediente.url}
                className="btn btn-primary gap-2"
                target="_blank"
                download
              >
                <IconDownload size={20} />
                <span>Caratula del Expediente</span>
              </a>
            )}
            {solicitudConstruccion?.url && (
              <a
                href={solicitudConstruccion.url}
                className="btn btn-primary gap-2"
                target="_blank"
                download
              >
                <IconDownload size={20} />
                <span>Solicitud de Construcción</span>
              </a>
            )}
          </div> */}
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <Link href="/tramites/obras-privadas" className="btn btn-outline gap-2">
          <IconArrowLeft size={20} />
          <span>Volver a Obras Privadas</span>
        </Link>
      </div>
    </main>
  )
}
