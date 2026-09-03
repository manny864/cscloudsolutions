# SOP: Diseño e Implementación de Página 404 Corporativa (Not Found)

## Objetivo
Establecer el procedimiento estándar para el diseño, estructura e integración de la página de error 404 (Página No Encontrada) de CSCloudSolutions, garantizando el uso consistente del logotipo corporativo, la paleta de colores azules corporativa (Navy profundo, Cyan institucional, Cyan Light y efectos de iluminación), soporte multilingüe completo (español, inglés y portugués) y una experiencia de usuario orientada a guiar al visitante hacia las secciones clave de la plataforma.

## Archivos Involucrados
- Componente de ruta localizada: `src/app/[locale]/not-found.tsx`
- Componente de fallback global: `src/app/not-found.tsx`
- Diccionario de traducciones en Español: `messages/es.json`
- Diccionario de traducciones en Inglés: `messages/en.json`
- Diccionario de traducciones en Portugués: `messages/pt-BR.json`
- Activos de marca: `/public/images/LogoCS.png` y `/public/images/CSCloudSolutionsText.png`

## Requisitos de Diseño y Estética
1. **Identidad Visual Corporativa:**
   - Incorporar de manera destacada el isotipo empresarial oficial (`LogoCS.png`) y el logotipo de la marca.
   - Enmarcar el logotipo dentro de una tarjeta o halo luminoso de tecnología cloud con micro-animación y reflejo suave.
2. **Paleta de Colores Azules:**
   - Fondo principal: Navy profundo institucional (`#0E1A2B` y `#16273F`).
   - Acentos primarios y luminiscencia: Cyan corporativo (`#004F8A`), Cyan brillante (`#00AEEF` / `#1F6FA8`) y destellos celestes translúcidos.
   - Textos: Blanco de alto contraste (`#FFFFFF`) para titulares y blanco translúcido (`text-white/80` y `text-white/60`) para explicaciones y metadatos, superando el estándar WCAG AA/AAA.
3. **Composición y Ornatos Visuales:**
   - Orbes de luz atmosféricos en tonos azules y cyan (`animate-blob`) para dar profundidad y dinamismo sin comprometer el rendimiento.
   - Patrón de cuadrícula tecnológica sutil (`grid pattern`) en el fondo para evocar infraestructura cloud.
   - Tipografía monumental para el número "404" con degradado cromático metálico/azul.
4. **Navegación de Rescate (UX de Recuperación):**
   - Mensaje empático y profesional que transmita que los servicios continúan 100% operativos.
   - Botón de acción principal: "Volver a la página principal" con icono y efecto hover luminoso.
   - Botón de acción secundaria: "Volver a la página anterior" (historial del navegador).
   - Acceso rápido a soluciones estratégicas: Bento o cuadrícula con enlaces a Microsoft 365, Azure Cloud, Ciberseguridad y FinOps.
5. **Internacionalización y Accesibilidad:**
   - Todas las etiquetas, títulos y descripciones deben resolverse vía `next-intl` bajo la clave `notFound`.
   - Etiquetas ARIA semánticas y navegación completa por teclado.

## Pasos de Ejecución
1. Actualizar los archivos de internacionalización (`messages/es.json`, `messages/en.json`, `messages/pt-BR.json`) incorporando el bloque `notFound`.
2. Crear/actualizar el componente `src/app/[locale]/not-found.tsx` con el diseño completo, interactivo y responsivo.
3. Crear el fallback global `src/app/not-found.tsx` con soporte de lenguaje predeterminado para peticiones no enrutadas por el middleware.
4. Ejecutar validación de compilación con `npm run build` para asegurar compatibilidad de tipos y SSG.
5. Probar visualmente las rutas de error 404 mediante navegador o verificación de servidor de desarrollo.

## Casos Borde y Aprendizajes
- **Nota: No omitir la ruta comodín `src/app/[locale]/[...rest]/page.tsx`, porque de lo contrario Next.js no invoca `notFound()` para URLs inexistentes y muestra la página 404 predeterminada en blanco y negro de Next.js (`__next_builtin__not-found.js`). En su lugar, crear `src/app/[locale]/[...rest]/page.tsx` que ejecute `notFound()` inmediatamente para delegar el renderizado al componente corporativo `src/app/[locale]/not-found.tsx`.**
- **Nota: No colocar `src/app/not-found.tsx` en la raíz del proyecto cuando la aplicación utiliza App Router localizado (`src/app/[locale]/layout.tsx` con etiquetas `<html>` y `<body>`), porque causa el error:**
  `not-found.tsx doesn't have a root layout. To fix this error, make sure every page has a root layout.`
  **En su lugar, implementar exclusivamente `src/app/[locale]/not-found.tsx` asistido por la ruta comodín `[...rest]`.** Dado que el `src/middleware.ts` enruta automáticamente todas las solicitudes a través del prefijo de idioma correspondiente (`es`, `en`, `pt-BR`), dicho componente se renderiza dentro del layout principal con acceso a Header, Footer y proveedores de internacionalización sin conflictos de jerarquía DOM.
- **Acción 'Volver atrás' sin historial previo:** Si el usuario accede directamente a una URL rota desde un enlace externo, la función de retroceso de ventana debe contar con un fallback seguro que redirija al inicio (`/`).
- **Contraste de texto sobre fondos degradados:** Todo texto explicativo debe utilizar capas de opacidad controladas (`text-white/80` o superior) para no perder legibilidad ante los orbes de luz dinámicos.
