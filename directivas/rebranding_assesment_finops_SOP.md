# SOP: Rebranding y Nuevo Look & Feel de Assessment FinOps (CSCloudSolutions)

## Objetivo
Transformar visual e institucionalmente el proyecto `assesment_Finops/site/` para reflejar con fidelidad la identidad corporativa de **CSCloudSolutions**:
1. Reemplazar toda la paleta de colores heredada (tonos violetas `#352041`, anaranjados `#FF5400` y fondos ciruela) por la paleta oficial de CSCloudSolutions (Navy corporativo `#0E1A2B`, Slate, Azul Enterprise `#0054A6`, Cyan `#00AEEF` / `#004F8A` y acentos limpios).
2. Sustituir todas las referencias textuales, nombres de grupo, identificadores, plantillas ARM y metadata de **CTRL365** por **CSCloudSolutions**.
3. Eliminar los logos/imágenes heredadas en base64 de CTRL365 e integrar los activos de marca oficiales de CSCloudSolutions (`LogoCS.png`, `CSCloudSolutionsText.png` y `favicon.png`).

---

## Archivos Involucrados
- `assesment_Finops/site/index.html` (Herramienta principal de extracción y análisis FinOps)
- `assesment_Finops/site/cliente.html` (Página de instrucciones para el cliente sobre Azure Lighthouse e Invitados)
- `assesment_Finops/site/config.js` (Configuración global del cliente, tenant y grupos)
- `assesment_Finops/site/deploy.ps1` (Script de automatización de despliegue en Azure Storage)
- `assesment_Finops/site/img/` (Carpeta de nuevos activos de marca: logos y favicon)
- `cscloudsolutions/scripts/rebrand_assesment_finops.py` (Script determinista de automatización)

---

## Definición de Estilo & Look and Feel (CSCloudSolutions)
- **Header Gradient (`.top`):**
  - Fondo: `radial-gradient(70% 180% at 100% 100%, rgba(0, 174, 239, 0.22), transparent 60%), linear-gradient(115deg, #0A121E 0%, #0E1A2B 45%, #16273F 100%)`
  - Logo: Estructura flex con `LogoCS.png` (isotipo) + `CSCloudSolutionsText.png` (tipografía oficial).
- **Paleta de Colores en Variables CSS (`:root`):**
  - `--navy: #0E1A2B;`
  - `--navy-mid: #16273F;`
  - `--navy-light: #1F3A5F;`
  - `--blue-corp: #0054A6;`
  - `--cyan: #00AEEF;`
  - `--cyan-dark: #004F8A;`
  - `--accent: #FF6B35;`
  - `--success: #22C55E;`
  - `--card: #F8FAFC;`
  - `--line: #E2E8F0;`
  - `--ink: #0F172A;`
  - `--grey: #64748B;`
- **Botones y Controles:**
  - Botón principal (`.btn.pri`): `background: var(--blue-corp);` hover `background: #004385;` con `font-weight: 700; border-radius: 8px;`
  - Botón secundario (`.btn`): `background: var(--navy);` hover `background: var(--navy-mid);`
  - Botón ghost (`.btn.ghost`): `border: 1px solid #CBD5E1; color: var(--navy);`
  - Indicadores numéricos de pasos (`.step .num`): fondo `var(--card)`, borde `var(--line)`, activo/done `var(--blue-corp)` con texto blanco.
  - Tablas (`th`): `background: var(--navy); color: #fff;`
  - KPIs: borde izquierdo `4px solid var(--cyan);`
  - Terminal de logs (`.log`): `#0A121E` con bordes slate y tipografía mono clara.
  - Bloques de código (`pre.code`): `#0E1A2B`.
  - Excel Export (`ExcelJS`): encabezados con fill `FF0E1A2B`.

---

