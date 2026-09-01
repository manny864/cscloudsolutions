terraform {
  required_version = ">= 1.6"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy    = false
      recover_soft_deleted_key_vaults = true
    }
  }
  subscription_id = var.subscription_id
}

locals {
  prefix      = "cscs"
  region_code = lower(var.region_code)
  environment = lower(var.environment)

  # Nomenclatura corporativa estándar:
  rg_name        = "${local.prefix}-webpage-${local.region_code}-${local.environment}"
  asp_name       = "${local.prefix}-asp-${local.region_code}-${local.environment}"
  autoscale_name = "${local.prefix}-autoscale-${local.region_code}-${local.environment}"
  kv_name        = "${local.prefix}-kv-${local.region_code}-${local.environment}"
  law_name       = "${local.prefix}-law-${local.region_code}-${local.environment}"
  app_name       = var.web_app_name

  tags = {
    CostCenter  = "WebPage"
    Environment = "PROD"
    ManagedBy   = "Terraform"
    Owner       = "mchavez@cscloudsolutions.com.ar"
    Product     = "WebPage"
    Service     = "WebPage"
    Department  = "IT"
    Role        = "WebPage"
  }

  # Rangos IP oficiales de Cloudflare (Zero Trust Origin Lockdown)
  cloudflare_cidrs = [
    # IPv4
    "173.245.48.0/20",
    "103.21.244.0/22",
    "103.22.200.0/22",
    "103.31.4.0/22",
    "141.101.64.0/18",
    "108.162.192.0/18",
    "190.93.240.0/20",
    "188.114.96.0/20",
    "197.234.240.0/22",
    "198.41.128.0/17",
    "162.158.0.0/15",
    "104.16.0.0/13",
    "104.24.0.0/14",
    "172.64.0.0/13",
    "131.0.72.0/22",
    # IPv6
    "2400:cb00::/32",
    "2606:4700::/32",
    "2803:f800::/32",
    "2405:b500::/32",
    "2405:8100::/32",
    "2a06:98c0::/29",
    "2c0f:f248::/32"
  ]
}

# 1. Resource Group
resource "azurerm_resource_group" "cscs_rg" {
  name     = local.rg_name
  location = var.location
  tags     = local.tags
}

# 2. Log Analytics Workspace (Zero Trust Observability & Centralized Auditing)
resource "azurerm_log_analytics_workspace" "cscs_law" {
  name                = local.law_name
  resource_group_name = azurerm_resource_group.cscs_rg.name
  location            = azurerm_resource_group.cscs_rg.location
  sku                 = "PerGB2018"
  retention_in_days   = 30
  tags                = local.tags
}

# 3. Azure Key Vault (Zero Trust Secrets Management with RBAC)
resource "azurerm_key_vault" "cscs_kv" {
  name                       = local.kv_name
  location                   = azurerm_resource_group.cscs_rg.location
  resource_group_name        = azurerm_resource_group.cscs_rg.name
  tenant_id                  = var.graph_tenant_id
  sku_name                   = "standard"
  rbac_authorization_enabled = true
  soft_delete_retention_days = 7
  purge_protection_enabled   = false
  tags                       = local.tags

  network_acls {
    bypass         = "AzureServices"
    default_action = "Allow"
  }
}

# 4. App Service Plan (Linux)
resource "azurerm_service_plan" "cscs_asp" {
  name                = local.asp_name
  resource_group_name = azurerm_resource_group.cscs_rg.name
  location            = azurerm_resource_group.cscs_rg.location
  os_type             = "Linux"
  sku_name            = var.app_service_sku
  tags                = local.tags
}

