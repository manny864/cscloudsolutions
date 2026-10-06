#!/usr/bin/env python3
"""
SOP: Rebranding y Nuevo Look & Feel de Assessment FinOps (CSCloudSolutions)
Script determinista e idempotente para transformar assesment_Finops al diseño,
colores, logos y textos corporativos de CSCloudSolutions.
"""

import os
import sys
import base64
import re
from pathlib import Path
from PIL import Image

def main():
    root_dir = Path("/Users/manuelchavez/Documents/cscloudsolutions")
    site_dir = root_dir / "assesment_Finops" / "site"
    images_src = root_dir / "cscloudsolutions" / "public" / "images"
    public_src = root_dir / "cscloudsolutions" / "public"
    
    img_dest = site_dir / "img"
    img_dest.mkdir(parents=True, exist_ok=True)
    
    print("1. Generando activos de imagen optimizados para CSCloudSolutions...")
    
    # 1.1 Generar logo horizontal combinado (Mark + Typography)
    im_mark = Image.open(images_src / "LogoCS.png")
    bbox_mark = im_mark.getbbox()
    im_mark = im_mark.crop(bbox_mark)
    h = 70
    w_mark = int(im_mark.width * (h / im_mark.height))
    im_mark = im_mark.resize((w_mark, h), Image.Resampling.LANCZOS)
    
    im_txt = Image.open(images_src / "CSCloudSolutionsText.png")
    bbox_txt = im_txt.getbbox()
    im_txt = im_txt.crop(bbox_txt)
    h_txt = 38
    w_txt = int(im_txt.width * (h_txt / im_txt.height))
    im_txt = im_txt.resize((w_txt, h_txt), Image.Resampling.LANCZOS)
    
    gap = 14
    total_w = w_mark + gap + w_txt
    combined = Image.new('RGBA', (total_w, h), (0, 0, 0, 0))
    combined.paste(im_mark, (0, 0), im_mark)
    y_txt = (h - h_txt) // 2
    combined.paste(im_txt, (w_mark + gap, y_txt), im_txt)
    
    logo_combined_path = img_dest / "logo.png"
    combined.save(logo_combined_path, optimize=True)
    print(f"   -> Logo horizontal creado: {logo_combined_path} ({combined.size})")
    
    # Generar Data URI del logo combinado para embeber en HTML
    with open(logo_combined_path, "rb") as f:
        logo_b64 = base64.b64encode(f.read()).decode("utf-8")
    logo_data_uri = f"data:image/png;base64,{logo_b64}"
    
    # Copiar activos complementarios
    fav_src = public_src / "favicon.png"
    if fav_src.exists():
        fav_dest = site_dir / "favicon.png"
        with open(fav_src, "rb") as f_in, open(fav_dest, "wb") as f_out:
            f_out.write(f_in.read())
        print(f"   -> Favicon copiado a {fav_dest}")
    
    # Copiar LogoCS y Text a img/
    im_mark.save(img_dest / "LogoCS.png", optimize=True)
    im_txt.save(img_dest / "CSCloudSolutionsText.png", optimize=True)
    
    # 2. Actualizar config.js
    print("2. Actualizando config.js...")
    cfg_file = site_dir / "config.js"
    cfg_content = """/*
  CSCloudSolutions · Azure Value Sprint · configuración del sitio
  Sitio: https://ctr365findopsassesment.z13.web.core.windows.net/
  Estos valores NO son secretos: cualquiera que abra el sitio puede verlos.
  deploy.ps1 completa automáticamente los que puede.
*/
window.APP_CONFIG = {
  // App registration multi-tenant (SPA) en el tenant de CSCloudSolutions (deploy.ps1 -CreateAppRegistration).
  spaClientId: '',

  // Partner ID de CSCloudSolutions (Microsoft AI Cloud Partner Program) para el Partner Admin Link.
  partnerId: '',

  // Tenant de CSCloudSolutions y grupo de seguridad que recibe la delegación de Lighthouse.
  cscloudTenantId: '',
  ctrl365TenantId: '', // Compatibilidad retroactiva con scripts de despliegue
  lighthouseGroupId: '',
  lighthouseGroupName: 'CSCloudSolutions - Azure Value Sprint',

  // Cuentas que el cliente debe invitar si elige la opción de invitados (se muestran en cliente.html).
  guestAccounts: [],

  // Autoridad del inicio de sesión con cuenta CSCloudSolutions. 'organizations' = tenant de origen de la cuenta.
  lighthouseAuthority: 'organizations'
};
"""
    cfg_file.write_text(cfg_content, encoding="utf-8")
    print("   -> config.js actualizado correctamente.")

    # 3. Actualizar cliente.html
    print("3. Actualizando cliente.html...")
    cliente_file = site_dir / "cliente.html"
    c_html = cliente_file.read_text(encoding="utf-8")
    
    # Limpiar cualquier favicon mal posicionado o existente
    c_html = re.sub(r'<link rel="icon"[^>]*>', '', c_html)
    # Insertar favicon en <head>
    c_html = c_html.replace("<meta charset=\"utf-8\">", "<meta charset=\"utf-8\">\n<link rel=\"icon\" type=\"image/png\" href=\"favicon.png\">")
    
    # Reemplazo de Logo en base64
    c_html = re.sub(
        r'<img class="logo" alt="[^"]*" src="[^"]*">',
        f'<img class="logo" alt="CSCloudSolutions" src="{logo_data_uri}">',
        c_html
    )
    
    # Actualizar Títulos y Textos
    c_html = c_html.replace("CTRL365 · Azure Value Sprint", "CSCloudSolutions · Azure Value Sprint")
    c_html = c_html.replace("azure value sprint", "azure value sprint · cscloudsolutions")
    c_html = c_html.replace("al equipo de CTRL365", "al equipo de CSCloudSolutions")
    c_html = c_html.replace("tenant de CTRL365", "tenant de CSCloudSolutions")
    c_html = c_html.replace("datos de CTRL365", "datos de CSCloudSolutions")
    c_html = c_html.replace("la aplicación de CTRL365", "la aplicación de CSCloudSolutions")
    c_html = c_html.replace("quitar la oferta de CTRL365", "quitar la oferta de CSCloudSolutions")
    c_html = c_html.replace("registramos a CTRL365 como su partner", "registramos a CSCloudSolutions como su partner")
    c_html = c_html.replace("ctrl365-lighthouse-solo-lectura.json", "cscloudsolutions-lighthouse-solo-lectura.json")
    c_html = c_html.replace("ctrl365-lighthouse", "cscloud-lighthouse")
    c_html = c_html.replace("CTRL365 - Azure Value Sprint", "CSCloudSolutions - Azure Value Sprint")
    c_html = c_html.replace("Acceso de solo lectura de CTRL365", "Acceso de solo lectura de CSCloudSolutions")
    c_html = c_html.replace(
        "CTRL365 · Microsoft Solutions Partner · Built for AI. Designed for Humans.",
        "CSCloudSolutions · Cloud & FinOps Solutions Partner · Securing and Optimizing Your Cloud."
    )
    c_html = c_html.replace(
        "CTRL365 · Microsoft Solutions Partner",
        "CSCloudSolutions · Cloud & FinOps Solutions Partner"
    )

    # CSS de cliente.html
    new_client_css = """:root{--navy:#0E1A2B;--navy-mid:#16273F;--navy-light:#1F3A5F;--blue-corp:#0054A6;--blue-hover:#004385;--cyan:#00AEEF;--cyan-dark:#004F8A;--accent:#FF6B35;--ink:#0F172A;--grey:#64748B;--card:#F8FAFC;--line:#E2E8F0;--green:#15803D;--greenbg:#F0FDF4;--amberbg:#FFFBEB;
--font:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif;--mono:Consolas,'Cascadia Mono',Menlo,monospace}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--font);color:var(--ink);background:#F1F5F9;line-height:1.55;font-size:15px}
:focus-visible{outline:3px solid var(--cyan);outline-offset:2px}
.top{background:radial-gradient(70% 180% at 100% 100%,rgba(0,174,239,.22),transparent 60%),linear-gradient(115deg,#0A121E 0%,#0E1A2B 45%,#16273F 100%);color:#fff;padding:28px 32px;border-bottom:1px solid rgba(255,255,255,.08)}
.in{max-width:900px;margin:0 auto}
.logo{height:36px;width:auto;display:block}
.kick{color:var(--cyan);font-weight:700;font-size:13px;margin-top:16px;text-transform:uppercase;letter-spacing:1px}
h1{font-size:30px;line-height:1.15;margin-top:4px;letter-spacing:-.3px}
.top p.sub{color:#E2E8F0;margin-top:8px;max-width:64ch}
main{max-width:900px;margin:24px auto 50px;padding:0 20px;display:flex;flex-direction:column;gap:18px}
section{background:#fff;border-radius:14px;box-shadow:0 4px 22px rgba(14,26,43,.06);padding:22px 26px;border:1px solid var(--line)}
h2{color:var(--navy);font-size:19px;margin-bottom:6px}
h3{color:var(--navy);font-size:15px;margin:16px 0 6px}
p{margin:6px 0;max-width:75ch}
ol,ul{margin:8px 0 8px 22px}li{margin:5px 0}
.need{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px}
.box{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:12px 14px}
.box b{color:var(--navy)}
.tag{display:inline-block;font-size:12px;font-weight:700;border-radius:20px;padding:2px 10px;background:var(--blue-corp);color:#fff;margin-left:6px;vertical-align:middle}
pre{background:#0E1A2B;color:#F1F5F9;border-radius:8px;padding:12px;font-family:var(--mono);font-size:12.5px;overflow:auto;white-space:pre;margin-top:8px;border:1px solid #1E293B}
code{font-family:var(--mono);font-size:13px;background:var(--card);padding:1px 5px;border-radius:4px;color:var(--cyan-dark)}
.btn{border:0;border-radius:8px;padding:9px 16px;font-weight:700;cursor:pointer;background:var(--navy);color:#fff;font:inherit}
.btn:hover{background:var(--navy-mid)}
.btn.pri{background:var(--blue-corp)}.btn.pri:hover{background:var(--blue-hover)}
.row{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}
.note{background:var(--amberbg);border:1px solid #ecd7b4;border-radius:10px;padding:10px 14px;margin-top:10px;font-size:14px}
.ok{background:var(--greenbg);border:1px solid #cfe0cf;border-radius:10px;padding:10px 14px;margin-top:10px;font-size:14px}
table{border-collapse:collapse;width:100%;font-size:14px;margin-top:8px}
th{background:var(--navy);color:#fff;text-align:left;padding:7px 9px;font-weight:600}td{padding:7px 9px;border-bottom:1px solid var(--line);vertical-align:top}
.foot{max-width:900px;margin:0 auto 30px;padding:0 20px;color:var(--grey);font-size:12px}
@media (max-width:720px){.need{grid-template-columns:1fr}section{padding:18px}}"""

    c_html = re.sub(r'<style>.*?</style>', f'<style>\n{new_client_css}\n</style>', c_html, flags=re.DOTALL)
    
    # Compatibilidad en JS de cliente.html
    c_html = c_html.replace(
        "const tenant = C.ctrl365TenantId || '<TENANT_ID_CTRL365>';",
        "const tenant = C.cscloudTenantId || C.ctrl365TenantId || '<TENANT_ID_CSCLOUDSOLUTIONS>';"
    )
    c_html = c_html.replace(
        "const group = C.lighthouseGroupId || '<ID_DEL_GRUPO_CTRL365>';",
        "const group = C.lighthouseGroupId || '<ID_DEL_GRUPO_CSCLOUDSOLUTIONS>';"
    )
    c_html = c_html.replace(
        "if (!C.ctrl365TenantId || !C.lighthouseGroupId)",
        "if ((!C.cscloudTenantId && !C.ctrl365TenantId) || !C.lighthouseGroupId)"
    )
    cliente_file.write_text(c_html, encoding="utf-8")
    print("   -> cliente.html actualizado correctamente.")

    # 4. Actualizar index.html
    print("4. Actualizando index.html...")
    index_file = site_dir / "index.html"
    i_html = index_file.read_text(encoding="utf-8")

    # Limpiar cualquier favicon mal posicionado o tags rotos
    i_html = re.sub(r'<link rel="icon"[^>]*>', '', i_html)
    # Insertar favicon en <head>
    i_html = i_html.replace("<meta charset=\"utf-8\">", "<meta charset=\"utf-8\">\n<link rel=\"icon\" type=\"image/png\" href=\"favicon.png\">")

    # Reemplazo de Logo en base64 de index.html
    i_html = re.sub(
        r'<img class="logo" alt="[^"]*" src="[^"]*">',
        f'<img class="logo" alt="CSCloudSolutions" src="{logo_data_uri}" style="height:36px;width:auto;display:block;">',
        i_html
    )

    # CSS principal de index.html
    new_index_css = """:root{--navy:#0E1A2B;--navy-mid:#16273F;--navy-light:#1F3A5F;--blue-corp:#0054A6;--blue-hover:#004385;--cyan:#00AEEF;--cyan-dark:#004F8A;--accent:#FF6B35;
--ink:#0F172A;--grey:#64748B;--card:#F8FAFC;--line:#E2E8F0;--green:#15803D;--greenbg:#F0FDF4;--red:#B91C1C;--redbg:#FEF2F2;--amber:#B45309;--amberbg:#FFFBEB;
--font:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif;--mono:Consolas,'Cascadia Mono',Menlo,monospace}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--font);color:var(--ink);background:#F1F5F9;line-height:1.5;font-size:14px}
button,input,select,textarea{font:inherit;color:inherit}
:focus-visible{outline:3px solid var(--cyan);outline-offset:2px}
.top{background:radial-gradient(70% 180% at 100% 100%,rgba(0,174,239,.22),transparent 60%),linear-gradient(115deg,#0A121E 0%,#0E1A2B 45%,#16273F 100%);color:#fff;padding:22px 32px;border-bottom:1px solid rgba(255,255,255,.08)}
.top .row{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;max-width:1240px;margin:0 auto}
.logo{height:36px;width:auto;display:block}
.top h1{font-size:28px;line-height:1.15;margin-top:14px;letter-spacing:-.3px}
.top .kick{color:var(--cyan);font-weight:700;font-size:13px;margin-top:2px;text-transform:uppercase;letter-spacing:1px}
.top .sub{color:#E2E8F0;font-size:14px;margin-top:4px;max-width:70ch}
.top .ro{display:inline-block;margin-top:10px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);border-radius:20px;padding:3px 12px;font-size:12px;color:#fff}
.wrap{max-width:1240px;margin:22px auto 60px;padding:0 20px;display:flex;flex-direction:column;gap:18px}
.step{background:#fff;border-radius:14px;box-shadow:0 4px 22px rgba(14,26,43,.06);display:grid;grid-template-columns:56px 1fr;overflow:hidden;border:1px solid var(--line)}
.step .num{background:var(--card);border-right:1px solid var(--line);display:flex;justify-content:center;padding-top:22px;font-weight:800;font-size:20px;color:var(--cyan-dark)}
.step.done .num{background:var(--blue-corp);color:#fff}
.step.locked{opacity:.55}
.step.locked .content{pointer-events:none}
.content{padding:20px 24px 24px;min-width:0}
h2{color:var(--navy);font-size:18px;margin-bottom:4px}
h3{color:var(--navy);font-size:14px;margin:16px 0 8px}
.hint{color:var(--grey);font-size:13px;max-width:90ch}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
label.f{display:flex;flex-direction:column;gap:4px;font-size:13px;font-weight:600;color:var(--navy)}
label.f span.h{font-weight:400;color:var(--grey);font-size:12px}
input[type=text],input[type=password],select,textarea{border:1px solid #CBD5E1;border-radius:8px;padding:8px 10px;background:#fff;width:100%}
textarea{font-family:var(--mono);font-size:12px;min-height:84px;resize:vertical}
.btn{border:0;border-radius:8px;padding:9px 16px;font-weight:700;cursor:pointer;background:var(--navy);color:#fff;display:inline-flex;align-items:center;gap:8px}
.btn:hover{background:var(--navy-mid)}
.btn.pri{background:var(--blue-corp)}.btn.pri:hover{background:var(--blue-hover)}
.btn.ghost{background:#fff;color:var(--navy);border:1px solid #CBD5E1}.btn.ghost:hover{background:var(--card)}
.btn.sm{padding:5px 10px;font-size:12px}
.btn:disabled{opacity:.5;cursor:not-allowed}
.top .btn.ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.4)}
.top .btn.ghost:hover{background:rgba(255,255,255,.1)}
.row-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:14px}
.seg{display:inline-flex;border:1px solid #CBD5E1;border-radius:9px;overflow:hidden;margin:12px 0}
.seg button{border:0;background:#fff;padding:8px 14px;cursor:pointer;font-weight:600;color:var(--navy)}
.seg button[aria-pressed=true]{background:var(--blue-corp);color:#fff}
.panel{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:12px 14px;margin-top:12px}
.panel.warn{background:var(--amberbg);border-color:#ecd7b4}
.panel.err{background:var(--redbg);border-color:#e6cfcc;color:var(--red)}
.panel.ok{background:var(--greenbg);border-color:#cfe0cf}
pre.code{background:#0E1A2B;color:#F1F5F9;border-radius:8px;padding:12px;font-family:var(--mono);font-size:12px;overflow:auto;white-space:pre;margin-top:8px;border:1px solid #1E293B}
details{margin-top:12px;border:1px solid var(--line);border-radius:10px;padding:10px 14px;background:#fff}
details summary{cursor:pointer;font-weight:700;color:var(--navy)}
details ul{margin:8px 0 4px 18px}details li{margin:4px 0}
.chip{display:inline-block;border-radius:20px;padding:2px 10px;font-size:12px;font-weight:700;background:var(--card);color:var(--navy);border:1px solid var(--line)}
.chip.ok{background:var(--greenbg);color:var(--green);border-color:#cfe0cf}
.chip.err{background:var(--redbg);color:var(--red);border-color:#e6cfcc}
table{border-collapse:collapse;width:100%;font-size:12.5px}
th{background:var(--navy);color:#fff;text-align:left;padding:7px 8px;position:sticky;top:0;cursor:pointer;white-space:nowrap;font-weight:600}
td{padding:6px 8px;border-bottom:1px solid var(--line);vertical-align:top}
td.n,th.n{text-align:right;font-variant-numeric:tabular-nums}
tr:nth-child(even) td{background:#faf8fb}
.tbox{max-height:440px;overflow:auto;border:1px solid var(--line);border-radius:10px;margin-top:8px}
.mods{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:10px;margin-top:10px}
.mod{display:flex;gap:10px;border:1px solid var(--line);border-radius:10px;padding:10px 12px;cursor:pointer;background:#fff}
.mod:has(input:checked){border-color:var(--blue-corp);background:var(--card)}
.mod b{display:block;color:var(--navy);font-size:13px}.mod small{color:var(--grey);font-size:12px;display:block}
.prog{height:10px;background:var(--line);border-radius:6px;overflow:hidden;margin-top:12px}
.prog i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--navy),var(--cyan));transition:width .3s}
.log{background:#0A121E;color:#E2E8F0;font-family:var(--mono);font-size:12px;border-radius:10px;padding:10px 12px;height:240px;overflow:auto;margin-top:10px;border:1px solid #1E293B}
.log .ok{color:#4ADE80}.log .wa{color:#FBBF24}.log .er{color:#F87171}.log .in{color:#93C5FD}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;margin-top:12px}
.kpi{border-left:4px solid var(--cyan);background:var(--card);border-radius:8px;padding:10px 14px;border-top:1px solid var(--line);border-right:1px solid var(--line);border-bottom:1px solid var(--line)}
.kpi .v{font-size:22px;font-weight:800;color:var(--navy);font-variant-numeric:tabular-nums}
.kpi .l{font-size:12px;color:var(--grey)}
.kpi .d{font-size:12px;font-weight:700}
.up{color:var(--red)}.down{color:var(--green)}
.sev{display:inline-block;border-radius:6px;padding:1px 8px;font-size:11px;font-weight:800}
.lvl{display:inline-block;border-radius:6px;padding:2px 10px;font-size:12px;font-weight:800}
.lvl.Crítico{background:var(--redbg);color:var(--red)}.lvl.Atención{background:var(--amberbg);color:var(--amber)}.lvl.Aceptable{background:var(--greenbg);color:var(--green)}.lvl.Sin{background:var(--card);color:var(--grey)}
.sev.Alta{background:var(--redbg);color:var(--red)}.sev.Media{background:var(--amberbg);color:var(--amber)}.sev.Baja{background:var(--greenbg);color:var(--green)}.sev.Info{background:var(--card);color:var(--navy)}
.chart{margin-top:8px;overflow-x:auto}
.legend{display:flex;flex-wrap:wrap;gap:10px;font-size:12px;margin-top:6px}
.legend span{display:inline-flex;align-items:center;gap:5px}.legend i{width:10px;height:10px;border-radius:2px;display:inline-block}
.findings .fi{border:1px solid var(--line);border-radius:10px;padding:10px 14px;margin-top:8px}
.findings .fi summary{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;list-style:none}
.findings .fi summary::-webkit-details-marker{display:none}
.findings .fi .t{font-weight:700;color:var(--ink);flex:1;min-width:240px}
.findings .fi .c{font-variant-numeric:tabular-nums;color:var(--navy);font-weight:700}
.findings .fi .a{font-size:12px;color:var(--grey)}
.explorer-bar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:10px}
.explorer-bar select{width:auto;min-width:260px}.explorer-bar input{width:auto;min-width:220px}
.modal{position:fixed;inset:0;background:rgba(14,26,43,.6);display:none;align-items:center;justify-content:center;z-index:50;padding:20px}
.modal.open{display:flex}
.modal .box{background:#fff;border-radius:14px;max-width:620px;width:100%;padding:22px 24px;box-shadow:0 20px 60px rgba(0,0,0,.3);border:1px solid var(--line)}
.muted{color:var(--grey)}
.mono{font-family:var(--mono);font-size:12px}
.foot{max-width:1240px;margin:0 auto 30px;padding:0 20px;color:var(--grey);font-size:12px}
@media (max-width:820px){.grid2,.grid3{grid-template-columns:1fr}.step{grid-template-columns:40px 1fr}.content{padding:16px}}
@media (prefers-reduced-motion:reduce){.prog i{transition:none}}"""

    # Reemplazar bloque <style> inicial en <head>
    i_html = re.sub(r'<style>.*?</style>', f'<style>\n{new_index_css}\n</style>', i_html, count=1, flags=re.DOTALL)

    # Reemplazos textuales exhaustivos en index.html
    text_replacements = [
        ("CTRL365 · Azure Value Sprint · Relevamiento", "CSCloudSolutions · Azure Value Sprint · Relevamiento"),
        ("CTRL365 · Azure Value Sprint", "CSCloudSolutions · Azure Value Sprint"),
        ("CTRL365 - Azure Value Sprint", "CSCloudSolutions - Azure Value Sprint"),
        ("azure value sprint", "azure value sprint · cscloudsolutions"),
        ("Cuenta CTRL365 (permiso delegado)", "Cuenta CSCloudSolutions (permiso delegado)"),
        ("Partner ID de CTRL365", "Partner ID de CSCloudSolutions"),
        ("Partner ID de CTRL365.", "Partner ID de CSCloudSolutions."),
        ("Client ID de la app de CTRL365", "Client ID de la app de CSCloudSolutions"),
        ("la app de CTRL365", "la app de CSCloudSolutions"),
        ("la aplicación de CTRL365", "la aplicación de CSCloudSolutions"),
        ("Registrar CTRL365 como partner", "Registrar CSCloudSolutions como partner"),
        ("Cambiar al partner de CTRL365", "Cambiar al partner de CSCloudSolutions"),
        ("tenant de CTRL365", "tenant de CSCloudSolutions"),
        ("cuenta de CTRL365", "cuenta de CSCloudSolutions"),
        ("cuenta CTRL365", "cuenta CSCloudSolutions"),
        ("Cuenta CTRL365", "Cuenta CSCloudSolutions"),
        ("CTRL365 Azure Value Sprint · Relevamiento", "CSCloudSolutions Azure Value Sprint · Relevamiento"),
        ("CTRL365_FinOps_", "CSCloudSolutions_FinOps_"),
        ("Sos consultor senior de CTRL365 (Microsoft Solutions Partner)", "Sos consultor senior de CSCloudSolutions (Microsoft Cloud Partner)"),
        ("(cliente / CTRL365)", "(cliente / CSCloudSolutions)"),
        ("Partner Admin Link de CTRL365", "Partner Admin Link de CSCloudSolutions"),
        ("Relevamiento de costos, seguridad y gobierno · CTRL365", "Relevamiento de costos, seguridad y gobierno · CSCloudSolutions"),
        ("CTRL365 · Microsoft Solutions Partner · Built for AI. Designed for Humans.", "CSCloudSolutions · Cloud & FinOps Solutions Partner · Securing and Optimizing Your Cloud."),
        ("CTRL365 · Microsoft Solutions Partner", "CSCloudSolutions · Cloud & FinOps Solutions Partner"),
        ("wb.creator = 'CTRL365 · Azure Value Sprint'", "wb.creator = 'CSCloudSolutions · Azure Value Sprint'"),
        ("wb.creator = 'CSCloudSolutions · Azure Value Sprint'", "wb.creator = 'CSCloudSolutions · Azure Value Sprint'"),
        ("fgColor: { argb: 'FF352041' }", "fgColor: { argb: 'FF0E1A2B' }"),
        ("color: { argb: 'FF352041' }", "color: { argb: 'FF0E1A2B' }"),
        ("color: { argb: 'FFFF5400' }", "color: { argb: 'FF0054A6' }"),
        ("const PALETTE = ['#352041', '#FF5400', '#7B5A93', '#F2A16A', '#2E6F8E', '#9C8AA8', '#C7BED0'];", "const PALETTE = ['#0E1A2B', '#00AEEF', '#0054A6', '#1F3A5F', '#16273F', '#FF6B35', '#94A3B8'];")
    ]
    for old_s, new_s in text_replacements:
        i_html = i_html.replace(old_s, new_s)

    # Limpiar líneas de SVG en drawMonthly y drawDaily
    # drawMonthly
    i_html = re.sub(
        r'fill="\$\{PALETTE\[j % PALETTE\.length\]\}">.*?<title>',
        r'fill="${PALETTE[j % PALETTE.length]}"><title>',
        i_html
    )
    # drawDaily circle
    i_html = re.sub(
        r'fill="\$\{[^}]*\}">.*?<title>',
        r'fill="${an.has(p.date) ? \'#FF6B35\' : \'#0054A6\'}"><title>',
        i_html
    )
    # text fill in drawMonthly
    i_html = i_html.replace('text-anchor="middle" fill="#352041"', 'text-anchor="middle" fill="#0E1A2B"')
    i_html = i_html.replace('stroke="#F2A16A"', 'stroke="#00AEEF"')
    i_html = i_html.replace('stroke="#352041"', 'stroke="#0054A6"')

    # Actualizar la función reportViewer embebida en index.html
    # PAL
    i_html = i_html.replace(
        "const PAL = ['#352041', '#FF5400', '#7B5A93', '#F2A16A', '#2E6F8E', '#9C8AA8', '#C7BED0'];",
        "const PAL = ['#0E1A2B', '#00AEEF', '#0054A6', '#1F3A5F', '#16273F', '#FF6B35', '#94A3B8'];"
    )
    # CSS del ReportViewer exportado
    new_rv_css = """:root{--navy:#0E1A2B;--navy-mid:#16273F;--navy-light:#1F3A5F;--blue-corp:#0054A6;--cyan:#00AEEF;--cyan-dark:#004F8A;--accent:#FF6B35;--ink:#0F172A;--grey:#64748B;--card:#F8FAFC;--line:#E2E8F0;--green:#15803D;--greenbg:#F0FDF4;--red:#B91C1C;--redbg:#FEF2F2;--amber:#B45309;--amberbg:#FFFBEB;--font:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif}
*{box-sizing:border-box;margin:0;padding:0}body{font-family:var(--font);color:var(--ink);background:#F1F5F9;font-size:14px;line-height:1.5}
:focus-visible{outline:3px solid var(--cyan);outline-offset:2px}
header{background:radial-gradient(70% 180% at 100% 100%,rgba(0,174,239,.22),transparent 60%),linear-gradient(115deg,#0A121E 0%,#0E1A2B 45%,#16273F 100%);color:#fff;padding:24px 32px;border-bottom:1px solid rgba(255,255,255,.08)}
.in{max-width:1200px;margin:0 auto}.logo{height:34px;width:auto;display:block}.kick{color:var(--cyan);font-weight:700;font-size:13px;margin-top:14px;text-transform:uppercase;letter-spacing:1px}
h1{font-size:28px;line-height:1.15;margin-top:2px}.meta{color:#E2E8F0;font-size:13px;margin-top:6px}
nav{background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:5}nav .in{display:flex;gap:4px;overflow-x:auto;padding:0 20px}
nav button{border:0;background:none;padding:12px 14px;font:inherit;font-weight:600;color:var(--grey);cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap}
nav button[aria-selected=true]{color:var(--navy);border-bottom-color:var(--blue-corp)}
main{max-width:1200px;margin:20px auto 50px;padding:0 20px}section{display:none}section.on{display:block}
.card{background:#fff;border-radius:14px;box-shadow:0 4px 22px rgba(14,26,43,.06);padding:20px 24px;margin-bottom:16px;border:1px solid var(--line)}
h2{color:var(--navy);font-size:18px;margin-bottom:8px}h3{color:var(--navy);font-size:15px;margin:14px 0 6px}.hint{color:var(--grey);font-size:13px;max-width:90ch}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.kpi{border-left:4px solid var(--cyan);background:var(--card);border-radius:8px;padding:10px 14px;border-top:1px solid var(--line);border-right:1px solid var(--line);border-bottom:1px solid var(--line)}
.kpi .v{font-size:21px;font-weight:800;color:var(--navy)}.kpi .l{font-size:12px;color:var(--grey)}.kpi .d{font-size:12px;font-weight:700;color:var(--navy)}
table{border-collapse:collapse;width:100%;font-size:12.5px}th{background:var(--navy);color:#fff;text-align:left;padding:7px 8px;position:sticky;top:0;font-weight:600;cursor:pointer;white-space:nowrap}
td{padding:6px 8px;border-bottom:1px solid var(--line);vertical-align:top}td.n{text-align:right;font-variant-numeric:tabular-nums}tr:nth-child(even) td{background:#faf8fb}
.tbox{max-height:520px;overflow:auto;border:1px solid var(--line);border-radius:10px;margin-top:8px}
.sev,.lvl{display:inline-block;border-radius:6px;padding:1px 8px;font-size:11px;font-weight:800}
.Alta,.Crítico{background:var(--redbg);color:var(--red)}.Media,.Atención{background:var(--amberbg);color:var(--amber)}.Baja,.Aceptable{background:var(--greenbg);color:var(--green)}.Info{background:var(--card);color:var(--navy)}
.chip{display:inline-block;border-radius:20px;padding:1px 9px;font-size:11px;font-weight:700;background:var(--card);color:var(--navy);border:1px solid var(--line)}
details.fi{border:1px solid var(--line);border-radius:10px;padding:10px 14px;margin-top:8px;background:#fff}
details.fi summary{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;cursor:pointer;list-style:none}details.fi summary::-webkit-details-marker{display:none}
.t{font-weight:700;flex:1;min-width:240px}.c{font-weight:700;color:var(--navy)}
.bar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:8px 0}select,input{border:1px solid #CBD5E1;border-radius:8px;padding:7px 10px;font:inherit;background:#fff}
.btn{border:0;border-radius:8px;padding:7px 14px;font:inherit;font-weight:700;cursor:pointer;background:var(--navy);color:#fff}.btn.ghost{background:#fff;color:var(--navy);border:1px solid #CBD5E1}
.note{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:8px 12px;margin-top:8px;font-size:13px}
.legend{display:flex;flex-wrap:wrap;gap:10px;font-size:12px;margin-top:6px}.legend i{width:10px;height:10px;border-radius:2px;display:inline-block;margin-right:4px}
.chart{overflow-x:auto}.two{display:grid;grid-template-columns:1fr 1fr;gap:16px}
footer{max-width:1200px;margin:0 auto 30px;padding:0 20px;color:var(--grey);font-size:12px}
@media (max-width:820px){.two{grid-template-columns:1fr}}
@media print{nav,.bar,.noprint{display:none!important}section{display:block!important;page-break-before:always}body{background:#fff}.card{box-shadow:none;border:1px solid var(--line)}.tbox{max-height:none;overflow:visible}}"""

    # Reemplazo en el generador de reportes HTML
    i_html = re.sub(r':root\{--violet:#352041.*?</style>', f'{new_rv_css}\n</style>', i_html, flags=re.DOTALL)

    # Limpiar referencias de reportViewer
    i_html = i_html.replace('alt="CTRL365"', 'alt="CSCloudSolutions"')
    i_html = i_html.replace("fill=\"#352041\"", "fill=\"#0E1A2B\"")
    i_html = i_html.replace("fill='#352041'", "fill='#0E1A2B'")
    i_html = i_html.replace("an.has(p.date) ? '#FF5400' : '#352041'", "an.has(p.date) ? '#FF6B35' : '#0054A6'")

    index_file.write_text(i_html, encoding="utf-8")
    print("   -> index.html actualizado correctamente.")

    # 5. Actualizar redirect.html
    print("5. Actualizando redirect.html...")
    redir_file = site_dir / "redirect.html"
    redir_html = redir_file.read_text(encoding="utf-8")
    redir_html = redir_html.replace("color:#352041", "color:#0E1A2B")
    redir_file.write_text(redir_html, encoding="utf-8")
    print("   -> redirect.html actualizado correctamente.")

    print("\n--- FINALIZADO CON ÉXITO ---")

if __name__ == "__main__":
    main()
