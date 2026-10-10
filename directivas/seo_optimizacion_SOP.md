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
- En `src/i18n/routing.ts`, el enrutamiento está configurado con `localePrefix: 'as-needed'` y `defaultLocale: 'es'`.
- Por ende:
  - Para `es`: la URL canónica NO lleva prefijo (ej: `https://cscloudsolutions.com.ar/azure`).
  - Para `en`: la URL canónica lleva `/en` (ej: `https://cscloudsolutions.com.ar/en/azure`).
  - Para `pt-BR`: la URL canónica lleva `/pt-BR` (ej: `https://cscloudsolutions.com.ar/pt-BR/azure`).
- **En `sitemap.ts`:** No generar URLs con `/es/...` ya que el middleware las redirige con 307/308 hacia la ruta sin prefijo, lo cual penaliza el puntaje de rastreo en Google Search Console. Incluir la ruta `/politica-de-reembolso`.

### 5. Identificadores Únicos (Unique IDs)
- Todos los elementos interactivos principales (`<button>`, `<a>` de llamada a la acción, `<input>`, `<textarea>`, `<select>`, `<details>`, `<summary>`) deben contar con un atributo `id` descriptivo y único (ej: `id="header-nav-services"`, `id="hero-cta-contact"`, `id="contact-submit-btn"`).

### 6. Rendimiento y Carga Rápida
- Mantener las imágenes optimizadas con formato WebP/AVIF y dimensiones explícitas.
- Atributo `priority` en imágenes above-the-fold del Hero.
- Carga postergada (`strategy="lazyOnload"`) para scripts de terceros (GTM, Analytics, Apollo).

---

## Casos Borde y Aprendizajes
- **Nota: No omitir el objeto `alternates` en las páginas secundarias de Next.js App Router.** Si una página no define `alternates.canonical`, hereda la canónica de `layout.tsx` (`/`), lo que hace que los motores de búsqueda consideren las subpáginas como duplicados de la home.
- **Nota: No incluir `/es/...` en `sitemap.ts` cuando `localePrefix` es `'as-needed'`.** Genera advertencias de "Página con redirección en el sitemap" en Google Search Console.
- **Nota: No utilizar `<h1>` en cabeceras de tablas o modales fullscreen.** Confunde a los indexadores sobre la temática principal de la URL.
- **Nota: Al inyectar esquemas JSON-LD o metadatos dinámicos en componentes de blog (`blog/[slug]/page.tsx`), no remover la inicialización `let imageIndex = 0;` requerida para el cálculo alternado de imágenes en `ReactMarkdown`.**
- **Nota: La función `getAllPosts` retorna `{ slug: string; meta: any; content: string }[]` (el filtro de borrador ya se aplica a nivel de base de datos). En `sitemap.ts`, validar `post.meta?.status` en lugar de una propiedad de primer nivel `post.status` no tipada.**