# 5. Regla de Autoescalado Automático
resource "azurerm_monitor_autoscale_setting" "cscs_autoscale" {
  name                = local.autoscale_name
  resource_group_name = azurerm_resource_group.cscs_rg.name
  location            = azurerm_resource_group.cscs_rg.location
  target_resource_id  = azurerm_service_plan.cscs_asp.id
  tags                = local.tags

  profile {
    name = "defaultProfile"

    capacity {
      default = var.autoscale_min_capacity
      minimum = var.autoscale_min_capacity
      maximum = var.autoscale_max_capacity
    }

    rule {
      metric_trigger {
        metric_name        = "CpuPercentage"
        metric_resource_id = azurerm_service_plan.cscs_asp.id
        time_grain         = "PT1M"
        statistic          = "Average"
        time_window        = "PT5M"
        time_aggregation   = "Average"
        operator           = "GreaterThan"
        threshold          = 70
      }

      scale_action {
        direction = "Increase"
        type      = "ChangeCount"
        value     = "1"
        cooldown  = "PT5M"
      }
    }

    rule {
      metric_trigger {
        metric_name        = "CpuPercentage"
        metric_resource_id = azurerm_service_plan.cscs_asp.id
        time_grain         = "PT1M"
        statistic          = "Average"
        time_window        = "PT5M"
        time_aggregation   = "Average"
        operator           = "LessThan"
        threshold          = 25
      }

      scale_action {
        direction = "Decrease"
        type      = "ChangeCount"
        value     = "1"
        cooldown  = "PT5M"
      }
    }

    rule {
      metric_trigger {
        metric_name        = "MemoryPercentage"
        metric_resource_id = azurerm_service_plan.cscs_asp.id
        time_grain         = "PT1M"
        statistic          = "Average"
        time_window        = "PT5M"
        time_aggregation   = "Average"
        operator           = "GreaterThan"
        threshold          = 80
      }

      scale_action {
        direction = "Increase"
        type      = "ChangeCount"
        value     = "1"
        cooldown  = "PT5M"
      }
    }
  }
}

# 6. Web App Principal (Producción) con Hardening Zero Trust
resource "azurerm_linux_web_app" "cscs_app" {
  name                                           = local.app_name
  resource_group_name                            = azurerm_resource_group.cscs_rg.name
  location                                       = azurerm_service_plan.cscs_asp.location
  service_plan_id                                = azurerm_service_plan.cscs_asp.id
  https_only                                     = true
  client_affinity_enabled                        = false
  ftp_publish_basic_authentication_enabled       = false
  webdeploy_publish_basic_authentication_enabled = false
  virtual_network_subnet_id                      = azurerm_subnet.webpage_snet_appservice.id
  tags                                           = local.tags

  identity {
    type = "SystemAssigned"
  }

  site_config {
    always_on                         = true
    http2_enabled                     = true
    minimum_tls_version               = "1.2"
    ftps_state                        = "Disabled"
    health_check_path                 = "/es"
    health_check_eviction_time_in_min = 5
    app_command_line                  = "node server.js"

    application_stack {
      node_version = "22-lts"
    }

    # Zero Trust Ingress: Denegar todo excepto tráfico de Cloudflare
    ip_restriction_default_action     = "Deny"
    scm_ip_restriction_default_action = "Allow"

    dynamic "ip_restriction" {
      for_each = local.cloudflare_cidrs
      content {
        name       = "Allow-Cloudflare-${index(local.cloudflare_cidrs, ip_restriction.value) + 1}"
        ip_address = ip_restriction.value
        priority   = 100 + index(local.cloudflare_cidrs, ip_restriction.value)
        action     = "Allow"
      }
    }
  }

  app_settings = {
    # Desactivar compilación en Azure (el paquete ya viene pre-compilado en standalone)
    SCM_DO_BUILD_DURING_DEPLOYMENT = "false"
    WEBSITE_NODE_DEFAULT_VERSION   = "~22"
    NODE_ENV                       = "production"
    PORT                           = "8080"

    NEXT_PUBLIC_RECAPTCHA_SITE_KEY = var.recaptcha_site_key
    RECAPTCHA_SECRET_KEY           = var.recaptcha_secret_key
    AZURE_TENANT_ID                = var.graph_tenant_id
    AZURE_CLIENT_ID                = var.graph_client_id
    AZURE_CLIENT_SECRET            = var.graph_client_secret
    AZURE_SENDER_EMAIL             = var.sender_email
    AZURE_RECIPIENT_EMAIL          = var.recipient_email
    SENTRY_DSN                     = var.sentry_dsn

    # Configuración de Microsoft Entra ID (SSO CMS)
    AZURE_AD_CLIENT_ID             = var.entra_client_id
    AZURE_AD_CLIENT_SECRET         = var.entra_client_secret
    AZURE_AD_TENANT_ID             = var.graph_tenant_id
    NEXTAUTH_SECRET                = var.nextauth_secret
    NEXTAUTH_URL                   = "https://${var.custom_domain != "" ? var.custom_domain : "${local.app_name}.azurewebsites.net"}"

    # Conexión Privada MySQL CMS (VNet Backend)
    MYSQL_HOST                     = "${var.finops_mysql_server_name}.mysql.database.azure.com"
    MYSQL_DATABASE                 = "cscloud_cms"
    MYSQL_USER                     = var.mysql_user
    MYSQL_PASSWORD                 = var.mysql_password
    AZURE_STORAGE_CONTAINER_NAME   = "cms-media"
    AZURE_STORAGE_CONNECTION_STRING = var.azure_storage_connection_string
  }

  sticky_settings {
    app_setting_names = [
      "NEXTAUTH_URL",
      "NEXTAUTH_SECRET",
      "MYSQL_PASSWORD",
      "MYSQL_USER",
      "AZURE_STORAGE_CONNECTION_STRING",
      "AZURE_CLIENT_ID",
      "AZURE_CLIENT_SECRET",
      "AZURE_AD_CLIENT_ID",
      "AZURE_AD_CLIENT_SECRET",
      "RECAPTCHA_SECRET_KEY",
      "NEXT_PUBLIC_RECAPTCHA_SITE_KEY"
    ]
  }

  lifecycle {
    ignore_changes = [
      app_settings
    ]
  }

  logs {
    http_logs {
      file_system {
        retention_in_days = 7
        retention_in_mb   = 35
      }
    }
  }
}

