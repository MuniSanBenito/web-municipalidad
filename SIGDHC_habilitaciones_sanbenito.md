# SIGDHC — Sistema Interáreas de Gestión Digital de Habilitaciones Comerciales

> **Municipio de San Benito** · Optimización y digitalización de la etapa inicial de Habilitaciones Comerciales

---

## Hipótesis de Cambio

Si el Municipio de San Benito estandariza digitalmente los requisitos iniciales y viabiliza que las áreas compartan información en tiempo real, se eliminará la duplicidad de tareas, se optimizarán los tiempos de espera y se incrementará la transparencia y la confianza ciudadana en la gestión pública.

---

## 1. Diagnóstico Situacional — Nudos Críticos

| Nudo Crítico                  | Descripción                                                                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Fragmentación inter-áreas** | Inexistencia de un canal formal y estandarizado para el flujo de información entre Obras Privadas, Habilitaciones Comerciales y Rentas. |
| **Dependencia del papel**     | La "carpeta viajera" física impide el seguimiento en tiempo real y genera pérdida de trazabilidad.                                      |
| **Incertidumbre del usuario** | Falta de claridad sobre requisitos según el rubro comercial, generando rechazos, subsanaciones y re-ingresos de trámites.               |

---

## 2. Objetivo General

Transformar el proceso de inicio de habilitaciones comerciales en una gestión pública **ágil, trazable y desburocratizada**, suprimiendo el soporte papel en la etapa de admisión y garantizando la interoperabilidad entre Obras Privadas, Habilitaciones Comerciales y Rentas mediante un circuito digital.

### Objetivos Específicos

1. Unificar los requisitos de Obras Privadas y Habilitaciones en un **legajo digital integrado**.
2. Disminuir los tiempos de tramitación interna eliminando el traslado físico de la carpeta.
3. Implementar un sistema de **notificaciones al solicitante** para reducir la incertidumbre y las instancias presenciales.

### Metas y Destinatarios

- **Meta:** Lograr que las nuevas solicitudes inicien mediante formulario web en el primer semestre de implementación.
- **Beneficiarios externos:** Comerciantes y emprendedores de San Benito.
- **Beneficiarios internos:** Personal técnico-operativo de las áreas municipales intervinientes.

---

## 3. Componentes Operativos

### Componente A — Front-Office: Protocolo de Respuesta Unificado

Estrategia de comunicación multicanal y estandarizada para guiar al ciudadano sobre el orden secuencial del trámite.

#### Canales disponibles

| Área               | Consultas                                               | WhatsApp   | Correo                              |
| ------------------ | ------------------------------------------------------- | ---------- | ----------------------------------- |
| **Obras Privadas** | Planos, factibilidad edilicia, Permiso de Uso           | 3434681033 | opriv.sanbenito@gmail.com           |
| **Habilitaciones** | Requisitos por rubro, Seguridad e Higiene, Bromatología | 3434537310 | habilitaciones@munisanbenito.gov.ar |
| **Rentas**         | Libre deuda, tasas municipales, sellados                | 3436127015 | rentas@munisanbenito.gov.ar         |

> **Recomendación estratégica:** Antes de presentar documentación, comunicarse primero con Obras Privadas para confirmar la aptitud regulatoria del rubro respecto al local seleccionado.

#### Mensaje de bienvenida automático (WhatsApp institucional)

```
Estimado/a contribuyente, le damos la bienvenida al área de Habilitaciones
Comerciales de la Municipalidad de San Benito.

Para iniciar el trámite de Alta de Comercio por primera vez, el circuito
administrativo requiere comenzar obligatoriamente con la verificación de
Permiso de Uso.

1. OBRAS PRIVADAS — WhatsApp: 3434681033 | opriv.sanbenito@gmail.com
2. HABILITACIONES — WhatsApp: 3434537310 | habilitaciones@munisanbenito.gov.ar
3. RENTAS — WhatsApp: 3436127015 | rentas@munisanbenito.gov.ar
```

---

### Componente B — Back-Office: Arquitectura de Validación Secuencial

Modelo por etapas diferenciadas basado en herramientas colaborativas en la nube (cero costo de licenciamiento).

---

#### FASE I — Permiso de Uso _(Obras Privadas)_

**Responsable:** Obras Privadas  
**Cuándo:** Antes de iniciar cualquier actividad comercial.

