import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const PROTECTED_ROUTES = ['/dashboard', '/generate'];

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // If Supabase is not configured, allow access (for development)
    return NextResponse.next();
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isProtected = PROTECTED_ROUTES.some((path) => request.nextUrl.pathname.startsWith(path));

  if (!session && isProtected) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Note: Welcome screen redirect is handled client-side in the welcome page component
  // to avoid database calls in middleware (better for Capacitor compatibility)

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/generate/:path*'],
};

