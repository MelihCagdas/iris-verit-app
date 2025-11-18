'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
    >
      Logout
    </button>
  );
}

