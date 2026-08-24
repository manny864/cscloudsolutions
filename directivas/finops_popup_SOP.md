# SOP: Actualización del Popup de FinOps (Alineado con Planes FinOps)

## Objetivo
Actualizar y sincronizar el componente `FinOpsPopup.tsx` y los archivos de traducciones (`messages/es.json`, `messages/en.json`, `messages/pt-BR.json`) para reflejar con exactitud la estructura de tiers y capacidades de la plataforma CSCloud FinOps (`https://finops.cscloudsolutions.com.ar`), omitiendo precios y destacando el valor funcional de cada plan.

## Archivos Involucrados
- Componente: `src/components/FinOpsPopup.tsx`
- Traducciones en Español: `messages/es.json`
- Traducciones en Inglés: `messages/en.json`
- Traducciones en Portugués: `messages/pt-BR.json`

## Definición de Planes Oficiales (FinOps)
A diferencia de versiones anteriores con 4 tiers, la plataforma oficial maneja 3 planes principales:

1. **Professional (Recomendado / 7-Day Trial)**
   - Enfoque: Para empresas medianas que necesitan entender tendencias, inventario zombie, asesor Azure y reportar.
   - Límite: Hasta 2 suscripciones Azure, hasta 3 usuarios.
   - Capacidades clave: WhiteBoard ejecutivo, historial de facturación, presupuestos, consumo real, madurez FinOps, inventario costo cero, alertas por canales (Slack/Teams/Email), MFA, FinOps Copilot.

2. **Business (Más Popular)**
   - Enfoque: Automatización básica, remediación activa y múltiples entornos para empresas en crecimiento.
   - Límite: Hasta 3 suscripciones Azure, hasta 5 usuarios.
   - Capacidades clave: Todo lo de Pro + Cost Groups por unidad de negocio, remediación de recursos y red zombies, encendido/apagado automático (schedules), escenarios What-If, alta disponibilidad VM, delegaciones cross-account.

3. **Enterprise (Control Total)**
   - Enfoque: Para corporaciones con topologías complejas (Hub & Spoke), CSP Partners y gobernanza as Code.
   - Límite: Suscripciones Azure y usuarios ilimitados.
   - Capacidades clave: Todo lo de Business + Budget por Centro de Costos, Rightsizing y Rate Optimization, Control AKS & Chargeback, Unit Economics, Detección de Anomalías Z-Score, Policies as Code, Azure Lighthouse, Power BI FOCUS/Invoicing, SSO SAML, SLA dedicado 4h.

## Reglas de Implementación
1. **Sin Precios:** No incluir montos monetarios ($/mes o $/año) en el popup según requerimiento expreso.
2. **Estructura Grid Responsiva:** Adaptar el contenedor a 3 columnas en desktop (`md:grid-cols-3`) y 1 columna en mobile.
3. **Internacionalización Completa:** Sincronizar las claves en `es.json`, `en.json` y `pt-BR.json`.
4. **Enlace Inteligente por Idioma:** El CTA debe dirigir a `https://finops.cscloudsolutions.com.ar/{locale}/upgrade` o a la demo según el idioma activo del usuario.
5. **Persistencia y Accesibilidad:** Mantener el retraso de 7 segundos en la primera visita y el guardado en `localStorage` ('finops-popup-shown'), con botón de cierre accesible y cierre con tecla Escape / backdrop.

## Casos Borde y Aprendizajes
- **Longitud de listas:** Cada plan cuenta con más de 20 características detalladas. Para mantener una interfaz limpia y usable en pantallas de laptops y móviles, se presentan las características principales con una lista estilizada y scroll interno limpio o agrupación visual armoniosa sin desbordar el viewport modal (`max-h-[90vh]`).
