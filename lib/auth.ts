import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const { handlers, auth, signOut, signIn } = NextAuth(authConfig);
export type AuthSession = Awaited<ReturnType<typeof auth>>;

