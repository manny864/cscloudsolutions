#!/usr/bin/env python3
"""
Script para generar el Documento Funcional (Estructura, Secciones y Contenido) en PDF
con diseño profesional y paleta corporativa de CSCloud Solutions.
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Preformatted, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
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

        if self._pageNumber > 1:
            self.drawString(54, 11 * 72 - 36, "CSCloud Solutions — Guía de Estructura, Secciones y Contenido Web")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.5)
            self.line(54, 11 * 72 - 42, 8.5 * 72 - 54, 11 * 72 - 42)

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
    pdf_path = os.path.join(output_dir, "ESTRUCTURA_Y_CONTENIDO_PAGINA_WEB_CSCLOUD.pdf")

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    PRIMARY = colors.HexColor("#0F172A")
    ACCENT = colors.HexColor("#0284C7")
    SECONDARY = colors.HexColor("#334155")
    BG_LIGHT = colors.HexColor("#F8FAFC")
    BORDER_COLOR = colors.HexColor("#CBD5E1")

    title_style = ParagraphStyle(
        'DocTitle',
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=PRIMARY,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=ACCENT,
        spaceAfter=12
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=PRIMARY,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=ACCENT,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=SECONDARY,
        spaceAfter=5
    )

    body_bold = ParagraphStyle(
        'Body_Bold',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=PRIMARY,
        spaceAfter=5
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=SECONDARY,
        leftIndent=10,
        firstLineIndent=-6,
        spaceAfter=2.5
    )

    code_style = ParagraphStyle(
        'Code_Custom',
        fontName='Courier',
        fontSize=7,
        leading=9.5,
        textColor=PRIMARY
    )

    story = []

    # Portada / Header
    story.append(Paragraph("Guía de Estructura, Secciones y Contenido de la Web", title_style))
    story.append(Paragraph("Plataforma Web Corporativa — CSCloud Solutions (<code>cscloudsolutions.com.ar</code>)", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceAfter=10))

    meta_data = [
        [Paragraph("<b>Empresa:</b>", body_bold), Paragraph("CSCloud Solutions", body_style),
         Paragraph("<b>Fecha:</b>", body_bold), Paragraph("28 de Agosto de 2026", body_style)],
        [Paragraph("<b>Propietario:</b>", body_bold), Paragraph("Manuel Chavez (mchavez@cscloudsolutions.com.ar)", body_style),
         Paragraph("<b>Versión:</b>", body_bold), Paragraph("1.0.0 (Producción)", body_style)],
        [Paragraph("<b>Stack:</b>", body_bold), Paragraph("Next.js 15 Standalone + React 19 + TypeScript + i18n", body_style),
         Paragraph("<b>Idiomas:</b>", body_bold), Paragraph("Español (es), Inglés (en), Portugués (pt-BR)", body_style)]
    ]
    meta_table = Table(meta_data, colWidths=[80, 180, 60, 184])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # 1. Resumen
    story.append(Paragraph("1. Resumen de la Plataforma", h1_style))
    story.append(Paragraph(
        "El sitio web corporativo de CSCloud Solutions es el canal digital central para la prospección, difusión y contratación de "
        "servicios de consultoría cloud especializada en Microsoft Azure, Microsoft 365, Power Platform, ciberseguridad, automatización "
        "con Inteligencia Artificial y la plataforma SaaS <b>CSCloud FinOps</b>.",
        body_style
    ))

    # 2. Mapa del Sitio
    story.append(Paragraph("2. Mapa del Sitio y Arquitectura de URLs", h1_style))
    site_map_text = """
