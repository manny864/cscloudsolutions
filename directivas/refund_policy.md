# Política de Reembolso SOP

## Objetivo
Añadir la página de Política de Reembolso al proyecto Next.js en múltiples idiomas, actualizando el Footer.

## Restricciones
- Deben actualizarse los diccionarios `messages/es.json` y `messages/en.json`.
- Debe crearse la ruta `src/app/[locale]/politica-de-reembolso/page.tsx`.
- Debe inyectarse el link en `src/components/Footer.tsx`.
- Debe dejarse un enlace `mailto:` a mchavez@cscloudsolutions.com.ar.
- Nota: No hacer uso de `unstable_setRequestLocale`, porque causa el error `is not a function`. En su lugar, hacer uso de `setRequestLocale` de `next-intl/server`.
