# Guía de Estructura, Secciones y Contenido de la Página Web
## Plataforma Web Corporativa — CSCloud Solutions (`cscloudsolutions.com.ar`)

---

**Empresa:** CSCloud Solutions  
**Propietario:** Manuel Chavez (`mchavez@cscloudsolutions.com.ar`)  
**Versión del Documento:** 1.0.0  
**Fecha:** 28 de Agosto de 2026  
**Tecnología Base:** Next.js 15 (App Router, Standalone) + Tailwind CSS + TypeScript + next-intl  

---

## 1. Resumen de la Plataforma y Propuesta de Valor

El sitio web corporativo de **CSCloud Solutions** es el canal digital principal para la presentación de servicios de consultoría cloud, soluciones Microsoft (Azure, M365, Power Platform), ciberseguridad, automatización con IA y la plataforma SaaS de optimización de costos **CSCloud FinOps**.

### Características Destacadas
- **Experiencia de Usuario Moderna:** Animaciones fluidas con Framer Motion, diseño tipo *Bento Grid*, orbes de fondo degradados y micro-interacciones.
- **Internacionalización Trilingüe Completa:** Soporte de 3 idiomas (**Español `es`**, **Inglés `en`**, **Portugués `pt-BR`**) en rutas localizadas (`/[locale]/...`).
- **Motor de Blog Dinámico:** Blog técnico alimentado por archivos Markdown con más de 25 artículos especializados.
- **Formulario Inteligente y Seguro:** Validación con Zod, protección anti-bot con Google reCAPTCHA v3 y envío transaccional mediante Microsoft Graph API.

---

## 2. Mapa del Sitio (Sitemap & URL Architecture)

```
cscloudsolutions.com.ar
├── /[locale]                           (Página Principal / Home Page)
│
├── SERVICIOS & SOLUCIONES:
│   ├── /[locale]/agentic-ai            (Agentes de IA y Modelos LLM Empresariales)
│   ├── /[locale]/automations           (Automatización de Procesos RPA / Power Automate)
│   ├── /[locale]/azure                 (Soluciones Cloud Azure, Migración & Modernización)
│   ├── /[locale]/finops                (Gestión y Optimización de Costos Cloud)
│   ├── /[locale]/microsoft-365         (Microsoft 365, Teams, SharePoint & Exchange)
│   ├── /[locale]/modern-workplace      (Puesto de Trabajo Digital, Intune & AVD)
│   ├── /[locale]/power-platform        (Power Apps, Power BI & Power Automate)
│   ├── /[locale]/seguridad             (Ciberseguridad, Defender, Zero Trust & SOC 2)
│   └── /[locale]/soporte               (Mesa de Ayuda, Soporte N1/N2/N3 & Monitoreo)
│
├── CONTENIDO E INSTITUCIONAL:
│   ├── /[locale]/nosotros              (Quiénes Somos, Misión, Visión y Valores)
│   ├── /[locale]/blog                  (Índice del Blog Técnico con Buscador y Filtros)
│   └── /[locale]/blog/[slug]           (Artículo individual del Blog en Markdown)
│
└── LEGAL & COMPLIANCE:
    ├── /[locale]/politica-de-privacidad
    ├── /[locale]/politica-de-reembolso
    └── /[locale]/terminos-y-condiciones
```

---

## 3. Desglose Detallado de Secciones de la Home Page

La página de inicio (`src/app/[locale]/page.tsx`) está construida mediante componentes modulares de alto impacto visual:

```
+-----------------------------------------------------------------------------------+
| 1. HEADER & NAVEGACIÓN (Logo, Menú Soluciones, Idioma, Botón CTA Contacto)       |
+-----------------------------------------------------------------------------------+
| 2. HERO SECTION                                                                   |
|    - Titular de alto impacto + Subtítulo con propuesta de valor                   |
|    - Botones de acción principal (Auditoría / Contacto)                          |
|    - InteractiveVideoCard: Video demostrativo integrado                          |
|    - StatCounter: Indicadores de impacto (+100 proyectos, 99.9% uptime, etc.)     |
+-----------------------------------------------------------------------------------+
| 3. SERVICE BENTO GRID (Grilla Bento con las 6 verticales principales de servicios) |
+-----------------------------------------------------------------------------------+
| 4. AUDIT SECTION (Oferta de Auditoría Cloud & M365 sin cargo para prospección)    |
+-----------------------------------------------------------------------------------+
| 5. FINOPS TEASER (Destacado del producto CSCloud FinOps con CTA a Popup Modal)    |
+-----------------------------------------------------------------------------------+
| 6. TESTIMONIALS & CLUTCH (Reseñas de clientes + Widget oficial de Clutch.co)      |
+-----------------------------------------------------------------------------------+
| 7. FAQ SECTION (Preguntas Frecuentes interactivas con acordeón + Schema JSON-LD)  |
+-----------------------------------------------------------------------------------+
| 8. CONTACT SECTION (Formulario con validación en tiempo real + reCAPTCHA v3)      |
+-----------------------------------------------------------------------------------+
| 9. FOOTER (Enlaces rápidos, datos de contacto, links legales y copyright)        |
+-----------------------------------------------------------------------------------+
```

