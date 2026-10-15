# SOP: Estándar Obligatorio para Creación de Páginas y Buenas Prácticas SEO en CSCloudSolutions

## Objetivo
Establecer el estándar arquitectónico y las directrices técnicas obligatorias que debe cumplir cualquier desarrollador o agente de IA al crear una nueva página, ruta o componente interactivo en `cscloudsolutions.com.ar`. Este procedimiento garantiza que ninguna nueva página introduzca errores de indexación, duplicados de contenido, redirecciones temporales o problemas de rastreo en Google Search Console.

---

## Ámbito de Aplicación
Aplica a:
- Cualquier nueva ruta o subpágina agregada en `src/app/[locale]/`.
- Páginas de producto, servicios, landing pages, posts de blog o herramientas interactivas.
- Páginas administrativas, internas o páginas de error personalizadas.

---

## Reglas Obligatorias por Componente

### 1. Estructura de Rutas y Enrutamiento Multilingüe
- **Ubicación:** Toda página orientada al público debe crearse dentro de `src/app/[locale]/[ruta]/page.tsx` para admitir la localización con `next-intl`.
- **Estrategia de prefijos (`localePrefix: 'as-needed'`):**
  - Idioma por defecto (`es`): La ruta pública final **NUNCA** lleva `/es/`. Ejemplo: `https://cscloudsolutions.com.ar/mi-nueva-pagina`.
  - Inglés (`en`): La ruta lleva `/en/`. Ejemplo: `https://cscloudsolutions.com.ar/en/mi-nueva-pagina`.
  - Portugués (`pt-BR`): La ruta lleva `/pt-BR/`. Ejemplo: `https://cscloudsolutions.com.ar/pt-BR/mi-nueva-pagina`.
- **Detección de idioma (`localeDetection: false`):**
  - Nunca reactivar la autodetección por cabecera HTTP en `src/i18n/routing.ts`. Las URLs deben responder directamente con código `200 OK` en el idioma solicitado, sin redirecciones automáticas 307.

### 2. Metadatos, Canónicas y Hreflang (`generateMetadata`)
Toda página pública debe exportar una función `generateMetadata` utilizando obligatoriamente el helper centralizado `createPageMetadata` de `src/lib/seo.ts`:
- **Parámetros obligatorios:**
  - `title`: Título único, orientado a intención de búsqueda (máximo 60 caracteres) con sufijo `| CSCloudSolutions`.
  - `description`: Resumen persuasivo y claro (entre 120 y 155 caracteres) con llamado a la acción implícito.
  - `path`: Ruta relativa canónica limpia **sin** prefijo de idioma (ej: `'/mi-nueva-pagina'`).
- **Comportamiento del constructor:**
  - Genera `alternates.canonical` exacto y absoluto (sin `/es/` para español, con `/en/` para inglés y `/pt-BR/` para portugués).
  - Genera `alternates.languages` cubriendo `es`, `en`, `pt` (apuntando a `pt-BR`) y `x-default`.
  - Genera OpenGraph y Twitter Cards consistentes.
- **PROHIBIDO:** No dejar páginas sin `generateMetadata`. Si una página no define `alternates`, Next.js hereda la canónica del `layout.tsx` raíz (`/`), provocando que Google la clasifique como *"Duplicada: el usuario no ha indicado ninguna versión canónica"*.

### 3. Jerarquía de Encabezados (Heading Structure)
- **Un único `<h1>` por página:**
  - Debe contener la palabra clave principal de la página.
  - Modales, drawers, popups, banners o tablas comparativas **NUNCA** deben usar la etiqueta `<h1>`; deben utilizar `<h2>`, `<h3>` o `<span>`/`<div>` estilizados.
- **Jerarquía lógica estricta:** No saltar niveles (ej: no colocar un `<h4>` directamente debajo de un `<h2>`).

### 4. Semántica HTML5
- **Elemento `<main>`:** El tag `<main>` ya está definido globalmente en `src/app/[locale]/layout.tsx` envolviendo `{children}`. **Está estrictamente prohibido colocar etiquetas `<main>` anidadas dentro de páginas individuales**.
- **Secciones:** Utilizar `<section>`, `<article>` (para entradas de blog) y `<header>` de forma semántica.

### 5. Atributos de Identificación Únicos (`id`)
- Todos los elementos interactivos principales (`<button>`, `<a>`, `<input>`, `<select>`, `<textarea>`, formularios y CTAs) deben tener un atributo `id` descriptivo y único (ej: `id="cta-contact-mi-servicio"`). Esto previene colisiones y facilita el testing y la accesibilidad WCAG.

