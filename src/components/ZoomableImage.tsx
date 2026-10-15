'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ZoomableImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
}

export function ZoomableImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = 'w-full h-auto object-cover',
  containerClassName = 'relative w-full overflow-hidden rounded-xl bg-[#0A121E]',
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Keyboard navigation (Escape key to close)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  return (
    <>
      {/* Thumbnail Container */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Ampliar imagen: ${alt}`}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        className={`group relative cursor-zoom-in select-none ${containerClassName}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={`${className} transition-transform duration-300 group-hover:scale-[1.015]`}
        />

        {/* Hover Hint Overlay Badge */}
        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#0A121E]/80 px-2.5 py-1 text-[11px] font-semibold text-white/90 opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
          <svg
            className="h-3.5 w-3.5 text-[color:var(--cyan-light)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
            />
          </svg>
          <span>Ampliar</span>
        </div>
      </div>

      {/* Lightbox / Modal al Frente */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black/85 p-3 sm:p-6 md:p-8 backdrop-blur-md"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            {/* Top Bar with Close Button */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[160]">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 hover:text-[color:var(--cyan)] focus:outline-none focus:ring-2 focus:ring-[color:var(--cyan)]"
                aria-label="Cerrar imagen ampliada"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Image Container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative max-h-[85vh] max-w-[92vw] overflow-hidden rounded-xl border border-white/20 bg-[#0A121E] shadow-[0_25px_80px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                width={width * 1.5 > 1600 ? width * 1.5 : 1600}
                height={height * 1.5 > 1000 ? height * 1.5 : 1000}
                className="max-h-[82vh] w-auto max-w-[92vw] object-contain"
                priority
              />
            </motion.div>

            {/* Caption Pill */}
            {alt && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="mt-3 max-w-2xl px-4 py-1.5 text-center text-xs sm:text-sm text-white/80 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm line-clamp-2"
                onClick={(e) => e.stopPropagation()}
              >
                {alt}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
