# CSCloudSolutions - Cloud & Identity Infrastructure

Bienvenido al repositorio oficial de **CSCloudSolutions**. Esta plataforma es una solución web de alto rendimiento construida con las tecnologías más modernas de la industria, diseñada para proyectar nuestra experiencia en arquitectura Cloud, seguridad y soluciones Microsoft.

## 🚀 Propósito del Proyecto
Este repositorio contiene la implementación del sitio corporativo de CSCloudSolutions. El objetivo es proporcionar una experiencia de usuario fluida, bilingüe y optimizada para motores de búsqueda (SEO) y sistemas de IA, destacando nuestros servicios en:
- **Azure Infrastructure:** Implementación y migración de cargas de trabajo.
- **Microsoft 365:** Optimización de productividad y Modern Workplace.
- **Seguridad & Identidad:** Gestión avanzada de Entra ID, MFA y cumplimiento.
- **Power Platform:** Automatización de procesos de negocio.

---

## 🛠️ Stack Tecnológico
Para garantizar escalabilidad, velocidad y accesibilidad, hemos seleccionado las mejores herramientas:

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router & React 19).
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para un desarrollo robusto y tipado.
- **Estilizado:** [Tailwind CSS v4](https://tailwindcss.com/) para interfaces modernas y responsivas.
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/) para micro-interacciones y transiciones fluidas.
- **i18n:** [next-intl](https://next-intl-docs.vercel.app/) para gestión nativa de internacionalización (ES/EN).
- **Validación:** [Zod](https://zod.dev/) y [React Hook Form](https://react-hook-form.com/).
- **Servicios:** Microsoft Graph API (envío de correos) y reCAPTCHA v3.

---

## 📂 Estructura del Proyecto

La implementación sigue una arquitectura modular enfocada en la separación de responsabilidades y las mejores prácticas del App Router:

```text
cscloudsolutions/
├── messages/               # Archivos de traducción JSON (es.json, en.json)
├── public/                 # Assets estáticos (imágenes, logos, favicons)
├── src/
│   ├── app/                # Lógica de rutas y layouts (App Router)
│   │   ├── [locale]/       # Estructura de rutas internacionalizadas
│   │   ├── _actions/       # Server Actions para lógica de servidor (formularios)
│   │   └── fonts.ts        # Configuración de Google Fonts (Bricolage, Inter)
│   ├── components/         # Componentes de UI reutilizables
│   │   ├── ui/             # Componentes base (Botones, Inputs)
│   │   ├── Hero.tsx        # Sección principal con animaciones
│   │   ├── ServiceBento.tsx# Grid interactivo de servicios
│   │   └── ContactForm.tsx # Formulario con Server Actions
│   ├── i18n/               # Configuración de routing y middleware de idiomas
│   ├── lib/                # Utilidades, configuración de SEO y helpers
│   └── types/              # Definiciones de tipos globales de TypeScript
├── next.config.mjs         # Configuración de Next.js (con optimizaciones de seguridad y Sentry)
├── tailwind.config.mjs     # Configuración de estilos y temas
└── tsconfig.json           # Configuración estricta de TypeScript

---

## 💻 Desarrollo Local

Para correr la aplicación de forma local, sigue estos pasos:

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Corre el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Realiza la compilación de producción para validar:
   ```bash
   npm run build
   ```

---

## ⚡ Mejoras y Optimizaciones Recientes

Recientemente hemos implementado una serie de mejoras técnicas en el proyecto enfocadas en rendimiento, privacidad y SEO:

- **Google Consent Mode v2**: Implementación completa y nativa. Los estados por defecto se inicializan antes de que cargue el script de analytics (`beforeInteractive`) y se actualizan dinámicamente (`gtag('consent', 'update', ...)`) en base a la configuración seleccionada por el usuario en el banner de consentimiento de cookies.
- **Carga Diferida de reCAPTCHA**: Decoplada del consentimiento de cookies no esenciales, marcándola como un componente de seguridad esencial. Se carga bajo demanda únicamente en la interacción del usuario (al hacer foco en el formulario de contacto o enviarlo).
- **SEO & Metadatos Dinámicos**: Configuración de `generateMetadata` en todas las páginas estáticas y de legales para traducciones correctas y etiquetas openGraph dinámicas, junto con el ajuste del `metadataBase`.
- **Refactorización a Server Components**: 
  - El componente de **FAQ** fue reescrito de un componente dinámico con estado de React (`useState`) a un Server Component estático puro usando etiquetas nativas de HTML5 `<details>` y `<summary>` con animaciones controladas por Tailwind CSS (`group-open`).
  - El componente **Footer** se convirtió en un Server Component para mejorar la puntuación de PageSpeed y reducir la hidratación JS del lado del cliente.
- **Sentry**: Corrección de variables de entorno del cliente (`NEXT_PUBLIC_SENTRY_DSN`) y encapsulación del bundle a través de `withSentryConfig` en `next.config.mjs`.
- **Deduplicación de Código de Contenidos**: Eliminación del cargador redundante de posts `src/lib/mdx.ts` y consolidación de la lógica de blog/sitemap bajo un único punto de entrada unificado y seguro en `src/lib/blog.ts`.
