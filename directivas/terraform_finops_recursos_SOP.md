# SOP: Aprovisionamiento de Recursos FinOps en Microsoft Entra ID con Terraform

## Objetivo
Estandarizar y aprovisionar mediante Infraestructura como Código (Terraform) los recursos de Microsoft Entra ID requeridos por el **Azure FinOps Assessment / Azure Value Sprint**:
1. **Grupo de Seguridad de Azure Lighthouse:** Para recibir las delegaciones de suscripción de clientes bajo el rol *Reader*.
2. **App Registration Multi-Tenant SPA:** Para la autenticación interactiva de clientes y extracción de telemetría de costos y recursos vía Azure Resource Graph y APIs de ARM.
3. **Service Principal Asociado:** Para la instancia de la aplicación en el tenant corporativo.
4. Cumplir estrictamente con la **nomenclatura corporativa** y el **esquema de etiquetado estándar**.

---

## Nomenclatura Corporativa Estándar

Siguiendo el estándar de `main.tf` (`${local.prefix}-${resource_type}-${service}-${environment}`):
- **Prefijo:** `cscs`
- **Ambiente:** `prod` (o según variable `var.environment`)
- **Grupo de Seguridad:**
  - `display_name`: `cscs-grp-finops-lighthouse-${local.environment}` (ej. `cscs-grp-finops-lighthouse-prod`)
  - `mail_nickname`: `cscsgrpfinopslighthouse${local.environment}`
- **App Registration Multi-Tenant SPA:**
  - `display_name`: `cscs-app-finops-assessment-${local.environment}` (ej. `cscs-app-finops-assessment-prod`)
- **Service Principal:**
  - Asociado a la App Registration.

---

## Esquema de Etiquetas (Tags)

```hcl
locals {
  finops_tags = {
    CostCenter  = "FinOps"
    Environment = "PROD"
    ManagedBy   = "Terraform"
    Owner       = "mchavez@cscloudsolutions.com.ar"
    Product     = "FinOpsAssessment"
    Service     = "AzureValueSprint"
    Department  = "IT"
    Role        = "LighthouseDelegation"
  }
}
```

---

## Archivos Involucrados
- `cscloudsolutions/infra/terraform/main.tf` (Registro de `provider "azuread"`)
- `cscloudsolutions/infra/terraform/finops.tf` (Definición de grupo, app registration, service principal, miembros y tags)
- `cscloudsolutions/infra/terraform/outputs.tf` (Exposición de `finops_lighthouse_group_id`, `finops_lighthouse_group_name`, `finops_spa_client_id`)
- `cscloudsolutions/public/finops_assesment/config.js` y `assesment_Finops/site/config.js` (Actualización de los IDs generados)

---

## Lógica y Pasos de Ejecución
1. Configurar `required_providers` agregando `hashicorp/azuread`.
2. Crear `finops.tf` con:
   - `data "azuread_client_config" "current"`
   - `azuread_group.finops_lighthouse` (con `owners` y `members` apuntando al usuario actual autenticado).
   - `azuread_application.finops_spa` (multi-tenant con `redirect_uris` de producción y local, y API permissions `user_impersonation` sobre Azure Service Management `797f4846-ba00-4fd7-ba43-dac1f8f63013`).
   - `azuread_service_principal.finops_sp`.
3. Exponer los outputs en `outputs.tf`.
4. Ejecutar `terraform init` y `terraform plan` / `terraform apply`.
5. Sincronizar automáticamente los IDs resultantes en `config.js`.

---

## Restricciones y Casos Borde (Memoria Viva)
- **Etiquetas en Microsoft Entra ID:** Las aplicaciones de Azure AD aceptan tags como lista de cadenas (`tags = ["CostCenter:FinOps", ...]`). Los grupos de seguridad de Entra ID se describen mediante `description`, ya que Microsoft Graph no dispone de un diccionario de tags ARM nativo.
- **Sincronización con `config.js`:** Cuando el grupo se nombra `cscs-grp-finops-lighthouse-prod`, el valor `lighthouseGroupName` en `config.js` debe coincidir para que los clientes vean la delegación con el nombre corporativo exacto.