### 3.1 Header (`Header.tsx`)
- **Logo:** Logotipo SVG interactivo de CSCloud Solutions (`Logo.tsx`).
- **Menú de Navegación:** Acceso directo a Soluciones (dropdown con iconos Tabler), FinOps, Blog, Nosotros y Soporte.
- **Selector de Idioma (`LanguageSwitcher.tsx`):** Selector dinámico que cambia de idioma entre ES, EN y PT-BR preservando la ruta y el estado.
- **CTA Destacado:** Botón *"Contáctanos"* con scroll suave hacia el formulario.

### 3.2 Hero Section (`Hero.tsx`)
- **Titular Dinámico:** Mensaje centrado en acelerar la transformación digital y maximizar el ROI cloud.
- **Contador de Métricas (`StatCounter.tsx`):** Estadísticas clave con animación de incremento numérico.
- **Tarjeta de Video Interactiva (`InteractiveVideoCard.tsx`):** Reproductor estilizado con controles de reproducción/pausa y video demostrativo de alta resolución.

### 3.3 Service Bento Grid (`ServiceBento.tsx`)
Grilla modular inspirada en diseño Bento con tarjetas visualmente jerárquicas:
1. **Microsoft Azure:** Migraciones, infraestructura híbrida y modernización.
2. **Microsoft 365 & Modern Workplace:** Licenciamiento, colaboración y gestión de identidades.
3. **Power Platform:** Desarrollo Low-Code, Power Apps y analítica con Power BI.
4. **Agentic AI & Automatizaciones:** Modelos generativos, agentes autónomos y RPA.
5. **Ciberseguridad & Zero Trust:** Hardening, Defender for Cloud y cumplimiento normativo.
6. **Soporte & Mesa de Ayuda:** Soporte continuo 24/7 y administración delegada.

### 3.4 Sección de Auditoría Gratuita (`AuditSection.tsx`)
- Propuesta de valor orientada a prospección B2B.
- Permite a potenciales clientes solicitar un diagnóstico gratuito de su infraestructura Azure o tenant de Microsoft 365.

### 3.5 Módulo Destacado FinOps (`FinOpsTeaser.tsx` & `FinOpsPopup.tsx`)
- Presentación de la plataforma SaaS **CSCloud FinOps** (`https://finops.cscloudsolutions.com.ar`).
- **Popup Modal Interactivo (`FinOpsPopup.tsx`):**
  - Muestra la comparativa de los **3 planes oficiales**:
    - **Professional:** Ideal para empresas medianas (WhiteBoard, presupuestos, inventario zombie, alertas Slack/Teams).
    - **Business:** Para empresas en crecimiento (remediación activa, schedules de apagado/encendido, escenarios What-If).
    - **Enterprise:** Control corporativo total (Chargeback AKS, Unit Economics, Anomaly Detection Z-Score, Azure Lighthouse).
  - Persistencia inteligente en `localStorage` (`finops-popup-shown`) y apertura tras 7 segundos o al hacer clic en el CTA.

### 3.6 Testimonios y Prueba Social (`Testimonials.tsx` & `ClutchWidget.tsx`)
- Citas y casos de éxito de clientes corporativos.
- Integración del widget oficial de **Clutch** para validar la reputación y calificación internacional de la empresa.

### 3.7 Preguntas Frecuentes (`FAQ.tsx`)
- Acordeón interactivo con las dudas más habituales sobre migración, licenciamiento y seguridad.
- Incluye marcado estructurado **`Schema.org/FAQPage`** para posicionamiento orgánico en Google (Rich Snippets).

