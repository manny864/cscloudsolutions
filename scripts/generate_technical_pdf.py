#!/usr/bin/env python3
"""
Script para generar el Documento Técnico (HLD & LLD) en formato PDF
con diseño profesional y paleta corporativa de CSCloud Solutions.
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Preformatted, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """Canvas de dos pasadas para calcular y mostrar el número total de páginas."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))

        # Header (en páginas > 1)
        if self._pageNumber > 1:
            self.drawString(54, 11 * 72 - 36, "CSCloud Solutions — Documento de Arquitectura y Diseño Técnico (HLD & LLD)")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.5)
            self.line(54, 11 * 72 - 42, 8.5 * 72 - 54, 11 * 72 - 42)

        # Footer
        footer_text = f"Página {self._pageNumber} de {page_count}"
        self.drawRightString(8.5 * 72 - 54, 30, footer_text)
        self.drawString(54, 30, "CONFIDENCIAL — CSCloud Solutions © 2026")
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(54, 42, 8.5 * 72 - 54, 42)

        self.restoreState()


def generate_pdf():
    output_dir = os.path.join(os.path.dirname(__file__), "..", "docs")
    os.makedirs(output_dir, exist_ok=True)
    pdf_path = os.path.join(output_dir, "DOCUMENTO_TECNICO_HLD_LLD_CSCLOUD.pdf")

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Colores corporativos
    PRIMARY = colors.HexColor("#0F172A")    # Slate 900
    ACCENT = colors.HexColor("#0284C7")     # Sky 600
    SECONDARY = colors.HexColor("#334155")  # Slate 700
    BG_LIGHT = colors.HexColor("#F8FAFC")   # Slate 50
    BORDER_COLOR = colors.HexColor("#CBD5E1") # Slate 300

    # Estilos de tipografía
    title_style = ParagraphStyle(
        'DocTitle',
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=PRIMARY,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=ACCENT,
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=PRIMARY,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=ACCENT,
        spaceBefore=10,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=SECONDARY,
        spaceAfter=6
    )

    body_bold = ParagraphStyle(
        'Body_Bold',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=13,
        textColor=PRIMARY,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=SECONDARY,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=3
    )

    code_style = ParagraphStyle(
        'Code_Custom',
        fontName='Courier',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor("#0F172A")
    )

    story = []

    # ── ENCABEZADO Y PORTADA ──────────────────────────────────────────────
    story.append(Paragraph("Documento de Arquitectura y Diseño Técnico (HLD & LLD)", title_style))
    story.append(Paragraph("Plataforma Web Corporativa — CSCloud Solutions (<code>cscloudsolutions.com.ar</code>)", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceAfter=12))

    meta_data = [
        [Paragraph("<b>Empresa:</b>", body_bold), Paragraph("CSCloud Solutions", body_style),
         Paragraph("<b>Fecha:</b>", body_bold), Paragraph("28 de Agosto de 2026", body_style)],
        [Paragraph("<b>Propietario Técnico:</b>", body_bold), Paragraph("Manuel Chavez (mchavez@cscloudsolutions.com.ar)", body_style),
         Paragraph("<b>Versión:</b>", body_bold), Paragraph("1.0.0 (Producción)", body_style)],
        [Paragraph("<b>Entorno:</b>", body_bold), Paragraph("Microsoft Azure & Cloudflare", body_style),
         Paragraph("<b>Estado:</b>", body_bold), Paragraph("Aprobado / Desplegado con Terraform", body_style)]
    ]
    meta_table = Table(meta_data, colWidths=[100, 160, 60, 180])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 14))

    # ── 1. RESUMEN EJECUTIVO ──────────────────────────────────────────────
    story.append(Paragraph("1. Resumen Ejecutivo", h1_style))
    story.append(Paragraph(
        "El presente documento establece formalmente el diseño de arquitectura de alto nivel (<b>HLD</b>) y bajo nivel (<b>LLD</b>) "
        "de la plataforma web corporativa de CSCloud Solutions. La infraestructura ha sido modernizada y migrada desde un VPS monolítico "
        "hacia una solución en la nube sobre <b>Microsoft Azure</b> y <b>Cloudflare</b>, aprovisionada con <b>Terraform</b> y operada mediante "
        "un pipeline de CI/CD automatizado en <b>GitHub Actions</b> con capacidad de <i>Zero-Downtime Swap</i>.",
        body_style
    ))
    story.append(Spacer(1, 10))

    # ── 2. HIGH-LEVEL DESIGN (HLD) ────────────────────────────────────────
    story.append(Paragraph("2. High-Level Design (HLD)", h1_style))
    story.append(Paragraph("2.1 Visión General y Objetivos Arquitectónicos", h2_style))
    story.append(Paragraph("• <b>Disponibilidad y Resiliencia:</b> Despliegue sobre Azure App Service Linux en SKU P0v3 con autoescalado elástico de 1 a 3 instancias.", bullet_style))
    story.append(Paragraph("• <b>Seguridad Zero Trust:</b> Aislamiento total del origen en Azure, permitiendo tráfico exclusivamente desde los rangos oficiales de Cloudflare (WAF/DDoS Protection) y denegando accesos directos no autorizados.", bullet_style))
    story.append(Paragraph("• <b>Despliegue Continuo Seguro:</b> Uso de Deployment Slots (Staging y Producción) para validación previa sin corte de servicio.", bullet_style))
    story.append(Paragraph("• <b>Rendimiento y SSR:</b> Next.js 15 compilado en modo Standalone, optimizado para Node.js 22 LTS con soporte multilingüe (ES, EN, PT-BR).", bullet_style))

    story.append(Paragraph("2.2 Diagrama de Flujo y Topología de Red", h2_style))
    arch_diagram = """
  +-------------------------------------------------------------------------------+
  |                        CLOUDFLARE EDGE (DNS Anycast / WAF / CDN)              |
  |  - Host: cscloudsolutions.com.ar | Modo SSL: Full | Caché estática            |
  +-------------------------------------------------------------------------------+
                                         | HTTPS (TLS 1.2+) [IPs Cloudflare Only]
                                         v
  +-------------------------------------------------------------------------------+
  |            MICROSOFT AZURE — Resource Group: cscs-webpage-wus2-prod           |
  |                                                                               |
  |   +-----------------------------------------------------------------------+   |
  |   |           AZURE LINUX WEB APP (cscloudsolutions.azurewebsites.net)    |   |
  |   |   - Plan: cscs-asp-wus2-prod (SKU P0v3: 1 vCPU, 4GB RAM, 250GB SSD)  |   |
  |   |   - Autoescalado: cscs-autoscale-wus2-prod (1 a 3 instancias)         |   |
  |   |                                                                       |   |
  |   |     +-------------------------+         +-------------------------+   |   |
  |   |     |    SLOT PRODUCCIÓN      | <=====> |      SLOT STAGING       |   |   |
  |   |     | (cscloudsolutions.com)  |  SWAP   | (cscloudsolutions-stage)|   |   |
  |   |     +-------------------------+         +-------------------------+   |   |
  |   +-----------------------------------------------------------------------+   |
  |                      |                                     |                  |
  |                      v                                     v                  |
  |        +---------------------------+         +---------------------------+    |
  |        |      AZURE KEY VAULT      |         |  LOG ANALYTICS WORKSPACE  |    |
  |        |    (cscs-kv-wus2-prod)    |         |    (cscs-law-wus2-prod)   |    |
  |        | - RBAC Managed Identity   |         | - HTTP Logs / Audit Logs  |    |
  |        +---------------------------+         +---------------------------+    |
  +-------------------------------------------------------------------------------+
"""
    story.append(Preformatted(arch_diagram, code_style))
    story.append(Spacer(1, 10))

    # ── 3. LOW-LEVEL DESIGN (LLD) ─────────────────────────────────────────
    story.append(Paragraph("3. Low-Level Design (LLD)", h1_style))
    
    story.append(Paragraph("3.1 Especificación de Recursos en Terraform", h2_style))
    story.append(Paragraph("Todos los componentes de Azure se encuentran versionados en <code>infra/terraform/</code> bajo la convención corporativa <code>cscs-&lt;tipo&gt;-&lt;zona&gt;-&lt;ambiente&gt;</code>:", body_style))

    iac_data = [
        [Paragraph("<b>Recurso</b>", body_bold), Paragraph("<b>Tipo Terraform</b>", body_bold), Paragraph("<b>Nombre en Azure</b>", body_bold), Paragraph("<b>Configuración Clave</b>", body_bold)],
        [Paragraph("Resource Group", body_style), Paragraph("azurerm_resource_group", code_style), Paragraph("cscs-webpage-wus2-prod", code_style), Paragraph("Ubicación: West US 2", body_style)],
        [Paragraph("App Service Plan", body_style), Paragraph("azurerm_service_plan", code_style), Paragraph("cscs-asp-wus2-prod", code_style), Paragraph("Linux, SKU P0v3 (1 vCPU, 4GB RAM)", body_style)],
        [Paragraph("Autoescalado", body_style), Paragraph("azurerm_monitor_autoscale_setting", code_style), Paragraph("cscs-autoscale-wus2-prod", code_style), Paragraph("Min: 1, Max: 3 | CPU >70%, RAM >80%", body_style)],
        [Paragraph("Linux Web App", body_style), Paragraph("azurerm_linux_web_app", code_style), Paragraph("cscloudsolutions", code_style), Paragraph("Node 22 LTS, node server.js (Standalone)", body_style)],
        [Paragraph("Slot Staging", body_style), Paragraph("azurerm_linux_web_app_slot", code_style), Paragraph("staging", code_style), Paragraph("Slot de validación previa al swap", body_style)],
        [Paragraph("Azure Key Vault", body_style), Paragraph("azurerm_key_vault", code_style), Paragraph("cscs-kv-wus2-prod", code_style), Paragraph("RBAC habilitado, Soft Delete 7 días", body_style)],
        [Paragraph("Log Analytics", body_style), Paragraph("azurerm_log_analytics_workspace", code_style), Paragraph("cscs-law-wus2-prod", code_style), Paragraph("Retención 30 días, Diagnósticos activos", body_style)]
    ]
    iac_table = Table(iac_data, colWidths=[85, 120, 130, 165])
    iac_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#0F172A")),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, BG_LIGHT]),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(iac_table)
    story.append(Spacer(1, 10))

    story.append(Paragraph("3.2 Implementación de Seguridad Zero Trust", h2_style))
    story.append(Paragraph("• <b>Ingress Lockdown:</b> La Web App y el Slot de Staging tienen configurado <code>ip_restriction_default_action = 'Deny'</code>. Solo se admiten conexiones provenientes de los 22 rangos CIDR oficiales de Cloudflare.", bullet_style))
    story.append(Paragraph("• <b>Gestión de Secretos sin Credenciales Embebidas:</b> El Key Vault utiliza autorización Azure RBAC nativa. Las Managed Identities (SystemAssigned) de Producción (<code>5cc65150...</code>) y Staging (<code>91a2acf6...</code>) tienen asignado el rol <code>Key Vault Secrets User</code>.", bullet_style))
    story.append(Paragraph("• <b>Deshabilitación de Protocolos Heredados:</b> FTPS deshabilitado, Basic Auth en SCM y FTP deshabilitado (<code>ftp_publish_basic_authentication_enabled = false</code>).", bullet_style))
    story.append(Paragraph("• <b>Cifrado en Tránsito:</b> TLS 1.2+ obligatorio y forzado de HTTPS (<code>https_only = true</code>).", bullet_style))

    story.append(Paragraph("3.3 Pipeline de CI/CD en GitHub Actions", h2_style))
    story.append(Paragraph("El archivo <code>.github/workflows/deploy.yml</code> automatiza el ciclo de vida completo:", body_style))
    story.append(Paragraph("1. <b>Build & Test:</b> Compilación con <code>npm run build</code> en modo Standalone y empaquetado en <code>release.zip</code> incorporando assets estáticos.", bullet_style))
    story.append(Paragraph("2. <b>Push a 'staging':</b> Despliegue automático y aislado al slot <code>cscloudsolutions-staging.azurewebsites.net</code>.", bullet_style))
    story.append(Paragraph("3. <b>Push a 'main':</b> Despliegue al slot staging $\\rightarrow$ verificación automática mediante Smoke Test HTTP $\\rightarrow$ Swap atómico hacia producción (<b>0 Downtime</b>).", bullet_style))
    story.append(Spacer(1, 10))

    # ── 4. PROCEDIMIENTOS OPERATIVOS ──────────────────────────────────────
    story.append(Paragraph("4. Procedimientos Operativos (Runbooks)", h1_style))
    story.append(Paragraph("<b>Swap Manual de Emergencia vía CLI:</b>", body_bold))
    story.append(Preformatted("az webapp deployment slot swap --resource-group cscs-webpage-wus2-prod --name cscloudsolutions --slot staging --target-slot production", code_style))
    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Escalado Vertical en Caliente (Scale Up a P1v3):</b>", body_bold))
    story.append(Preformatted("az appservice plan update --name cscs-asp-wus2-prod --resource-group cscs-webpage-wus2-prod --sku P1v3", code_style))
    story.append(Spacer(1, 14))

    # ── 5. FIRMAS Y APROBACIÓN ────────────────────────────────────────────
    story.append(Paragraph("5. Firmas y Aprobación Técnica", h1_style))
    sig_data = [
        [Paragraph("<b>Rol</b>", body_bold), Paragraph("<b>Nombre / Cargo</b>", body_bold), Paragraph("<b>Firma / Estado</b>", body_bold)],
        [Paragraph("Lead Cloud Architect", body_style), Paragraph("Manuel Chavez", body_style), Paragraph("Aprobado electrónicamente (IaC validado)", body_style)],
        [Paragraph("IT & Security Officer", body_style), Paragraph("CSCloud Solutions Security Team", body_style), Paragraph("Conforme política Zero Trust", body_style)]
    ]
    sig_table = Table(sig_data, colWidths=[150, 170, 180])
    sig_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#0F172A")),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(sig_table)

    # Construir documento PDF con NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Documento PDF generado exitosamente en: {pdf_path}")


if __name__ == "__main__":
    generate_pdf()
