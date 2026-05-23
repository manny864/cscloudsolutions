import React from 'react';

export function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Orbe 1: Cyan Vibrante (Arriba Izquierda) - Opacidad subida al 40% */}
      <div 
        className="absolute -top-[10%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#00AEEF] opacity-40 blur-[80px] animate-blob-7 will-change-transform transform-gpu"
      />

      {/* Orbe 2: Azul Profundo (Arriba Derecha) - Opacidad subida al 50% */}
      <div 
        className="absolute top-[10%] -right-[5%] w-[400px] h-[400px] rounded-full bg-[#0095D0] opacity-50 blur-[80px] animate-blob-8 will-change-transform transform-gpu"
      />

      {/* Orbe 3: Celeste claro (Abajo Centro) - Opacidad subida al 30% */}
      <div 
        className="absolute -bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#33C3FF] opacity-30 blur-[100px] animate-blob-9 will-change-transform transform-gpu"
      />

      {/* Keyframes moved to globals.css */}
    </div>
  );
}