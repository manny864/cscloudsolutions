import { Metadata } from 'next';
import AdminLayoutClient from './AdminLayoutClient';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Admin Panel | CSCloudSolutions',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
