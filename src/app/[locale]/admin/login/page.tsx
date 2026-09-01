'use client';

import { Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { IconShieldLock, IconAlertCircle } from '@tabler/icons-react';

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleMicrosoftLogin = () => {
    signIn('azure-ad', { callbackUrl: '/admin' });
  };

  return (
    <>
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs sm:text-sm">
          <IconAlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Acceso Denegado</p>
            <p className="mt-0.5">
              Debes iniciar sesión con una cuenta corporativa autorizada de <b>@cscloudsolutions.com.ar</b>.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={handleMicrosoftLogin}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/30"
        >
          {/* Microsoft Logo SVG */}
          <svg className="w-5 h-5" viewBox="0 0 23 23">
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
          <span>Iniciar Sesión con Microsoft Entra ID</span>
        </button>

        <p className="text-[11px] text-center text-slate-500">
          CSCloud Solutions • Single Sign-On • Protección Zero Trust
        </p>
      </div>
    </>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[color:var(--cyan)]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-4">
            <Logo locale="es" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[color:var(--cyan)]/10 border border-[color:var(--cyan)]/30 text-[11px] font-bold text-[color:var(--cyan)] uppercase tracking-wider mb-2">
            <IconShieldLock className="w-3.5 h-3.5" />
            <span>Panel de Administración CMS</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Acceso Corporativo</h1>
          <p className="text-sm text-slate-400 mt-1">
            Autenticación segura mediante Microsoft Entra ID
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-slate-400 text-sm py-4">Cargando acceso...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
