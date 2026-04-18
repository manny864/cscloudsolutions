import './globals.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://cscloudsolutions.com.ar'),
  title: {
    default: 'CSCloudSolutions',
    template: '%s | CSCloudSolutions'
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
