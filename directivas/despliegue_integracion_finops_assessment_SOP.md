# SOP: Integración y Despliegue de Azure FinOps Assessment (CSCloudSolutions)

## Objetivo
Integrar y publicar la suite de evaluación FinOps (`assesment_Finops/site/`) dentro de la plataforma corporativa de **CSCloudSolutions**, garantizando su disponibilidad bajo la URL `https://cscloudsolutions.com.ar/finops_assesment/`, configurando los identificadores de Tenant y Partner, y actualizando la página principal (Home) para promocionar el assessment 100% gratuito.

---

## Parámetros de Configuración del Entorno
- **URL Base:** `https://cscloudsolutions.com.ar/finops_assesment/`
- **Redirect URI para MSAL:** `https://cscloudsolutions.com.ar/finops_assesment/redirect.html`
- **Tenant ID de CSCloudSolutions:** `81ebe027-e6af-4e09-bc73-58c9012c6408`
- **Partner ID (PAL / MPN):** `7111700`
- **Grupo de Seguridad Azure Lighthouse:** `CSCloudSolutions - Azure Value Sprint` (pendiente de creación en Entra ID para obtener `lighthouseGroupId`)
- **App Registration Multi-Tenant (SPA):** `CSCloudSolutions Azure Value Sprint` (pendiente de registro en Entra ID para obtener `spaClientId`)
- **Hosting:** Se aloja directamente en el **Container App** existente a través del directorio estático `public/finops_assesment/` de Next.js. **No se requiere Azure Storage Account adicional** ni configuración de dominio personalizado.

---

## Archivos Involucrados
1. `cscloudsolutions/public/finops_assesment/` (Destino de publicación servido por Next.js)
   - `index.html` (Relevamiento y extractor FinOps)
   - `cliente.html` (Instrucciones para delegación de Lighthouse)
   - `redirect.html` (Receptor de autenticación MSAL)
   - `config.js` (Parámetros de configuración pública de la app)
   - `img/` (Logos e isotipos oficiales de CSCloudSolutions)
   - `lib/` (Librerías MSAL y dependencias cliente)
2. `cscloudsolutions/src/components/Hero.tsx` (Componente de Hero con la tarjeta principal de conversión)
3. `cscloudsolutions/messages/es.json` (Traducciones en español para el Hero)
4. `cscloudsolutions/messages/en.json` (Traducciones en inglés para el Hero)
5. `cscloudsolutions/messages/pt-BR.json` (Traducciones en portugués para el Hero)
6. `scripts/integrate_finops_assessment.py` (Script determinista de sincronización y configuración)

---

## Lógica y Pasos de Ejecución

### 1. Copia y Sincronización a `public/finops_assesment`
- Crear el directorio `cscloudsolutions/public/finops_assesment/`.
- Copiar todos los archivos de `assesment_Finops/site/` (incluyendo `img/` y `lib/`).
- Verificar que las rutas relativas funcionen fluidamente al ser servidas bajo la raíz `/finops_assesment/`.

### 2. Actualización de `config.js`
- Actualizar `cscloudTenantId: '81ebe027-e6af-4e09-bc73-58c9012c6408'`.
- Actualizar `ctrl365TenantId: '81ebe027-e6af-4e09-bc73-58c9012c6408'`.
- Actualizar `partnerId: '7111700'`.
- Preparar los campos `spaClientId` y `lighthouseGroupId` para ser completados tras la ejecución de los comandos de Azure CLI en Entra ID.

### 3. Actualización de la Tarjeta de la Home (Hero)
- Reorientar la tarjeta de auditoría rápida en el Hero hacia el **Azure FinOps Assessment**:
  - Título: *"Assessment Azure FinOps (100% Gratuito)"*
  - Subtítulo: Detección de costos ociosos, sobredimensionamiento y ahorro en la nube de Microsoft sin agentes y sin costo.
  - Bullets: Recursos huérfanos, Rightsizing, Reservas/Savings Plans, Seguridad, Reporte ejecutivo descargable.
  - Botón CTA: *"Comenzar Assessment (Siempre Gratis) →"* apuntando a `/finops_assesment/` con `target="_blank" rel="noopener noreferrer"`.
  - Nota: *"Siempre gratis · 100% solo lectura · Sin instalación"*.
- Aplicar las traducciones simétricas en `es.json`, `en.json` y `pt-BR.json`.

### 4. Enlace Secundario en Componente de Auditoría (`AuditSection.tsx`)
- Incorporar un botón secundario al lado de `calloutCta`:
  - Etiqueta (`calloutFinops`): *"Autoevaluación Azure (Solo lectura) →"* (ES) / *"Azure Assessment (Read-only) →"* (EN) / *"Autoavaliação Azure (Somente leitura) →"* (PT-BR).
  - Enlace: `/finops_assesment/` con apertura en nueva pestaña (`target="_blank"`).
  - Estilo: Botón semi-transparente con borde y backdrop blur que armoniza con el fondo oscuro y el botón principal turquesa.

### 5. Enlace a Guía de Onboarding en FinOps Teaser (`FinOpsTeaser.tsx`)
- Incorporar en el grupo de CTAs de la sección FinOps:
  - Etiqueta (`ctaSprint`): *"Onboarding Value Sprint (Guía) ↗"* (ES) / *"Value Sprint Onboarding (Guide) ↗"* (EN) / *"Onboarding Value Sprint (Guia) ↗"* (PT-BR).
  - Enlace: `/finops_assesment/cliente.html` con apertura en pestaña nueva (`target="_blank"`).
  - Permite a los prospectos que evalúan un Value Sprint de 3 semanas consultar el instructivo paso a paso de permisos de solo lectura.