## Sustituciones de Marca y Textos
| Original (CTRL365) | Reemplazo (CSCloudSolutions) |
| :--- | :--- |
| `CTRL365 · Azure Value Sprint` | `CSCloudSolutions · Azure Value Sprint` |
| `CTRL365 - Azure Value Sprint` | `CSCloudSolutions - Azure Value Sprint` |
| `Partner ID de CTRL365` | `Partner ID de CSCloudSolutions` |
| `Tenant de CTRL365` | `Tenant de CSCloudSolutions` |
| `app de CTRL365` | `app de CSCloudSolutions` |
| `Registrar CTRL365 como partner` | `Registrar CSCloudSolutions como partner` |
| `ctrl365TenantId` | Mantener compatibilidad (alias `cscloudTenantId` o soporte dual en JS) |
| `ctrl365-lighthouse-solo-lectura.json` | `cscloudsolutions-lighthouse-solo-lectura.json` |
| `CTRL365 · Microsoft Solutions Partner...` | `CSCloudSolutions · Cloud & FinOps Solutions Partner · Securing and Optimizing Your Cloud.` |

---

## Lógica y Pasos de Ejecución
1. **Paso 1: Copia de Activos:** Copiar los logos oficiales (`LogoCS.png`, `CSCloudSolutionsText.png`, `Logo_Nombre_CSCloudSolutions.png`, `favicon.png`) desde `cscloudsolutions/public/images/` hacia `assesment_Finops/site/img/` y `assesment_Finops/site/`.
2. **Paso 2: Transformación de `index.html`:**
   - Actualizar CSS variables, gradientes, botones, tarjetas, pasos, terminal y cabeceras.
   - Reemplazar el bloque `<img>` con base64 por el nuevo header con los logos de CSCloudSolutions y favicon en `<head>`.
   - Reemplazar todas las cadenas de texto `CTRL365` por `CSCloudSolutions`.
   - Actualizar el color de los headers en la generación de Excel (`FF0E1A2B`).
   - Actualizar el visor embebido de informes y prompts.
3. **Paso 3: Transformación de `cliente.html`:**
   - Actualizar CSS variables, gradientes, tablas y botones.
   - Reemplazar el bloque `<img>` en base64 por los logos de CSCloudSolutions y favicon en `<head>`.
   - Reemplazar todas las cadenas de texto, nombres de plantilla ARM descargable y comandos de Azure CLI.
4. **Paso 4: Transformación de `config.js`:**
   - Actualizar comentarios, nombres por defecto de grupos (`CSCloudSolutions - Azure Value Sprint`) y compatibilidad dual (`ctrl365TenantId` / `cscloudTenantId`).
5. **Paso 5: Transformación de `deploy.ps1`:**
   - Actualizar nombres de aplicación, grupos y comentarios explicativos.
6. **Paso 6: Verificación visual y funcional:**
   - Validar que no queden referencias residuales a CTRL365.
   - Validar que la sintaxis HTML/JS sea 100% válida y los archivos abran correctamente.

---

## Restricciones y Casos Borde (Memoria Viva)
- **Compatibilidad con `deploy.ps1`:** El script de despliegue hace regex sobre `config.js` buscando claves específicas como `ctrl365TenantId:`. Mantener la clave o asegurar que la expresión regular siga encontrándola para no romper despliegues automatizados existentes.
- **CSP (Content Security Policy):** `index.html` y `cliente.html` tienen meta etiquetas CSP estrictas (`img-src 'self' data:`). Los logos locales en `img/` o `site/` cumplen perfectamente con `'self'`.
- **Rendimiento de Carga:** El reemplazo del string base64 de ~70KB por imágenes relativas locales optimizadas reduce el peso del HTML de 254KB a menos de 190KB, mejorando drásticamente el First Contentful Paint.
- **Flujo de Autenticación MSAL Popup (`user_cancelled`):** El error `BrowserAuthError: user_cancelled: User cancelled the flow` ocurre cuando la ventana emergente de Microsoft es cerrada manualmente por el usuario (o por presionar `Esc` o `Cancelar`) antes de que el token sea devuelto a `redirect.html`. No representa una falla de infraestructura ni de credenciales (el Client ID y Redirect URI en Entra ID están verificados y funcionales). La UI debe guiar al usuario para que mantenga abierta la ventana de Microsoft hasta que se cierre sola tras el consentimiento.
