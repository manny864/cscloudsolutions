# SOP: Generación de Documento Técnico (HLD y LLD) de CSCloud Solutions

## Objetivo
Elaborar y documentar la arquitectura técnica integral de la plataforma web de CSCloud Solutions (`cscloudsolutions.com.ar`) en formato **High-Level Design (HLD)** y **Low-Level Design (LLD)**, publicando el entregable en Markdown (`.md`) y exportándolo a formato PDF profesional (`.pdf`).

## Alcance del Documento Técnico
1. **High-Level Design (HLD):**
   - Visión general del negocio y objetivos de la plataforma.
   - Arquitectura global (Cloudflare Edge + Microsoft Azure).
   - Principios rectores de diseño (Zero Trust, Alta Disponibilidad, Escalabilidad Automática, Resiliencia).
   - Diagramas de arquitectura y flujo de tráfico.
   - Matriz de componentes y servicios en la nube.
2. **Low-Level Design (LLD):**
   - **Frontend & App Core:** Next.js 15 (App Router, Standalone mode, React 19, i18n multilingüe es/en/pt-BR).
   - **Infraestructura como Código (IaC):** Especificación exhaustiva de Terraform (Resource Group, App Service Plan P0v3, Linux Web App con Node 22 LTS, Deployment Slots Staging/Prod, Autoscale Setting, Key Vault RBAC, Log Analytics Workspace).
   - **Seguridad Zero Trust:** Restricción perimetral CIDR Cloudflare (Deny All por defecto), identidades administradas (SystemAssigned), RBAC `Key Vault Secrets User`, TLS 1.2+, deshabilitación de Basic Auth y FTPS.
   - **Flujo de Integración & Envío:** Formularios de contacto vía Microsoft Graph API (OAuth 2.0 Client Credentials), Google reCAPTCHA v3, Sentry Monitoring.
   - **Pipeline CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`) con validaciones, compilación standalone y Zero-Downtime Swap entre slots.
   - **Topología DNS y Red:** Configuración de registros Cloudflare (TXT `asuid`, CNAMEs `@` y `www`) y modo SSL Full.

## Herramientas y Entregables
- **Markdown Entregable:** `docs/DOCUMENTO_TECNICO_HLD_LLD_CSCLOUD.md`
- **PDF Entregable:** `docs/DOCUMENTO_TECNICO_HLD_LLD_CSCLOUD.pdf`
- **Script de Generación PDF:** `scripts/generate_technical_pdf.py`

## Casos Borde y Aprendizajes
- Para la generación del PDF con formato profesional, utilizar librerías deterministas de Python con diseño corporativo (colores azul/índigo de CSCloud Solutions, tipografías legibles, márgenes y paginación ejecutiva).
