#!/usr/bin/env python3
"""
Integración y Despliegue de Azure FinOps Assessment para CSCloudSolutions.
Ejecuta la sincronización hacia `cscloudsolutions/public/finops_assesment/`,
configura tenantId, partnerId y prepara los enlaces de la Home.
"""

import os
import shutil
import re
import json

ROOT_DIR = "/Users/manuelchavez/Documents/cscloudsolutions"
SOURCE_DIR = os.path.join(ROOT_DIR, "assesment_Finops", "site")
DEST_DIR = os.path.join(ROOT_DIR, "cscloudsolutions", "public", "finops_assesment")

TENANT_ID = "81ebe027-e6af-4e09-bc73-58c9012c6408"
PARTNER_ID = "7111700"

def sync_assessment_files():
    print(f"[*] Sincronizando archivos desde {SOURCE_DIR} hacia {DEST_DIR}...")
    if os.path.exists(DEST_DIR):
        shutil.rmtree(DEST_DIR)
    shutil.copytree(SOURCE_DIR, DEST_DIR)
    print("    -> Archivos copiados exitosamente.")

def update_config_js(filepath):
    print(f"[*] Actualizando {filepath}...")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Reemplazar partnerId
    content = re.sub(
        r"partnerId:\s*['\"][^'\"]*['\"]",
        f"partnerId: '{PARTNER_ID}'",
        content
    )
    # Reemplazar cscloudTenantId
    content = re.sub(
        r"cscloudTenantId:\s*['\"][^'\"]*['\"]",
        f"cscloudTenantId: '{TENANT_ID}'",
        content
    )
    # Reemplazar ctrl365TenantId
    content = re.sub(
        r"ctrl365TenantId:\s*['\"][^'\"]*['\"]",
        f"ctrl365TenantId: '{TENANT_ID}'",
        content
    )

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print("    -> Configuración actualizada.")

def update_translations():
    locales_dir = os.path.join(ROOT_DIR, "cscloudsolutions", "messages")
    
    # 1. es.json
    es_path = os.path.join(locales_dir, "es.json")
    with open(es_path, "r", encoding="utf-8") as f:
        es_data = json.load(f)
    
    es_data["home"]["hero"]["cardTitle"] = "Assessment Azure FinOps (100% Gratuito)"
    es_data["home"]["hero"]["cardSub"] = "Analizamos tu infraestructura de Azure para detectar costos ociosos, recursos sobredimensionados y oportunidades de ahorro inmediato. Sin agentes y sin costo."
    es_data["home"]["hero"]["cardBullets"] = [
        "Detección de recursos huérfanos y discos zombis",
        "Rightsizing de Virtual Machines y almacenamiento",
        "Optimización con Reservas y Azure Savings Plans",
        "Postura de seguridad y mejores prácticas de Azure",
        "Reporte ejecutivo descargable en minutos"
    ]
    es_data["home"]["hero"]["cardButton"] = "Iniciar Assessment (Siempre Gratis) →"
    es_data["home"]["hero"]["cardNote"] = "Siempre gratis · 100% solo lectura · Sin agentes"

    with open(es_path, "w", encoding="utf-8") as f:
        json.dump(es_data, f, ensure_ascii=False, indent=2)
    print("    -> es.json actualizado.")

    # 2. en.json
    en_path = os.path.join(locales_dir, "en.json")
    with open(en_path, "r", encoding="utf-8") as f:
        en_data = json.load(f)

    en_data["home"]["hero"]["cardTitle"] = "Azure FinOps Assessment (100% Free)"
    en_data["home"]["hero"]["cardSub"] = "We analyze your Azure infrastructure to detect idle costs, oversized resources, and instant cloud savings opportunities. Agentless and no cost."
    en_data["home"]["hero"]["cardBullets"] = [
        "Detection of orphan resources and zombie disks",
        "VM and storage rightsizing recommendations",
        "Optimization with Reservations & Savings Plans",
        "Security posture and architecture best practices",
        "Executive downloadable report in minutes"
    ]
    en_data["home"]["hero"]["cardButton"] = "Start Free Assessment (Always Free) →"
    en_data["home"]["hero"]["cardNote"] = "Always free · 100% read-only · Zero installation"

    with open(en_path, "w", encoding="utf-8") as f:
        json.dump(en_data, f, ensure_ascii=False, indent=2)
    print("    -> en.json actualizado.")

    # 3. pt-BR.json
    pt_path = os.path.join(locales_dir, "pt-BR.json")
    with open(pt_path, "r", encoding="utf-8") as f:
        pt_data = json.load(f)

    pt_data["home"]["hero"]["cardTitle"] = "Assessment Azure FinOps (100% Gratuito)"
    pt_data["home"]["hero"]["cardSub"] = "Analisamos sua infraestrutura Azure para detectar custos ociosos, recursos superdimensionados e oportunidades de economia imediata. Sem agentes e sem custo."
    pt_data["home"]["hero"]["cardBullets"] = [
        "Detecção de recursos órfãos e discos zumbis",
        "Rightsizing de máquinas virtuais e armazenamento",
        "Otimização com Reservas e Azure Savings Plans",
        "Postura de segurança e melhores práticas Azure",
        "Relatório executivo para download em minutos"
    ]
    pt_data["home"]["hero"]["cardButton"] = "Iniciar Assessment (Sempre Gratuito) →"
    pt_data["home"]["hero"]["cardNote"] = "Sempre gratuito · 100% somente leitura · Sem instalação"

    with open(pt_path, "w", encoding="utf-8") as f:
        json.dump(pt_data, f, ensure_ascii=False, indent=2)
    print("    -> pt-BR.json actualizado.")

def update_hero_component():
    hero_path = os.path.join(ROOT_DIR, "cscloudsolutions", "src", "components", "Hero.tsx")
    print(f"[*] Actualizando enlace en {hero_path}...")
    with open(hero_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Cambiar href="#contacto" por href="/finops_assesment/" en la tarjeta de auditoría
    card_link_pattern = re.compile(
        r'(<div className="mt-8 sm:mt-7 w-full rounded-2xl bg-white/0">\s*)<a\s+href="#contacto"\s+className="([^"]+)"\s*>',
        re.MULTILINE
    )
    
    if card_link_pattern.search(content):
        content = card_link_pattern.sub(
            r'\1<a\n              href="/finops_assesment/"\n              target="_blank"\n              rel="noopener noreferrer"\n              className="\2"\n            >',
            content
        )
        with open(hero_path, "w", encoding="utf-8") as f:
            f.write(content)
        print("    -> Hero.tsx actualizado con enlace a /finops_assesment/.")
    else:
        print("    -> Patrón de enlace no encontrado o ya actualizado en Hero.tsx.")

def main():
    sync_assessment_files()
    update_config_js(os.path.join(DEST_DIR, "config.js"))
    update_config_js(os.path.join(SOURCE_DIR, "config.js"))
    update_translations()
    update_hero_component()
    print("[✓] Proceso completado con éxito.")

if __name__ == "__main__":
    main()
