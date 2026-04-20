'use client';

import { useRef, useState } from 'react';
import { Link } from '@/i18n/routing'; // Usamos tu enrutador de idiomas

type InteractiveVideoCardProps = {
  title: string;
  description: string;
  videoSrc: string;
  badge: string;
  href: string;
};

export function InteractiveVideoCard({ title, description, videoSrc, badge, href }: InteractiveVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      // El catch evita errores si el navegador bloquea la reproducción rápida
      videoRef.current.play().catch(() => {}); 
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex h-[420px] w-full flex-col justify-end overflow-hidden rounded-3xl border border-[color:rgba(0,174,239,0.15)] bg-[color:var(--navy-mid)] shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--cyan)] hover:shadow-[0_20px_40px_rgba(0,174,239,0.20)]"
    >
      {/* CAPA 1: El Video de Fondo */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          isHovered ? 'opacity-40' : 'opacity-0'
        }`}
      />

      {/* CAPA 2: Gradiente oscuro para asegurar que el texto siempre se lea */}
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)] via-[color:var(--navy)]/80 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

      {/* CAPA 3: Contenido (Textos y Botones) */}
      <div className="relative z-10 p-8">
        
        {/* Badge superior */}
        <div className="mb-4 w-max rounded-full border border-[color:rgba(0,174,239,0.30)] bg-[color:rgba(0,174,239,0.10)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[color:var(--cyan-light)]">
          {badge}
        </div>

        {/* Título */}
        <h3 className="font-[family:var(--font-heading)] text-2xl font-extrabold text-white transition-transform duration-500 group-hover:-translate-y-2">
          {title}
        </h3>

        {/* Descripción oculta que se expande hacia arriba en Hover */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div className="overflow-hidden">
            <p className="pt-3 text-sm leading-relaxed text-white/75">
              {description}
            </p>
          </div>
        </div>

        {/* Flecha animada en la esquina inferior derecha */}
        <div className="absolute bottom-8 right-8 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--cyan)] text-[color:var(--navy)] opacity-0 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:opacity-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>

      </div>
    </Link>
  );
}