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
├── tailwind.config.mjs     # Configuración de estilos y temas
└── tsconfig.json           # Configuración estricta de TypeScript
