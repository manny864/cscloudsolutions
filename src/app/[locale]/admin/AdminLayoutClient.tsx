'use client';

import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';
import { Logo } from '@/components/Logo';
import {
  IconLayoutDashboard,
  IconArticle,
  IconPlus,
  IconPhoto,
  IconExternalLink,
  IconLogout,
  IconUserCheck,
  IconLoader2,
} from '@tabler/icons-react';

function AdminLayoutInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoginPage = pathname.includes('/admin/login');

  useEffect(() => {
    if (!isLoginPage && status === 'unauthenticated') {
      router.replace('/admin/login');
    }
  }, [status, isLoginPage, router]);

  // Si estamos en la página de login, renderizar únicamente el contenido de login
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Mientras se valida la sesión, mostrar pantalla de carga segura
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-3">
        <IconLoader2 className="w-8 h-8 animate-spin text-[color:var(--cyan)]" />
        <p className="text-xs font-bold uppercase tracking-widest">Validando credenciales de Microsoft...</p>
      </div>
    );
  }

  // Si no está autenticado, no renderizar el panel mientras se procesa la redirección
  if (status === 'unauthenticated' || !session) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-3">
        <IconLoader2 className="w-8 h-8 animate-spin text-[color:var(--cyan)]" />
        <p className="text-xs font-bold uppercase tracking-widest">Redirigiendo al inicio de sesión corporativo...</p>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: IconLayoutDashboard },
    { label: 'Artículos de Blog', href: '/admin/posts', icon: IconArticle },
    { label: 'Nuevo Artículo', href: '/admin/posts/new', icon: IconPlus },
    { label: 'Biblioteca de Medios', href: '/admin/media', icon: IconPhoto },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <Link href="/admin">
              <Logo locale="es" />
            </Link>
          </div>

          <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 mb-3 px-3">
            Gestión de Contenidos
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[color:var(--cyan)] text-white font-bold shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" stroke={2} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="pt-6 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="w-8 h-8 rounded-full bg-[color:var(--cyan)]/20 text-[color:var(--cyan)] flex items-center justify-center font-bold text-xs shrink-0">
              <IconUserCheck className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">
                {session.user?.name || 'Administrador'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {session.user?.email || 'admin@cscloudsolutions.com.ar'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
            >
              <IconExternalLink className="w-3.5 h-3.5" />
              <span>Ver Web</span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition"
              title="Cerrar sesión"
            >
              <IconLogout className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayoutClient({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  );
}
