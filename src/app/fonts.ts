import {DM_Sans, Plus_Jakarta_Sans} from 'next/font/google';

export const fontBody = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-body'
});

export const fontHeading = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-heading'
});
