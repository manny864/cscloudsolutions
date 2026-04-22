import React from 'react';

export function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Orbe 1: Cyan Vibrante (Arriba Izquierda) - Opacidad subida al 40% */}
      <div 
        className="absolute -top-[10%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#00AEEF] opacity-40 blur-[80px] animate-[blob_7s_infinite_alternate]"
      />

      {/* Orbe 2: Azul Profundo (Arriba Derecha) - Opacidad subida al 50% */}
      <div 
        className="absolute top-[10%] -right-[5%] w-[400px] h-[400px] rounded-full bg-[#0095D0] opacity-50 blur-[80px] animate-[blob_8s_infinite_alternate-reverse]"
      />

      {/* Orbe 3: Celeste claro (Abajo Centro) - Opacidad subida al 30% */}
      <div 
        className="absolute -bottom-[10%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#33C3FF] opacity-30 blur-[100px] animate-[blob_9s_infinite_alternate]"
      />

      {/* Definimos los Keyframes directamente en línea */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -50px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}} />
    </div>
  );
}