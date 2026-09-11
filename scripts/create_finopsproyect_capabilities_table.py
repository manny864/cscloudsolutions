#!/usr/bin/env python3
"""
Crea FinOpsCapabilitiesTable.tsx en FinOpsProyect con soporte para acciones directas
de compra/demo por tier y reversión a la vista de tarjetas.
"""

SRC = "/Users/manuelchavez/Documents/cscloudsolutions/cscloudsolutions/src/components/FinOpsCapabilitiesTable.tsx"
DST = "/Users/manuelchavez/Documents/FinOpsProyect/src/components/FinOpsCapabilitiesTable.tsx"

with open(SRC, "r", encoding="utf-8") as f:
    content = f.read()

# Adaptar interfaz de props para FinOpsProyect
old_props = """interface FinOpsCapabilitiesTableProps {
  onRevert?: () => void;
  onBack?: () => void;
  onClose: () => void;
  finopsUrl?: string;
}"""

new_props = """interface FinOpsCapabilitiesTableProps {
  onRevert?: () => void;
  onBack?: () => void;
  onClose: () => void;
  finopsUrl?: string;
  onSelectPro?: () => void;
  onSelectBusiness?: () => void;
  onSelectEnterprise?: () => void;
}"""

content = content.replace(old_props, new_props, 1)

old_fn_decl = """export function FinOpsCapabilitiesTable({
  onRevert,
  onBack,
  onClose,
  finopsUrl,
}: FinOpsCapabilitiesTableProps) {"""

new_fn_decl = """export function FinOpsCapabilitiesTable({
  onRevert,
  onBack,
  onClose,
  finopsUrl,
  onSelectPro,
  onSelectBusiness,
  onSelectEnterprise,
}: FinOpsCapabilitiesTableProps) {"""

content = content.replace(old_fn_decl, new_fn_decl, 1)

# En la cabecera sticky de Pro, Business y Enterprise, si vienen onSelectPro / onSelectBusiness / onSelectEnterprise, agregar botones de acción elegantes
old_pro_header = """                    <span className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                      {t('pro.trial')}
                    </span>
                  </div>
                </th>"""

new_pro_header = """                    <span className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                      {t('pro.trial')}
                    </span>
                    {onSelectPro && (
                      <button
                        type="button"
                        onClick={onSelectPro}
                        className="mt-2.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#0054A6] bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors shadow-2xs cursor-pointer"
                      >
                        {t('pro.name')} - Demo
                      </button>
                    )}
                  </div>
                </th>"""

content = content.replace(old_pro_header, new_pro_header, 1)

old_biz_header = """                    <span className="text-[11px] text-slate-500 mt-0.5">
                      {t('matrix.businessTarget')}
                    </span>
                  </div>
                </th>"""

new_biz_header = """                    <span className="text-[11px] text-slate-500 mt-0.5">
                      {t('matrix.businessTarget')}
                    </span>
                    {onSelectBusiness && (
                      <button
                        type="button"
                        onClick={onSelectBusiness}
                        className="mt-2.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0054A6] hover:bg-[#003B75] transition-colors shadow-2xs cursor-pointer"
                      >
                        {t('business.name')}
                      </button>
                    )}
                  </div>
                </th>"""

content = content.replace(old_biz_header, new_biz_header, 1)

old_ent_header = """                    <span className="text-[11px] text-slate-500 mt-0.5">
                      {t('matrix.enterpriseTarget')}
                    </span>
                  </div>
                </th>"""

new_ent_header = """                    <span className="text-[11px] text-slate-500 mt-0.5">
                      {t('matrix.enterpriseTarget')}
                    </span>
                    {onSelectEnterprise && (
                      <button
                        type="button"
                        onClick={onSelectEnterprise}
                        className="mt-2.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] transition-colors shadow-2xs cursor-pointer"
                      >
                        {t('enterprise.name')}
                      </button>
                    )}
                  </div>
                </th>"""

content = content.replace(old_ent_header, new_ent_header, 1)

with open(DST, "w", encoding="utf-8") as f:
    f.write(content)

print(f"[OK] FinOpsCapabilitiesTable.tsx creado exitosamente en {DST}")
