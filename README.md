# CSCloudSolutions — Next.js + Tailwind (bilingüe)

Proyecto listo para desplegar con Next.js (App Router), Tailwind CSS, next-intl (ES/EN) y Server Actions.

## Requisitos
- Node.js 20+.

## Desarrollo
1) Instalar dependencias:

```bash
npm install
```

2) Copiar variables de entorno:

```bash
cp .env.example .env.local
```

3) Correr en local:

```bash
npm run dev
```

## Build
```bash
npm run build
npm run start
```

## Despliegue en Hostinger (GitHub)
- En Hostinger, crear una app Node.js y vincular el repo.
- Comandos recomendados:
  - Install: `npm ci`
  - Build: `npm run build`
  - Start: `npm run start -- -p $PORT`

## Contenido
- Rutas bilingües:
  - `/` (ES) y `/en` (EN)
  - Servicios: `/microsoft-365`, `/azure`, `/seguridad`, `/modern-workplace`, `/power-platform`, `/soporte`

## Notas
- La verificación reCAPTCHA y el envío a webhook se hacen del lado del servidor (Server Action).