# 7. Deployment Slot (Staging) con Hardening Zero Trust
resource "azurerm_linux_web_app_slot" "cscs_app_staging" {
  name                                           = "staging"
  app_service_id                                 = azurerm_linux_web_app.cscs_app.id
  https_only                                     = true
  client_affinity_enabled                        = false
  ftp_publish_basic_authentication_enabled       = false
  webdeploy_publish_basic_authentication_enabled = false
  virtual_network_subnet_id                      = azurerm_subnet.webpage_snet_appservice.id
  tags                                           = local.tags

  identity {
    type = "SystemAssigned"
  }

  site_config {
    always_on                         = true
    http2_enabled                     = true
    minimum_tls_version               = "1.2"
    ftps_state                        = "Disabled"
    health_check_path                 = "/es"
    health_check_eviction_time_in_min = 5
    app_command_line                  = "node server.js"

    application_stack {
      node_version = "22-lts"
    }

    # Zero Trust Ingress: Denegar todo excepto Cloudflare
    ip_restriction_default_action     = "Deny"
    scm_ip_restriction_default_action = "Allow"

    dynamic "ip_restriction" {
      for_each = local.cloudflare_cidrs
      content {
        name       = "Allow-Cloudflare-${index(local.cloudflare_cidrs, ip_restriction.value) + 1}"
        ip_address = ip_restriction.value
        priority   = 100 + index(local.cloudflare_cidrs, ip_restriction.value)
        action     = "Allow"
      }
    }
  }

  app_settings = {
    # Desactivar compilación en Azure (el paquete ya viene pre-compilado en standalone)
    SCM_DO_BUILD_DURING_DEPLOYMENT = "false"
    WEBSITE_NODE_DEFAULT_VERSION   = "~22"
    NODE_ENV                       = "production"
    PORT                           = "8080"

    NEXT_PUBLIC_RECAPTCHA_SITE_KEY = var.recaptcha_site_key
    RECAPTCHA_SECRET_KEY           = var.recaptcha_secret_key
    AZURE_TENANT_ID                = var.graph_tenant_id
    AZURE_CLIENT_ID                = var.graph_client_id
    AZURE_CLIENT_SECRET            = var.graph_client_secret
    AZURE_SENDER_EMAIL             = var.sender_email
    AZURE_RECIPIENT_EMAIL          = var.recipient_email
    SENTRY_DSN                     = var.sentry_dsn

    # Configuración de Microsoft Entra ID (SSO CMS)
    AZURE_AD_CLIENT_ID             = var.entra_client_id
    AZURE_AD_CLIENT_SECRET         = var.entra_client_secret
    AZURE_AD_TENANT_ID             = var.graph_tenant_id
    NEXTAUTH_SECRET                = var.nextauth_secret
    NEXTAUTH_URL                   = "https://${var.custom_domain != "" ? var.custom_domain : "${local.app_name}.azurewebsites.net"}"

    # Conexión Privada MySQL CMS (VNet Backend)
    MYSQL_HOST                     = "${var.finops_mysql_server_name}.mysql.database.azure.com"
    MYSQL_DATABASE                 = "cscloud_cms"
    MYSQL_USER                     = var.mysql_user
    MYSQL_PASSWORD                 = var.mysql_password
    AZURE_STORAGE_CONTAINER_NAME   = "cms-media"
    AZURE_STORAGE_CONNECTION_STRING = var.azure_storage_connection_string
  }

  lifecycle {
    ignore_changes = [
      app_settings
    ]
  }
}

