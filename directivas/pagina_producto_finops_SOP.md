# SOP: Creación y Mantenimiento de la Página de Producto SaaS FinOps

## Objetivo
Definir la arquitectura, implementación, optimización SEO/GEO e internacionalización de la página de producto y documentación comercial de alto impacto para la plataforma SaaS **CSCloud FinOps** en `/[locale]/finops/plataforma`.

## Arquitectura de Enrutamiento y Conexión
1. **Ruta Semántica Oficial:**
   - Español (`es`): `/finops/plataforma`
   - Inglés (`en`): `/en/finops/plataforma`
   - Portugués (`pt-BR`): `/pt-BR/finops/plataforma`
2. **Punto de Entrada en `/finops`:**
   - La página de servicios `/finops` debe incluir un bloque de alto impacto (Hero Teaser o sección dedicada) que enlace hacia `/finops/plataforma`, diferenciando claramente el "Servicio de Consultoría FinOps" de la "Plataforma SaaS FinOps Autoservicio".
3. **Conversión y Enlaces Externos:**
   - **CTA Principal ("Agendar Demo"):** En lugar de llevar a una demo autogestionada sin captura, debe llevar directamente al formulario de contacto (`#contacto`), indicando explícitamente el origen de la consulta (`origen="Agendar Demo - Plataforma FinOps SaaS"` o parámetro de seguimiento) y precargando un mensaje sugerido.
   - **CTA Secundario ("Iniciar sesión"):** Debe apuntar a la URL de acceso a la plataforma: `https://finops.cscloudsolutions.com.ar/es?utm_source=cscloudsolutions&utm_medium=hero_demo&utm_campaign=finops_platform`.
4. **Sitemap:**
   - La ruta `/finops/plataforma` debe registrarse en `src/app/sitemap.ts` con prioridad `0.9` y `changeFrequency: 'weekly'`.

## Estructura de Secciones y Experiencia de Usuario (Inspirada en CloudHealth & Manuales FinOps)
1. **Sub-Header Flotante / Navegación Rápida:** Enlaces ancla a secciones clave (Visibilidad, Optimización, Gobernanza, Copilot IA, Comparativa, FAQ) y botón "Agendar Demo" hacia `#contacto`.
2. **Hero de Alta Conversión:**
   - Título H1 optimizado para intención de búsqueda.
   - Párrafo de definición directa GEO (40-60 palabras).
   - Botón principal: "Agendar Demo" con scroll hacia `#contacto`.
   - Botón secundario: "Iniciar sesión" hacia `https://finops.cscloudsolutions.com.ar/es?utm_source=cscloudsolutions&utm_medium=hero_demo&utm_campaign=finops_platform`.
   - Mockup visual glassmorphism del WhiteBoard Ejecutivo.
   - Badges de confianza: Microsoft Entra ID SSO, FOCUS 1.1, Azure Lighthouse, 100% Read-Only.
3. **Pilar 1: Visibilidad de Facturación & Perspectives:**
   - H2 estructurado como pregunta GEO (*¿Cómo obtener visibilidad total del gasto en Azure y asignar costos por equipo?*).
   - Bloque de respuesta concisa (AEO).
   - Detalle de funcionalidades extraídas del manual (Whiteboard MTD/30D/90D, Perspectives lógicas sin re-etiquetar, Cost Groups, Leaderboard de equipos y margen bruto COGS/OpEx).
   - Mockup de captura de pantalla.
4. **Pilar 2: Optimización Activa y Limpieza de Recursos Zombis:**
   - H2 estructurado para GEO (*¿Cómo eliminar recursos huérfanos y reducir la factura cloud con Rightsizing?*).
   - Motor Omni-Scan (25 tipos de recursos zombis), Rightsizing con telemetría real (CPU/RAM/IOPS), optimización de bases de datos (Cosmos DB RU/s, SQL), gestión de reservas (RIs) y Savings Plans con ESR y alertas 90/60/30 días.
   - Mockup de captura de pantalla.
5. **Pilar 3: Gobernanza Automatizada y Shift-Left FinOps:**
   - H2 estructurado para GEO (*¿Cómo prevenir sobrecostos en la nube antes del despliegue en producción?*).
   - Shift-Left FinOps para Pull Requests (Terraform, OpenTofu, Bicep en GitHub, Azure DevOps, GitLab con Budget Gates), Smart Shutdown de VMs con evaluación de CPU, valores de tags no conformes corregidos con IA, alertas de fin de soporte (AKS, PostgreSQL, MySQL).
   - Mockup de captura de pantalla.
6. **Pilar 4: FinOps Copilot (IA Conversacional):**
   - H2 estructurado para GEO (*¿Cómo automatizar el análisis financiero y la detección de anomalías cloud con IA?*).
   - Asistente continuo, explicación de anomalías con causa raíz (medidor, consumo vs precio), resúmenes ejecutivos instantáneos por pantalla.
   - Mockup de captura de pantalla.
