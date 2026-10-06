# ==============================================================================
# CSCloudSolutions · Recursos de Microsoft Entra ID para FinOps & Lighthouse
# ==============================================================================

locals {
  # Nomenclatura corporativa estándar: ${prefix}-${tipo}-${servicio}-${ambiente}
  finops_group_name = "${local.prefix}-grp-finops-lighthouse-${local.environment}"
  finops_app_name   = "${local.prefix}-app-finops-assessment-${local.environment}"

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

# Contexto del cliente/usuario autenticado para asignación de Owner y Member
data "azuread_client_config" "current" {}

# Grupo de Seguridad para Azure Lighthouse (recibe las delegaciones de clientes)
resource "azuread_group" "finops_lighthouse" {
  display_name     = local.finops_group_name
  mail_nickname    = "${local.prefix}grpfinopslighthouse${local.environment}"
  description      = "Recibe delegaciones de Azure Lighthouse de solo lectura (Azure Value Sprint / FinOps Assessment)"
  security_enabled = true
  owners           = [data.azuread_client_config.current.object_id]
  members          = [data.azuread_client_config.current.object_id]
}

# App Registration Multi-Tenant SPA para la herramienta de evaluación interactiva
resource "azuread_application" "finops_spa" {
  display_name     = local.finops_app_name
  sign_in_audience = "AzureADMultipleOrgs"
  owners           = [data.azuread_client_config.current.object_id]
  tags             = [for k, v in local.finops_tags : "${k}:${v}"]

  single_page_application {
    redirect_uris = [
      "https://cscloudsolutions.com.ar/finops_assesment/redirect.html",
      "http://localhost:3000/finops_assesment/redirect.html"
    ]
  }

  required_resource_access {
    resource_app_id = "797f4846-ba00-4fd7-ba43-dac1f8f63013" # Azure Service Management

    resource_access {
      id   = "41094075-9dad-400e-a0bd-54e686782033" # user_impersonation
      type = "Scope"
    }
  }
}

# Service Principal en el tenant corporativo para la aplicación FinOps SPA
resource "azuread_service_principal" "finops_sp" {
  client_id = azuread_application.finops_spa.client_id
  owners    = [data.azuread_client_config.current.object_id]
  tags      = [for k, v in local.finops_tags : "${k}:${v}"]
}
