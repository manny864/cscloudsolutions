# SOP: Infraestructura en Azure con Terraform para Hosting Web (Arquitectura Zero Trust)

## Objetivo
Aprovisionar y estandarizar la infraestructura como código (IaC) en Microsoft Azure utilizando Terraform para migrar la página web corporativa (Next.js 15) hacia Azure App Service en SKU `P0v3`, incorporando principios estrictos de **Zero Trust Architecture (ZTA)**, **Slots de Despliegue (Staging / Producción)**, **Reglas de Autoescalado Automático**, **Protección Perimetral Cloudflare** y **Pipeline de CI/CD automatizado en GitHub Actions**.

---

## Pilares de la Arquitectura Zero Trust Implementada

### 1. Verificación Explícita y Aislamiento Perimetral (Ingress Lockdown)
- **Restricción de Tráfico Web (IP Restrictions):** Se bloquea todo el tráfico entrante público directo a Azure (`Default Action: Deny`).
- **Whitelisting Cloudflare:** Solo se permite tráfico proveniente de los rangos oficiales CIDR de Cloudflare (IPv4 e IPv6).
- **Deshabilitación de Protocolos Inseguros:** FTPS deshabilitado (`Disabled`), Basic Auth para SCM/FTP deshabilitado (`ftp_publish_basic_authentication_enabled = false`).

### 2. Mínimo Privilegio e Identidad Gestionada (Zero Trust Identity & Secrets)
- **Azure Key Vault:** `cscs-kv-wus2-prod` para el almacenamiento centralizado y cifrado en reposo de secretos con RBAC.
- **Managed Identities (SystemAssigned):** La Web App y el Slot de Staging acceden al Key Vault mediante el rol `Key Vault Secrets User`.
- **Service Principal de CI/CD (`github-actions-cscs-web`):** Permisos de Contributor restringidos con ámbito exclusivo sobre el Resource Group `cscs-webpage-wus2-prod` (Zero Trust Least Privilege).

### 3. Asumir Brecha y Telemetría Centralizada (Continuous Monitoring)
- **Log Analytics Workspace:** `cscs-law-wus2-prod` como repositorio central de auditoría.
- **Diagnostic Settings:** Registro continuo de logs de auditoría de App Service (`AppServiceAuditLogs`), logs de acceso HTTP (`AppServiceHTTPLogs`), logs de aplicación y auditoría de accesos a Key Vault (`AuditEvent`).

---

## Pipeline de CI/CD en GitHub Actions (`.github/workflows/deploy.yml`)

1. **Build & Test (Todas las ramas y PRs):**
   - Node.js 22 LTS
   - Caché optimizado de dependencias y build de Next.js
   - Empaquetado del artefacto (`.next`, `public`, `messages`, config y `package.json`).

2. **Push a `staging`:**
   - Despliegue directo al slot `staging` (`cscloudsolutions-staging.azurewebsites.net`).

3. **Push a `main` (Zero-Downtime Blue/Green Deployment):**
   - Despliegue del artefacto al slot `staging`.
   - Ejecución de smoke test de verificación.
   - **Intercambio instantáneo (Swap):** `az webapp deployment slot swap --resource-group cscs-webpage-wus2-prod --name cscloudsolutions --slot staging --target-slot production`.
   - Cero caída de servicio para los usuarios finales.

---

## Configuración DNS y SSL con Cloudflare
1. **Validación TXT:** `asuid` → `<custom_domain_verification_id>`
2. **CNAME:** `@` y `www` → `cscloudsolutions.azurewebsites.net`
3. **Modo SSL en Cloudflare:** `Full` o `Full (Strict)`.
