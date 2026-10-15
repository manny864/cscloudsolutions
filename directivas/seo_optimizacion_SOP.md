# SOP: Auditoría y Optimización SEO Integral de CSCloudSolutions

## Objetivo
Establecer el procedimiento estándar y las mejores prácticas para el SEO técnico, semántico, de contenido y rendimiento en toda la plataforma CSCloudSolutions. Garantizar una indexación óptima por motores de búsqueda (Google, Bing), prevención de canibalización y enlaces rotos en el sistema multilingüe (ES, EN, PT-BR con `localePrefix: 'as-needed'`), jerarquía estricta de encabezados (`<h1>` único), semántica HTML5 pura, identificadores interactivos únicos para testing/accesibilidad y datos estructurados (JSON-LD).

## Archivos Involucrados
- **Utilidades SEO Centrales:**
  - `src/lib/seo.ts`: Constructor estandarizado de metadatos `createPageMetadata` (alternates, canonical, hreflang, OpenGraph y Twitter).
  - `src/app/sitemap.ts`: Generador dinámico de mapa del sitio con soporte de rutas canónicas 200 OK (sin redirecciones 307 de prefijo) y hreflang.
  - `src/app/robots.ts`: Directivas de rastreo para motores de búsqueda, bloqueando paneles administrativos y rutas técnicas.
- **Estructura y Metadatos de Páginas (`src/app/[locale]/`):**
  - `layout.tsx`: Configuración global de títulos con plantilla, OpenGraph por defecto y metadatos base.
  - `page.tsx`: Metadatos específicos y JSON-LD de Organización y FAQ.
  - `nosotros/page.tsx`: Corrección de semántica (sustituir `<main>` anidado por `<div>`) y metadatos extendidos.
  - `azure/page.tsx`: Metadatos completos con canonical y OpenGraph.
  - `microsoft-365/page.tsx`: Metadatos completos con canonical y OpenGraph.
  - `seguridad/page.tsx`: Metadatos completos con canonical y OpenGraph.
  - `modern-workplace/page.tsx`: Metadatos completos con canonical y OpenGraph.
  - `power-platform/page.tsx`: Metadatos completos con canonical y OpenGraph.
  - `soporte/page.tsx`: Metadatos completos con canonical y OpenGraph.
  - `automations/page.tsx`: Metadatos completos con canonical y OpenGraph.
  - `agentic-ai/page.tsx`: Metadatos completos con canonical y OpenGraph.
  - `finops/page.tsx`: Verificación de esquema `SoftwareApplication` y metadatos.
  - `partners/page.tsx`: Metadatos completos con canonical y OpenGraph.
  - `blog/page.tsx`: Metadatos de listado y estructura de tarjetas de lectura.
  - `blog/[slug]/page.tsx`: Semántica `<article>`, metadatos individuales, canónicas correctas y JSON-LD `BlogPosting`.
  - `politica-de-privacidad/page.tsx`: Soporte multilingüe completo (ES, EN, PT-BR) y metadatos.
  - `politica-de-reembolso/page.tsx`: Generación de metadatos faltantes y canonical.
  - `terminos-y-condiciones/page.tsx`: Soporte multilingüe completo (ES, EN, PT-BR) y metadatos.
- **Componentes con Corrección de Jerarquía H1 y Semántica:**
  - `src/components/FinOpsCapabilitiesTable.tsx`: Reemplazo del `<h1>` de cabecera de diálogo por `<span>` para evitar colisión con el `<h1>` de la página FinOps.
- **Componentes con Asignación de IDs Únicos para Testing/Accesibilidad:**
  - `src/components/Header.tsx`
  - `src/components/Hero.tsx`
  - `src/components/AuditSection.tsx`
  - `src/components/FinOpsTeaser.tsx`
  - `src/components/ContactForm.tsx`
  - `src/components/FAQ.tsx`
  - `src/components/CookieBanner.tsx`
  - `src/components/FinOpsPopup.tsx`
  - `src/components/Footer.tsx`

