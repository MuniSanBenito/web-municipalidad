# 🏛️ Portal Oficial - Municipalidad de San Benito

Portal oficial de la ciudad de San Benito, Entre Ríos

## 📋 Descripción

Este proyecto es el sitio web oficial de la Municipalidad de San Benito, Entre Ríos. Desarrollado con tecnologías modernas, ofrece a los ciudadanos acceso a información municipal, servicios, noticias, transparencia y gestión administrativa integral.

## ✨ Características principales

- 📱 **Diseño responsivo**: Adaptado para todos los dispositivos (móviles, tablets y escritorio)
- 🏛️ **Portal institucional**: Información sobre la ciudad, gobierno, autoridades y estructura municipal
- 📰 **Sistema de noticias**: Portal de noticias con gestión de contenido dinámico
- 🔍 **Portal de transparencia**: Acceso a documentos oficiales, contabilidad, licitaciones, concursos y rendición de cuentas
- 📋 **Gestión de trámites**: Sistema integral para trámites municipales, habilitaciones y licencias
- 🗺️ **Información ciudadana**: Mapa de barrios, líneas de colectivos y servicios municipales
- 👥 **Sistema de usuarios**: Gestión de perfiles y permisos diferenciados
- 📊 **Panel administrativo**: CMS completo para gestión de contenido
- 🔐 **Sistema de permisos**: Control granular de acceso por roles
<!-- - 📧 **Sistema de notificaciones**: Integración con email para comunicaciones -->

## 🛠️ Tecnologías utilizadas

### Frontend

- **Framework**: Next.js 15.3.0 con React 19.1.0
- **Estilos**: Tailwind CSS 4.1.3 + DaisyUI 5.0.19
- **Iconos**: Tabler Icons React
- **Temas**: Next Themes para modo claro/oscuro

### Backend

- **CMS**: Payload CMS 3.34.0
- **Base de datos**: MongoDB con Mongoose
- **Almacenamiento**: Cloudflare R2 (S3 compatible)
- **Email**: Nodemailer para notificaciones
- **Editor**: Lexical Rich Text Editor

### Desarrollo y Despliegue

- **Runtime**: Bun 1.2.9
- **Lenguaje**: TypeScript 5.8.3
- **Linting**: ESLint + Prettier
- **Contenedores**: Docker
- **Internacionalización**: Español como idioma principal

## 🗂️ Estructura del proyecto

### Secciones principales del sitio web:

| Sección            | Descripción                   | Funcionalidades                                                    |
| ------------------ | ----------------------------- | ------------------------------------------------------------------ |
| **Inicio**         | Página principal              | Información destacada y accesos rápidos                            |
| **Nuestra Ciudad** | Información municipal         | Historia, gobierno, bandera, líneas de colectivos                  |
| **HCD**            | Honorable Concejo Deliberante | Información sobre el concejo deliberante                           |
| **Transparencia**  | Portal de transparencia       | Contabilidad, licitaciones, concursos, memorias, intimaciones, IDE |
| **Noticias**       | Portal de noticias            | Sistema de noticias con categorías y gestión                       |
| **Trámites**       | Servicios municipales         | Habilitaciones, licencias, obras privadas, rentas, mesa de entrada |
| **Usuario**        | Gestión de perfiles           | Sistema de autenticación y perfiles                                |

### Colecciones de datos disponibles:

- **Usuarios**: Gestión de usuarios y permisos
- **Noticias**: Sistema de noticias y anuncios
- **Curriculums**: Gestión de CVs para empleos municipales
- **Eventos**: Calendario de eventos municipales
- **Habilitaciones**: Trámites de habilitaciones comerciales
- **Licitaciones**: Procesos licitatorios
- **Concursos**: Concursos públicos
- **Memorias**: Memorias anuales municipales
- **Contabilidad**: Información contable y balances
- **Intimaciones**: Intimaciones públicas
- **Ubicaciones**: Gestión de ubicaciones geográficas
- **Balances Mensuales**: Información financiera mensual

## 📋 Requisitos del sistema

- **Node.js**: 18.x o superior
- **Bun**: 1.2.9 (recomendado)
- **MongoDB**: 5.x o superior
- **Cloudflare R2**: Para almacenamiento de archivos (opcional, se puede usar almacenamiento local)

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

5. Acceder a la aplicación:
   - Sitio web : http://localhost:3000
   - Panel administrativo : http://localhost:3000/admin

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

