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
   - Capacidades clave: WhiteBoard ejecutivo, historial de facturación, presupuestos, consumo real, madurez FinOps, recursos y networking zombies (sin remediación), cumplimiento de etiquetas (sin remediación), exportación FOCUS 1.1, alertas por canales (Slack/Teams/Email), MFA, FinOps Copilot.

2. **Business (Más Popular)**
   - Enfoque: Automatización básica, remediación activa y múltiples entornos para empresas en crecimiento.
   - Límite: Hasta 3 suscripciones Azure, hasta 5 usuarios.
   - Capacidades clave: Todo lo de Pro + Cost Groups por unidad de negocio, análisis de red, remediación de recursos y red zombies, encendido/apagado automático (schedules), alta disponibilidad VM, credenciales por expirar en Entra ID, delegaciones cross-account, reporte ejecutivo y flujos de aprobaciones, soporte 8 h.

3. **Enterprise (Control Total)**
   - Enfoque: Para corporaciones con topologías complejas (Hub & Spoke), CSP Partners y gobernanza as Code.
   - Límite: Suscripciones Azure y usuarios ilimitados.
   - Capacidades clave: Todo lo de Business + Exclusivo Azure Lighthouse Onboarding, Hubs avanzados (Optimización, Analítica, Monitoreo, Seguridad, AI, Integration Services), Escenarios What-If, Inventario Costo Cero, Planes de Ahorro vs Reservas, Scorecard & Ranking, Salud del Tenant, Rightsizing y Rate Optimization, Control AKS & Chargeback, Unit Economics, Detección de Anomalías Z-Score, Policies as Code, Partner CSP Markup, Power BI Templates/FOCUS/Invoicing, SSO SAML, SLA dedicado 4h.

## Reglas de Implementación
1. **Sin Precios:** No incluir montos monetarios ($/mes o $/año) en el popup según requerimiento expreso.
2. **Estructura Grid Responsiva:** Adaptar el contenedor a 3 columnas en desktop (`md:grid-cols-3`) y 1 columna en mobile.
3. **Internacionalización Completa:** Sincronizar todas las claves en `es.json`, `en.json` y `pt-BR.json`, incluyendo el trust badge limpio (`trustBadge`: "Conexión segura con Azure • 100% de gobernanza" / "Secure Azure connection • 100% governance" / "Conexão segura com Azure • 100% de governança"), omitiendo cualquier mención a tarjeta de crédito en el pie de página.
4. **Enlace Inteligente por Idioma:** El CTA debe dirigir a `https://finops.cscloudsolutions.com.ar/{locale}/upgrade` o a la demo según el idioma activo del usuario.
5. **Persistencia y Accesibilidad:** Mantener el retraso en la primera visita y el guardado en `localStorage` ('finops-popup-shown'), con botón de cierre accesible y cierre con tecla Escape / backdrop.
6. **Matriz Comparativa a Pantalla Completa y Reversibilidad:**
   - En las tarjetas del modal, el botón de capacidades ("Ver todas las capacidades ({count})") **no debe desplegar la lista interna verticalmente** (no debe deformar ni alargar la tarjeta con acordeones). Al hacer clic en él, o en el botón superior "Comparar todas las capacidades en pantalla completa", transiciona inmediatamente a la página/matriz a pantalla completa (`FinOpsCapabilitiesTable`) con el estilo sobrio, enterprise y minimalista (estilo Microsoft 365).
   - Dicha matriz agrupa las capacidades por categorías (Límites, Visibilidad, Ahorro/Zombies, Optimización, AKS, Gobernanza, IA, Enterprise y SLAs) con íconos descriptivos y tildes minimalistas `✓` alineados por columna.
   - **Traducción Integral de la Matriz:** Cada una de las 50 filas de capacidades, sus valores de texto condicionales (ej. "Hasta 2", "Ilimitadas", SLAs, "Detección + Remediación"), el encabezado de capacidades, el badge de matriz oficial y los subtítulos deben provenir 100% de los diccionarios i18n (`matrix.*`). En la versión en inglés (`/en`) ningún texto de la matriz debe aparecer en español.
   - **Reversibilidad Mandatoria:** Debe contener un botón visible y accesible de "Revertir a vista de tarjetas" (y botón de cierre) para alternar fluidamente entre la vista resumida de 3 tarjetas y la matriz detallada.

## Casos Borde y Aprendizajes (Memoria Viva)
- **Comportamiento sin acordeón en tarjetas:** Las tarjetas de planes en el modal no deben actuar como desplegables/acordeón. Mantener siempre una vista compacta y uniforme (primeras 8 capacidades). El botón inferior ("Ver todas las capacidades ({count})") debe invocar directamente la matriz comparativa a pantalla completa (`FinOpsCapabilitiesTable`), evitando saltos visuales o tarjetas asimétricas.
- **Pie de página limpio:** Por requerimiento de negocio y diseño, el mensaje "Sin tarjeta de crédito requerida" / "No credit card required" debe permanecer eliminado del pie de página de confianza (`trustBadge`) tanto en el modal como en la tabla completa.
- **Internacionalización sin textos crudos:** La matriz completa `FinOpsCapabilitiesTable` no debe contener textos fijos en español en su JSX ni en su definición de filas. Todo debe resolverse dinámicamente vía `t('matrix.items.*')` y `t('matrix.values.*')` para garantizar paridad lingüística en ES, EN y PT-BR.
- **Alineación Visual con FinOpsProyect:** La página de precios de FinOpsProyect (`PricingPage.tsx`) y el modal `FinOpsPopup.tsx` comparten la misma jerarquía estética:
  - *Professional:* Tarjeta blanca/translúcida, badge azul con `IconAward`, tag verde de 7 días de prueba, tildes cian.
  - *Business:* Tarjeta destacada con borde azul corporativo (`#0054A6`), barra superior con degradado (`#002244` a `#00AEEF`), badge marino con `IconStarFilled`, tildes oscuras y mención al plan base en negrita.
  - *Enterprise:* Tarjeta de lujo oscuro (`from-[#0F172A] to-[#1E293B]`), badge escudo con `IconShieldCheck`, caja destacada para Azure Lighthouse, tildes blancas de alto contraste y botón blanco predominante.
  - Ambas interfaces presentan las primeras 8 capacidades visibles y permiten expandir el listado completo sin alterar el flujo de checkout, MSAL o demo.
- **Master es la página de precios:** Siempre que se añadan o modifiquen viñetas en `/Users/manuelchavez/Documents/FinOpsProyect/src/components/PricingPage.tsx` o `messages/*.json`, el popup (`FinOpsPopup.tsx`) debe actualizarse inmediatamente para reflejar idénticas características.
- **Evitar falsas promesas en Business:** No listar capacidades Enterprise en Business (como CSP Markup o Power BI Templates). Tampoco listar en Business beneficios que Professional ya incluye (como FOCUS 1.1 Export).
- **Módulos restringidos a Enterprise:** Recordar que tras los ajustes de arquitectura, Inventario Costo Cero, Simulador What-If, Alertas avanzadas, Salud del Tenant, Scorecard, Beneficios Híbridos y Planes de Ahorro son exclusivos de Enterprise y no deben aparecer en Professional ni Business.
- **Reversión intuitiva:** El usuario debe poder regresar a la vista de tarjetas sin recargar la página ni perder el estado del popup.


