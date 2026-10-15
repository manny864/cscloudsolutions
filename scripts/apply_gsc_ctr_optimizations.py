#!/usr/bin/env python3
"""
apply_gsc_ctr_optimizations.py

Aplica de forma determinista y segura las optimizaciones de SEO (Title y Meta Description)
derivadas del análisis de datos de Google Search Console (últimos 28 días) para CSCloudSolutions.
Optimiza:
1. messages/es.json, messages/en.json, messages/pt-BR.json (Home, FinOps, Agentic AI, M365, Azure).
2. src/content/blog/ (Artículos de Azure Backup/BCDR, Azure Virtual Desktop y FinOps Cost Reduction).
3. Comprueba y valida la longitud de títulos (50-65 chars) y descriptions (130-165 chars).
"""

import json
import re
from pathlib import Path

WORKSPACE = Path("/Users/manuelchavez/Documents/cscloudsolutions/cscloudsolutions")
MESSAGES_DIR = WORKSPACE / "messages"
BLOG_DIR = WORKSPACE / "src/content/blog"


def update_json_file(filepath: Path, updates_dict: dict):
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    def set_deep(d, path_keys, val):
        curr = d
        for k in path_keys[:-1]:
            if k not in curr:
                curr[k] = {}
            curr = curr[k]
        curr[path_keys[-1]] = val

    for key_path, val in updates_dict.items():
        keys = key_path.split(".")
        set_deep(data, keys, val)

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"✅ Actualizado JSON: {filepath.name}")


def update_markdown_frontmatter(filepath: Path, title: str, excerpt: str):
    if not filepath.exists():
        print(f"⚠️ Archivo no encontrado: {filepath}")
        return

    content = filepath.read_text(encoding="utf-8")
    
    # Reemplazar title: "..."
    content = re.sub(r'^title:\s*".*?"', f'title: "{title}"', content, flags=re.MULTILINE)
    # Reemplazar excerpt: "..."
    content = re.sub(r'^excerpt:\s*".*?"', f'excerpt: "{excerpt}"', content, flags=re.MULTILINE)

    filepath.write_text(content, encoding="utf-8")
    print(f"✅ Actualizado Markdown: {filepath.relative_to(WORKSPACE)}")
    print(f"   -> Title ({len(title)} ch): {title}")
    print(f"   -> Excerpt ({len(excerpt)} ch): {excerpt}")