1. El ciudadano contacta a Obras Privadas para verificar la aptitud regulatoria del rubro respecto al local seleccionado (zonificación, condiciones edilicias).
2. Obras Privadas emite el **Formulario de Permiso de Uso** aprobado.
3. **Si se deniega:** el trámite queda bloqueado hasta resolver lo indicado por Obras Privadas. No se puede avanzar.
4. Se notifica al solicitante el resultado por correo o WhatsApp.

> **Lógica clave:** Previene que el ciudadano gestione documentación en locales que no cumplen condiciones edilicias básicas.

---

#### FASE II — Habilitación Comercial _(Habilitaciones y Bromatología)_

**Responsable:** Habilitaciones Comerciales y Bromatología  
**Condición de inicio:** Permiso de Uso aprobado por Obras Privadas.

Los requisitos se presentan **una vez obtenido el Permiso de Uso**.

##### Requisitos generales y obligatorios

| #   | Documento                                                                                                                                                                     |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Formulario de solicitud inicial (disponible en adjuntos de la web)                                                                                                            |
| 2   | Formulario de Permiso de Uso **aprobado** por Obras Privadas                                                                                                                  |
| 3   | Estado de Deuda del inmueble — Libre Deuda (Rentas Municipal)                                                                                                                 |
| 4   | Sellado de Carpeta Técnica de Habilitaciones (consultar monto vigente)                                                                                                        |
| 5   | Fotocopia DNI y CUIT (constancia ARCA). Para sociedades/personas jurídicas: contrato social o estatuto legalizado + certificación de personería jurídica vigente o en trámite |
| 6   | Fotocopia de Boleta de Tasa Inmobiliaria (Provincial y Municipal)                                                                                                             |
| 7   | Dos cuadernos tapa dura ~42 hojas (Libro de Quejas + Libro de Habilitaciones)                                                                                                 |

##### Requisitos específicos según rubro _(adicionales a los generales)_

| Requisito                                                                | Aplica a                                                                                                                                |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Libreta Sanitaria o Carnet de Manipulador de Alimentos                   | Peluqueros, transporte, rubros alimenticios                                                                                             |
| Informe Técnico Bromatológico (profesional matriculado)                  | Rotiserías, pollerías, carnicerías, pescaderías, panaderías, pastelerías y similares (elaboran/fraccionan alimentos en el lugar)        |
| Informe Técnico de Seguridad e Higiene Laboral (profesional matriculado) | Salones de eventos, bares, restaurantes, establecimientos educativos, gimnasios y espacios de permanencia de personas; locales > 100 m² |
| Certificado de Buena Conducta                                            | Eventos, bares, hoteles, actividades con menores                                                                                        |
| Fotocopia certificada de título de idoneidad                             | Profesionales habilitados                                                                                                               |
| Plano de evacuación                                                      | Establecimientos > 50 m²                                                                                                                |
| Certificación de Medio Ambiente (Provincia)                              | Generadores de residuos peligrosos: profesionales de la salud, talleres mecánicos, agroinsumos, baterías, pinturas, desarmaderos, etc.  |

##### Requisitos mínimos de Higiene y Seguridad _(Ley N° 19.587 y C.A.A. Ley N° 18.284)_

- Matafuegos · Luces de emergencia · Plano de evacuación · Botiquín de primeros auxilios
- Sanitarios en buenas condiciones (separados por sexo según rubro) · Agua potable · Desagües
- Cestos de residuos: elevado a 1,50 m externo + con tapa interno
- Iluminación adecuada y protegida · Ventilación adecuada
- Señalización general (salidas de emergencia, prohibido fumar)
- Instalación eléctrica en buen estado · Disyuntor de seguridad · Sin cables colgantes
- Vestimenta reglamentaria según rubro · Pisos impermeables · Paredes y techos en buen estado
- Control de plagas eficaz y continuo (rubro alimentos: mensual)
- Rotiserías, comedores, bares y similares: adecuarse al C.A.A. Ley 18.284
- Seguro de RC cuando corresponda: salones de eventos, bares, gimnasios, clubes, estaciones de servicio, iglesias, colegios, parques de diversiones, etc.
- Respetar horarios según rubro · Evitar ruidos molestos — Ordenanza N° 355/13 HCDSB

**Escenarios de resolución:**

| Escenario                        | Descripción                                                                                                             |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **A — Conformidad Absoluta**     | El comercio cumple todas las condiciones. Se emite la Resolución y el Certificado de Habilitación.                      |
| **B — Conformidad Condicionada** | Se detallan observaciones y se otorga plazo de subsanación. Se puede emitir **Alta Provisoria sujeta a re-inspección**. |

