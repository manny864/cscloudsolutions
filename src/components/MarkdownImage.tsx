'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function MarkdownImage({ src, alt, isEven }: { src: string, alt: string, isEven: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Inline Image within Markdown */}
      <span 
        className={`block md:inline-block w-full md:w-[380px] mb-8 cursor-pointer transition-transform hover:scale-[1.02] ${isEven ? 'md:float-right md:ml-8' : 'md:float-left md:mr-8'}`}
        onClick={() => setIsOpen(true)}
      >
        <span className="block w-full rounded-2xl overflow-hidden shadow-lg border border-[color:var(--gray-100)] bg-gray-50">
          <Image 
            src={src} 
            alt={alt} 
            width={600}
            height={400}
            className="w-full h-auto object-contain"
          />
        </span>
        {alt && (
          <span className="block mt-2 text-center text-xs text-gray-500 italic">
            {alt}
          </span>
        )}
      </span>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative max-w-6xl w-full max-h-[90vh] flex justify-center">
              <button 
                className="absolute -top-12 right-0 text-white hover:text-[color:var(--cyan)] transition-colors p-2"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setIsOpen(false); 
                }}
              >
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
              
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
              >
                <Image 
                  src={src} 
                  alt={alt} 
                  width={1600}
                  height={1200}
                  className="object-contain max-h-[85vh] w-auto rounded-xl shadow-2xl"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}