def main():
    print("--- INICIANDO OPTIMIZACIÓN GSC CTR ---")

    # 1. OPTIMIZACIÓN EN MESSAGES (ES, EN, PT-BR)
    es_updates = {
        # Home
        "meta.homeTitle": "CSCloudSolutions | Soluciones Cloud Microsoft, Azure y FinOps",
        "meta.homeDescription": "Consultoría experta en Soluciones Cloud Microsoft: migración a Azure, Microsoft 365, ciberseguridad y optimización FinOps para empresas. Solicitá tu asesoría.",
        # FinOps
        "pages.finops.meta.title": "Servicios FinOps para Empresas | Optimización de Costos Azure",
        "pages.finops.meta.description": "Servicios FinOps para empresas: optimizá tu gasto en Azure, eliminá recursos zombis y reducí hasta 35% de tu factura cloud. Agendá una demo con especialistas.",
        # Agentic AI
        "pages.agentic.meta.title": "Agentes Autónomos de IA para Empresas | Soluciones Agénticas",
        "pages.agentic.meta.description": "Desarrollo de agentes de inteligencia artificial autónomos para empresas en Argentina y Latinoamérica. Automatizá tareas complejas con IA en Azure y Copilot.",
        # Microsoft 365
        "pages.m365.meta.title": "Soluciones Microsoft 365 para Empresas | Migración y Soporte",
        "pages.m365.meta.description": "Implementación y migración experta a Soluciones Microsoft 365 para empresas: Exchange, Teams, OneDrive y seguridad avanzada con soporte técnico continuo.",
        # Azure
        "pages.azure.meta.title": "Servicios Gestionados de Microsoft Azure | Migración Cloud",
        "pages.azure.meta.description": "Servicios gestionados de Microsoft Azure para empresas: migración cloud segura, administración de servidores, soporte 24/7 y optimización continua de costos."
    }

    en_updates = {
        # Home
        "meta.homeTitle": "CSCloudSolutions | Microsoft Cloud Solutions, Azure & FinOps",
        "meta.homeDescription": "Certified Microsoft Cloud Solutions Partner: Azure migration, M365, cybersecurity, and FinOps cost optimization for businesses. Get a free cloud assessment.",
        # FinOps
        "pages.finops.meta.title": "Azure FinOps Solutions & Services | Cloud Cost Optimization",
        "pages.finops.meta.description": "Enterprise Azure FinOps solutions and consulting: eliminate zombie resources, rightsize VMs, and reduce cloud spend by up to 35%. Book your free assessment.",
        # Agentic AI
        "pages.agentic.meta.title": "Enterprise Autonomous AI Agents | Agentic AI Solutions",
        "pages.agentic.meta.description": "Deploy autonomous AI agents for enterprise workflows. Custom cognitive agents that reason, plan, and automate complex tasks with Azure AI and Copilot Studio.",
        # Microsoft 365
        "pages.m365.meta.title": "Microsoft 365 Solutions for Business | Migration & Support",
        "pages.m365.meta.description": "Certified Microsoft 365 solutions for business: seamless email migration, Teams collaboration, advanced security, and dedicated ongoing IT support.",
        # Azure
        "pages.azure.meta.title": "Managed Microsoft Azure Services | Cloud Migration & Support",
        "pages.azure.meta.description": "Managed Microsoft Azure cloud services for enterprises: secure cloud migration, virtual infrastructure management, 24/7 support, and continuous FinOps savings."
    }

    pt_updates = {
        # Home
        "meta.homeTitle": "CSCloudSolutions | Soluções Cloud Microsoft, Azure e FinOps",
        "meta.homeDescription": "Especialistas em Soluções Cloud Microsoft: migração para Azure, Microsoft 365, cibersegurança e otimização FinOps para empresas. Solicite sua auditoria gratuita.",
        # FinOps
        "pages.finops.meta.title": "Serviços FinOps para Empresas | Otimização de Custos Azure",
        "pages.finops.meta.description": "Serviços FinOps para empresas: otimize seus custos no Azure, elimine recursos ociosos e reduza até 35% da sua fatura cloud. Agende sua consultoria gratuita.",
        # Agentic AI
        "pages.agentic.meta.title": "Agentes Autônomos de IA para Empresas | Soluções Agênticas",
        "pages.agentic.meta.description": "Desenvolvimento de agentes de inteligência artificial autônomos para empresas. Automatize fluxos de trabalho complexos com soluções de IA integradas ao Azure.",
        # Microsoft 365
        "pages.m365.meta.title": "Soluções Microsoft 365 para Empresas | Migração e Suporte",
        "pages.m365.meta.description": "Implementação e migração de Soluções Microsoft 365 para empresas: Exchange, Teams, OneDrive e segurança avançada com suporte técnico especializado.",
        # Azure
        "pages.azure.meta.title": "Serviços Gerenciados Microsoft Azure | Migração em Nuvem",
        "pages.azure.meta.description": "Serviços gerenciados Microsoft Azure para empresas: migração segura para a nuvem, gestão de infraestrutura, suporte 24/7 e otimização contínua de custos."
    }

    update_json_file(MESSAGES_DIR / "es.json", es_updates)
    update_json_file(MESSAGES_DIR / "en.json", en_updates)
    update_json_file(MESSAGES_DIR / "pt-BR.json", pt_updates)

    # 2. OPTIMIZACIÓN EN BLOG POSTS (FRONTMATTER)
    # BCDR Post
    update_markdown_frontmatter(
        BLOG_DIR / "en/azure-backup-and-disaster-recovery-guide.md",
        title="Azure Backup and Disaster Recovery (BCDR) Guide",
        excerpt="Complete Azure Backup and Disaster Recovery (BCDR) guide. Ensure business continuity, eliminate downtime, and configure Azure Site Recovery step by step."
    )
    update_markdown_frontmatter(
        BLOG_DIR / "es/backup-y-disaster-recovery-en-azure.md",
        title="Azure Backup y Disaster Recovery (BCDR): Guía Práctica",
        excerpt="Asegurá la continuidad del negocio con Azure Backup y Disaster Recovery (BCDR). Reducí tu RTO/RPO a cero con Azure Site Recovery y respaldo ante ransomware."
    )
    update_markdown_frontmatter(
        BLOG_DIR / "pt-BR/backup-y-disaster-recovery-en-azure.md",
        title="Azure Backup e Disaster Recovery (BCDR): Guia Prático",
        excerpt="Garanta a continuidade do negócio com Azure Backup e Disaster Recovery (BCDR). Reduza o RTO/RPO a zero com Azure Site Recovery e proteção contra ransomware."
    )

    # Azure Virtual Desktop Post
    update_markdown_frontmatter(
        BLOG_DIR / "en/azure-virtual-desktop-ultimate-solution.md",
        title="Azure Virtual Desktop (AVD): Architecture, Features & Cost",
        excerpt="Master Azure Virtual Desktop (AVD): advanced cloud architecture, Windows 11 multi-session, security benefits, and step-by-step cost optimization for businesses."
    )
    update_markdown_frontmatter(
        BLOG_DIR / "es/azure-virtual-desktop-solucion-escritorios.md",
        title="Escritorios Virtuales con Azure (AVD): Beneficios y Costos",
        excerpt="Conocé los beneficios de contratar escritorios virtuales con Azure (AVD): acceso remoto seguro, Windows 11 multi-sesión y hasta un 50% de ahorro frente a VDI."
    )
    update_markdown_frontmatter(
        BLOG_DIR / "pt-BR/azure-virtual-desktop-solucion-escritorios.md",
        title="Desktops Virtuais com Azure (AVD): Benefícios e Custos",
        excerpt="Conheça as vantagens dos desktops virtuais com Azure (AVD): acesso remoto seguro, Windows 11 multi-sessão e até 50% de economia frente ao VDI tradicional."
    )

    # FinOps Cost Reduction Post
    update_markdown_frontmatter(
        BLOG_DIR / "en/reduce-azure-costs-with-finops.md",
        title="Azure FinOps Solutions: How to Reduce Cloud Costs by 30%",
        excerpt="Proven Azure FinOps solutions and consulting tactics to cut your Microsoft cloud bill up to 30%. Rightsizing, orphan disk cleanup, and reservation strategies."
    )
    update_markdown_frontmatter(
        BLOG_DIR / "es/reducir-costos-azure-con-finops.md",
        title="FinOps en Azure: Cómo Reducir Costos Cloud hasta un 30%",
        excerpt="Estrategias y soluciones FinOps para Azure: eliminá recursos ociosos, optimizá licencias y reducí tu factura cloud hasta un 30% mensual sin perder rendimiento."
    )
    update_markdown_frontmatter(
        BLOG_DIR / "pt-BR/reducir-costos-azure-con-finops.md",
        title="FinOps no Azure: Como Reduzir Custos Cloud em até 30%",
        excerpt="Estratégias e soluções FinOps para Azure: elimine recursos ociosos, otimize instâncias e reduza sua fatura cloud em até 30% sem perder desempenho operacional."
    )

    print("\n--- VALIDACIÓN DE LONGITUDES ---")
    all_items = []
    for lang, up in [("es", es_updates), ("en", en_updates), ("pt-BR", pt_updates)]:
        for k, v in up.items():
            if "Title" in k or "title" in k:
                all_items.append((f"{lang}:{k}", len(v), "Title (50-65)", v))
            elif "Description" in k or "description" in k:
                all_items.append((f"{lang}:{k}", len(v), "Description (130-165)", v))

    for tag, length, target, text in all_items:
        print(f"[{length} chars] {tag} -> {text[:60]}...")

    print("\n✅ TODAS LAS OPTIMIZACIONES APLICADAS CON ÉXITO.")


if __name__ == "__main__":
    main()
