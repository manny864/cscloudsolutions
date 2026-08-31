# SOP: Empaquetado de Código Fuente para Registro en DNDA

## Objetivo
Generar un archivo comprimido (.zip) limpio, profesional y seguro que contenga la totalidad de la obra (código fuente, arquitectura, diseño, textos y documentación técnica) del sitio web corporativo de CSCloud Solutions (`cscloudsolutions.com.ar`) para su depósito y registro legal de propiedad intelectual ante la **Dirección Nacional del Derecho de Autor (DNDA)**, excluyendo estrictamente credenciales, secretos, dependencias pesadas compiladas y archivos temporales.

## Requisitos de la DNDA (Depósito de Software y Páginas Web)
- **Código Fuente Completo:** Estructura de componentes, lógica de negocio, estilos, maquetación e internacionalización.
- **Documentación Técnica y Funcional:** Manuales de arquitectura (HLD/LLD) y guía de secciones/contenidos.
- **Seguridad e Higiene de Datos:** Cero exposición de claves de API, contraseñas, tokens de acceso (`.env`, `.env.local`, certificados privados o credenciales de cloud).
- **Exclusión de Binarios y Dependencias:** No incluir `node_modules/`, `.next/`, binarios compilados de terceros ni registros de logs.

## Reglas de Filtrado e Inclusión / Exclusión

### Elementos a Incluir
1. `src/` (Páginas App Router, componentes React, middleware, Server Actions, lib, i18n, types).
2. `messages/` (Diccionarios de traducción en Español, Inglés y Portugués).
3. `public/` (Logos, imágenes institucionales, favicons, vectores SVG y videos oficiales).
4. `docs/` (Documento técnico HLD/LLD y Guía funcional en Markdown y PDF).
5. `infra/` (Definiciones de infraestructura como código en Terraform).
6. Archivos de Configuración de Raíz: `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `README.md`.

### Elementos a Excluir Obligatoriamente
- `.env*` (Cualquier archivo de variables de entorno o secretos).
- `node_modules/`
- `.next/` y `.turbo/`
- `.git/` y `.github/`
- `graphify-out/`
- `.tmp/`, `scratch/`, `*.log`
- `*.zip`, `*.tar.gz` (archivos comprimidos previos)
- `.DS_Store`, `Thumbs.db`

## Procedimiento de Ejecución
1. Ejecutar el script `scripts/package_for_dnda.py`.
2. El script crea el paquete en `cscloudsolutions-dnda-source.zip`.
3. Validar el tamaño del archivo resultante y verificar mediante auditoría de integridad que no contenga claves ni dependencias.
4. Generar un reporte del contenido y el hash SHA-256 para constancia de depósito legal.