---

## Directrices de Implementación

### 1. Title Tags y Meta Descriptions
- Cada página debe tener un título relevante y descriptivo que incluya la especialidad del servicio y la marca (`| CSCloudSolutions`).
- La página de inicio (`/`) debe utilizar el título completo descriptivo (`meta.homeTitle`) en lugar del genérico `"CSCloudSolutions"`.
- Las meta descriptions deben ser persuasivas, entre 120 y 160 caracteres, resumiendo el valor concreto de la página para el usuario.
- En `src/lib/seo.ts`, centralizar `createPageMetadata({ locale, path, title, description, keywords, image })` para unificar la generación de OpenGraph, Twitter Cards y alternates (canonical + hreflang).

### 2. Jerarquía de Encabezados (Heading Structure)
- **Regla estricta:** Debe existir exactamente **un solo `<h1>`** por página.
- En `src/app/[locale]/finops/page.tsx`, eliminar el tag `<h1>` espurio dentro de `FinOpsCapabilitiesTable.tsx` (reemplazar por `<span>` o `<div>`), asegurando que solo el título principal de la página conserve la etiqueta `<h1>`.
- Ningún modal, drawer o componente de soporte debe contener un `<h1>`.

### 3. Semántica HTML5
- El elemento `<main>` ya existe en `src/app/[locale]/layout.tsx` envolviendo `{children}`. Por estándar W3C, **no debe existir más de un `<main>` en el documento**. Eliminar el `<main>` redundante en `src/app/[locale]/nosotros/page.tsx`.
- Los artículos de blog en `src/app/[locale]/blog/[slug]/page.tsx` deben estructurarse con la etiqueta `<article>`.

### 4. Rutas Canónicas y Hreflang en Modo 'as-needed'
- En `src/i18n/routing.ts`, el enrutamiento está configurado con `localePrefix: 'as-needed'`, `defaultLocale: 'es'` y **`localeDetection: false`**.
- **CRÍTICO PARA GOOGLEBOT / CRAWLERS:** `localeDetection` DEBE ser `false`. Si está en `true`, los crawlers de Google (cuyas IPs son de EE. UU. y envían `Accept-Language: en`) que solicitan la raíz `/` o rutas en español reciben una redirección temporal 307 hacia `/en/`, lo que destruye la indexación en español y genera advertencias masivas de "Error de redirección" y "Rastreada: actualmente sin indexar" en GSC.
- Por ende:
  - Para `es`: la URL canónica NO lleva prefijo (ej: `https://cscloudsolutions.com.ar/azure`).
  - Para `en`: la URL canónica lleva `/en` (ej: `https://cscloudsolutions.com.ar/en/azure`).
  - Para `pt-BR`: la URL canónica lleva `/pt-BR` (ej: `https://cscloudsolutions.com.ar/pt-BR/azure`).
  - En `alternates.languages`: incluir siempre `es`, `en`, `pt` (apuntando a `https://cscloudsolutions.com.ar/pt-BR/...`) y `x-default`.
- **En `sitemap.ts`:**
  - NUNCA generar URLs con `/es/...`.
  - NUNCA incluir archivos de texto plano como `llms.txt` o `robots.txt` en el mapa XML de URLs web.
  - Todas las URLs del sitemap deben retornar `200 OK` directo en un solo salto.
- **Redirecciones 301 en `next.config.mjs`:**
  - Toda petición histórica que entre con `/es` o `/es/:path*` debe ser redirigida con código permanente `301` hacia `/` y `/:path*` a nivel de servidor antes de llegar al middleware, garantizando que Google consolide la autoridad sin pasar por 307 temporales.
  - Rutas de idioma abreviado `/pt` y `/pt/:path*` deben redirigirse limpiamente vía 301 a `/pt-BR` y `/pt-BR/:path*`.
  - Slugs de blog heredados (antiguas URLs de WordPress sin prefijo `/blog/`, ej: `/backup-y-disaster-recovery-en-azure/`) deben redirigirse vía 301 a `/blog/:slug`.

