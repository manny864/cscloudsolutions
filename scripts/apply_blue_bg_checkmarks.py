#!/usr/bin/env python3
"""
Actualiza FinOpsCapabilitiesTable.tsx en FinOpsProyect y cscloudsolutions:
Agrega un badge '✓' con fondo azul empresarial (#0054A6) en sintonía con los íconos
para los features disponibles en cada tier.
"""

FILES = [
    "/Users/manuelchavez/Documents/FinOpsProyect/src/components/FinOpsCapabilitiesTable.tsx",
    "/Users/manuelchavez/Documents/cscloudsolutions/cscloudsolutions/src/components/FinOpsCapabilitiesTable.tsx",
]

TARGET_OLD_BLOCK = """    if (value === true) {
      return (
        <span className="inline-flex items-center justify-center text-slate-900" aria-label={t('matrix.included')}>
          <IconCheck className="w-5 h-5 text-[#0054A6]" stroke={2.8} />
        </span>
      );
    }"""

REPLACEMENT_BLOCK = """    if (value === true) {
      return (
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#0054A6] text-white shadow-2xs"
          aria-label={t('matrix.included')}
        >
          <IconCheck className="w-4 h-4 text-white" stroke={3} />
        </span>
      );
    }"""

for path in FILES:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if TARGET_OLD_BLOCK in content:
        content = content.replace(TARGET_OLD_BLOCK, REPLACEMENT_BLOCK, 1)
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"[OK] Reemplazo exacto aplicado en {path}")
    else:
        # Fallback por si difiere en espacios o atributos
        import re
        pattern = r"if \(value === true\) \{[\s\S]*?<IconCheck[^>]+>[\s\S]*?<\/span>[\s\S]*?\}"
        if re.search(pattern, content):
            content = re.sub(pattern, REPLACEMENT_BLOCK.strip(), content, count=1)
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"[OK] Reemplazo vía regex aplicado en {path}")
        else:
            print(f"[ERROR] No se encontró el bloque en {path}")
