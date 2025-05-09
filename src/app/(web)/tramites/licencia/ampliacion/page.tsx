
export default function AmpliacionLicenciaPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Licencia Nacional de Conducir</h1>
            <h2 className="mt-4 text-2xl font-semibold md:text-3xl">Trámite de Ampliación</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-6">
        <div className="bg-base-100 rounded-lg p-6 shadow-md">
          <h2 className="mb-6 text-2xl font-semibold md:text-3xl">Requisitos</h2>
          
          <ul className="list-disc space-y-4 pl-6">
            <li>DNI y Fotocopia del mismo.</li>
            <li>Constancia de CUIL.</li>
            <li>
              En caso de ser menor de 18 años, deberá presentarse acompañado por el padre, madre o tutor complementando la AUTORIZACIÓN DEL 
              REPRESENTANTE LEGAL (ley 2.579) a realizarse en el JUZGADO DE PAZ (25 de mayo 960- San Benito) con fotocopia de libreta de familia o 
              partida de nacimiento.
            </li>
            <li>
              Certificado de Reincidencia (Solo para ampliación a clase D)<br />
              cervantes 1104 o correo argentino (25 de mayo y monte caseros – Paraná, Entre Ríos).<br />
              También puede realizarse de manera online entrando a la web de Mi Argentina en el siguiente link:{' '}
              <a 
                href="https://www.argentina.gob.ar/servicio/solicitar-certificado-de-antecedentes-penales-con-usuario-de-mi-argentina"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar certificado de antecedentes penales
              </a>
            </li>
            <li>Es requisito obligatorio saber leer para solicitar clases A y B, y para las clases C, D Y E es requisito saber leer y escribir.</li>
            <li>Se deberá abonar en el momento de hacer el trámite el valor de la Tasa Municipal.</li>
            <li>
              Se debe presentar el Certificado Nacional de Antecedentes de Tránsito – CENAT, el cual deberá descargarlo a través del{' '}
              <a 
                href="https://boletadepago.seguridadvial.gob.ar/"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                siguiente link
              </a>{' '}
              y pagarlo de acuerdo a los centros de pago establecidos.
            </li>
            <li><strong>Examen Psicofísico: </strong>Obligatorio, con turnos una vez iniciados el trámite.</li>
            <li>
              <strong>Curso de Educación Vial:</strong>
              <ul className="list-disc mt-2 pl-6 space-y-2">
                <li>
                  Presencial: Lunes de 8:00 a 10:00 horas Para autos y de 10:00 a 12:00 horas para motos, con turnos una vez iniciado el trámite.
                </li>
                <li>
                  Deberá presentar el Certificado del Curso de Educación Vial el cual podrá acceder a través del{' '}
                  <a 
                    href="http://curso.seguridadvial.gob.ar/"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    siguiente link
                  </a>.
                </li>
                <li>
                  Para jóvenes de entre 16 y 21 años inclusive, que tramiten por primera vez la Licencia Nacional para conducir automóvil y/o 
                  motocicleta. Cuando sacás por primera vez la Licencia Nacional de Conducir, o cuando la misma vuelve a un trámite original deberá 
                  realizar el siguiente curso:{' '}
                  <a 
                    href="https://mpl.seguridadvial.gob.ar/"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Curso MPL
                  </a>.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}