cscloudsolutions.com.ar
├── /[locale]                          (Página de Inicio / Home Page)
├── SERVICIOS & SOLUCIONES:
│   ├── /[locale]/agentic-ai           (Agentes de IA y LLMs Empresariales)
│   ├── /[locale]/automations          (Automatización de Procesos RPA / Power Automate)
│   ├── /[locale]/azure                (Soluciones Cloud Azure, Migración & Modernización)
│   ├── /[locale]/finops               (Gestión y Optimización de Costos Cloud)
│   ├── /[locale]/microsoft-365        (Microsoft 365, Teams, SharePoint & Exchange)
│   ├── /[locale]/modern-workplace     (Puesto de Trabajo Digital, Intune & AVD)
│   ├── /[locale]/power-platform       (Power Apps, Power BI & Power Automate)
│   ├── /[locale]/seguridad            (Ciberseguridad, Defender, Zero Trust & SOC 2)
│   └── /[locale]/soporte              (Mesa de Ayuda, Soporte N1/N2/N3 & Monitoreo)
├── CONTENIDO E INSTITUCIONAL:
│   ├── /[locale]/nosotros             (Quiénes Somos, Misión, Visión y Valores)
│   ├── /[locale]/blog                 (Índice del Blog con Filtros y Buscador)
│   └── /[locale]/blog/[slug]          (Artículo técnico individual en Markdown)
└── LEGAL & COMPLIANCE:
    ├── /[locale]/politica-de-privacidad
    ├── /[locale]/politica-de-reembolso
    └── /[locale]/terminos-y-condiciones
