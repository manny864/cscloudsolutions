# SOP: Generación del Paquete Web (Estructura + Diseño) para DNDA

## Objetivo
Generar la copia completa de distribución del sitio web corporativo de CSCloud Solutions conforme al requerimiento formal de la **Dirección Nacional del Derecho de Autor (DNDA)** para la categoría *"PÁGINA WEB: ESTRUCTURA + DISEÑO"*:
> *"Deberá presentar una copia completa de toda la página web tal cual la suben al servidor. Desde el archivo index.html con todos sus archivos y todas sus sub carpetas. EL ARCHIVO PODRA ESTAR COMPRIMIDO"*.

## Estructura del Paquete para DNDA (`cscloudsolutions-dnda-web.zip`)
El archivo comprimido debe contener en su raíz:
1. `index.html`: Archivo principal de inicio (Home Page en español con carga completa de estilos y scripts).
2. `es.html`, `en.html`, `pt-BR.html` y carpetas localizadas:
   - `es/` (Páginas `/azure`, `/finops`, `/microsoft-365`, `/agentic-ai`, `/blog/...`)
   - `en/` (Páginas en inglés)
   - `pt-BR/` (Páginas en portugués)
3. `_next/static/`: Todos los archivos CSS, fuentes, chunks JavaScript de React 19 y assets compilados.
4. Assets de `public/`: Logos, vectores SVG, favicons, iconos y videos corporativos.
5. Cero exposición de archivos `.env`, claves, bases de datos o historiales `.git`.

## Procedimiento
1. Ejecutar `npm run build` para asegurar la compilación más reciente.
2. Ejecutar `scripts/generate_dnda_web_bundle.py` para armar la estructura estática en `.dnda_web_dist/` y comprimirla en `cscloudsolutions-dnda-web.zip`.
3. Validar la existencia de `index.html` en la raíz del ZIP y la integridad de las rutas.
4. Generar el hash criptográfico SHA-256 para la constancia de depósito.
