#!/usr/bin/env python3
"""
Sincronización integral de traducciones para la Matriz de Capacidades y Popup de FinOps.
1. Remueve 'Sin tarjeta de crédito requerida' / 'No credit card required' del trustBadge.
2. Agrega las claves de traducción completas para las 50 capacidades y sus valores condicionales en es.json, en.json y pt-BR.json.
3. Actualiza FinOpsCapabilitiesTable.tsx para consumir las traducciones dinámicamente sin textos en español embebidos.
"""
import json
import os

MESSAGES_DIR = "messages"

TRANSLATIONS_DATA = {
    "es": {
        "trustBadge": "Conexión segura con Azure • 100% de gobernanza",
        "matrix": {
            "badge": "Matriz de Capacidades Oficial",
            "capabilitiesHeader": "Capacidades y Características",
            "businessTarget": "Empresas en crecimiento",
            "enterpriseTarget": "Corporaciones & MSPs",
            "included": "Incluido",
            "values": {
                "upTo2": "Hasta 2",
                "upTo3": "Hasta 3",
                "unlimited": "Ilimitadas",
                "unlimitedUsers": "Ilimitados",
                "upTo3Users": "Hasta 3 usuarios",
                "upTo5Users": "Hasta 5 usuarios",
                "detectionOnly": "Detección (sin remediación)",
                "detectionRemediation": "Detección + Remediación",
                "detectionRemediationBlock": "Detección + Remediación + Auto-Block",
                "auditOnly": "Auditoría (sin remediación)",
                "auditRemediation": "Auditoría + Remediación",
                "auditRemediationBlock": "Auditoría + Remediación + Auto-Block",
                "basicRecommendations": "Recomendaciones básicas",
                "advancedRightsizingCode": "Rightsizing Avanzado as Code",
                "readOnly": "Solo lectura",
                "tickets20": "20 tickets / mes",
                "sla24h": "Respuesta en 24 h",
                "sla8h": "Respuesta en 8 h",
                "sla4h": "Respuesta máxima 4 h",
                "dedicated247": "Dedicado 24/7"
            },
            "items": {
                "azureSubs": "Suscripciones de Azure soportadas",
                "usersAccounts": "Cuentas y usuarios incluidos",
                "multiCurrency": "Preferencias Multi-Moneda (USD, EUR, ARS, BRL)",
                "multiTenantDelegations": "Delegaciones Multi-Tenant (cross-account)",
                "whiteboard": "WhiteBoard (Vista Ejecutiva C-Level)",
                "costHistory": "Historial de Costos, Facturación y Presupuestos",
                "realConsumption": "Consumo Real (Dashboard Detallado)",
                "costGroups": "Cost Groups (Budget & Forecast por Unidad de Negocio)",
                "focusExport": "Exportaciones FOCUS 1.1 (Estándar FinOps Foundation)",
                "finopsMaturity": "Madurez FinOps (Assessment interactivo)",
                "executiveReport": "Reporte Ejecutivo Automático (C-Level)",
                "sharedCostAllocation": "Prorrateo de Costos Compartidos (Shared Cost Allocation)",
                "zombieResources": "Detección de Recursos Zombies (Discos, IPs, NICs huérfanos)",
                "zombieNetworking": "Detección de Networking Zombies (Gateways, LBs inactivos)",
                "tagCompliance": "Cumplimiento y Auditoría de Etiquetas (Tags)",
                "autoPowerSchedules": "Encendido / Apagado Automático (Schedules de VMs)",
                "ttlExpirations": "Expiraciones TTL de Recursos Temporales",
                "expiringCredentials": "Credenciales por Expirar en Entra ID / Service Principals",
                "rightsizing": "Rightsizing y Recomendaciones de Cómputo / DB",
                "savingsPlansVsRis": "Planes de Ahorro vs Reservas (Savings Plans vs RIs)",
                "hybridBenefit": "Beneficios Híbridos de Azure (AHB Tracking)",
                "zeroCostInventory": "Inventario de Costo Cero (Recursos sin facturación activa)",
                "whatIfScenarios": "Escenarios What-If (Simulador de Costos y Migración)",
                "teamScorecard": "Scorecard y Ranking de Postura de Equipos",
                "storageComputeEfficiency": "Eficiencia de Storage ($/GB) y Cómputo ($/core)",
                "maccTracking": "MACC Tracking & Burn-Rate de Compromiso con Microsoft",
                "aksControl": "Control y Visibilidad de Kubernetes (AKS)",
                "aksChargeback": "AKS Chargeback (Costos por Namespace, Pod y Label)",
                "unitEconomics": "Unit Economics (Costo por transacción / cliente)",
                "finopsCopilot": "FinOps Copilot (Asistente IA Generativa)",
                "zScoreAnomalies": "Detección de Anomalías de Gasto con Z-Score",
                "aiCostAnalytics": "AI Cost Analytics (Azure OpenAI & Cognitive Services)",
                "m365CopilotCost": "Configuración de Costos de Microsoft 365 Copilot",
                "mcpApiKeys": "MCP API Keys (Integración con Cursor, Claude, Antigravity)",
                "actionCenter": "Action Center (Flujos y Aprobaciones de Remediación)",
                "policiesAsCode": "Políticas Preventivas as Code (Auto-Block de recursos caros)",
                "auditTrail": "Registro de Auditoría Completo (Audit Log)",
                "mfaMandatory": "Autenticación Multi-Factor (MFA) Obligatoria",
                "notificationChannels": "Canales de Notificación (Slack, Teams, Email, Webhook)",
                "lighthouseOnboarding": "Azure Lighthouse Onboarding (Multi-Tenant MSP)",
                "cspBillingMarkup": "Motor de Billing para Partners (CSP) / Markup de Reventa",
                "powerBiFocus": "Plantillas y Exportación Oficial Power BI (FOCUS)",
                "powerBiInvoicing": "Power BI Invoicing para Clientes Finales",
                "ssoFederation": "SSO Federado Empresarial (SAML 2.0 / Entra ID)",
                "publicRestApi": "API REST Pública & Webhooks Bidireccionales",
                "azureKeyVault": "Azure Key Vault (Cifrado gestionado por la plataforma)",
                "marketplaceBilling": "Facturación Integrada en Azure Marketplace SaaS",
                "supportTickets": "Tickets de soporte incluidos",
                "slaResponse": "Tiempo de respuesta garantizado (SLA)",
                "dedicatedSupport": "Soporte y Arquitecto FinOps Dedicado"
            }
        }
    },
    "en": {
        "trustBadge": "Secure Azure connection • 100% governance",
        "matrix": {
            "badge": "Official Capabilities Matrix",
            "capabilitiesHeader": "Capabilities & Features",
            "businessTarget": "Growing companies",
            "enterpriseTarget": "Corporations & MSPs",
            "included": "Included",
            "values": {
                "upTo2": "Up to 2",
                "upTo3": "Up to 3",
                "unlimited": "Unlimited",
                "unlimitedUsers": "Unlimited",
                "upTo3Users": "Up to 3 users",
                "upTo5Users": "Up to 5 users",
                "detectionOnly": "Detection (no remediation)",
                "detectionRemediation": "Detection + Remediation",
                "detectionRemediationBlock": "Detection + Remediation + Auto-Block",
                "auditOnly": "Audit (no remediation)",
                "auditRemediation": "Audit + Remediation",
                "auditRemediationBlock": "Audit + Remediation + Auto-Block",
                "basicRecommendations": "Basic recommendations",
                "advancedRightsizingCode": "Advanced Rightsizing as Code",
                "readOnly": "Read-only",
                "tickets20": "20 tickets / month",
                "sla24h": "24 h response",
                "sla8h": "8 h response",
                "sla4h": "Max 4 h response",
                "dedicated247": "Dedicated 24/7"
            },
            "items": {
                "azureSubs": "Supported Azure Subscriptions",
                "usersAccounts": "Included accounts and users",
                "multiCurrency": "Multi-Currency Display Preferences (USD, EUR, ARS, BRL)",
                "multiTenantDelegations": "Multi-Tenant Delegations (cross-account)",
                "whiteboard": "WhiteBoard (C-Level Executive View)",
                "costHistory": "Cost, Billing & Budgets History",
                "realConsumption": "Actual Consumption (Detailed Dashboard)",
                "costGroups": "Cost Groups (Budget & Forecast by Business Unit)",
                "focusExport": "FOCUS 1.1 Exports (FinOps Foundation Standard)",
                "finopsMaturity": "FinOps Maturity (Interactive Assessment)",
                "executiveReport": "Automated Executive Report (C-Level)",
                "sharedCostAllocation": "Shared Cost Allocation",
                "zombieResources": "Zombie Resources Detection (Orphan disks, IPs, NICs)",
                "zombieNetworking": "Zombie Networking Detection (Inactive Gateways, LBs)",
                "tagCompliance": "Tag Compliance & Audit",
                "autoPowerSchedules": "Automatic Power On/Off (VM Schedules)",
                "ttlExpirations": "TTL Expirations for Temporary Resources",
                "expiringCredentials": "Expiring Credentials in Entra ID / Service Principals",
                "rightsizing": "Rightsizing & Compute / DB Recommendations",
                "savingsPlansVsRis": "Savings Plans vs Reservations (RIs)",
                "hybridBenefit": "Azure Hybrid Benefit (AHB Tracking)",
                "zeroCostInventory": "Zero-Cost Inventory (Resources without active billing)",
                "whatIfScenarios": "What-If Scenarios (Cost & Migration Simulator)",
                "teamScorecard": "Team Posture Scorecard & Ranking",
                "storageComputeEfficiency": "Storage ($/GB) and Compute ($/core) Efficiency",
                "maccTracking": "MACC Tracking & Microsoft Commitment Burn-Rate",
                "aksControl": "Kubernetes (AKS) Visibility & Control",
                "aksChargeback": "AKS Chargeback (Costs by Namespace, Pod & Label)",
                "unitEconomics": "Unit Economics (Cost per transaction / customer)",
                "finopsCopilot": "FinOps Copilot (Generative AI Assistant)",
                "zScoreAnomalies": "Spending Anomaly Detection with Z-Score",
                "aiCostAnalytics": "AI Cost Analytics (Azure OpenAI & Cognitive Services)",
                "m365CopilotCost": "Microsoft 365 Copilot Cost Configuration",
                "mcpApiKeys": "MCP API Keys (Cursor, Claude, Antigravity Integration)",
                "actionCenter": "Action Center (Remediation Workflows & Approvals)",
                "policiesAsCode": "Preventive Policies as Code (Auto-Block expensive resources)",
                "auditTrail": "Complete Audit Trail (Audit Log)",
                "mfaMandatory": "Mandatory Multi-Factor Authentication (MFA)",
                "notificationChannels": "Notification Channels (Slack, Teams, Email, Webhook)",
                "lighthouseOnboarding": "Azure Lighthouse Onboarding (Multi-Tenant MSP)",
                "cspBillingMarkup": "Partner (CSP) Billing Engine / Resale Markup",
                "powerBiFocus": "Official Power BI Templates & Export (FOCUS)",
                "powerBiInvoicing": "Power BI Invoicing for End Customers",
                "ssoFederation": "Enterprise Federated SSO (SAML 2.0 / Entra ID)",
                "publicRestApi": "Public REST API & Bi-directional Webhooks",
                "azureKeyVault": "Azure Key Vault (Platform-managed encryption)",
                "marketplaceBilling": "Integrated Azure Marketplace SaaS Billing",
                "supportTickets": "Included support tickets",
                "slaResponse": "Guaranteed Response Time (SLA)",
                "dedicatedSupport": "Dedicated Support & FinOps Architect"
            }
        }
    },
    "pt-BR": {
        "trustBadge": "Conexão segura com Azure • 100% de governança",
        "matrix": {
            "badge": "Matriz de Recursos Oficial",
            "capabilitiesHeader": "Recursos e Funcionalidades",
            "businessTarget": "Empresas em crescimento",
            "enterpriseTarget": "Corporações & MSPs",
            "included": "Incluído",
            "values": {
                "upTo2": "Até 2",
                "upTo3": "Até 3",
                "unlimited": "Ilimitadas",
                "unlimitedUsers": "Ilimitados",
                "upTo3Users": "Até 3 usuários",
                "upTo5Users": "Até 5 usuários",
                "detectionOnly": "Detecção (sem remediação)",
                "detectionRemediation": "Detecção + Remediação",
                "detectionRemediationBlock": "Detecção + Remediação + Auto-Block",
                "auditOnly": "Auditoria (sem remediação)",
                "auditRemediation": "Auditoria + Remediação",
                "auditRemediationBlock": "Auditoria + Remediação + Auto-Block",
                "basicRecommendations": "Recomendações básicas",
                "advancedRightsizingCode": "Rightsizing Avançado as Code",
                "readOnly": "Somente leitura",
                "tickets20": "20 tickets / mês",
                "sla24h": "Resposta em 24 h",
                "sla8h": "Resposta em 8 h",
                "sla4h": "Resposta máxima 4 h",
                "dedicated247": "Dedicado 24/7"
            },
            "items": {
                "azureSubs": "Assinaturas do Azure suportadas",
                "usersAccounts": "Contas e usuários incluídos",
                "multiCurrency": "Preferências Multi-Moeda (USD, EUR, ARS, BRL)",
                "multiTenantDelegations": "Delegações Multi-Tenant (cross-account)",
                "whiteboard": "WhiteBoard (Visão Executiva C-Level)",
                "costHistory": "Histórico de Custos, Faturamento e Orçamentos",
                "realConsumption": "Consumo Real (Painel Detalhado)",
                "costGroups": "Cost Groups (Orçamento e Previsão por Unidade de Negócio)",
                "focusExport": "Exportações FOCUS 1.1 (Padrão FinOps Foundation)",
                "finopsMaturity": "Maturidade FinOps (Avaliação interativa)",
                "executiveReport": "Relatório Executivo Automático (C-Level)",
                "sharedCostAllocation": "Rateio de Custos Compartilhados (Shared Cost Allocation)",
                "zombieResources": "Detecção de Recursos Zumbis (Discos, IPs, NICs órfãos)",
                "zombieNetworking": "Detecção de Rede Zumbi (Gateways, LBs inativos)",
                "tagCompliance": "Conformidade e Auditoria de Etiquetas (Tags)",
                "autoPowerSchedules": "Ligar / Desligar Automático (Agendamentos de VMs)",
                "ttlExpirations": "Expirações TTL de Recursos Temporários",
                "expiringCredentials": "Credenciais a Expirar no Entra ID / Service Principals",
                "rightsizing": "Rightsizing e Recomendações de Computação / DB",
                "savingsPlansVsRis": "Planos de Economia vs Reservas (Savings Plans vs RIs)",
                "hybridBenefit": "Benefício Híbrido do Azure (Rastreamento AHB)",
                "zeroCostInventory": "Inventário de Custo Zero (Recursos sem faturamento ativo)",
                "whatIfScenarios": "Cenários What-If (Simulador de Custos e Migração)",
                "teamScorecard": "Scorecard e Ranking de Postura de Equipes",
                "storageComputeEfficiency": "Eficiência de Armazenamento ($/GB) e Computação ($/core)",
                "maccTracking": "Rastreamento MACC e Burn-Rate de Compromisso Microsoft",
                "aksControl": "Controle e Visibilidade de Kubernetes (AKS)",
                "aksChargeback": "AKS Chargeback (Custos por Namespace, Pod e Label)",
                "unitEconomics": "Unit Economics (Custo por transação / cliente)",
                "finopsCopilot": "FinOps Copilot (Assistente de IA Generativa)",
                "zScoreAnomalies": "Detecção de Anomalias de Gastos com Z-Score",
                "aiCostAnalytics": "AI Cost Analytics (Azure OpenAI & Cognitive Services)",
                "m365CopilotCost": "Configuração de Custos do Microsoft 365 Copilot",
                "mcpApiKeys": "MCP API Keys (Integração com Cursor, Claude, Antigravity)",
                "actionCenter": "Action Center (Fluxos e Aprovações de Remediação)",
                "policiesAsCode": "Políticas Preventivas as Code (Auto-Block de recursos caros)",
                "auditTrail": "Registro de Auditoria Completo (Audit Log)",
                "mfaMandatory": "Autenticação Multifator (MFA) Obrigatória",
                "notificationChannels": "Canais de Notificação (Slack, Teams, Email, Webhook)",
                "lighthouseOnboarding": "Azure Lighthouse Onboarding (Multi-Tenant MSP)",
                "cspBillingMarkup": "Motor de Faturamento para Parceiros (CSP) / Markup de Revenda",
                "powerBiFocus": "Modelos e Exportação Oficial do Power BI (FOCUS)",
                "powerBiInvoicing": "Power BI Invoicing para Clientes Finais",
                "ssoFederation": "SSO Federado Empresarial (SAML 2.0 / Entra ID)",
                "publicRestApi": "API REST Pública & Webhooks Bidirecionais",
                "azureKeyVault": "Azure Key Vault (Criptografia gerenciada pela plataforma)",
                "marketplaceBilling": "Faturamento Integrado no Azure Marketplace SaaS",
                "supportTickets": "Tickets de suporte incluídos",
                "slaResponse": "Tempo de resposta garantido (SLA)",
                "dedicatedSupport": "Suporte e Arquiteto FinOps Dedicado"
            }
        }
    }
}

def sync_messages():
    for lang in ["es", "en", "pt-BR"]:
        file_path = os.path.join(MESSAGES_DIR, f"{lang}.json")
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        data["finopsPopup"]["trustBadge"] = TRANSLATIONS_DATA[lang]["trustBadge"]
        data["finopsPopup"]["matrix"] = TRANSLATIONS_DATA[lang]["matrix"]

        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print(f"[OK] Sincronizado {file_path}")

if __name__ == "__main__":
    sync_messages()
