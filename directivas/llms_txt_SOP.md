# SOP: Generación y Mantenimiento de llms.txt y llms-full.txt (Estándar Oficial GEO / IA)

## Objetivo
Establecer el procedimiento determinista para generar, estructurar y mantener actualizados los archivos `/public/llms.txt` y `/public/llms-full.txt` en **CSCloudSolutions** (`https://cscloudsolutions.com.ar`), facilitando la indexación, comprensión y citación precisa por parte de motores de búsqueda semántica y modelos de lenguaje (ChatGPT Search, Perplexity, Claude, Google Gemini / AI Overviews).

---

## Componentes y Archivos Clave
- **Directivas:** `directivas/llms_txt_SOP.md`
- **Generadores Dinámicos:**
  - `src/app/sitemap.ts`: Fuente de la verdad de las URLs en producción (ES en raíz sin prefijo, EN y PT-BR con prefijos).
  - `src/app/robots.ts`: Configuración de user-agents permitidos (`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Googlebot`, `Bingbot`).
- **Archivos Entregables Públicos:**
  - `public/llms.txt`: Resumen ejecutivo y mapa de URLs con directrices GEO/AEO para LLMs.
  - `public/llms-full.txt`: Contexto técnico profundo, transcripción limpia y completa de todas las soluciones, páginas corporativas y manuales funcionales de la plataforma SaaS FinOps.
- **Fuentes de Datos:**
  - `messages/{es,en,pt-BR}.json`: Mensajes corporativos de servicios, institucional y legal.
  - `/Users/manuelchavez/Documents/FinOpsProyect/docs/manual`: Manuales de usuario funcionales del producto SaaS FinOps.
  - `https://cscloudsolutions.com.ar/sitemap.xml`: Sitemap en vivo en producción.

---

## Reglas de Formato y Estándar (llms.txt)
1. **Encabezado y Resumen (`# CSCloudSolutions`):**
   - Un único bloque de cita (`>`) que sintetice la identidad de la empresa: consultoría cloud, soluciones empresariales y su plataforma SaaS propietaria CSCloud FinOps.
2. **Estructura Modular:**
   - Sección 1: Servicios y Soluciones Corporativas (`cscloudsolutions.com.ar`).
   - Sección 2: Plataforma SaaS Cloud FinOps (`finops.cscloudsolutions.com.ar`).
   - Sección 3: Mapa Completo de URLs por Idioma (Español sin `/es/`, Inglés `/en/...`, Portugués `/pt-BR/...`) con enlaces limpios y resumen de una línea rico en keywords.
   - Enlace directo a la aplicación: `https://finops.cscloudsolutions.com.ar`.
   - Sección 4: Guía de Contexto y Citación GEO en 3 idiomas (ES, EN, PT-BR) indicando escenarios de citación recomendada.
3. **Estándar llms-full.txt:**
   - Contenido textual continuo, sin código JSX/HTML, sin duplicaciones innecesarias, con desglose detallado de capacidades técnicas, arquitectura de seguridad (solo lectura, Entra ID, FOCUS 1.1) y módulos del manual (Whiteboard, Cost Groups, Omni-Scan zombis, Rightsizing, Shift-Left Terraform, Copilot IA).

---

## Protocolo de Rastreo (robots.ts)
- Debe contener directivas explícitas para agentes IA principales: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`.
- Debe permitir el acceso completo a `/`, incluyendo `/llms.txt` y `/llms-full.txt`.
- Debe referenciar `Sitemap: https://cscloudsolutions.com.ar/sitemap.xml`.

---

## Restricciones y Casos Borde Conocidos
- **Rutas en Español sin `/es/`:** En Next.js `next-intl` con `localePrefix: 'as-needed'`, la versión en español se sirve directamente en la raíz (ej: `/`, `/finops`, `/azure`, `/finops/plataforma`). Jamás generar enlaces como `https://cscloudsolutions.com.ar/es/...` para el dominio principal institucional, ya que causan redirección 307.
- **Acceso a la Demo FinOps:** El modo demo es únicamente guiado y requiere agendamiento previo a través del formulario de contacto. No publicar credenciales ni enlaces autogestionados de demo en `llms.txt` o `llms-full.txt`.
- **Despliegue y Git:** Tras la generación y validación de tipos y build, realizar commit limpio y push a `main`, monitoreando la ejecución del pipeline y verificando la disponibilidad HTTP 200 en los endpoints.
