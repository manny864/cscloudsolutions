import { Bricolage_Grotesque, Inter } from 'next/font/google';

export const fontBody = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-body',
});

export const fontHeading = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-heading',
});