# 8. Asignaciones RBAC Zero Trust (Key Vault Secrets User para Managed Identities)
resource "azurerm_role_assignment" "kv_role_prod" {
  scope                = azurerm_key_vault.cscs_kv.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_linux_web_app.cscs_app.identity[0].principal_id
}

resource "azurerm_role_assignment" "kv_role_staging" {
  scope                = azurerm_key_vault.cscs_kv.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_linux_web_app_slot.cscs_app_staging.identity[0].principal_id
}

# 9. Diagnostic Settings (Auditoría Continua Zero Trust)
resource "azurerm_monitor_diagnostic_setting" "app_diag" {
  name                       = "${local.prefix}-diag-app-${local.region_code}-${local.environment}"
  target_resource_id         = azurerm_linux_web_app.cscs_app.id
  log_analytics_workspace_id = azurerm_log_analytics_workspace.cscs_law.id

  enabled_log {
    category_group = "allLogs"
  }

  enabled_metric {
    category = "AllMetrics"
  }
}

resource "azurerm_monitor_diagnostic_setting" "kv_diag" {
  name                       = "${local.prefix}-diag-kv-${local.region_code}-${local.environment}"
  target_resource_id         = azurerm_key_vault.cscs_kv.id
  log_analytics_workspace_id = azurerm_log_analytics_workspace.cscs_law.id

  enabled_log {
    category_group = "audit"
  }

  enabled_metric {
    category = "AllMetrics"
  }
}

# 10. Dominio personalizado (Gestionado con Cloudflare SSL/TLS Full)
resource "azurerm_app_service_custom_hostname_binding" "cscs_chb" {
  count               = var.custom_domain == "" ? 0 : 1
  hostname            = var.custom_domain
  app_service_name    = azurerm_linux_web_app.cscs_app.name
  resource_group_name = azurerm_resource_group.cscs_rg.name
}

# ---------------------------------------------------------------------------
# 11. Integración Backend con FinOps (Zero Trust VNet Integration + MySQL + Storage)
# ---------------------------------------------------------------------------

# Data Sources del Backend de FinOps existente
data "azurerm_virtual_network" "finops_vnet" {
  name                = var.finops_vnet_name
  resource_group_name = var.finops_resource_group_name
}

data "azurerm_mysql_flexible_server" "finops_mysql" {
  name                = var.finops_mysql_server_name
  resource_group_name = var.finops_resource_group_name
}

data "azurerm_storage_account" "finops_storage" {
  name                = var.finops_storage_account_name
  resource_group_name = var.finops_resource_group_name
}

# Subred dedicada para el App Service en la VNet de FinOps
resource "azurerm_subnet" "webpage_snet_appservice" {
  name                 = "cscs-webpage-snet-appservice"
  resource_group_name  = data.azurerm_virtual_network.finops_vnet.resource_group_name
  virtual_network_name = data.azurerm_virtual_network.finops_vnet.name
  address_prefixes     = [var.appservice_subnet_prefix]
  service_endpoints    = ["Microsoft.Storage", "Microsoft.KeyVault"]

  delegation {
    name = "delegation-appservice"
    service_delegation {
      name    = "Microsoft.Web/serverFarms"
      actions = ["Microsoft.Network/virtualNetworks/subnets/action"]
    }
  }
}

# Base de datos MySQL dedicada para el CMS en el servidor Flexible existente
resource "azurerm_mysql_flexible_database" "cms_database" {
  name                = "cscloud_cms"
  resource_group_name = data.azurerm_mysql_flexible_server.finops_mysql.resource_group_name
  server_name         = data.azurerm_mysql_flexible_server.finops_mysql.name
  charset             = "utf8mb4"
  collation           = "utf8mb4_unicode_ci"
}

# Contenedor de Azure Blob Storage para las imágenes del CMS y Blog
resource "azurerm_storage_container" "cms_media" {
  name                  = "cms-media"
  storage_account_id    = data.azurerm_storage_account.finops_storage.id
  container_access_type = "private"
}

