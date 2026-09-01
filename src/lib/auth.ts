import type { NextAuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || '',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
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
      // Restricción estricta de seguridad corporativa para CSCloud Solutions
      const email = user.email?.toLowerCase();
      if (!email) return false;

      // Permitir únicamente usuarios con dominio oficial @cscloudsolutions.com.ar
      const allowedDomain = '@cscloudsolutions.com.ar';
      if (email.endsWith(allowedDomain) || email === 'mchavez@cscloudsolutions.com.ar') {
        return true;
      }

      console.warn(`[CMS Auth] Acceso denegado a usuario no corporativo: ${email}`);
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
  secret: process.env.NEXTAUTH_SECRET || 'cscloudsolutions-secret-key-2026-super-secure',
};
