import Link from 'next/link';
import { getServerSession } from '@/lib/auth-server';
import LogoutButton from './LogoutButton';

export default async function Navbar() {
  const session = await getServerSession();

  return (
    <nav className="border-b border-white/10 bg-gradient-to-r from-slate-950 via-indigo-950/80 via-violet-950/60 to-slate-950 backdrop-blur-sm text-slate-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <Link href="/" className="flex items-center gap-4 group">
          <img 
            src="/Screenshot 2025-11-18 at 21.50.35.png" 
            alt="Tailor AI Logo" 
            className="h-10 w-10 flex-shrink-0 transition-transform group-hover:scale-105"
          />
          <div>
            <p className="text-xl font-bold text-white leading-tight">
              Tailor <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">AI</span>
            </p>
            <p className="text-xs text-slate-300 font-medium mt-0.5">Intelligent Custom Resumes</p>
          </div>
        </Link>
        <div className="flex items-center gap-8 text-sm font-medium">
          <Link href="/pricing" className="text-slate-300 transition-colors hover:text-white">
            Pricing
          </Link>
          <Link href="/blog" className="text-slate-300 transition-colors hover:text-white">
            Blog
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" className="text-slate-300 transition-colors hover:text-white">
                Dashboard
              </Link>
              <Link href="/jobs" className="text-slate-300 transition-colors hover:text-white">
                Jobs
              </Link>
              <Link href="/profile" className="text-slate-300 transition-colors hover:text-white">
                Profile
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