7. **Matriz Comparativa de Valor (CloudHealth / Herramientas Tradicionales vs. CSCloud FinOps):**
   - Comparación transparente de Onboarding (minutos vs meses), Precios (fijos vs % de gasto), Remediación (1-clic con 4-ojos vs ticketing) y Soporte regional.
8. **Sección GEO / AEO: Preguntas Frecuentes (FAQ):**
   - Preguntas reales basadas en dudas documentadas en el manual de usuario (conexión Entra ID, permisos de sólo lectura, complementariedad con Azure Cost Management, modo demo, estándar FOCUS, tiempo de despliegue).
   - Inyección de Schema `FAQPage`.
9. **Banner de Conversión Final:**
   - CTAs hacia `https://finops.cscloudsolutions.com.ar` y enlace de soporte/contacto.

## Estándares de SEO y GEO (Generative Engine Optimization)
- **JSON-LD Schema Combinado:**
  - `SoftwareApplication`: Categoría `BusinessApplication`, `operatingSystem: "Web"`, url canónica, descripción y proveedor.
  - `FAQPage`: Estructura `mainEntity` con preguntas y respuestas exactas para indexación de fragmentos destacados y consumo por LLMs.
- **Metadatos completos:**
  - `title`, `description`, `keywords` de alta intención en ES, EN y PT-BR.
  - `canonical` localizado y enlaces `hreflang` cruzados.
  - OpenGraph y Twitter Cards con imágenes oficiales del SaaS.
- **Optimización de Imágenes:**
  - Uso de `next/image` con dimensiones explícitas, `priority` en el Hero, y atributos `alt` descriptivos y ricos en keywords.

## Casos Borde y Aprendizajes (Memoria Viva)
- **Formato y Nomenclatura de Activos Gráficos:** Las capturas de pantalla del SaaS en `public/images/finops/` se gestionan en formato `.png` de alta resolución.
- **Módulo de Bases de Datos:** Utiliza el activo `finops-azure-databases-mysql-cost.png`, enfocado en la supervisión de costos, IOPS, cómputo y reservas en Azure Database for MySQL Flexible Server y motores relacionales.
- **Módulo de Contenedores:** Utiliza el activo `finops-azure-contenedores-cost.png` (sustituye a kubernetes genérico), enfocado en la visibilidad integral de costos en clústeres de contenedores y servicios de cómputo en contenedores de Azure.
- **Consistencia en i18n con next-intl:** Todas las cadenas de texto deben residir en `messages/{es,en,pt-BR}.json` bajo el namespace `pages.finopsPlatform` y `pages.finops`. No dejar textos en duro en los componentes TSX.
- **Política de Acceso al Modo Demo:** No se ofrece acceso directo público o credenciales autogestionadas al modo demo. Toda exploración de la plataforma con datos simulados se realiza exclusivamente mediante demostración guiada y agendamiento previo con un especialista FinOps a través del formulario de contacto. Las FAQs y botones en `/finops` y `/finops/plataforma` deben alinearse estrictamente a este principio.
- **Preservación de Layout Global:** La nueva ruta en `src/app/[locale]/finops/plataforma/page.tsx` hereda automáticamente `Header`, `Footer`, `CookieBanner` y `FinOpsPopup` a través de `LocaleLayout`. No duplicar elementos de navegación global dentro de la página.
- **Ruta Espejo `/finops/guia` para Prevención de 404:** Debido a que usuarios y motores buscan indistintamente la guía o la plataforma, se mantiene la ruta `src/app/[locale]/finops/guia/page.tsx` como renderizador nativo con `canonical` hacia `/finops/plataforma`. Esto evita errores 404 y previene penalizaciones por contenido duplicado.
- **Directivas `LLMs-Txt` en `robots.txt` y `sitemap.xml`:** Nota: No crear simultáneamente `public/robots.txt` y `src/app/robots.ts`, porque Next.js genera un error 500 de archivo en conflicto. En su lugar, inyectar `# AI Crawlers Context` y `LLMs-Txt: https://cscloudsolutions.com.ar/llms.txt` dentro de la propiedad `sitemap` en `src/app/robots.ts` e incluir los endpoints de `llms.txt` y `llms-full.txt` en `src/app/sitemap.ts`.
- **Eliminación de Etiquetas Metadato AEO / GEO en la UI:** No mostrar títulos ni etiquetas técnicas internas como "Respuesta Directa (AEO):" o "Resumen Ejecutivo / Definición FinOps:". El contenido explicativo se presenta en cajas estilizadas limpias directamente, sin etiquetas de metadatos que degraden la lectura del usuario final en ningún idioma.
- **Visualización Interactiva de Imágenes en Primer Plano (Lightbox / Modal):** Todas las capturas de pantalla de la plataforma en la página deben permitir interacción por clic para abrirse al frente (`z-[150]`) en un modal/lightbox accesible con backdrop-blur, bloqueo de scroll en el body, cierre con tecla Escape y botón de cerrar.

