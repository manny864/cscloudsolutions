#!/usr/bin/env python3
"""
SEO Audit script for CSCloudSolutions
Checks metadata, H1 hierarchy, semantic HTML, and sitemap routes.
"""

import os
import re
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
SRC_APP = ROOT_DIR / "src" / "app"
LOCALE_DIR = SRC_APP / "[locale]"
COMPONENTS_DIR = ROOT_DIR / "src" / "components"

def audit_pages():
    print("=== Iniciando Auditoría SEO de Páginas ===")
    issues = []
    
    # 1. Chequeo de páginas
    page_files = list(LOCALE_DIR.glob("**/page.tsx"))
    for page in page_files:
        rel_path = page.relative_to(ROOT_DIR)
        content = page.read_text(encoding="utf-8")
        
        # Ignorar admin y rutas de comodín de desvío
        if "admin" in str(page) or "[...rest]" in str(page):
            continue
            
        has_meta = "generateMetadata" in content or "export const metadata" in content
        if not has_meta:
            issues.append(f"[Falta Metadata] {rel_path} no exporta generateMetadata ni metadata.")
            
        # Revisar nested main
        if "<main" in content:
            issues.append(f"[Semántica Inválida] {rel_path} contiene etiqueta <main> anidada dentro del layout.")
            
    # 2. Chequeo de H1 en componentes y páginas
    all_tsx = list((ROOT_DIR / "src").glob("**/*.tsx"))
    h1_pattern = re.compile(r"<h1\b")
    
    h1_counts = {}
    for tsx in all_tsx:
        if "admin" in str(tsx):
            continue
        content = tsx.read_text(encoding="utf-8")
        matches = h1_pattern.findall(content)
        if matches:
            h1_counts[str(tsx.relative_to(ROOT_DIR))] = len(matches)
            
    print("\nOcurrencias de <h1 ...> detectadas en archivos tsx:")
    for file, count in h1_counts.items():
        print(f"  - {file}: {count}")
        if "FinOpsCapabilitiesTable.tsx" in file:
            issues.append(f"[Conflicto H1] {file} contiene <h1...>, debe ser <span> o <h2> para no duplicar el H1 de la página.")

    # 3. Chequeo de sitemap
    sitemap_file = SRC_APP / "sitemap.ts"
    if sitemap_file.exists():
        sitemap_code = sitemap_file.read_text(encoding="utf-8")
        if "${locale}${route}" in sitemap_code and "locale === 'es'" not in sitemap_code:
            issues.append("[Sitemap Issue] sitemap.ts genera rutas '/es' que colisionan con localePrefix 'as-needed'.")
            
    print("\n=== Resumen de Hallazgos ===")
    if not issues:
        print("✅ No se detectaron problemas críticos.")
    else:
        for idx, issue in enumerate(issues, 1):
            print(f"{idx}. {issue}")
            
    return issues

if __name__ == "__main__":
    audit_pages()