### 6. Botones de Retorno ("Volver al sitio web") en Páginas del Assessment
- En `index.html` (portal de autoevaluación):
  - Cabecera: El logo oficial de CSCloudSolutions ahora enlaza directamente a `/`.
  - Botón de navegación: `← Volver al sitio web` con estilo `.btn.ghost.sm` redirige a `/`.
- En `cliente.html` (guía para clientes / Value Sprint):
  - Cabecera: El logo oficial enlaza a `/`.
  - Barra superior de botones:
    - `← Ir al Assessment` (redirige a `index.html`).
    - `← Volver al sitio web` (redirige a `/`).

### 7. Provisión de Comandos para Azure CLI / Entra ID
- Proporcionar los comandos precisos para:
  1. Crear el grupo de seguridad de Lighthouse (`az ad group create`).
  2. Registrar la aplicación Multi-Tenant SPA (`az ad app create` con PATCH en Graph para `redirectUris: ["https://cscloudsolutions.com.ar/finops_assesment/redirect.html"]` y permisos delegados `user_impersonation` sobre Azure Service Management).

---

## Restricciones y Casos Borde (Memoria Viva)
- **No crear Storage Account:** Confirmado que no es necesario crear `$StorageAccount = 'cscloudfinopsassessment'`. Servir los archivos directamente desde Next.js `public/` reduce costos a $0 adicional, simplifica el pipeline de CI/CD del Container App y unifica el SSL bajo `cscloudsolutions.com.ar`.
- **CORS y Redirects:** `redirect.html` en el mismo dominio evita bloqueos por terceros o cookies entre dominios distintos.
- **Sincronización Bidireccional:** Mantener sincronizada la carpeta original `assesment_Finops/site/` y la carpeta servida `cscloudsolutions/public/finops_assesment/` para evitar divergencias de versión.
- **Peso de Imágenes y Enlaces de Retorno:** Reemplazar imágenes base64 redundantes por los assets optimizados en `img/` para reducir peso en un ~75% y añadir botones de navegación accesibles en la cabecera hacia la Home (`/`).
- **Concurrencia de `npm run build` y `npm run dev`:** *Nota: No ejecutar `npm run build` mientras `npm run dev` se encuentra activo en segundo plano, porque el proceso de compilación de producción sobreescribe y elimina los vendor-chunks de webpack en `.next/`, causando errores en tiempo de ejecución (`Cannot find module './vendor-chunks/@opentelemetry.js'`). En su lugar, si se necesita validar el build, detener primero el dev server o, si se produce el error, limpiar el directorio `.next/` (`rm -rf .next`) y reiniciar `npm run dev`.*
- **Carga de Librerías (MSAL, JSZip, ExcelJS) y CSP:** *Nota: No depender exclusivamente de CDNs externos ni de rutas relativas simples (`lib/msal-browser.min.js`), porque si la página se accede sin slash final (`/finops_assesment`), el navegador resuelve relativo a la raíz (`/lib/...`) devolviendo 404, y la política de seguridad CSP bloqueará `cdn.jsdelivr.net` si no está expresamente habilitada en `next.config.mjs`. En su lugar: (1) precargar MSAL en el `<head>` apuntando a `/finops_assesment/lib/msal-browser.min.js`, (2) robustecer `loadLib` para intentar rutas absolutas y relativas antes de CDN, (3) configurar `next.config.mjs` con rewrites para `/lib/:path*` e `/img/:path*`, y (4) declarar `https://cdn.jsdelivr.net` y `https://cdnjs.cloudflare.com` en `scriptSrc` del CSP.*
- **Rutas y Enlaces entre Páginas Estáticas (`cliente.html` e `index.html`):** *Nota: No usar enlaces puramente relativos como `href="cliente.html"` dentro de páginas servidas por Next.js rewrite, porque al cargarse bajo `/finops_assesment` sin trailing slash, el navegador navega a `http://localhost:3000/cliente.html` y el middleware de Next.js redirige a la Home (`/[locale]`). En su lugar: (1) usar siempre la ruta absoluta del subdirectorio `href="/finops_assesment/cliente.html"`, y (2) agregar un rewrite en `next.config.mjs` de `/cliente.html` hacia `/finops_assesment/cliente.html` como fallback de compatibilidad.*
- **Favicon Unificado:** *Nota: Sustituir `favicon.png` de la plantilla original por el isotipo oficial `src/app/icon.png` de CSCloudSolutions para mantener la consistencia de marca.*
- **Cálculo de `REDIRECT` URI y `AADSTS500113`:** *Nota: No calcular `REDIRECT` con `new URL('redirect.html', location.href)` porque cuando la URL es `/finops_assesment` (sin trailing slash), el navegador calcula erróneamente `http://localhost:3000/redirect.html` en lugar de `/finops_assesment/redirect.html`. Si la App Registration en Azure no tiene registrada la URL de redirección exacta como Single-Page Application (SPA), Azure AD rechaza la autenticación con el error `AADSTS500113: No reply address is registered for the application`. En su lugar: (1) calcular explícitamente `${location.origin}/finops_assesment/redirect.html`, (2) agregar rewrite para `/redirect.html` en `next.config.mjs`, y (3) asegurar que en la App Registration de Entra ID estén cargadas las URLs (`http://localhost:3000/finops_assesment/redirect.html` y `https://cscloudsolutions.com.ar/finops_assesment/redirect.html`) bajo la plataforma Single-page application (SPA).*
