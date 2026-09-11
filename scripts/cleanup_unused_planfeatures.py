#!/usr/bin/env python3
"""
Elimina la función no utilizada PlanFeatures de PricingPage.tsx en FinOpsProyect.
"""
import sys

TARGET_FILE = "/Users/manuelchavez/Documents/FinOpsProyect/src/components/PricingPage.tsx"

with open(TARGET_FILE, "r", encoding="utf-8") as f:
    content = f.read()

target_snippet = """/**
 * Lista de funciones del plan contraída por defecto (móvil y escritorio):
 * un toggle "Ver funciones (N)" expande la lista completa inline.
 */
function PlanFeatures({
  features,
  showLabel,
  hideLabel,
}: {
  features: string[];
  showLabel: string;
  hideLabel: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/80 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <span>{open ? hideLabel : showLabel}</span>
        <svg
          className={`w-4 h-4 text-slate-500 dark:text-slate-300 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul className="space-y-3 text-sm mt-4 text-slate-700 dark:text-slate-200">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0 text-[#0078D4] dark:text-[#00AEEF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}"""

if target_snippet in content:
    content = content.replace(target_snippet, "", 1).rstrip() + "\n"
    with open(TARGET_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    print("[OK] Función no utilizada PlanFeatures eliminada con éxito.")
else:
    print("[WARN] Snippet no encontrado exactamente. Revisando...")
    sys.exit(1)
