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
  default     = ""
  description = "Dominio personalizado (ej: cscloudsolutions.com.ar). Dejar vacío si solo se usará *.azurewebsites.net inicialmente."
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
