output "resource_group_name" {
  description = "Nombre del Resource Group aprovisionado."
  value       = azurerm_resource_group.cscs_rg.name
}

output "service_plan_name" {
  description = "Nombre del App Service Plan."
  value       = azurerm_service_plan.cscs_asp.name
}

output "autoscale_setting_name" {
  description = "Nombre de la regla de autoescalado."
  value       = azurerm_monitor_autoscale_setting.cscs_autoscale.name
}

output "key_vault_name" {
  description = "Nombre del Azure Key Vault Zero Trust."
  value       = azurerm_key_vault.cscs_kv.name
}

output "key_vault_uri" {
  description = "URI del Azure Key Vault para secretos."
  value       = azurerm_key_vault.cscs_kv.vault_uri
}

output "log_analytics_workspace_name" {
  description = "Nombre del Log Analytics Workspace para auditoría centralizada."
  value       = azurerm_log_analytics_workspace.cscs_law.name
}

output "web_app_name" {
  description = "Nombre de la Linux Web App principal (producción)."
  value       = azurerm_linux_web_app.cscs_app.name
}

output "production_hostname" {
  description = "URL / Hostname del slot de Producción (*.azurewebsites.net)."
  value       = azurerm_linux_web_app.cscs_app.default_hostname
}

output "staging_slot_name" {
  description = "Nombre del Deployment Slot de Staging."
  value       = azurerm_linux_web_app_slot.cscs_app_staging.name
}

output "staging_hostname" {
  description = "URL / Hostname del slot de Staging para validaciones previas."
  value       = azurerm_linux_web_app_slot.cscs_app_staging.default_hostname
}

output "custom_domain_verification_id" {
  description = "Valor del registro TXT asuid.<dominio> para validar el dominio en Azure (Cloudflare DNS)."
  value       = azurerm_linux_web_app.cscs_app.custom_domain_verification_id
  sensitive   = true
}

output "production_principal_id" {
  description = "Managed Identity (SystemAssigned) del slot de Producción."
  value       = azurerm_linux_web_app.cscs_app.identity[0].principal_id
}

output "staging_principal_id" {
  description = "Managed Identity (SystemAssigned) del slot de Staging."
  value       = azurerm_linux_web_app_slot.cscs_app_staging.identity[0].principal_id
}
