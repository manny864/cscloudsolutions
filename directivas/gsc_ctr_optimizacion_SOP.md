# SOP: Optimización de CTR con Google Search Console en CSCloudSolutions

## Objetivo
Establecer el procedimiento determinista para detectar páginas con alto volumen de impresiones y bajo CTR (Click-Through Rate / Quick Wins) en Google Search Console (últimos 28 días) y optimizar de forma integral los elementos `<title>` y `<meta name="description">` en el código de Next.js (tanto en páginas estáticas/rutas de la app como en artículos de blog en Markdown para ES, EN y PT-BR).

## Archivos Involucrados
- **Directivas y Scripts de Diagnóstico:**
  - `directivas/gsc_ctr_optimizacion_SOP.md`: Este procedimiento operativo estándar.
  - `scripts/apply_gsc_ctr_optimizations.py`: Script determinista de Python para aplicar y verificar los cambios de metadatos.
- **Diccionarios de Mensajes y Metadatos Multilingües:**
  - `messages/es.json`: Títulos y meta descriptions en Español (`meta.homeTitle`, `pages.finops.meta`, `pages.agentic.meta`, `pages.m365`, `pages.azure`).
  - `messages/en.json`: Títulos y meta descriptions en Inglés.
  - `messages/pt-BR.json`: Títulos y meta descriptions en Portugués.
- **Rutas de Next.js (`src/app/[locale]/`):**
  - `src/app/[locale]/layout.tsx`: Configuración de plantilla global `title: { default: ..., template: '%s | CSCloudSolutions' }`.
  - `src/app/[locale]/page.tsx`: Inyección de metadatos de la página de inicio (evitando duplicar el sufijo de marca).
  - `src/app/[locale]/agentic-ai/page.tsx`: Soporte para lectura prioritaria de `meta.title` y `meta.description`.
  - `src/app/[locale]/microsoft-365/page.tsx`: Soporte para lectura prioritaria de `meta.title` y `meta.description`.
  - `src/app/[locale]/azure/page.tsx`: Soporte para lectura prioritaria de `meta.title` y `meta.description`.
- **Artículos de Blog Markdown (`src/content/blog/`):**
  - `en/azure-backup-and-disaster-recovery-guide.md` & `es/backup-y-disaster-recovery-en-azure.md` & `pt-BR/backup-y-disaster-recovery-en-azure.md`
  - `en/azure-virtual-desktop-ultimate-solution.md` & `es/azure-virtual-desktop-solucion-escritorios.md` & `pt-BR/azure-virtual-desktop-solucion-escritorios.md`
  - `en/reduce-azure-costs-with-finops.md` & `es/reducir-costos-azure-con-finops.md` & `pt-BR/reducir-costos-azure-con-finops.md`

---

## Análisis de Oportunidades GSC (Últimos 28 Días)

### 1. Azure Backup and Disaster Recovery (Blog)
- **Consultas con alto volumen e impresiones (0 clics / 0% CTR):**
  - `azure backup and disaster recovery` (52 imp, pos 34.1)
  - `azure bcdr` (35 imp, pos 20.4)
  - `bcdr azure` (23 imp, pos 16.1)
  - `backup and disaster recovery azure` (18 imp, pos 40.3)
  - `azure backup disaster recovery` (17 imp, pos 38.5)
  - `azure business continuity` (16 imp, pos 34.1)
  - `business continuity azure` (9 imp, pos 33.0)
  - `azure disaster recovery and backup` (6 imp, pos 38.3)
  - `disaster recovery azure mexico` (3 imp)
- **Diagnóstico:** Título previo genérico ("Business Continuity for SMBs") que omitía el acrónimo BCDR de alta búsqueda y no contenía un llamado a la acción persuasivo en el extracto.

### 2. Servicios FinOps (`/finops`)
- **Consultas con alto volumen e impresiones (0 clics / 0% CTR):**
  - `servicios finops` (13 imp, pos 76.6)
  - `servicio finops` (8 imp, pos 71.4)
  - `finops para empresas` (7 imp, pos 85.4)
  - `finops optimización cloud` (5 imp, pos 58.0)
- **Diagnóstico:** El título anterior se enfocaba exclusivamente en "Software FinOps para Azure", perdiendo las búsquedas masivas de usuarios que buscan "Servicios FinOps", "FinOps para Empresas" y consultoría de reducción de costos cloud.

### 3. Página de Inicio (`/`)
- **Consultas con impresiones y bajo CTR:**
  - `cscloudsolutions` (16 imp, pos 8.9)
  - `soluciones cloud` (16 imp, pos 45.8)
  - `soluciones microsoft` (6 imp, pos 46.6)
  - `cs solutions` (6 imp, pos 40.3)
  - `cloud solutions` (4 imp, pos 17.5)
- **Diagnóstico:** Título demasiado largo (>85 caracteres) por acumulación con la plantilla de `layout.tsx` (`... | CSCloudSolutions`), causando truncamiento en las SERP de Google.

### 4. Azure Virtual Desktop (`/blog/azure-virtual-desktop-...`)
- **Consultas:** `azure virtual desktop advanced`, `escritorios virtuales azure beneficios`, `escritorios virtuales azure contratar`.
- **Diagnóstico:** Título no atacaba explícitamente la intención de búsqueda de contratación y beneficios de escritorios virtuales.

### 5. Reducción de Costos con FinOps (`/blog/reduce-azure-costs-with-finops`)
- **Consultas:** `azure finops solutions`, `microsoft cloud finops tools consulting services`.

### 6. IA Agéntica (`/agentic-ai`)
- **Consultas:** `agentes de inteligencia artificial autónomos colombia`, `agentes autónomos`, `proveedores de agentes de ia en argentina`, `agentic ai azure`.

### 7. Soluciones Microsoft 365 (`/microsoft-365`) y Azure (`/azure`)
- **Consultas:** `soluciones microsoft`, `servicios gestionados de azure`.

---

## Directrices de Longitud y Persuasión para CTR
- **Títulos (`<title>`):**
  - Mantener entre **50 y 60 caracteres**.
  - Ubicar la keyword principal al inicio del título.
  - Si se renderiza dentro del layout con `%s | CSCloudSolutions`, el valor del título debe medir ~40 caracteres para que con el sufijo no supere los 60.
- **Meta Descriptions:**
  - Mantener entre **130 y 160 caracteres**.
  - Estructura: **Beneficio principal + Diferencial técnico + Call to Action claro** (ej. "Agendá tu assessment gratuito", "Conocé la guía paso a paso").

---

## Casos Borde y Aprendizajes
- **Nota: No duplicar el nombre de marca en `title`.** `src/app/[locale]/layout.tsx` aplica la plantilla `template: '%s | CSCloudSolutions'`. Si un título de página ya incluye `| CSCloudSolutions`, en el HTML resultante quedará duplicado (`... | CSCloudSolutions | CSCloudSolutions`).
- **Nota: En la página de inicio (`src/app/[locale]/page.tsx`), configurar `title: { absolute: t('homeTitle') }` en `createPageMetadata` o pasar el título completo.** De este modo no se aplica la plantilla redundante sobre la home.
- **Nota: Mantener sincronizados los 3 idiomas (`es`, `en`, `pt-BR`) en `messages/` y en `src/content/blog/`.** Los motores de búsqueda indexan las versiones con sus respectivos enlaces `alternate` `hreflang`.
