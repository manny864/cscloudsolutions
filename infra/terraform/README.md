# Infraestructura Azure con Terraform (Zero Trust) — cscloudsolutions.com.ar

Infraestructura como código (IaC) para la web de CSCloud Solutions en Microsoft Azure bajo arquitectura **Zero Trust**, **Deployment Slots** (Staging/Prod), **Autoescalado Horizontal** y **Lockdown perimetral con Cloudflare**.

---

## Convención de Nomenclatura y Recursos Creados

| Recurso | Tipo de Recurso | Nombre en Azure | Descripción |
|---|---|---|---|
| **Resource Group** | `rg` | `cscs-webpage-wus2-prod` | Contenedor principal de recursos |
| **App Service Plan** | `asp` | `cscs-asp-wus2-prod` | Plan Linux en SKU `P0v3` (1 vCPU, 4 GB RAM, 250 GB SSD) |
| **Autoescalado** | `autoscale` | `cscs-autoscale-wus2-prod` | Escalado dinámico (1 a 3 instancias) por CPU (>70%) y Memoria (>80%) |
| **Linux Web App (Prod)** | `app` | `cscloudsolutions` | Hostname: `cscloudsolutions.azurewebsites.net` |
| **Deployment Slot (Staging)** | `slot` | `staging` | Hostname: `cscloudsolutions-staging.azurewebsites.net` |
| **Azure Key Vault** | `kv` | `cscs-kv-wus2-prod` | Almacén de secretos con RBAC nativo |
| **Log Analytics Workspace** | `law` | `cscs-law-wus2-prod` | Repositorio central de auditoría y diagnóstico |

---

## Implementación Zero Trust

1. **Lockdown de Origen (Cloudflare Only Ingress):**
   - Acción por defecto: `Deny All`.
   - Se permite exclusivamente el tráfico que proviene de las IPs públicas oficiales de Cloudflare (IPv4 e IPv6).
2. **Gestión de Secretos sin Credenciales Embebidas:**
   - Key Vault protegido con RBAC.
   - Las Managed Identities de producción (`5cc65150-2942-4245-807d-3c79dda690a6`) y staging (`91a2acf6-feac-482d-b74b-c6f6245a2ed2`) tienen asignado el rol `Key Vault Secrets User`.
3. **Hardening de Protocolos:**
   - FTPS deshabilitado (`Disabled`).
   - Basic Auth para despliegues SCM y FTP deshabilitado.
   - Forzado de HTTPS y TLS 1.2+.
4. **Auditoría Continua:**
   - Diagnostic Settings conectados a Log Analytics Workspace (`cscs-law-wus2-prod`).

---

## Configuración DNS en Cloudflare

Agrega los siguientes registros en tu zona DNS de Cloudflare:

| Tipo | Nombre (Host) | Contenido / Destino | Proxy Status |
|---|---|---|---|
| **TXT** | `asuid` | `BB199346506019711C06F8B6D23E333D5151A8E27418FA5C7897ED7128AD3E66` | DNS Only (Nube Gris) |
| **CNAME** | `@` (o `cscloudsolutions.com.ar`) | `cscloudsolutions.azurewebsites.net` | Proxied (Nube Naranja)* |
| **CNAME** | `www` | `cscloudsolutions.azurewebsites.net` | Proxied (Nube Naranja)* |

*\*Nota: Durante la primera vinculación del certificado en Azure, si Azure requiere validación directa, mantener temporalmente en DNS Only (Nube Gris) y luego pasar a Proxied (Nube Naranja) con modo SSL en Cloudflare en **Full (Strict)**.*

---

## Flujo de Despliegue con Slots (Zero-Downtime Swap)

1. **Despliegue a Staging:**
   ```bash
   az webapp deploy --resource-group cscs-webpage-wus2-prod --name cscloudsolutions --slot staging --src-path app-build.tar.gz --type zip
   ```
2. **Validación Previa:**
   Probar en `https://cscloudsolutions-staging.azurewebsites.net`.
3. **Swap a Producción:**
   ```bash
   az webapp deployment slot swap --resource-group cscs-webpage-wus2-prod --name cscloudsolutions --slot staging --target-slot production
   ```
