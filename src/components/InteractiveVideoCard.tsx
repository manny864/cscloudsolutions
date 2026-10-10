'use client';

import { useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

type Props = { id?: string; title: string; description: string; videoSrc: string; posterSrc: string; badge: string; href: string };

export function InteractiveVideoCard({ id, title, description, videoSrc, posterSrc, badge, href }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHover, setIsHover] = useState(false);
  const cardId = id || `bento-card-${href.replace(/^\//, '')}`;

  return (
    <Link
      id={cardId}
      href={href}
      onMouseEnter={() => { setIsHover(true); videoRef.current?.play().catch(() => {}) }}
      onMouseLeave={() => { setIsHover(false); videoRef.current?.pause() }}
      onTouchStart={() => { setIsHover(true); videoRef.current?.play().catch(() => {}) }}
      className="group relative flex h-[420px] w-full flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--navy-mid)] transition-all duration-500 lg:hover:-translate-y-1 hover:border-[color:var(--cyan)] hover:shadow-[0_20px_40px_rgba(0,174,239,0.2)]"
    >
      <Image 
        src={posterSrc} 
        alt={title}
        fill
        className={`object-cover transition-opacity duration-700 ${isHover ? 'opacity-0' : 'opacity-50'}`}
        quality={60}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <video 
        ref={videoRef} 
        src={videoSrc} 
        muted 
        loop 
        playsInline
        preload="none"       
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isHover ? 'opacity-40' : 'opacity-0'}`} 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)] via-[color:var(--navy)]/90 to-transparent" />
      
      <div className="relative z-10 p-8">
        <div className="mb-4 w-max rounded-full border border-[color:rgba(0,174,239,0.3)] bg-[color:rgba(0,174,239,0.1)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white">
          {badge}
        </div>
        
        <h3 className="font-[family:var(--font-heading)] text-2xl font-extrabold text-white transition-transform duration-500 lg:group-hover:-translate-y-2">
          {title}
        </h3>
        
        <div className="grid grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0 transition-all duration-500 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100">
          <p className="overflow-hidden pt-3 text-sm leading-relaxed text-white/80">{description}</p>
        </div>
        
        <div className="absolute bottom-8 right-8 flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--cyan)] text-[color:var(--navy)] opacity-100 lg:opacity-0 transition-all duration-500 lg:group-hover:rotate-[-45deg] lg:group-hover:opacity-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </Link>
  );
}