import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

/**
 * Get Supabase database client for server-side operations
 * Handles cookies properly for Next.js App Router
 */
export async function getSupabaseDb() {
  const cookieStore = await cookies();
  
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set(name, value, options);
        } catch (error) {
          // Cookie might be set in a different context, ignore
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.delete(name);
        } catch (error) {
          // Cookie might be removed in a different context, ignore
        }
      },
    },
  });
}

