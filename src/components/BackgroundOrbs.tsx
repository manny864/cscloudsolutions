import React from 'react';

export function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orbe 1: Superior izquierdo (Cyan) */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#00AEEF] opacity-20 mix-blend-screen filter blur-[100px] animate-blob"
      />

      {/* Orbe 2: Superior derecho (Azul más profundo), con un retraso en la animación */}
      <div 
        className="absolute top-[10%] right-[-5%] w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#0095D0] opacity-20 mix-blend-screen filter blur-[100px] animate-blob"
        style={{ animationDelay: "2s" }}
      />

      {/* Orbe 3: Inferior centro (Mezcla suave), con otro retraso */}
      <div 
        className="absolute -bottom-8 left-[20%] w-72 h-72 sm:w-[500px] sm:h-[500px] rounded-full bg-[#33C3FF] opacity-10 mix-blend-screen filter blur-[120px] animate-blob"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}