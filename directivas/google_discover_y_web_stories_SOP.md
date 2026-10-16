# SOP: Estándar y Arquitectura para Google Discover y Google Web Stories en CSCloudSolutions

## Objetivo
Establecer el procedimiento estándar y la arquitectura técnica para posicionar contenidos en el feed de **Google Discover** y en el carrusel visual de **Google Web Stories** de forma 100% orgánica, dentro del ecosistema Next.js (App Router) de `cscloudsolutions.com.ar`.

---

## Ámbito de Aplicación
- Sistema de Blog (`src/content/blog/` y `src/app/[locale]/blog/[slug]/page.tsx`).
- Sistema de Web Stories (`src/content/stories/` y `src/app/stories/[slug]/route.ts`).
- Generación de Metadatos y SEO (`src/lib/seo.ts` y `src/app/[locale]/layout.tsx`).
- Rastreo e Indexación (`src/app/sitemap.ts` y `src/app/robots.ts`).

---

## 1. Requisitos Técnicos Obligatorios para Google Discover (Feed Móvil)

Google Discover no opera mediante búsquedas por palabras clave, sino por coincidencia de intereses del usuario con contenidos de alto impacto visual y autoridad técnica. Para que un artículo sea elegible:

### A. Directiva de Robots y Previsualización de Imagen
- **Configuración obligatoria:**
  ```ts
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large', // OBLIGATORIO PARA DISCOVER
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  }
  ```
- **Tamaño de imagen destacada:** Mínimo **1200 px** de ancho (proporción 16:9, ej. 1200x675 px). Google descarta automáticamente miniaturas inferiores a 1200 px en Discover.

### B. Datos Estructurados y Autoría E-E-A-T
- Usar esquema JSON-LD `TechArticle` o `BlogPosting`.
- La entidad `author` de tipo `Person` debe incluir:
  - `name`: Nombre del autor (ej. "Manuel Chavez").
  - `jobTitle`: Especialidad técnica (ej. "Cloud & FinOps Specialist").
  - `sameAs`: Enlace al perfil verificado en LinkedIn.
  - `publisher`: Organización `CSCloudSolutions` con su logotipo oficial.

---

## 2. Requisitos Técnicos Obligatorios para Google Web Stories (AMP Nativo)

Las Web Stories son documentos bajo el estándar **AMP (Accelerated Mobile Pages)** específico (`amp-story`).

### A. Arquitectura en Next.js App Router (Route Handler)
- **Ruta:** `src/app/stories/[slug]/route.ts`.
- **Prohibición de React Client Scripts:** Next.js no puede renderizar un `page.tsx` estándar para Web Stories porque inyecta scripts de cliente (`/_next/static/...`) que invalidan el validador AMP de Google.
- **Implementación:** Se utiliza un **Route Handler (GET)** que devuelve un documento HTML puro como `NextResponse` con:
  - Header: `Content-Type: text/html; charset=utf-8`.
  - Header de caché: `Cache-Control: public, s-maxage=86400, stale-while-revalidate=3600`.

### B. Elementos Obligatorios del Marcado AMP
1. `<!doctype html>` y `<html ⚡ lang="es">` (o `<html amp lang="es">`).
2. Script AMP Core: `<script async src="https://cdn.ampproject.org/v0.js"></script>`.
3. Script AMP Story: `<script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>`.
4. Estilos `<style amp-boilerplate>` exactos e inmutables.
5. Estilos propios dentro de `<style amp-custom>`.
6. Tag raíz:
   ```html
   <amp-story standalone
       title="..."
       publisher="CSCloudSolutions"
       publisher-logo-src="https://cscloudsolutions.com.ar/images/Logo_CSCloudSolutions.png"
       poster-portrait-src="https://cscloudsolutions.com.ar/stories/posters/[slug]-poster.webp">
   ```
7. Proporción del póster vertical: **720x1280 px** (relación 9:16) en formato WebP o JPG.
8. Enlace canónico autorreferencial: `<link rel="canonical" href="https://cscloudsolutions.com.ar/stories/[slug]">`.
9. Datos estructurados JSON-LD (`Article` o `NewsArticle`) dentro del `<head>`.
10. Botón de salida / Call To Action al final: `<amp-story-page-outlink>` apuntando al SaaS o artículo completo.

---

## 3. Estructura de Datos para Contenido (`src/content/stories/`)

Cada historia se define mediante un archivo TypeScript/JSON modular:
```ts
export interface WebStoryPage {
  id: string;
  badge?: string;
  title: string;
  description: string;
  highlightText?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface WebStory {
  slug: string;
  title: string;
  excerpt: string;
  publishedTime: string;
  modifiedTime: string;
  author: string;
  posterPortrait: string; // 720x1280
  category: string;
  pages: WebStoryPage[];
}
```

---

## 4. Indexación y Sitemap

- Cada Web Story generada debe registrarse en `src/app/sitemap.ts` con:
  - URL canónica limpia: `https://cscloudsolutions.com.ar/stories/[slug]`.
  - Prioridad: `0.8`.
  - Frecuencia de cambio: `weekly`.
- La URL debe poder validarse sin errores en:
  `https://search.google.com/test/amp`

---

## 5. Estrategia Editorial y "Efecto Ignición" en Redes

1. **Titulares de Curiosidad Técnica:**
   - Usar formato: `[Dato/Hallazgo] + [Problema Oculto] + [Solución Concreta]`.
   - Ejemplo: *"El error en discos de Azure que cuesta hasta un 25% extra al mes"*.
2. **Distribución en las primeras 24 horas:**
   - Compartir el enlace directo en LinkedIn etiquetando las entidades `#Azure`, `#FinOps`, `#CloudCost`.
   - La retención de lectura móvil en los primeros 2 días entrena el algoritmo de Google Discover para disparar impresiones en perfiles IT similares.

---

## 6. Restricciones y Trampas Conocidas (Aprendizaje Continuo)
- **Trampa 1:** No incluir etiquetas `<script>` personalizadas ni React hooks en las rutas `/stories/...` porque provocan error fatal de AMP `MANDATORY_TAG_MISSING` o `TAG_NOT_ALLOWED`.
- **Trampa 2:** No usar imágenes de portada de menos de 1200 px de ancho para artículos del blog; Discover las ignora silenciosamente sin avisar en Search Console.
- **Trampa 3:** El atributo `poster-portrait-src` en `<amp-story>` no debe contener texto incrustado denso, ya que Google genera la vista previa dinámica con el título superpuesto.
- **Trampa 4 (Content-Security-Policy):** Si el proyecto utiliza cabeceras CSP estrictas en `next.config.mjs`, se DEBE autorizar explícitamente `https://cdn.ampproject.org` y `https://*.ampproject.org` en `script-src`, `frame-src` y `connect-src`. De lo contrario, el navegador bloqueará la descarga del runtime `v0.js` y `amp-story-1.0.js`, impidiendo la interacción con la historia.
