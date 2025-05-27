# Sitio Web de la Municipalidad de San Benito

Portal oficial de la ciudad de San Benito, Entre Ríos

## 📋 Descripción

Este proyecto es el sitio web oficial de la Municipalidad de San Benito, Entre Ríos. Desarrollado con tecnologías modernas, ofrece a los ciudadanos acceso a información municipal, servicios, noticias y recursos de transparencia.

## ✨ Características principales

- 📱 Diseño responsivo : Adaptado para todos los dispositivos (móviles, tablets y escritorio)
- 🏛️ Secciones informativas : Información sobre la ciudad, gobierno, servicios y más
- 📰 Portal de noticias : Actualizaciones sobre eventos y anuncios municipales
- 🔍 Transparencia : Acceso a documentos oficiales, estructura municipal y rendición de cuentas
- 🗺️ Mapa de barrios : Visualización interactiva de los barrios de San Benito

## 🛠️ Tecnologías utilizadas

- Frontend : Next.js , React , Tailwind CSS
- Backend : API con Payload CMS
- Base de datos : MongoDB
- Almacenamiento : Sistema de archivos local (localDisk)

## 🗂️ Estructura del proyecto

El sitio web está organizado en las siguientes secciones principales:

Sección Descripción Inicio Página principal con información destacada Nuestra Ciudad Información sobre San Benito, su historia y barrios Gobierno Estructura del gobierno municipal y autoridades HCD Información sobre el Honorable Concejo Deliberante Transparencia Documentos oficiales, estructura municipal y rendición de cuentas Noticias Portal de noticias y anuncios municipales Servicios Información sobre servicios municipales Contacto Formulario de contacto y datos de la municipalidad

## 📋 Requisitos del sistema

- Node.js 18.x o superior
- MongoDB 5.x o superior
- BUN

## 🚀 Instalación y configuración

1. Clonar el repositorio :

   ```bash
   git clone https://github.com/municipalidad-san-benito/web-municipalidad.git
   cd web-municipalidad
   ```

   ```

   ```

2. Instalar dependencias :

   ```bash
   bun install
   ```

3. Configurar variables de entorno :

   - Crear un archivo .env en la raíz del proyecto
   - Configurar la conexión a MongoDB y otras variables necesarias:

     ```plaintext
     MONGODB_URI=mongodb://localhost:27017/san-benito
     PAYLOAD_SECRET=tu_secret_aqui
     ```

     ```

     ```

4. Iniciar el servidor de desarrollo :

   ```bash
   bun dev
   ```

5. Acceder a la aplicación en http://localhost:3000

## 🌐 Despliegue en producción

Para desplegar en producción:

```bash
bun run build
bun start
```

## 🔧 Mantenimiento

Para actualizar el contenido del sitio, se puede acceder al panel de administración en /admin con las credenciales correspondientes.

## 📄 Licencia

Este proyecto es propiedad de la Municipalidad de San Benito, Entre Ríos. Todos los derechos reservados.

## 📞 Contacto

Para más información, contactar a la Asesoría de Modernización de la Municipalidad de San Benito.

📧 Email: Modernizacion@sanbenito.gob.ar 🌐 Web: www.sanbenito.gob.ar

Desarrollado con ❤️ para los ciudadanos de San Benito