### 6. Enlaces Internos (`<Link>`)
- Usar el componente `<Link>` de `@/i18n/routing`.
- **PROHIBIDO enlazar a rutas con `/es/`:** Siempre enlazar a la ruta limpia (ej: `href="/servicios"` o `href="/blog"`). Enlazar a `/es/...` genera redirecciones internas innecesarias que consumen presupuesto de rastreo (crawl budget).

### 7. Inclusión en `src/app/sitemap.ts`
- Cada nueva página pública estática o dinámica **debe agregarse al generador de sitemap**.
- **Reglas del sitemap:**
  - Solo URLs con código `200 OK` final.
  - Ninguna URL con `/es/`.
  - Incluir el bloque de alternates (`languages: { es, en, pt }`).
  - Nunca incluir archivos `.txt`, `.pdf` o endpoints de API en el sitemap XML.

### 8. Páginas Privadas, Administrativas y de Error (404 / 500)
- Rutas bajo `/admin` o similares:
  - El layout contenedor debe ser un Server Component y exportar:
    `robots: { index: false, follow: false }`.
  - Registrar la exclusión en `src/app/robots.ts`.
- Páginas de error (`not-found.tsx`, `[...rest]`):
  - Deben exportar explícitamente `robots: { index: false, follow: false }` para evitar que las páginas no encontradas hereden la canónica raíz y se indexen como duplicadas.

### 9. Datos Estructurados JSON-LD (Schema.org)
- **Migas de Pan (`BreadcrumbList`):**
  - Obligatorio en todas las subpáginas de servicios (`/azure`, `/finops`, `/seguridad`, etc.) y artículos del blog (`/blog/[slug]`).
  - Permite a Google presentar en las SERPs una jerarquía clara de navegación (`Home > Servicios > Azure Cloud`) mejorando el CTR.
- **Esquema de Servicio (`Service`):**
  - Obligatorio en todas las páginas comerciales.
  - Debe declarar: `provider` (Organization: CSCloudSolutions), `areaServed` (Latin America, United States, Europe, Argentina), `serviceType` y `hasOfferCatalog`.
- **Artículos de Blog (`BlogPosting` / `Article`):**
  - Obligatorio incluir `datePublished` y `dateModified` en formato ISO (YYYY-MM-DD o ISO-8601) para reflejar la frescura de contenidos en Google.
  - Autor corporativo estructurado (`Organization`: CSCloudSolutions) además del autor individual si aplica.

### 10. Indexación Instantánea con IndexNow
- Toda publicación o actualización de contenido en el blog/CMS debe ejecutar automáticamente el envío de URLs a IndexNow (`https://api.indexnow.org/indexnow`).
- La clave debe estar accesible públicamente en la raíz mediante `/{INDEXNOW_KEY}.txt`.
- Disponer de una API route `/api/indexnow` para reenvío masivo o webhooks.

---

## Checklist de Verificación Pre-Merge

Antes de fusionar o hacer push de una nueva página:
- [ ] ¿La página está dentro de `src/app/[locale]/...`?
- [ ] ¿Tiene `generateMetadata` con título, descripción y `path` canónico?
- [ ] ¿Tiene un solo `<h1>` visible y relevante?
- [ ] ¿No contiene ningún tag `<main>` anidado?
- [ ] ¿Los botones y enlaces principales tienen atributos `id` únicos?
- [ ] ¿Los enlaces internos (`<Link>`) no tienen el prefijo `/es/`?
- [ ] ¿Tiene inyectados sus esquemas JSON-LD (`BreadcrumbList` y `Service` o `BlogPosting`)?
- [ ] ¿Fue añadida a `src/app/sitemap.ts` con sus variantes de idioma?
- [ ] ¿`npm run build` compila con código 0 y genera la página sin errores?

---

## Errores Frecuentes y Trampas Conocidas (Memoria Viva)
1. **Error: Olvidar `generateMetadata` en subpáginas:** Causa que Google Search Console reporte *"Duplicada: el usuario no ha indicado ninguna versión canónica"* al heredar la URL del home.
2. **Error: Hardcodear canónicas fijas:** Si una página copia el metadata de otra (ej: `/finops/guia` apuntando a `/finops/plataforma`), Google desindexa la página por canónica cruzada.
3. **Error: Usar `redirect({ href: '/es/...' })`:** En Next.js con prefijo `as-needed`, redirigir explícitamente a `/es/...` causa bucles o saltos dobles de redirección.
4. **Error: Agregar URLs con redirección al sitemap:** Todo lo que esté en `sitemap.xml` debe devolver `200 OK` en el primer intento.
5. **Error: Omitir `dateModified` en blogs:** Priva a Google de mostrar la fecha reciente en las SERPs, disminuyendo el CTR frente a contenidos actualizados.
