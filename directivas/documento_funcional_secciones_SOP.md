# SOP: Generación de Documento de Estructura Funcional y Contenido de la Página Web

## Objetivo
Elaborar una guía exhaustiva y visual de la arquitectura funcional, mapa de sitio, secciones, componentes interactivos, módulos de contenido, internacionalización y flujos de usuario del sitio web corporativo de CSCloud Solutions (`cscloudsolutions.com.ar`), generando el documento en Markdown (`.md`) y exportándolo a formato PDF (`.pdf`).

## Alcance del Documento Funcional
1. **Mapa del Sitio y Enrutamiento (Site Map & Routing):**
   - Estructura de URLs localizadas (`/es`, `/en`, `/pt-BR`).
   - Páginas principales, páginas de servicios, módulo de blog y páginas legales.
2. **Desglose de Secciones de la Página de Inicio (Home Page):**
   - Header & Navegación (Logo, links, LanguageSwitcher, CTA Contacto).
   - Hero Section (Titulares, video interactivo, StatCounters, CTAs).
   - Service Bento Grid (Grilla modular de 6 soluciones cloud principales).
   - Audit Section (Auditoría Cloud & M365 gratuita).
   - FinOps Teaser & Popup Modal Interactivo (3 Tiers: Professional, Business, Enterprise).
   - Testimonios & Widget Clutch oficial.
   - FAQ Interactiva (Acordeón y Schema.org FAQPage).
   - Contact Section & Formulario (Validaciones Zod, reCAPTCHA v3, Microsoft Graph API).
   - Footer & Enlaces de pie de página.
3. **Páginas de Soluciones y Servicios Especializados:**
   - Detalle de cada vertical (/agentic-ai, /automations, /azure, /finops, /microsoft-365, /modern-workplace, /power-platform, /seguridad, /soporte, /nosotros).
4. **Motor de Blog y Marketing de Contenidos:**
   - Procesamiento de archivos Markdown con Frontmatter (`gray-matter`).
   - Estructura de slugs, lectura estimada, tags y metadatos SEO.
5. **Internacionalización (i18n):**
   - Esquema de claves en `messages/{locale}.json`.
   - Estrategia de cambio de idioma sin pérdida de contexto.
6. **Políticas y Cumplimiento Legal:**
   - Privacidad, Reembolsos, Términos y Condiciones, Cookie Consent Banner.

## Entregables
- **Markdown:** `docs/ESTRUCTURA_Y_CONTENIDO_PAGINA_WEB_CSCLOUD.md`
- **PDF:** `docs/ESTRUCTURA_Y_CONTENIDO_PAGINA_WEB_CSCLOUD.pdf`
- **Script:** `scripts/generate_functional_pdf.py`
