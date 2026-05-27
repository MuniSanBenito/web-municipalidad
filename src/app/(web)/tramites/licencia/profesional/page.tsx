import {
  IconArrowLeft,
  IconBrandWhatsapp,
  IconClipboardCheck,
  IconExternalLink,
  IconInfoCircle,
  IconPrinter,
  IconSchool,
  IconTruckDelivery,
} from '@tabler/icons-react'
import Link from 'next/link'

export default function PageLicenciaProfesional() {
  return (
    <main className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2">
        <Link
          href="/tramites/licencia"
          className="btn btn-ghost btn-sm text-primary hover:bg-primary/10 gap-2"
        >
          <IconArrowLeft size={16} />
          Volver a Licencias
        </Link>
      </div>

      {/* Hero Section */}
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">
              Licencia Profesional Interjurisdiccional
            </h1>
            <p className="mt-4 text-base leading-relaxed md:text-lg">
              Este trámite se refiere a la obtención por primera vez o renovación de la Licencia
              Nacional de Conducir Profesional Interjurisdiccional (habilitadas para conducir fuera
              de la Provincia de Entre Ríos).
            </p>
          </div>
        </div>
      </section>

      {/* Classes Available */}
      <section className="mt-8">
        <div className="bg-warning/10 border-warning/30 rounded-lg border p-6">
          <div className="mb-4 flex items-center gap-3">
            <IconInfoCircle className="text-warning" size={24} />
            <h3 className="text-xl font-semibold">Clases Habilitadas</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-base-100 rounded-lg p-4">
              <h4 className="mb-2 font-semibold">Categoría C y E.1</h4>
              <p className="text-sm">C.1 - C.2 - C.3 - E.1</p>
            </div>
            <div className="bg-base-100 rounded-lg p-4">
              <h4 className="mb-2 font-semibold">Categoría D y E.2</h4>
              <p className="text-sm">D.1 - D.2 - D.3 - E.2</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="mt-8">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h3 className="mb-4 text-2xl font-semibold">Requisitos</h3>
          <p className="text-base-content/80 mb-6">
            A continuación se detallan los requisitos establecidos por la Agencia Nacional de
            Seguridad Vial (Decreto 196/2025 y disposición 54/2025).
          </p>
        </div>
      </section>

      {/* Digital License */}
      <section className="mt-8">
        <div className="from-primary/10 to-secondary/10 rounded-lg bg-linear-to-r p-6 shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <IconClipboardCheck className="text-primary" size={32} />
            <h3 className="text-2xl font-semibold">¿Cómo obtener tu licencia digital?</h3>
          </div>

          <div className="space-y-4">
            <p className="text-base">
              Ingresa en Mi Argentina Seguridad Vial y seguí todos los pasos que allí se detallan
              tanto para
              <strong> RENOVAR</strong> como para <strong>INCORPORAR CLASES PROFESIONALES</strong>.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="https://lncargentina.seguridadvial.gob.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary gap-2 shadow-md transition-transform hover:scale-105"
              >
                <IconExternalLink size={20} />
                Mi Argentina Seguridad Vial
              </a>

              <a
                href="https://youtu.be/0YY-WsyDzD8?si=2SlTtC7liVWFTqQN"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary gap-2 shadow-md transition-transform hover:scale-105"
              >
                <IconExternalLink size={20} />
                Video Tutorial
              </a>
            </div>

            <div className="alert alert-info">
              <IconInfoCircle size={20} />
              <span>
                Los prestadores para realizar tanto los Cursos de Capacitación como el Exámen
                Psicofísico, deben estar habilitados por la Agencia Nacional de Seguridad Vial.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Printed License */}
      <section className="mt-8">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <div className="mb-4 flex items-center gap-3">
            <IconPrinter className="text-secondary" size={32} />
            <h3 className="text-2xl font-semibold">¿Cómo obtener tu licencia impresa?</h3>
          </div>

          <div className="steps steps-vertical lg:steps-horizontal">
            <div className="step step-primary">
              <div className="step-content">
                <h4 className="font-semibold">Paso 1</h4>
                <p className="text-sm">
                  Obtener la licencia digital en Mi Argentina como se indicó anteriormente.
                </p>
              </div>
            </div>
            <div className="step step-primary">
              <div className="step-content">
                <h4 className="font-semibold">Paso 2</h4>
                <p className="text-sm">
                  Presentarse en el Centro Emisor de Licencia y solicitar su impresión.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Providers */}
      <section className="mt-8">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <div className="mb-6 flex items-center gap-3">
            <IconSchool className="text-accent" size={32} />
            <h3 className="text-2xl font-semibold">Prestadores Habilitados para Capacitaciones</h3>
          </div>

          <div className="space-y-6">
            {/* CETACER */}
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <div className="card-title text-primary">
                  <IconTruckDelivery size={24} />
                  CLASES C - D.2 - D.3 - E.1
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">CETACER</h4>
                    <p className="text-base-content/70 text-sm">
                      (Cámara Empresarial de Transporte Automotor de cargas de Entre Ríos)
                    </p>
                    <p className="text-sm">Transporte de cargas generales y peligrosas</p>
                  </div>

                  <div className="divider my-2"></div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm">
                        <strong>Dirección:</strong>
                        <br />
                        Alte. Brown 2185, Paraná (E.R.)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>Teléfonos:</strong>
                        <br />
                        0343 - 4330742 / 4332621 / 4332622
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-sm">
                        <IconBrandWhatsapp size={16} className="text-success" />
                        <strong>WhatsApp:</strong>
                        <a
                          href="https://wa.me/+543434695896"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-success font-medium hover:underline"
                        >
                          343 - 154695896
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* D1 and E2 Classes */}
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <div className="card-title text-secondary">
                  <IconSchool size={24} />
                  CLASES D.1 - E.2
                </div>
                <div className="space-y-3">
                  <p>Certificado del Curso de la Agencia Nacional de Seguridad Vial.</p>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    <li>
                      <strong>Auto</strong> (para Renovaciones)
                    </li>
                    <li>
                      <strong>Estrellas Amarillas</strong> (solo para Licencias Nuevas)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Psychophysical Exam Providers */}
      <section className="mt-8">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <div className="mb-6 flex items-center gap-3">
            <IconClipboardCheck className="text-info" size={32} />
            <h3 className="text-2xl font-semibold">
              Prestadores Habilitados para Exámen Psicofísico
            </h3>
          </div>

          <div className="space-y-6">
            {/* Sindicato de Camioneros */}
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h4 className="card-title text-primary">Sindicato de Camioneros</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-base-100 rounded-lg p-4">
                    <h5 className="font-semibold">SANTA FE CAPITAL</h5>
                    <p className="text-sm">Rivadavia 2845</p>
                    <p className="text-sm">Tel: 0342 - 4026252</p>
                  </div>
                  <div className="bg-base-100 rounded-lg p-4">
                    <h5 className="font-semibold">SANTA FE ROSARIO</h5>
                    <p className="text-sm">La Paz 1471</p>
                    <p className="text-sm">Tel: 0341 - 4823445</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Clínicas Privadas */}
            <div className="card bg-base-200 shadow">
              <div className="card-body">
                <h4 className="card-title text-secondary">Clínicas Privadas</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-base-100 rounded-lg p-4">
                    <h5 className="font-semibold">SANTA FE CIBYS</h5>
                    <p className="text-sm">Avda. López y Planes 4917</p>
                    <p className="text-sm">Tel: 0342 - 4504857</p>
                    <p className="flex items-center gap-1 text-sm">
                      <IconBrandWhatsapp size={16} className="text-success" />
                      <strong>WhatsApp:</strong>
                      <a
                        href="https://wa.me/+543426309603"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-success font-medium hover:underline"
                      >
                        0342 - 156309603
                      </a>
                    </p>
                  </div>
                  <div className="bg-base-100 rounded-lg p-4">
                    <h5 className="font-semibold">GUALEGUAYCHÚ</h5>
                    <p className="text-sm">Sanatorio Luis Sueyro</p>
                    <p className="text-sm">Ayacucho 229</p>
                    <p className="text-sm">Tel: 03446 - 432644</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="mt-8 text-center">
        <Link href="/tramites/licencia" className="btn btn-outline btn-primary gap-2">
          <IconArrowLeft size={20} />
          Volver a Licencias de Conducir
        </Link>
      </section>
    </main>
  )
}
