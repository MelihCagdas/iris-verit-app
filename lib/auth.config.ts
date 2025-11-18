import { PrismaAdapter } from '@auth/prisma-adapter';
import type { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import { supabase } from './supabase';

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not defined. Please add it to your environment variables.`);
  }
  // Trim whitespace that might cause OAuth issues
  const trimmed = value.trim();
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Auth Config] ${name}: ${trimmed.substring(0, 20)}... (length: ${trimmed.length})`);
  }
  return trimmed;
}

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  secret: requiredEnv('NEXTAUTH_SECRET'),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: requiredEnv('GOOGLE_CLIENT_ID'),
      clientSecret: requiredEnv('GOOGLE_CLIENT_SECRET'),
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Verify credentials with Supabase
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (error || !data.user) {
            return null;
          }

          // Check if email is verified
          if (!data.user.email_confirmed_at) {
            throw new Error('Email not verified');
          }

          // Return user object for NextAuth session
          return {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name || data.user.email,
            image: data.user.user_metadata?.avatar_url,
          };
        } catch (error) {
          console.error('Credentials auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If redirecting to dashboard, we'll check preferences client-side
      // This allows the welcome page to handle the redirect logic
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // Allow relative callback URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
  },
};

export default authConfig;

