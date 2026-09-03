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
- **Service Principal de CI/CD (`github-actions-cscs-web`):** Permisos de Contributor restringidos con ámbito exclusivo sobre el Resource Group `cscs-webpage-wus2-prod`.

### 3. Asumir Brecha y Telemetría Centralizada (Continuous Monitoring)
- **Log Analytics Workspace:** `cscs-law-wus2-prod` como repositorio central de auditoría.
- **Diagnostic Settings:** Registro continuo de logs de auditoría de App Service (`AppServiceAuditLogs`), logs de acceso HTTP (`AppServiceHTTPLogs`), logs de aplicación y auditoría de accesos a Key Vault (`AuditEvent`).

---

## Pipeline de CI/CD en GitHub Actions (`.github/workflows/deploy.yml`)

1. **Build & Package:**
   - Node.js 22 LTS
   - Compilación con `npm run build`
   - Empaquetado en formato `.zip` estándar (`release.zip`).

2. **Push a `staging`:**
   - Despliegue del `.zip` al slot `staging` (`cscloudsolutions-staging.azurewebsites.net`).

3. **Push a `main` (Zero-Downtime Blue/Green Deployment):**
   - Despliegue del paquete `.zip` al slot `staging`.
   - Ejecución de smoke test de verificación.
   - **Swap instantáneo:** `az webapp deployment slot swap --resource-group cscs-webpage-wus2-prod --name cscloudsolutions --slot staging --target-slot production`.
   - Cero caída de servicio para los usuarios finales.

---

## Casos Borde y Aprendizajes
- **Formato de Paquete para `azure/webapps-deploy`:** `azure/webapps-deploy@v3` **no** acepta paquetes `.tar.gz`. Debe usarse estrictamente formato `.zip` o un directorio de archivos.
- **Certificados Gestionados de Azure vs Cloudflare Proxy:** No utilizar `azurerm_app_service_managed_certificate` cuando el dominio está detrás del proxy de Cloudflare (Nube Naranja). La arquitectura estándar vincula `custom_hostname_binding` y delega el SSL a Cloudflare en modo **Full**.
- **Nota: No configurar `health_check_path` de Azure App Service apuntando a rutas frontend localizadas (ej. `/es`), porque causa el error: "La aplicación está notificando un estado incorrecto. Compruebe los registros de la aplicación en busca de solicitudes con errores o lentas destinadas a la ruta de sondeo de comprobación de estado personalizada". Esto ocurre porque `next-intl` (`localePrefix: 'as-needed'`) devuelve un código `HTTP 307 Temporary Redirect` hacia `/`, y las sondas de mantenimiento de Azure no siguen redirecciones y consideran cualquier código distinto de 200-299 como fallo/unhealthy. En su lugar, crear e indicar un endpoint API dedicado y ligero como `/api/health` que responda inmediatamente con HTTP 200 JSON sin renderizado SSR ni middlewares de internacionalización.**
