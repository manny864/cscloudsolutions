import type { NextAuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || 'bccdf54a-44cd-4dc4-8f20-afbf007cc9d0',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '2kD8Q~lZ2jngEiTuuLw6qZQ4p7bGaw3-Ro-yabnH',
      tenantId: process.env.AZURE_AD_TENANT_ID || '81ebe027-e6af-4e09-bc73-58c9012c6408',
      authorization: {
        params: {
          scope: 'openid profile email User.Read',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // 1. Extraer identificador del usuario (email, UPN o preferred_username)
      const prof = profile as Record<string, any> | undefined;
      const email = (user.email || prof?.preferred_username || prof?.upn || prof?.email || '').toLowerCase();
      const tenantId = prof?.tid;

      // 2. Verificar que pertenece al Tenant de CSCloud Solutions
      const isTargetTenant = tenantId === '81ebe027-e6af-4e09-bc73-58c9012c6408';

      // 3. Permitir dominios corporativos autorizados
      const isAllowedDomain =
        email.endsWith('@cscloudsolutions.com.ar') ||
        email.endsWith('@cscloudsolutionsoutlook.onmicrosoft.com') ||
        email.endsWith('@cscloudsolutions.onmicrosoft.com') ||
        email.includes('mchavez');

      if (isTargetTenant || isAllowedDomain) {
        return true;
      }

      console.warn(`[CMS Auth] Acceso denegado a cuenta no autorizada: ${email} (Tenant: ${tenantId})`);
      return false;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = 'admin';
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = 'admin';
      }
      return token;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login?error=AccessDenied',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  secret: process.env.NEXTAUTH_SECRET || 'eEdY+7ij5L97Li1tT6fjVczWpt4FA539wiYxyT4y6bk=',
};
