#!/usr/bin/env python3
"""
Actualiza FinOpsCapabilitiesTable.tsx tanto en cscloudsolutions como en FinOpsProyect:
1. Fondo de los íconos de la columna de capacidades a azul empresarial (#0054A6) con íconos blancos.
2. Tildes de características disponibles en cada tier en azul empresarial (#0054A6).
"""
import re

FILES = [
    "/Users/manuelchavez/Documents/cscloudsolutions/cscloudsolutions/src/components/FinOpsCapabilitiesTable.tsx",
    "/Users/manuelchavez/Documents/FinOpsProyect/src/components/FinOpsCapabilitiesTable.tsx",
]

for file_path in FILES:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Cambiar color de la tilde (IconCheck en renderCellContent)
    old_check = '<IconCheck className="w-5 h-5 text-slate-900" stroke={2.6} />'
    new_check = '<IconCheck className="w-5 h-5 text-[#0054A6]" stroke={2.8} />'
    if old_check in content:
        content = content.replace(old_check, new_check)
    else:
        # Reemplazar con regex si difiere ligeramente
        content = re.sub(
            r'<IconCheck className="w-5 h-5 text-[^"]+" stroke=\{[0-9.]+\} \/>',
            '<IconCheck className="w-5 h-5 text-[#0054A6]" stroke={2.8} />',
            content
        )

    # 2. Contenedor de los íconos de capacidades: cambiar bg-slate-100 por bg-[#0054A6] con texto blanco
    old_span = '<span className="shrink-0 flex items-center justify-center p-1 rounded-md bg-slate-100">'
    new_span = '<span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[#0054A6] text-white shadow-2xs [&>svg]:text-white [&>svg]:stroke-white">'
    if old_span in content:
        content = content.replace(old_span, new_span)
    else:
        # regex por si hay variaciones
        content = re.sub(
            r'<span className="shrink-0 flex items-center justify-center [^"]*bg-slate-100">',
            new_span,
            content
        )

    # 3. Asegurar que los íconos dentro de categories sean text-white y tamaño uniforme w-4.5 h-4.5
    # Reemplazar clases de color individuales en los íconos de filas (ej: text-[#0078D4], text-emerald-600, etc.) por text-white
    # Solo dentro del array categories
    def replace_icon_colors(match):
        icon_str = match.group(0)
        # Reemplazar text-[...] o text-color-number por text-white
        icon_str = re.sub(r'text-\[[^\]]+\]', 'text-white', icon_str)
        icon_str = re.sub(r'text-[a-z]+-[0-9]+', 'text-white', icon_str)
        icon_str = re.sub(r'w-5 h-5', 'w-4.5 h-4.5', icon_str)
        return icon_str

    content = re.sub(r'icon:\s*<Icon[A-Za-z0-9]+ className="[^"]+" stroke=\{[0-9.]+\} \/>', replace_icon_colors, content)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"[OK] {file_path} actualizado exitosamente con fondo azul empresarial e íconos/tildes azules.")
