'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Top-right auth controls for the landing page nav.
 * - Logged out: Login + Sign Up
 * - Logged in:  Account + Sign Out
 */
export default function LandingAuthButtons() {
  const { user, isLoading, signOut } = useAuth();

  if (isLoading) {
    return <div className="h-9 w-32 bg-tactical-darkgray/40 animate-pulse" aria-hidden />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-gray-300 hover:text-tactical-orange text-sm font-bold uppercase tracking-wide transition-colors"
        >
          Log In
        </Link>
        <Link
          href="/signup"
          className="btn-primary text-xs py-2 px-4"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/account"
        className="text-gray-300 hover:text-tactical-orange text-sm font-bold uppercase tracking-wide transition-colors"
      >
        Account
      </Link>
      <button
        type="button"
        onClick={() => {
          signOut();
        }}
        className="text-gray-400 hover:text-tactical-orange text-xs font-bold uppercase tracking-wide transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}
