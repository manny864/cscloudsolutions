import { Geist, Geist_Mono } from 'next/font/google';

export const fontBody = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const fontMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});