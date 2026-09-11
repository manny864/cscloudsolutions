#!/usr/bin/env python3
"""
Actualiza PricingPage.tsx en FinOpsProyect para integrar FinOpsCapabilitiesTable
y reemplazar la expansión hacia abajo (acordeón) por la apertura de la tabla de capacidades a pantalla completa.
"""
import sys

TARGET = "/Users/manuelchavez/Documents/FinOpsProyect/src/components/PricingPage.tsx"

with open(TARGET, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Imports
old_imports = """import LanguageSwitcher from './LanguageSwitcher';
import {
  IconBuildingLighthouse,
  IconCheck,
  IconAward,
  IconStarFilled,
  IconShieldCheck,
  IconChevronDown,
} from "@tabler/icons-react";"""

new_imports = """import LanguageSwitcher from './LanguageSwitcher';
import { FinOpsCapabilitiesTable } from './FinOpsCapabilitiesTable';
import {
  IconBuildingLighthouse,
  IconCheck,
  IconAward,
  IconStarFilled,
  IconShieldCheck,
  IconArrowRight,
  IconTable,
  IconArrowsMaximize,
} from "@tabler/icons-react";"""

if old_imports not in content:
    print("[ERROR] old_imports not found")
    sys.exit(1)
content = content.replace(old_imports, new_imports, 1)

# 2. State viewMode
old_states = """  const [expandedPro, setExpandedPro] = useState(false);
  const [expandedBusiness, setExpandedBusiness] = useState(false);
  const [expandedEnterprise, setExpandedEnterprise] = useState(false);"""

new_states = """  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');"""

if old_states not in content:
    print("[ERROR] old_states not found")
    sys.exit(1)
content = content.replace(old_states, new_states, 1)

# 3. Vista de tabla si viewMode === 'table'
old_return_top = """  return (
    <div className="relative overflow-hidden min-h-screen bg-[#0E1A2B] flex flex-col font-sans py-16 px-4 sm:px-6 lg:px-8">"""

new_return_top = """  if (viewMode === 'table') {
    return (
      <>
        <FinOpsCapabilitiesTable
          onRevert={() => setViewMode('cards')}
          onClose={onLoginClick ? () => onLoginClick() : () => setViewMode('cards')}
          onSelectPro={() => {
            setViewMode('cards');
            goToDemo('pro');
          }}
          onSelectBusiness={() => {
            setViewMode('cards');
            openCheckout(getPriceId('business'));
          }}
          onSelectEnterprise={() => {
            setViewMode('cards');
            setEnterpriseModalOpen(true);
          }}
        />
        <EnterpriseLeadModal
          isOpen={isEnterpriseModalOpen}
          onClose={() => setEnterpriseModalOpen(false)}
          tenantId={tenantId}
        />
        <DemoLeadModal
          isOpen={!!pendingDemoTier}
          onClose={() => setPendingDemoTier(null)}
          onSuccess={handleDemoLeadSuccess}
          tier={pendingDemoTier || 'pro'}
        />
        <CorporateEmailNoticeModal
          open={!!pendingCheckoutPriceId}
          email={corporateEmail}
          onCancel={() => setPendingCheckoutPriceId(undefined)}
          onConfirm={confirmCheckout}
          t={t}
        />
      </>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-screen bg-[#0E1A2B] flex flex-col font-sans py-16 px-4 sm:px-6 lg:px-8">"""

if old_return_top not in content:
    print("[ERROR] old_return_top not found")
    sys.exit(1)
content = content.replace(old_return_top, new_return_top, 1)

# 4. Botón de Matriz Comparativa Completa antes del grid de 3 tarjetas
old_toggle_end = """        <span className={`text-sm font-medium flex items-center ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
          {t('annual')}
          <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            {t('annualSave', { percent: descuentoAnual })}
          </span>
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch animate-in fade-in zoom-in-95 duration-700 delay-150">"""

new_toggle_end = """        <span className={`text-sm font-medium flex items-center ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
          {t('annual')}
          <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            {t('annualSave', { percent: descuentoAnual })}
          </span>
        </span>
      </div>

      {/* Botón de Matriz Comparativa Completa */}
      <div className="relative z-10 flex justify-center -mt-8 mb-12">
        <button
          type="button"
          onClick={() => setViewMode('table')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-100 bg-white/10 hover:bg-white/20 border border-white/20 shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
        >
          <IconTable className="w-4 h-4 text-[#00AEEF]" />
          <span>{t('compareFullscreen')}</span>
          <IconArrowsMaximize className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch animate-in fade-in zoom-in-95 duration-700 delay-150">"""

if old_toggle_end not in content:
    print("[ERROR] old_toggle_end not found")
    sys.exit(1)
content = content.replace(old_toggle_end, new_toggle_end, 1)

# 5. Card Professional
old_pro_features = """            <ul className="space-y-3 text-xs sm:text-sm text-gray-700 dark:text-slate-200">
              {(expandedPro ? proFeatures : proFeatures.slice(0, 8)).map((f, i) => (
                <li key={i} className="flex items-start">
                  <IconCheck className="w-4 h-4 text-[#00AEEF] mr-2.5 mt-0.5 flex-shrink-0" stroke={2.5} />
                  <span className={i === 0 ? 'font-semibold text-gray-900 dark:text-white' : ''}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {proFeatures.length > 8 && (
            <button
              type="button"
              onClick={() => setExpandedPro(!expandedPro)}
              className="mt-4 pt-2 text-xs font-bold text-[#0078D4] dark:text-[#00AEEF] hover:underline transition-colors text-left flex items-center gap-1.5 focus:outline-none cursor-pointer group"
            >
              <span>{expandedPro ? t('hideFeatures') : t('showFeatures', { count: proFeatures.length })}</span>
              <IconChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedPro ? 'rotate-180' : ''}`} stroke={2.5} />
            </button>
          )}"""

new_pro_features = """            <ul className="space-y-3 text-xs sm:text-sm text-gray-700 dark:text-slate-200">
              {proFeatures.slice(0, 8).map((f, i) => (
                <li key={i} className="flex items-start">
                  <IconCheck className="w-4 h-4 text-[#00AEEF] mr-2.5 mt-0.5 flex-shrink-0" stroke={2.5} />
                  <span className={i === 0 ? 'font-semibold text-gray-900 dark:text-white' : ''}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {proFeatures.length > 8 && (
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className="mt-4 pt-2 text-xs font-bold text-[#0078D4] dark:text-[#00AEEF] hover:underline transition-colors text-left flex items-center gap-1.5 focus:outline-none cursor-pointer group"
            >
              <span>{t('showFeatures', { count: proFeatures.length })}</span>
              <IconArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" stroke={2.5} />
            </button>
          )}"""

if old_pro_features not in content:
    print("[ERROR] old_pro_features not found")
    sys.exit(1)
content = content.replace(old_pro_features, new_pro_features, 1)

# 6. Card Business
old_biz_features = """            <ul className="space-y-3 text-xs sm:text-sm text-gray-700 dark:text-slate-200">
              {(expandedBusiness ? businessFeatures : businessFeatures.slice(0, 8)).map((f, i) => (
                <li key={i} className="flex items-start">
                  <IconCheck className="w-4 h-4 text-[#002244] dark:text-[#00AEEF] mr-2.5 mt-0.5 flex-shrink-0" stroke={2.5} />
                  <span className={i === 0 || f.startsWith('Todo lo de') || f.startsWith('Everything in') || f.startsWith('Tudo do') ? 'font-bold text-gray-900 dark:text-white' : ''}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {businessFeatures.length > 8 && (
            <button
              type="button"
              onClick={() => setExpandedBusiness(!expandedBusiness)}
              className="mt-4 pt-2 text-xs font-bold text-[#002244] dark:text-[#00AEEF] hover:underline transition-colors text-left flex items-center gap-1.5 focus:outline-none cursor-pointer group"
            >
              <span>{expandedBusiness ? t('hideFeatures') : t('showFeatures', { count: businessFeatures.length })}</span>
              <IconChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedBusiness ? 'rotate-180' : ''}`} stroke={2.5} />
            </button>
          )}"""

new_biz_features = """            <ul className="space-y-3 text-xs sm:text-sm text-gray-700 dark:text-slate-200">
              {businessFeatures.slice(0, 8).map((f, i) => (
                <li key={i} className="flex items-start">
                  <IconCheck className="w-4 h-4 text-[#002244] dark:text-[#00AEEF] mr-2.5 mt-0.5 flex-shrink-0" stroke={2.5} />
                  <span className={i === 0 || f.startsWith('Todo lo de') || f.startsWith('Everything in') || f.startsWith('Tudo do') ? 'font-bold text-gray-900 dark:text-white' : ''}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {businessFeatures.length > 8 && (
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className="mt-4 pt-2 text-xs font-bold text-[#002244] dark:text-[#00AEEF] hover:underline transition-colors text-left flex items-center gap-1.5 focus:outline-none cursor-pointer group"
            >
              <span>{t('showFeatures', { count: businessFeatures.length })}</span>
              <IconArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" stroke={2.5} />
            </button>
          )}"""

if old_biz_features not in content:
    print("[ERROR] old_biz_features not found")
    sys.exit(1)
content = content.replace(old_biz_features, new_biz_features, 1)

# 7. Card Enterprise
old_ent_features = """            <ul className="space-y-3 text-xs sm:text-sm text-white relative z-10">
              {(expandedEnterprise ? enterpriseFeatures : enterpriseFeatures.slice(0, 8)).map((f, i) => (
                <li key={i} className="flex items-start">
                  <IconCheck className="w-4 h-4 text-white mr-2.5 mt-0.5 flex-shrink-0" stroke={2.5} />
                  <span className={i === 0 || f.startsWith('Todo lo de') || f.startsWith('Everything in') || f.startsWith('Tudo do') ? 'font-bold text-white' : 'text-slate-100'}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {enterpriseFeatures.length > 8 && (
            <button
              type="button"
              onClick={() => setExpandedEnterprise(!expandedEnterprise)}
              className="mt-4 pt-2 text-xs font-bold text-white hover:text-white/80 transition-colors text-left flex items-center gap-1.5 focus:outline-none cursor-pointer group relative z-10"
            >
              <span>{expandedEnterprise ? t('hideFeatures') : t('showFeatures', { count: enterpriseFeatures.length })}</span>
              <IconChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${expandedEnterprise ? 'rotate-180' : ''}`} stroke={2.5} />
            </button>
          )}"""

new_ent_features = """            <ul className="space-y-3 text-xs sm:text-sm text-white relative z-10">
              {enterpriseFeatures.slice(0, 8).map((f, i) => (
                <li key={i} className="flex items-start">
                  <IconCheck className="w-4 h-4 text-white mr-2.5 mt-0.5 flex-shrink-0" stroke={2.5} />
                  <span className={i === 0 || f.startsWith('Todo lo de') || f.startsWith('Everything in') || f.startsWith('Tudo do') ? 'font-bold text-white' : 'text-slate-100'}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {enterpriseFeatures.length > 8 && (
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className="mt-4 pt-2 text-xs font-bold text-white hover:text-white/80 transition-colors text-left flex items-center gap-1.5 focus:outline-none cursor-pointer group relative z-10"
            >
              <span>{t('showFeatures', { count: enterpriseFeatures.length })}</span>
              <IconArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover:translate-x-1" stroke={2.5} />
            </button>
          )}"""

if old_ent_features not in content:
    print("[ERROR] old_ent_features not found")
    sys.exit(1)
content = content.replace(old_ent_features, new_ent_features, 1)

with open(TARGET, "w", encoding="utf-8") as f:
    f.write(content)

print("[OK] PricingPage.tsx actualizado exitosamente con modo tabla sin despliegue acordeón.")
