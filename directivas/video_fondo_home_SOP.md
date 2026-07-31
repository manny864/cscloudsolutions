# SOP: Video de Fondo Interactivo en Hero Section (Carga Retardada)

## Objetivo
Definir el procedimiento estándar para integrar el video `CSCS-Interactivo.mp4` como fondo en la primera sección (Hero) de la página principal (Home), garantizando carga retardada (lazy loading), integración estética perfecta con el tema visual de la marca y óptimo rendimiento (Core Web Vitals).

## Archivos Involucrados
- Video de origen: `/public/videos/CSCS-Interactivo.mp4`
- Componente principal: `src/components/Hero.tsx`

## Requisitos Térmicos y Estratégicos

### 1. Carga Retardada (Lazy Loading / Deferred Loading)
- No sobrecargar el Render Inicial ni bloquear el LCP/FCP.
- Utilizar `useEffect` con `requestIdleCallback` o `setTimeout` diferido para asignar el `src` del video tras la interacción inicial / carga de la página.
- Mantener `preload="none"`, `muted`, `loop`, `playsInline`, `autoPlay`.
- Manejar degradación suave con animación de entrada (`opacity` transition) cuando el video empiece a reproducirse (`onLoadedData` / `onPlay`).

### 2. Adaptación de Diseño y Accesibilidad
- Posicionamiento: `absolute inset-0 w-full h-full object-cover pointer-events-none`.
- Capas de superposición (Overlays):
  - Capa de sombra/tinta oscura con la paleta principal (`var(--navy)`) con opacidad equilibrada (~60%-75%) y degradado para asegurar la legibilidad absoluta de todos los textos, insignias y tarjetas de auditoría.
- Accesibilidad y Rendimiento:
  - Respetar `prefers-reduced-motion` mediante CSS/JS.
  - Atributos `aria-hidden="true"`, `tabIndex={-1}`, `disablePictureInPicture`.

## Pasos de Ejecución
1. Actualizar `Hero.tsx` para incluir el estado de carga y montaje del video con diferimiento.
2. Aplicar superposición de gradiente y filtros visuales que coordinen con los orbes (`BackgroundOrbs`) y colores corporativos.
3. Verificar visualmente y por consolas que no existan errores de reproducibilidad o bloqueos de red en el inicio.

## Casos Borde y Aprendizajes
- **Navegadores móviles / Ahorro de batería:** Algunos móviles bloquean la reproducción automática de video si no está explícitamente en `muted` o si la batería está baja. Usar `playsInline` y fallback limpio de fondo azul marino original (`bg-[color:var(--navy)]`).
- **Opacidad:** Un video sin overlay adecuado destruye la legibilidad del texto blanco. El overlay gradiente navy asegura alto contraste WCAG AAA.
