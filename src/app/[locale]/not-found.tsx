import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFoundPage() {
  // Opcional: Puedes crear llaves en tu es.json para esto, 
  // pero aquí lo dejamos directo para que funcione ya mismo.
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center bg-white px-6 py-24 text-center">
      <div className="relative">
        {/* Efecto visual de fondo (un brillo cyan sutil) */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--cyan)] opacity-10 blur-3xl" />
        
        <h1 className="font-[family:var(--font-heading)] text-[8rem] font-extrabold leading-none tracking-tight text-[color:var(--navy)] md:text-[10rem]">
          404
        </h1>
      </div>
      
      <h2 className="mt-4 font-[family:var(--font-heading)] text-2xl font-extrabold text-[color:var(--gray-800)] sm:text-3xl">
        Página no encontrada
      </h2>
      
      <p className="mt-4 max-w-md text-base leading-relaxed text-[color:var(--gray-600)]">
        Lo sentimos, no pudimos encontrar la página que estás buscando. Es posible que el enlace sea incorrecto o que la página haya sido movida.
      </p>
      
      <div className="mt-10">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center rounded-xl bg-[color:var(--cyan)] px-8 py-4 text-sm font-extrabold text-[color:var(--navy)] shadow-[0_20px_50px_rgba(0,174,239,0.20)] transition hover:-translate-y-0.5 hover:bg-[color:var(--cyan-light)]"
        >
          Volver a la página principal
        </Link>
      </div>
    </div>
  );
}