### 3.8 Sección de Contacto (`ContactSection.tsx` & `ContactForm.tsx`)
- **Campos del Formulario:** Nombre completo, Correo electrónico corporativo, Empresa, Teléfono/WhatsApp, Servicio de Interés y Mensaje.
- **Validación:** Esquema estricto con `Zod` (frontend y backend).
- **Seguridad Anti-Spam:** Verificación de token `Google reCAPTCHA v3`.
- **Backend:** Server Action `submitContact.ts` que envía el mensaje vía **Microsoft Graph API** a `sales@cscloudsolutions.com.ar`.

---

## 4. Páginas de Servicios Especializadas

Cada página de servicio (`src/app/[locale]/[servicio]/page.tsx`) cuenta con:
- Hero específico con propuesta técnica de valor.
- Lista detallada de casos de uso y entregables.
- Metodología de implementación paso a paso.
- Sección de Preguntas Frecuentes específicas de la disciplina.
- Formulario de contacto preseleccionado para ese servicio.

| Ruta | Título de la Solución | Enfoque Principal |
|---|---|---|
| `/agentic-ai` | Agentes de IA Empresarial | LLMs privados, RAG corporativo, agentes autónomos y copilots |
| `/automations` | Automatización de Procesos | Workflows con Power Automate, n8n y RPA |
| `/azure` | Soluciones Cloud Azure | Migración a la nube, IaaS/PaaS, arquitectura Well-Architected |
| `/finops` | CSCloud FinOps | Visibilidad de costos, presupuestos, ahorro y remediación |
| `/microsoft-365`| Microsoft 365 & Colaboración| Migración de correo a Exchange, Teams, SharePoint, OneDrive |
| `/modern-workplace`| Puesto de Trabajo Digital| Intune MDM/MAM, Windows 365, Azure Virtual Desktop |
| `/power-platform`| Power Platform | Desarrollo de aplicaciones Power Apps y tableros Power BI |
| `/seguridad` | Ciberseguridad & Compliance | Entra ID, Defender, Zero Trust, ISO 27001, SOC 2 |
| `/soporte` | Soporte Técnico & Managed IT | Soporte Nivel 1, 2 y 3, monitoreo 24/7 y SLAs garantizados |
| `/nosotros` | Acerca de CSCloud Solutions | Historia, equipo de ingenieros certificados y valores |

---

## 5. Módulo de Blog Técnico (`src/app/[locale]/blog/`)

- **Estructura de Artículos:** Archivos Markdown con Frontmatter ubicados en `src/content/blog/`.
- **Metadatos en Frontmatter:** `title`, `description`, `date`, `author`, `image`, `tags`, `locale`.
- **Rutas Dinámicas:** `/[locale]/blog/[slug]` con generación estática (`generateStaticParams`).
- **Renderizado Markdown:** Procesado con `react-markdown`, `remark-gfm` y componentes personalizados (`MarkdownImage.tsx`).
- **Temáticas Clave del Blog:**
  - Comparativas de arquitectura Azure (NAT Gateway vs Firewall, AVD vs Citrix).
  - Guías de migración y Disaster Recovery.
  - Estrategias de optimización FinOps y gobernanza de costos.
  - Ciberseguridad y buenas prácticas en Microsoft 365.

---

## 6. Sistema de Internacionalización (i18n)

El sistema de traducciones utiliza `next-intl` con archivos JSON modulares:
- `messages/es.json` (Español - Idioma principal / default)
- `messages/en.json` (Inglés)
- `messages/pt-BR.json` (Portugués)

### Estructura de Claves de Traducción
```json
{
  "nav": { "solutions": "...", "finops": "...", "blog": "...", "contact": "..." },
  "hero": { "title": "...", "subtitle": "...", "ctaPrimary": "..." },
  "services": { "azure": { ... }, "m365": { ... }, "security": { ... } },
  "finops": { "badge": "...", "tiers": { ... } },
  "contact": { "title": "...", "fields": { ... }, "submit": "..." },
  "structured": { "orgDescription": "...", "knowsAbout": [ ... ], "faq": [ ... ] }
}
```

---

## 7. Políticas Legales y Cumplimiento

- **Política de Privacidad (`/politica-de-privacidad`):** Detalla el tratamiento de datos personales conforme a normativas de protección de datos (GDPR, Ley 25.326 de Protección de Datos Personales de Argentina).
- **Términos y Condiciones (`/terminos-y-condiciones`):** Marco regulatorio de uso de la web y contratación de servicios.
- **Política de Reembolso (`/politica-de-reembolso`):** Términos comerciales para servicios de consultoría y suscripciones SaaS.
- **Cookie Consent Banner (`CookieBanner.tsx`):** Control interactivo de cookies con opciones de aceptación/rechazo y persistencia local.