### 5. Control de Indexación (noindex) y Páginas de Error 404
- **Rutas privadas/administrativas:** El layout de `/admin` (`src/app/[locale]/admin/layout.tsx`) debe ser un Server Component y exportar explícitamente `robots: { index: false, follow: false }`. No depender únicamente de `robots.txt`.
- **Páginas 404 y catch-all:** Tanto `src/app/[locale]/not-found.tsx` como `src/app/[locale]/[...rest]/page.tsx` deben exportar `robots: { index: false, follow: false }` para evitar que páginas con errores 404 hereden la canónica del layout raíz (`/`) y Googlebot las catalogue como "Duplicada: el usuario no ha indicado ninguna versión canónica".

### 6. Identificadores Únicos (Unique IDs)
- Todos los elementos interactivos principales (`<button>`, `<a>` de llamada a la acción, `<input>`, `<textarea>`, `<select>`, `<details>`, `<summary>`) deben contar con un atributo `id` descriptivo y único (ej: `id="header-nav-services"`, `id="hero-cta-contact"`, `id="contact-submit-btn"`).

### 7. Rendimiento y Carga Rápida
- Mantener las imágenes optimizadas con formato WebP/AVIF y dimensiones explícitas.
- Atributo `priority` en imágenes above-the-fold del Hero.
- Carga postergada (`strategy="lazyOnload"`) para scripts de terceros (GTM, Analytics, Apollo).

---

## Casos Borde y Aprendizajes
- **Nota: `localeDetection: false` es obligatorio cuando se usa `localePrefix: 'as-needed'`.** Dejar `localeDetection: true` hace que Googlebot (EE. UU.) sea redirigido con 307 a `/en`, provocando errores de redirección y evitando el rastreo de la versión principal en español.
- **Nota: Redirigir `/es/:path*` con 301 en `next.config.mjs` para evitar 307 de `next-intl`.** Search Console penaliza las redirecciones 307 como inestables/temporales. El redirect permanente 301 informa a Google la URL definitiva de inmediato.
- **Nota: No omitir el objeto `alternates` en las páginas secundarias de Next.js App Router.** Si una página no define `alternates.canonical`, hereda la canónica de `layout.tsx` (`/`), lo que hace que los motores de búsqueda consideren las subpáginas como duplicados de la home.
- **Nota: Si una página 404 no tiene `robots: { index: false }`, hereda la canónica raíz y se indexa como "Duplicada sin canónica seleccionada por el usuario".**
- **Nota: No incluir `/es/...` ni archivos `.txt` en `sitemap.ts`.** Genera advertencias de "Página con redirección en el sitemap" y errores de parseo XML en Google Search Console.
- **Nota: No utilizar `<h1>` en cabeceras de tablas o modales fullscreen.** Confunde a los indexadores sobre la temática principal de la URL.
- **Nota: Al inyectar esquemas JSON-LD o metadatos dinámicos en componentes de blog (`blog/[slug]/page.tsx`), no remover la inicialización `let imageIndex = 0;` requerida para el cálculo alternado de imágenes en `ReactMarkdown`.**
- **Nota: La función `getAllPosts` retorna `{ slug: string; meta: any; content: string }[]` (el filtro de borrador ya se aplica a nivel de base de datos). En `sitemap.ts`, validar `post.meta?.status` en lugar de una propiedad de primer nivel `post.status` no tipada.**
- **Nota: Slugs históricos de blog sin prefijo `/blog/` deben tener redirección 301 explícita en `next.config.mjs` hacia `/blog/:slug`.** De lo contrario, los enlaces entrantes antiguos o URLs indexadas previamente en WordPress devuelven 404 en Next.js.
