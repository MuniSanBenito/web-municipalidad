# Guía de SEO para la Web Municipal

## Resumen de Mejoras Implementadas

### 1. Metadatos Estructurados

- **Layout principal** con metadatos completos de Open Graph, Twitter Cards y robots
- **Sistema reutilizable** de generación de metadatos en `/src/web/lib/metadata.ts`
- **Páginas específicas** con metadatos optimizados para cada sección

### 2. Archivos de SEO Técnico

- **Sitemap dinámico** (`/sitemap.xml`) que incluye todas las páginas y noticias
- **Robots.txt** (`/robots.txt`) optimizado para crawlers
- **Manifest.json** mejorado para PWA

### 3. Datos Estructurados (JSON-LD)

- **Schema.org** para WebSite, GovernmentOrganization y Article
- **Implementación automática** en páginas principales y noticias

## Variables de Entorno Recomendadas

Añadir al archivo `.env.local`:

```env
# SEO
GOOGLE_SITE_VERIFICATION=tu_codigo_de_verificacion_google
NEXT_PUBLIC_SITE_URL=https://sanbenito.gob.ar

# Analytics (ya tienes Umami configurado)
NEXT_PUBLIC_UMAMI_TRACKING_CODE=tu_codigo_umami
```

## Siguientes Pasos Recomendados

### 1. Configurar Google Search Console

1. Verificar la propiedad del sitio con `GOOGLE_SITE_VERIFICATION`
2. Enviar el sitemap: `https://sanbenito.gob.ar/sitemap.xml`
3. Monitorear errores de indexación

### 2. Optimizar Imágenes

- Crear imagen Open Graph default (`/public/images/og-image.png`) de 1200x630px
- Añadir atributos `alt` descriptivos a todas las imágenes
- Optimizar tamaños y formatos (WebP cuando sea posible)

### 3. Implementar breadcrumbs

```tsx
// Ejemplo para páginas internas
<nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li>
      <Link href="/">Inicio</Link>
    </li>
    <li>
      <Link href="/tramites">Trámites</Link>
    </li>
    <li aria-current="page">Licencia de Conducir</li>
  </ol>
</nav>
```

### 4. Mejorar Velocidad de Carga

- Implementar lazy loading para imágenes
- Optimizar fuentes con `next/font`
- Considerar Service Worker para cache

### 5. Accesibilidad (también ayuda al SEO)

- Verificar contraste de colores
- Añadir `aria-labels` descriptivos
- Estructura de headings semántica (h1, h2, h3...)

### 6. Páginas Adicionales a Optimizar

Las siguientes páginas podrían beneficiarse de metadatos específicos:

- `/agenda` - eventos y actividades
- `/nuestra-ciudad/*` - información turística
- `/tramites/*` - cada trámite específico
- `/transparencia/*` - cada sección de transparencia

## Monitoreo y Métricas

### Herramientas Recomendadas

1. **Google Search Console** - errores de indexación, posiciones
2. **Google PageSpeed Insights** - velocidad y Core Web Vitals
3. **Google Analytics 4** - comportamiento de usuarios
4. **Bing Webmaster Tools** - indexación en Bing
5. **Umami** (ya implementado) - analytics privacy-friendly

### Métricas Clave a Monitorear

- **Core Web Vitals**: LCP, FID, CLS
- **Posiciones de búsqueda** para keywords municipales
- **Tiempo de carga** de páginas principales
- **Tasa de rebote** por página
- **Páginas más visitadas**

## Schema.org para Futuro

Considerar implementar estos schemas adicionales:

### Eventos (para /agenda)

```json
{
  "@type": "Event",
  "name": "Evento Municipal",
  "startDate": "2025-01-15T10:00",
  "location": {
    "@type": "Place",
    "name": "San Benito",
    "address": "San Benito, Entre Ríos, Argentina"
  }
}
```

### FAQPage (para páginas de trámites)

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cómo tramito mi licencia de conducir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Para tramitar tu licencia..."
      }
    }
  ]
}
```

## Checklist de SEO

### ✅ Completado

- [x] Metadatos básicos en layout principal
- [x] Open Graph y Twitter Cards
- [x] Sitemap dinámico
- [x] Robots.txt
- [x] Datos estructurados básicos
- [x] Metadatos específicos por página
- [x] Manifest.json optimizado

### 📋 Pendiente (Recomendado)

- [ ] Imagen Open Graph default
- [ ] Google Search Console
- [ ] Breadcrumbs
- [ ] Schema para eventos
- [ ] Optimización de imágenes
- [ ] Tests de velocidad
- [ ] Análisis de keywords locales

## Contacto SEO

Para dudas sobre la implementación SEO, revisar:

- Documentación de Next.js: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Schema.org: https://schema.org/
- Google Search Console: https://search.google.com/search-console