"""
    story.append(Preformatted(site_map_text, code_style))
    story.append(Spacer(1, 8))

    # 3. Secciones de la Home Page
    story.append(Paragraph("3. Desglose de Componentes de la Home Page", h1_style))

    home_components = [
        [Paragraph("<b>Componente</b>", body_bold), Paragraph("<b>Archivo Fuente</b>", body_bold), Paragraph("<b>Descripción Funcional</b>", body_bold)],
        [Paragraph("Header & Nav", body_style), Paragraph("Header.tsx", code_style), Paragraph("Logo, menú de navegación con dropdowns, selector de idioma (ES/EN/PT-BR) y botón CTA.", body_style)],
        [Paragraph("Hero Section", body_style), Paragraph("Hero.tsx", code_style), Paragraph("Titular principal de alto impacto, tarjeta de video interactiva y contadores de métricas.", body_style)],
        [Paragraph("Service Bento", body_style), Paragraph("ServiceBento.tsx", code_style), Paragraph("Grilla interactiva tipo Bento Grid con las 6 soluciones de nube y consultoría principales.", body_style)],
        [Paragraph("Audit Section", body_style), Paragraph("AuditSection.tsx", code_style), Paragraph("Propuesta de valor para diagnóstico gratuito de infraestructura Azure y Microsoft 365.", body_style)],
        [Paragraph("FinOps Teaser & Modal", body_style), Paragraph("FinOpsTeaser.tsx / FinOpsPopup.tsx", code_style), Paragraph("Destacado de CSCloud FinOps y modal interactivo con comparativa de 3 planes.", body_style)],
        [Paragraph("Testimonios & Clutch", body_style), Paragraph("Testimonials.tsx / ClutchWidget.tsx", code_style), Paragraph("Prueba social con testimonios de clientes corporativos y widget oficial de Clutch.", body_style)],
        [Paragraph("FAQ Interactiva", body_style), Paragraph("FAQ.tsx", code_style), Paragraph("Preguntas frecuentes en formato acordeón con marcado Schema.org/FAQPage para SEO.", body_style)],
        [Paragraph("Formulario de Contacto", body_style), Paragraph("ContactSection.tsx / ContactForm.tsx", code_style), Paragraph("Formulario con validación Zod, reCAPTCHA v3 y envío vía Microsoft Graph API.", body_style)],
        [Paragraph("Footer", body_style), Paragraph("Footer.tsx", code_style), Paragraph("Enlaces institucionales, canales de contacto, enlaces legales y derechos reservados.", body_style)]
    ]
    comp_table = Table(home_components, colWidths=[90, 130, 284])
    comp_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, BG_LIGHT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
    ]))
    story.append(comp_table)
    story.append(Spacer(1, 10))

    # 4. Soluciones y Servicios
    story.append(Paragraph("4. Matriz de Soluciones y Servicios Especializados", h1_style))
    services_data = [
        [Paragraph("<b>Ruta URL</b>", body_bold), Paragraph("<b>Solución</b>", body_bold), Paragraph("<b>Entregables y Capacidades Clave</b>", body_bold)],
        [Paragraph("/agentic-ai", code_style), Paragraph("Agentes de IA", body_style), Paragraph("Modelos LLM privados, RAG corporativo, agentes de decisión autónomos y chatbots internos.", body_style)],
        [Paragraph("/automations", code_style), Paragraph("Automatizaciones", body_style), Paragraph("Flujos con Power Automate, n8n, RPA, integración de APIs y automatización de backoffice.", body_style)],
        [Paragraph("/azure", code_style), Paragraph("Azure Cloud", body_style), Paragraph("Migraciones cloud, IaaS/PaaS, modernización de apps, arquitectura Well-Architected y DR.", body_style)],
        [Paragraph("/finops", code_style), Paragraph("CSCloud FinOps", body_style), Paragraph("Optimización y visibilidad de costos cloud, presupuestos, detección de anomalías y ahorro.", body_style)],
        [Paragraph("/microsoft-365", code_style), Paragraph("Microsoft 365", body_style), Paragraph("Licenciamiento CSP, migración de correo a Exchange Online, Teams, SharePoint y OneDrive.", body_style)],
        [Paragraph("/modern-workplace", code_style), Paragraph("Puesto Digital", body_style), Paragraph("Gestión de dispositivos con Intune (MDM/MAM), Windows 365 y Azure Virtual Desktop (AVD).", body_style)],
        [Paragraph("/power-platform", code_style), Paragraph("Power Platform", body_style), Paragraph("Desarrollo de aplicaciones Power Apps, flujos automáticos y tableros analíticos Power BI.", body_style)],
        [Paragraph("/seguridad", code_style), Paragraph("Ciberseguridad", body_style), Paragraph("Implementación de Zero Trust, Defender for Cloud, Microsoft Entra ID y compliance SOC 2/ISO.", body_style)],
        [Paragraph("/soporte", code_style), Paragraph("Soporte IT", body_style), Paragraph("Mesa de ayuda N1/N2/N3, monitoreo proactivo 24/7, SLAs garantizados y administración delegada.", body_style)]
    ]
    serv_table = Table(services_data, colWidths=[90, 100, 314])
    serv_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, BG_LIGHT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
    ]))
    story.append(serv_table)
    story.append(Spacer(1, 10))

    # 5. Módulo de Blog
    story.append(Paragraph("5. Módulo de Blog y Contenidos", h1_style))
    story.append(Paragraph("• <b>Almacenamiento Descentralizado:</b> Los artículos residen en <code>src/content/blog/*.md</code> con Frontmatter estructurado (título, descripción, fecha, autor, tags, imagen).", bullet_style))
    story.append(Paragraph("• <b>Rendimiento y SEO:</b> Generación estática SSG en tiempo de compilación con metadatos Open Graph, Twitter Cards y marcado Schema.org/Article.", bullet_style))
    story.append(Paragraph("• <b>Más de 25 Artículos Especializados:</b> Publicaciones sobre NAT Gateway vs Firewall, Azure Virtual Desktop, Backup en la nube, FinOps y gobernanza.", bullet_style))
    story.append(Spacer(1, 10))

    # 6. Internacionalización y Legal
    story.append(Paragraph("6. Internacionalización (i18n) y Cumplimiento Legal", h1_style))
    story.append(Paragraph("• <b>next-intl:</b> Gestión de cadenas de texto en <code>messages/es.json</code>, <code>messages/en.json</code> y <code>messages/pt-BR.json</code>.", bullet_style))
    story.append(Paragraph("• <b>Páginas Legales:</b> Política de Privacidad (GDPR/Ley 25.326), Términos y Condiciones, y Política de Reembolso.", bullet_style))
    story.append(Paragraph("• <b>Banner de Cookies:</b> Consentimiento granular con almacenamiento local en <code>localStorage</code>.", bullet_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Documento Funcional PDF generado exitosamente en: {pdf_path}")

if __name__ == "__main__":
    generate_pdf()
