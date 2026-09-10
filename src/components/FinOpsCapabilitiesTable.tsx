'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  IconCheck,
  IconX,
  IconArrowLeft,
  IconSparkles,
  IconAward,
  IconStarFilled,
  IconShieldCheck,
  IconUsers,
  IconChartBar,
  IconReceipt,
  IconTrash,
  IconTags,
  IconCpu,
  IconServer,
  IconRobot,
  IconKey,
  IconHeadset,
  IconScale,
  IconLayersLinked,
  IconBrandAzure,
  IconLock,
  IconFileSpreadsheet,
  IconClock,
  IconBolt,
} from '@tabler/icons-react';

interface FinOpsCapabilitiesTableProps {
  onRevert: () => void;
  onClose: () => void;
  finopsUrl: string;
}

interface CapabilityRow {
  name: string;
  icon: React.ReactNode;
  pro: boolean | string;
  business: boolean | string;
  enterprise: boolean | string;
}

interface CapabilityCategory {
  titleKey: string;
  rows: CapabilityRow[];
}

export function FinOpsCapabilitiesTable({
  onRevert,
  onClose,
  finopsUrl,
}: FinOpsCapabilitiesTableProps) {
  const t = useTranslations('finopsPopup');

  const categories: CapabilityCategory[] = [
    {
      titleKey: 'categoryLimits',
      rows: [
        {
          name: 'Suscripciones de Azure soportadas',
          icon: <IconBrandAzure className="w-5 h-5 text-[#0078D4]" stroke={1.75} />,
          pro: 'Hasta 2',
          business: 'Hasta 3',
          enterprise: 'Ilimitadas',
        },
        {
          name: 'Cuentas y usuarios incluidos',
          icon: <IconUsers className="w-5 h-5 text-slate-700" stroke={1.75} />,
          pro: 'Hasta 3 usuarios',
          business: 'Hasta 5 usuarios',
          enterprise: 'Ilimitados',
        },
        {
          name: 'Preferencias Multi-Moneda (USD, EUR, ARS, BRL)',
          icon: <IconReceipt className="w-5 h-5 text-emerald-600" stroke={1.75} />,
          pro: true,
          business: true,
          enterprise: true,
        },
        {
          name: 'Delegaciones Multi-Tenant (cross-account)',
          icon: <IconLayersLinked className="w-5 h-5 text-indigo-600" stroke={1.75} />,
          pro: false,
          business: true,
          enterprise: true,
        },
      ],
    },
    {
      titleKey: 'categoryVisibility',
      rows: [
        {
          name: 'WhiteBoard (Vista Ejecutiva C-Level)',
          icon: <IconChartBar className="w-5 h-5 text-blue-600" stroke={1.75} />,
          pro: true,
          business: true,
          enterprise: true,
        },
        {
          name: 'Historial de Costos, Facturación y Presupuestos',
          icon: <IconClock className="w-5 h-5 text-slate-600" stroke={1.75} />,
          pro: true,
          business: true,
          enterprise: true,
        },
        {
          name: 'Consumo Real (Dashboard Detallado)',
          icon: <IconChartBar className="w-5 h-5 text-[#00AEEF]" stroke={1.75} />,
          pro: true,
          business: true,
          enterprise: true,
        },
        {
          name: 'Cost Groups (Budget & Forecast por Unidad de Negocio)',
          icon: <IconScale className="w-5 h-5 text-blue-700" stroke={1.75} />,
          pro: false,
          business: true,
          enterprise: true,
        },
        {
          name: 'Exportaciones FOCUS 1.1 (Estándar FinOps Foundation)',
          icon: <IconFileSpreadsheet className="w-5 h-5 text-emerald-700" stroke={1.75} />,
          pro: true,
          business: true,
          enterprise: true,
        },
        {
          name: 'Madurez FinOps (Assessment interactivo)',
          icon: <IconAward className="w-5 h-5 text-amber-600" stroke={1.75} />,
          pro: true,
          business: true,
          enterprise: true,
        },
        {
          name: 'Reporte Ejecutivo Automático (C-Level)',
          icon: <IconFileSpreadsheet className="w-5 h-5 text-indigo-700" stroke={1.75} />,
          pro: false,
          business: true,
          enterprise: true,
        },
        {
          name: 'Prorrateo de Costos Compartidos (Shared Cost Allocation)',
          icon: <IconScale className="w-5 h-5 text-purple-700" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
      ],
    },
    {
      titleKey: 'categoryZombies',
      rows: [
        {
          name: 'Detección de Recursos Zombies (Discos, IPs, NICs huérfanos)',
          icon: <IconTrash className="w-5 h-5 text-rose-600" stroke={1.75} />,
          pro: 'Detección (sin remediación)',
          business: 'Detección + Remediación',
          enterprise: 'Detección + Remediación + Auto-Block',
        },
        {
          name: 'Detección de Networking Zombies (Gateways, LBs inactivos)',
          icon: <IconServer className="w-5 h-5 text-orange-600" stroke={1.75} />,
          pro: 'Detección (sin remediación)',
          business: 'Detección + Remediación',
          enterprise: 'Detección + Remediación + Auto-Block',
        },
        {
          name: 'Cumplimiento y Auditoría de Etiquetas (Tags)',
          icon: <IconTags className="w-5 h-5 text-teal-600" stroke={1.75} />,
          pro: 'Auditoría (sin remediación)',
          business: 'Auditoría + Remediación',
          enterprise: 'Auditoría + Remediación + Auto-Block',
        },
        {
          name: 'Encendido / Apagado Automático (Schedules de VMs)',
          icon: <IconBolt className="w-5 h-5 text-amber-500" stroke={1.75} />,
          pro: false,
          business: true,
          enterprise: true,
        },
        {
          name: 'Expiraciones TTL de Recursos Temporales',
          icon: <IconClock className="w-5 h-5 text-slate-700" stroke={1.75} />,
          pro: false,
          business: true,
          enterprise: true,
        },
        {
          name: 'Credenciales por Expirar en Entra ID / Service Principals',
          icon: <IconKey className="w-5 h-5 text-amber-700" stroke={1.75} />,
          pro: false,
          business: true,
          enterprise: true,
        },
      ],
    },
    {
      titleKey: 'categoryOptimization',
      rows: [
        {
          name: 'Rightsizing y Recomendaciones de Cómputo / DB',
          icon: <IconCpu className="w-5 h-5 text-indigo-600" stroke={1.75} />,
          pro: 'Recomendaciones básicas',
          business: true,
          enterprise: 'Rightsizing Avanzado as Code',
        },
        {
          name: 'Planes de Ahorro vs Reservas (Savings Plans vs RIs)',
          icon: <IconScale className="w-5 h-5 text-emerald-600" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'Beneficios Híbridos de Azure (AHB Tracking)',
          icon: <IconAward className="w-5 h-5 text-blue-600" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'Inventario de Costo Cero (Recursos sin facturación activa)',
          icon: <IconReceipt className="w-5 h-5 text-teal-600" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'Escenarios What-If (Simulador de Costos y Migración)',
          icon: <IconSparkles className="w-5 h-5 text-purple-600" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'Scorecard y Ranking de Postura de Equipos',
          icon: <IconAward className="w-5 h-5 text-amber-500" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'Eficiencia de Storage ($/GB) y Cómputo ($/core)',
          icon: <IconServer className="w-5 h-5 text-cyan-600" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'MACC Tracking & Burn-Rate de Compromiso con Microsoft',
          icon: <IconChartBar className="w-5 h-5 text-blue-800" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
      ],
    },
    {
      titleKey: 'categoryAks',
      rows: [
        {
          name: 'Control y Visibilidad de Kubernetes (AKS)',
          icon: <IconServer className="w-5 h-5 text-[#326CE5]" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'AKS Chargeback (Costos por Namespace, Pod y Label)',
          icon: <IconScale className="w-5 h-5 text-[#326CE5]" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'Unit Economics (Costo por transacción / cliente)',
          icon: <IconReceipt className="w-5 h-5 text-emerald-700" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
      ],
    },
    {
      titleKey: 'categoryAi',
      rows: [
        {
          name: 'FinOps Copilot (Asistente IA Generativa)',
          icon: <IconRobot className="w-5 h-5 text-purple-600" stroke={1.75} />,
          pro: true,
          business: true,
          enterprise: true,
        },
        {
          name: 'Detección de Anomalías de Gasto con Z-Score',
          icon: <IconSparkles className="w-5 h-5 text-rose-600" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'AI Cost Analytics (Azure OpenAI & Cognitive Services)',
          icon: <IconCpu className="w-5 h-5 text-violet-600" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'Configuración de Costos de Microsoft 365 Copilot',
          icon: <IconRobot className="w-5 h-5 text-blue-600" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'MCP API Keys (Integración con Cursor, Claude, Antigravity)',
          icon: <IconKey className="w-5 h-5 text-amber-600" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
      ],
    },
    {
      titleKey: 'categoryGovernance',
      rows: [
        {
          name: 'Action Center (Flujos y Aprobaciones de Remediación)',
          icon: <IconCheck className="w-5 h-5 text-blue-600" stroke={1.75} />,
          pro: 'Solo lectura',
          business: true,
          enterprise: true,
        },
        {
          name: 'Políticas Preventivas as Code (Auto-Block de recursos caros)',
          icon: <IconShieldCheck className="w-5 h-5 text-rose-700" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'Registro de Auditoría Completo (Audit Log)',
          icon: <IconClock className="w-5 h-5 text-slate-600" stroke={1.75} />,
          pro: true,
          business: true,
          enterprise: true,
        },
        {
          name: 'Autenticación Multi-Factor (MFA) Obligatoria',
          icon: <IconLock className="w-5 h-5 text-emerald-600" stroke={1.75} />,
          pro: true,
          business: true,
          enterprise: true,
        },
        {
          name: 'Canales de Notificación (Slack, Teams, Email, Webhook)',
          icon: <IconBolt className="w-5 h-5 text-amber-600" stroke={1.75} />,
          pro: true,
          business: true,
          enterprise: true,
        },
      ],
    },
    {
      titleKey: 'categoryIntegrations',
      rows: [
        {
          name: 'Azure Lighthouse Onboarding (Multi-Tenant MSP)',
          icon: <IconBrandAzure className="w-5 h-5 text-[#0078D4]" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'Motor de Billing para Partners (CSP) / Markup de Reventa',
          icon: <IconReceipt className="w-5 h-5 text-emerald-600" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'Plantillas y Exportación Oficial Power BI (FOCUS)',
          icon: <IconChartBar className="w-5 h-5 text-amber-600" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'Power BI Invoicing para Clientes Finales',
          icon: <IconFileSpreadsheet className="w-5 h-5 text-amber-700" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'SSO Federado Empresarial (SAML 2.0 / Entra ID)',
          icon: <IconKey className="w-5 h-5 text-indigo-600" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'API REST Pública & Webhooks Bidireccionales',
          icon: <IconLayersLinked className="w-5 h-5 text-blue-600" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'Azure Key Vault (Cifrado gestionado por la plataforma)',
          icon: <IconLock className="w-5 h-5 text-slate-700" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
        {
          name: 'Facturación Integrada en Azure Marketplace SaaS',
          icon: <IconBrandAzure className="w-5 h-5 text-[#0078D4]" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: true,
        },
      ],
    },
    {
      titleKey: 'categorySupport',
      rows: [
        {
          name: 'Tickets de soporte incluidos',
          icon: <IconHeadset className="w-5 h-5 text-slate-700" stroke={1.75} />,
          pro: '20 tickets / mes',
          business: 'Ilimitados',
          enterprise: 'Ilimitados',
        },
        {
          name: 'Tiempo de respuesta garantizado (SLA)',
          icon: <IconClock className="w-5 h-5 text-slate-700" stroke={1.75} />,
          pro: 'Respuesta en 24 h',
          business: 'Respuesta en 8 h',
          enterprise: 'Respuesta máxima 4 h',
        },
        {
          name: 'Soporte y Arquitecto FinOps Dedicado',
          icon: <IconShieldCheck className="w-5 h-5 text-blue-700" stroke={1.75} />,
          pro: false,
          business: false,
          enterprise: 'Dedicado 24/7',
        },
      ],
    },
  ];

  const renderCellContent = (value: boolean | string) => {
    if (typeof value === 'string') {
      return (
        <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">
          {value}
        </span>
      );
    }
    if (value === true) {
      return (
        <span className="inline-flex items-center justify-center text-slate-900" aria-label="Incluido">
          {/* Minimalist Microsoft-style checkmark icon identical to user image */}
          <IconCheck className="w-5 h-5 text-slate-900" stroke={2.6} />
        </span>
      );
    }
    return <span className="text-slate-300 font-light text-base select-none">—</span>;
  };

  return (
    <div className="fixed inset-0 z-[120] w-screen h-screen bg-white overflow-y-auto text-slate-900 font-sans flex flex-col custom-scrollbar animate-in fade-in zoom-in-98 duration-200">
      {/* 1. Header Fijo Superior */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onRevert}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold transition-all shadow-2xs hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            title={t('revertToCards')}
          >
            <IconArrowLeft className="w-4 h-4 text-slate-700" stroke={2.5} />
            <span>{t('revertToCards')}</span>
          </button>

          <div className="hidden sm:block h-5 w-px bg-slate-200 mx-1" />

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              CSCloudSolutions
            </span>
            <span className="text-slate-300">•</span>
            <h1 className="text-sm font-bold text-slate-900">{t('fullscreenTitle')}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={finopsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs sm:text-sm font-bold text-white bg-[color:var(--navy)] hover:bg-[#002244] transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            {t('popupCta')}
          </a>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
            aria-label={t('fullscreenClose')}
          >
            <IconX className="w-5 h-5 text-slate-600" stroke={2.2} />
          </button>
        </div>
      </header>

      {/* 2. Hero / Introducción de la Matriz */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 pt-8 pb-4">
        <div className="text-left sm:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-xs font-bold mb-3">
            <IconSparkles className="w-3.5 h-3.5 text-blue-600" stroke={2} />
            <span>Matriz de Capacidades Oficial</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('fullscreenTitle')}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            {t('fullscreenSubtitle')}
          </p>
        </div>
      </div>

      {/* 3. Tabla Comparativa estilo Microsoft 365 */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 pb-16 flex-1">
        <div className="overflow-x-auto border-t border-slate-200">
          <table className="w-full text-left border-collapse">
            {/* Cabecera de Columnas / Planes */}
            <thead className="sticky top-[57px] z-30 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200">
              <tr>
                <th className="py-5 px-4 w-[38%] text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Capacidades y Características
                </th>

                {/* Columna Professional */}
                <th className="py-5 px-4 w-[20%] text-center align-top">
                  <div className="flex flex-col items-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 mb-1">
                      <IconAward className="w-3 h-3 text-blue-700" />
                      {t('pro.badge')}
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-slate-900">
                      {t('pro.name')}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                      {t('pro.trial')}
                    </span>
                  </div>
                </th>

                {/* Columna Business */}
                <th className="py-5 px-4 w-[21%] text-center align-top bg-slate-50/50">
                  <div className="flex flex-col items-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mb-1">
                      <IconStarFilled className="w-3 h-3 text-amber-500" />
                      {t('business.badge')}
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-slate-900">
                      {t('business.name')}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5">
                      Empresas en crecimiento
                    </span>
                  </div>
                </th>

                {/* Columna Enterprise */}
                <th className="py-5 px-4 w-[21%] text-center align-top">
                  <div className="flex flex-col items-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-300 mb-1">
                      <IconShieldCheck className="w-3 h-3 text-slate-700" />
                      {t('enterprise.badge')}
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-slate-900">
                      {t('enterprise.name')}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5">
                      Corporaciones & MSPs
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Cuerpo con categorías agrupadas */}
            <tbody className="divide-y divide-slate-200">
              {categories.map((cat, catIdx) => (
                <React.Fragment key={catIdx}>
                  {/* Encabezado de Categoría */}
                  <tr className="bg-slate-100/70 border-t-2 border-slate-300">
                    <td
                      colSpan={4}
                      className="py-3 px-4 text-xs font-extrabold uppercase tracking-wider text-slate-700 font-heading"
                    >
                      {t(cat.titleKey)}
                    </td>
                  </tr>

                  {/* Filas de la Categoría */}
                  {cat.rows.map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className="hover:bg-slate-50/80 transition-colors border-b border-slate-200"
                    >
                      {/* Columna de la Característica (Ícono + Nombre) */}
                      <td className="py-4 px-4 text-slate-900">
                        <div className="flex items-center gap-3.5">
                          <span className="shrink-0 flex items-center justify-center p-1 rounded-md bg-slate-100">
                            {row.icon}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                            {row.name}
                          </span>
                        </div>
                      </td>

                      {/* Professional */}
                      <td className="py-4 px-4 text-center align-middle">
                        {renderCellContent(row.pro)}
                      </td>

                      {/* Business */}
                      <td className="py-4 px-4 text-center align-middle bg-slate-50/40">
                        {renderCellContent(row.business)}
                      </td>

                      {/* Enterprise */}
                      <td className="py-4 px-4 text-center align-middle">
                        {renderCellContent(row.enterprise)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Footer de la Pantalla Completa */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onRevert}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold shadow-xs hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            <IconArrowLeft className="w-4 h-4 text-slate-700" stroke={2.5} />
            <span>{t('revertToCards')}</span>
          </button>

          <div className="flex flex-col items-center sm:items-end gap-2 text-center sm:text-right">
            <a
              href={finopsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-[color:var(--navy)] to-[#0054A6] hover:from-[#002244] hover:to-[color:var(--navy)] transition-all shadow-md hover:shadow-lg focus:outline-none cursor-pointer"
            >
              {t('popupCta')}
            </a>
            <p className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <IconLock className="w-3.5 h-3.5 text-slate-400" stroke={2} />
              <span>{t('trustBadge')}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
