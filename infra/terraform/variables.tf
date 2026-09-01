variable "subscription_id" {
  type        = string
  default     = "ec03e8ce-ceee-4638-b303-64ae431d5b1e"
  description = "ID de la suscripción de Azure donde se desplegarán los recursos."
}

variable "location" {
  type        = string
  default     = "westus2"
  description = "Región de Azure (West US 2)."
}

variable "region_code" {
  type        = string
  default     = "wus2"
  description = "Abreviación de la zona de despliegue para la nomenclatura (ej: wus2)."
}

variable "environment" {
  type        = string
  default     = "prod"
  description = "Ambiente de despliegue para la nomenclatura (ej: prod)."
}

variable "web_app_name" {
  type        = string
  default     = "cscloudsolutions"
  description = "Nombre global de la Web App en Azure (resulta en cscloudsolutions.azurewebsites.net)."
}

variable "app_service_sku" {
  type        = string
  default     = "P0v3"
  description = "SKU del App Service Plan (P0v3, P1v3, S1, etc.)."
}

variable "autoscale_min_capacity" {
  type        = number
  default     = 1
  description = "Cantidad mínima de instancias para el autoescalado."
}

variable "autoscale_max_capacity" {
  type        = number
  default     = 3
  description = "Cantidad máxima de instancias para el autoescalado durante picos de demanda."
}

variable "custom_domain" {
  type        = string
  default     = "cscloudsolutions.com.ar"
  description = "Dominio personalizado (ej: cscloudsolutions.com.ar)."
}

variable "recaptcha_site_key" {
  type        = string
  default     = ""
  description = "Clave pública del sitio de Google reCAPTCHA."
}

variable "recaptcha_secret_key" {
  type        = string
  default     = ""
  sensitive   = true
  description = "Clave secreta de Google reCAPTCHA."
}

variable "graph_tenant_id" {
  type        = string
  default     = "81ebe027-e6af-4e09-bc73-58c9012c6408"
  description = "Azure AD / Entra ID Tenant ID para Microsoft Graph."
}

variable "graph_client_id" {
  type        = string
  default     = ""
  description = "Azure AD App Registration Client ID para Microsoft Graph."
}

variable "graph_client_secret" {
  type        = string
  default     = ""
  sensitive   = true
  description = "Azure AD App Registration Client Secret."
}

variable "sender_email" {
  type        = string
  default     = "sales@cscloudsolutions.com.ar"
  description = "Dirección de correo remitente para envíos vía Graph API."
}

variable "recipient_email" {
  type        = string
  default     = "sales@cscloudsolutions.com.ar"
  description = "Dirección de correo destinatario de los formularios de contacto."
}

variable "sentry_dsn" {
  type        = string
  default     = ""
  sensitive   = true
  description = "DSN de Sentry para monitoreo y reporte de errores."
}

# ── Variables de Integración con FinOps Backend (West US 2) ────────────────
variable "finops_resource_group_name" {
  type        = string
  default     = "cscs-finops-prod-westus2-rg"
  description = "Nombre del Resource Group del backend de FinOps."
}

variable "finops_vnet_name" {
  type        = string
  default     = "cscs-finops-prod-westus2-vnet"
  description = "Nombre de la Virtual Network de FinOps donde se conectará el App Service."
}

variable "finops_mysql_server_name" {
  type        = string
  default     = "cscs-finops-prod-westus2-mysql"
  description = "Nombre del servidor MySQL Flexible de FinOps."
}

variable "finops_storage_account_name" {
  type        = string
  default     = "cscsfinopsprodwestus2sa"
  description = "Nombre de la Storage Account de FinOps."
}

variable "appservice_subnet_prefix" {
  type        = string
  default     = "10.50.40.0/24"
  description = "Prefijo CIDR de la subred para VNet Integration del App Service en la VNet de FinOps."
}

# ── Microsoft Entra ID SSO para CMS (CSCloud Solutions) ────────────────────
variable "entra_client_id" {
  type        = string
  default     = "bccdf54a-44cd-4dc4-8f20-afbf007cc9d0"
  description = "Client ID de la App Registration de Microsoft Entra ID para el CMS."
}

variable "entra_client_secret" {
  type        = string
  default     = "2kD8Q~lZ2jngEiTuuLw6qZQ4p7bGaw3-Ro-yabnH"
  sensitive   = true
  description = "Client Secret de la App Registration de Microsoft Entra ID para el CMS."
}

variable "nextauth_secret" {
  type        = string
  default     = "eEdY+7ij5L97Li1tT6fjVczWpt4FA539wiYxyT4y6bk="
  sensitive   = true
  description = "Clave secreta de encriptación para NextAuth.js."
}