> **El trámite de Habilitación Comercial finaliza una vez emitida la Resolución y el Certificado de aprobación.**

##### Documentos adjuntos disponibles en la web

- `Formulario 1 INICIO.pdf`
- `Instrucciones para Informe Técnico Bromatológico.pdf`
- `Instrucciones de Informe Técnico de Higiene y Seguridad.pdf`

##### Contacto Habilitaciones

- 📧 habilitaciones@munisanbenito.gov.ar
- 📱 WhatsApp: 3434537319

---

#### FASE III — Alta Fiscal _(Rentas)_

**Responsable:** Rentas  
**Condición de inicio:** Aprobación de Fase I y Fase II.

1. Rentas verifica que el comerciante cuente con las dos pre-validaciones aprobadas.
2. Se verifica **Libre Deuda del inmueble** (ya presentada en Fase II, se confirma vigencia).
3. Se confecciona el **Alta Comercial** y la firma de resolución por el Secretario de Gobierno.
4. Se entrega el **Certificado de Habilitación**.
5. Se capacita al comerciante para declaraciones juradas y cumplimiento mensual de la Tasa Comercial.

> **Punto pendiente de definición institucional:** Confirmar si Fase III requiere presentación física de la carpeta completa o si el legajo digital es suficiente (requiere acto administrativo — ver Sección 4, Viabilidad Administrativa).

---

#### Tablero de Control Interáreas

| Fase         | Responsable    | Acción Requerida                      | Estado de Visibilidad                            |
| ------------ | -------------- | ------------------------------------- | ------------------------------------------------ |
| **Fase I**   | Obras Privadas | Validar zonificación y edificación    | En proceso _(Habilitaciones solo lee, no edita)_ |
| **Fase II**  | Habilitaciones | Validar seguridad e higiene por rubro | 🔒 Bloqueado _(espera aprobación Fase I)_        |
| **Fase III** | Rentas         | Alta fiscal y emisión de tasas        | 🔒 Bloqueado _(espera aprobación Fase I y II)_   |

---

## 4. Viabilidad y Factibilidad Institucional

| Dimensión          | Detalle                                                                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Administrativa** | Encuadre en Ordenanza Municipal N° 0389/14. Requiere un acto administrativo interno (decreto/resolución) que declare la validez jurídica de los soportes digitales.                        |
| **Técnica**        | Infraestructura preexistente. Herramientas de cero costo en licencias (formularios web y hojas de cálculo colaborativas). Implementación estimada en **2–3 semanas** para fase de pruebas. |
| **Social**         | Absorbe demanda histórica del sector comercial. Se prevé programa básico de capacitación interna para mitigar la resistencia al cambio y la cultura del papel.                             |

---

## 5. Valor Público e Impacto

| Valor              | Descripción                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Trazabilidad**   | Auditoría en tiempo real del estado del expediente, identificando área responsable y agente que modificó el estado.                           |
| **Sostenibilidad** | Reduce la huella de carbono institucional mediante desmaterialización de expedientes y eliminación de traslados presenciales reiterados.      |
| **Escalabilidad**  | Delimitado a "Altas por primera vez", opera como laboratorio piloto con metodologías replicables a renovaciones y otros trámites municipales. |

---

## TO-DO — Implementación Web

- [ ] Publicar formulario de inicio (Google Form o equivalente) en la web municipal
- [ ] Crear sección "Iniciá tu habilitación" con directorio de contactos técnicos
- [ ] Configurar respuesta automática en WhatsApp institucional de Habilitaciones
- [ ] Armar planilla compartida en Drive con estados de Fase I, II y III
- [ ] Definir con referente si Fase III requiere presentación física de carpeta
- [ ] Redactar acto administrativo para validez jurídica del soporte digital
- [ ] Diseñar programa de capacitación interna para el personal de las tres áreas
- [ ] Definir dominio/sección web para la Ventanilla Digital

---

_Proyecto desarrollado por el **Grupo 22** — Municipio de San Benito._  
_Integrantes: María Gladys Noemí Grinovero, Belén Melina Ileana Godoy, Lorena Alejandra Perez, Héctor Ariel Garay, Verónica Vanina Noguera, Luis Hérnan Dalinger, Damaris Nuñez, Melissa Soledad Yonas Fischer, Tablada Fabiana Alejandra, Claudia Patricia Daniela Beber._
