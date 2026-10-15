# SOP: Referencia Técnica y Memoria Competitiva — CloudHealth by Broadcom

## Objetivo
Mantener en la memoria persistente del agente y del repositorio el análisis funcional, técnico y comercial de la solución **CloudHealth by Broadcom** (`https://www.broadcom.com/products/software/finops/cloudhealth`), con el fin de utilizarlo como base de benchmark competitivo, diseño de funcionalidades en la plataforma CSCloud FinOps (`finops.cscloudsolutions.com.ar`) y argumentarios de venta/migración para clientes corporativos y MSPs.

## Contexto y Antecedentes
- **Producto:** CloudHealth by Broadcom (anteriormente CloudHealth de VMware).
- **Rol en el mercado:** Plataforma FinOps de referencia enterprise a nivel global para gestión de costos multi-cloud (AWS, Azure, GCP, OCI, VMware vSphere y Kubernetes).
- **Situación post-adquisición Broadcom:** Altas barreras de entrada por contratos mínimos elevados, migración forzada de contratos de licenciamiento y lentitud de soporte para clientes de mediana escala, abriendo una oportunidad de captura de cuota de mercado para CSCloud FinOps en LATAM y empresas medianas/corporativas.

## Capacidades y Arquitectura de CloudHealth

1. **Visibilidad y Agrupación (Inform):**
   - *Perspectives:* Motor de agrupación lógica que reclasifica activos y costos por negocio, unidad, aplicación o centro de costos sin alterar la jerarquía de cuentas subyacente.
   - *FOCUS 1.1 y FlexReports:* Reportes normalizados de facturación multi-cloud y exportaciones programadas.
   - *Cost Allocation & Showback/Chargeback:* Redistribución de costos compartidos (networking, storage común, licencias base).

2. **Optimización y Detección de Desperdicio (Optimize):**
   - *Rightsizing:* Recomendaciones basadas en telemetría de CPU, RAM e IOPS para instancias y discos.
   - *Zombie Resources:* Detección de volúmenes no conectados, snapshots huérfanos, IPs no asociadas y balanceadores sin targets.
   - *Gestión de Compromisos:* Modelado y monitoreo de Reservas (Azure Reservations, AWS RIs) y Savings Plans, evaluando tasas de cobertura y utilización.
   - *Kubernetes Cost Allocation:* Desglose a nivel de namespace, pod y labels para clústeres de contenedores.

3. **Gobernanza y Automatización (Operate):**
   - *Policy Engine:* Disparadores automáticos por superación de presupuestos o anomalías de consumo.
   - *Acciones Automatizadas:* Encendido/apagado programado de entornos y flujos de aprobación.
   - *Partner / MSP Edition:* Arquitectura multi-tenant para revendedores con aplicación de márgenes (markups) e invoicing personalizado.

## Matriz de Diferenciación frente a CSCloud FinOps

| Capacidad / Factor | CloudHealth by Broadcom | CSCloud FinOps |
| :--- | :--- | :--- |
| **Tiempo de Valor (Time-to-Value)** | Semanas / Meses (onboarding complejo) | **Minutos** (Onboarding nativo vía Azure Lighthouse / Service Principal) |
| **UX & Usabilidad** | Consola analítica densa, curva empinada | **WhiteBoard ejecutivo**, visualización Bento Grid y fluidez interactiva |
| **Inteligencia Artificial** | Detección estadística tradicional | **FinOps Copilot** con IA generativa para explicabilidad y consultas en lenguaje natural |
| **Modelo de Precios** | % sobre el gasto cloud (1%-3%) o contratos mínimos de $50k-$100k+ USD/año | **Tiers predecibles (Professional, Business, Enterprise)** sin comisiones porcentuales sobre el gasto |
| **Enfoque de Mercado** | Global Fortune 500 | **Empresas medianas/grandes y CSPs en LATAM**, con soporte y consultoría en español/portugués |

## Casos Borde y Aprendizajes (Memoria Viva)
- **Extracción de contenido en SPAs protegidas:** El sitio de Broadcom es una aplicación React renderizada en el cliente y protegida por Cloudflare challenge. Las herramientas estáticas (`read_url_content`) solo recuperan el contenedor vacío `<div id="root"></div>`. Toda navegación o auditoría web posterior sobre broadcom.com debe realizarse mediante subagentes de navegador con ejecución completa de JavaScript (`browser_subagent`).
- **Enfoque de venta contra CloudHealth:** No competir en volumen bruto de integraciones exóticas de centros de datos on-premise antiguos, sino en **rapidez de implementación, coste total de propiedad (TCO) drásticamente inferior, experiencia de usuario y remediación automatizada con un clic**.
- **Compatibilidad de datos:** Garantizar que las exportaciones de CSCloud FinOps respeten y expandan el estándar **FOCUS 1.1**, facilitando que prospectos que migren desde CloudHealth puedan reutilizar sus dashboards analíticos y reportes en Power BI sin fricción.
