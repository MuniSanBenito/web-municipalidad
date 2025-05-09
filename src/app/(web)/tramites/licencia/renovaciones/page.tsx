export default function RenovacionLicenciaPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <section className="hero bg-base-200 rounded-lg p-4 text-center shadow-lg md:p-10">
        <div className="hero-content">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold md:text-5xl">Licencia Nacional de Conducir</h1>
            <h2 className="mt-4 text-2xl font-semibold md:text-3xl">Renovaciones</h2>
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
              Certificado de Reincidencia (Solo para renovación clase D)<br />
              cervantes 1104 o correo argentino (25 de mayo y monte caseros – Paraná, Entre Ríos).<br />
              También puede realizarse de manera online entrando a la web de Mi Argentina en el{' '}
              <a 
                href="https://www.argentina.gob.ar/servicio/solicitar-certificado-de-antecedentes-penales-con-usuario-de-mi-argentina"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                siguiente link
              </a>
            </li>
            <li>Licencia Anterior. (Si la tiene extraviada deberá presentar una Denuncia de extravío).</li>
            <li>Es requisito obligatorio saber Leer y Escribir.</li>
            <li>Las Personas mayores a 65 años deben rendir examen de conducción anualmente.</li>
            <li>En caso de tener licencia de otra localidad, debe presentar el Certificación de legalidad.</li>
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
            <li><strong>Examen Psicofísico:</strong> Obligatorio, con turnos una vez iniciados el trámite.</li>
          </ul>

          <div className="mt-6 p-4 bg-warning/20 rounded-lg">
            <p className="text-warning-content font-medium">
              Los registros que tengan vencimiento mayor a 90 días corridos. Vuelven a un trámite ORIGINAL.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}