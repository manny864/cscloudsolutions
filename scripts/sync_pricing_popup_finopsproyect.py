#!/usr/bin/env python3
"""
Sincronización de puntos de beneficios en TierLimitGateModal.tsx y tierLimitsGuard.ts
dentro de /Users/manuelchavez/Documents/FinOpsProyect basándose estrictamente en la Página de Precios (Master).
"""
import sys

TARGET_MODAL = "/Users/manuelchavez/Documents/FinOpsProyect/src/components/common/TierLimitGateModal.tsx"
TARGET_GUARD = "/Users/manuelchavez/Documents/FinOpsProyect/src/middleware/tierLimitsGuard.ts"

NEW_BENEFITS = """  const targetTierBenefits: Record<SaaSPlanTier, { subLimitText: string; features: string[] }> = {
    Professional: {
      subLimitText: `Hasta ${SUBSCRIPTION_LIMITS.Professional} Suscripciones Azure, hasta 3 usuarios`,
      features: [
        "WhiteBoard (Vista Ejecutiva)",
        "Historial de Costos y Facturación",
        "Visualización de Presupuestos",
        "Consumo Real (Dashboard Detallado)",
        "FOCUS 1.1 Export",
        "Recursos y Networking Zombies (sin Remediación)",
        "Cumplimiento de Etiquetas (sin Remediación)",
        "Asesor de Azure y Puntaje de Salud",
        "Canales de Notificación (Slack/Teams/Email/Webhook)",
        "Autenticación Multi-Factor (MFA)",
        "FinOps Copilot (IA)",
        "Soporte en plataforma (20 tickets/mes, respuesta en 24 h)",
      ],
    },
    Business: {
      subLimitText: `Hasta ${SUBSCRIPTION_LIMITS.Business} Suscripciones Azure, hasta 5 usuarios`,
      features: [
        "Todo lo de Professional",
        "Recursos Zombies y Networking Zombies (con Remediación)",
        "Cost Groups (Budget & Forecast por Unidad de Negocio)",
        "Análisis de Red",
        "Costos por Categoría e Ingesta CSV",
        "Expiraciones TTL (sin Remediación)",
        "Encendido/Apagado Automático (Schedules)",
        "Alta Disponibilidad de VMs",
        "Credenciales por Expirar (Entra ID)",
        "Delegaciones Multi-Tenant (cross-account)",
        "Reporte Ejecutivo y Flujos de Aprobaciones",
        "Página de Estado Pública + Historial de Incidentes",
        "Soporte ilimitado en plataforma (respuesta en 8 h)",
      ],
    },
    Enterprise: {
      subLimitText: "Suscripciones Azure y usuarios ILIMITADOS",
      features: [
        "Todo lo de Business",
        "Exclusivo: Azure Lighthouse Onboarding",
        "Hubs completos: Optimización y Ahorro, Analítica Avanzada, Monitoreo, Seguridad, Azure IA e Integration Services",
        "Beneficios Híbridos (AHB), Reservas (RIs) y Planes de Ahorro",
        "Escenarios What-If (Simulador de Costos), Rightsizing y Optimización de Tarifas",
        "Scorecard y Ranking de Equipos, Salud del Tenant",
        "Control AKS (Kubernetes), AKS Chargeback y Prorrateo de Costos (Allocation)",
        "AI Cost Analytics y MCP API Keys (Integración con Asistentes IA)",
        "Motor de Billing para Partners (CSP) / Partner Markup",
        "Power BI Templates, Exportación FOCUS y Facturación CSP",
        "Políticas Preventivas as Code (Auto-Block) y Auditorías FinOps Modulares",
        "SSO Federado (SAML), Azure Key Vault y Billing Marketplace SaaS",
        "Soporte dedicado ilimitado (SLA máximo 4 h)",
      ],
    },
  };"""

OLD_BENEFITS_MARKER = "  const targetTierBenefits: Record<SaaSPlanTier, { subLimitText: string; features: string[] }> = {"

with open(TARGET_MODAL, "r", encoding="utf-8") as f:
    content = f.read()

if OLD_BENEFITS_MARKER not in content:
    print(f"Error: marker not found in {TARGET_MODAL}")
    sys.exit(1)

# Reemplazar targetTierBenefits
start_idx = content.find(OLD_BENEFITS_MARKER)
end_marker = "  };\n\n  const currentBenefits"
end_idx = content.find(end_marker, start_idx)

if end_idx == -1:
    print(f"Error: end marker not found in {TARGET_MODAL}")
    sys.exit(1)

content = content[:start_idx] + NEW_BENEFITS + content[end_idx + 4:]

# Hacer scrollable la lista si excede altura
old_ul = '<ul className="space-y-1.5">'
new_ul = '<ul className="space-y-1.5 max-h-52 overflow-y-auto pr-1">'
if old_ul in content:
    content = content.replace(old_ul, new_ul, 1)

with open(TARGET_MODAL, "w", encoding="utf-8") as f:
    f.write(content)
print(f"Successfully updated {TARGET_MODAL}")

# Actualizar tierLimitsGuard.ts
with open(TARGET_GUARD, "r", encoding="utf-8") as f:
    guard_content = f.read()

old_tier_features = '''const TIER_FEATURES: Record<SaaSPlanTier, RestrictedFeatureKey[]> = {
  Professional: [],
  Business: [
    "FOCUS_EXPORT",
    "CSP_MARKUP",
    "POWERBI_TEMPLATES",
    "ZOMBIE_REMEDIATION",
    "TAG_REMEDIATION",
  ],
  Enterprise: [
    "CSP_MARKUP",
    "FOCUS_EXPORT",
    "POWERBI_TEMPLATES",
    "UNLIMITED_SUBS",
    "ZOMBIE_REMEDIATION",
    "TAG_REMEDIATION",
    "ADVANCED_AI",
    "PRIORITY_SUPPORT",
  ],
};'''

new_tier_features = '''const TIER_FEATURES: Record<SaaSPlanTier, RestrictedFeatureKey[]> = {
  Professional: [
    "FOCUS_EXPORT",
  ],
  Business: [
    "FOCUS_EXPORT",
    "ZOMBIE_REMEDIATION",
    "TAG_REMEDIATION",
  ],
  Enterprise: [
    "CSP_MARKUP",
    "FOCUS_EXPORT",
    "POWERBI_TEMPLATES",
    "UNLIMITED_SUBS",
    "ZOMBIE_REMEDIATION",
    "TAG_REMEDIATION",
    "ADVANCED_AI",
    "PRIORITY_SUPPORT",
  ],
};'''

if old_tier_features in guard_content:
    guard_content = guard_content.replace(old_tier_features, new_tier_features, 1)
    with open(TARGET_GUARD, "w", encoding="utf-8") as f:
        f.write(guard_content)
    print(f"Successfully updated {TARGET_GUARD}")
else:
    print(f"Notice: TIER_FEATURES already updated or marker adjusted in {TARGET_GUARD}")

print("All updates completed successfully.")
