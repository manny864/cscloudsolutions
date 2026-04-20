import { Geist, Geist_Mono } from 'next/font/google';

// Usamos Geist para los textos generales del sitio
export const fontBody = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

// Usamos la misma familia Geist (o sus pesos más gruesos) para los títulos
// Mantenemos la variable '--font-heading' para no romper tu diseño actual
export const fontHeading = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

// Agregamos Geist_Mono por si en algún momento muestras código o datos numéricos fijos
export const fontMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});
