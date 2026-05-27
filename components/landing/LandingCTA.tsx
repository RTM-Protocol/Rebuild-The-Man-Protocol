'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { startCheckout } from '@/lib/checkout';

interface LandingCTAProps {
  className?: string;
  /** Label to use when the visitor isn't logged in. Defaults to "Get Started". */
  loggedOutLabel?: string;
  /** Label to use when logged in + not paid. Defaults to "Get Lifetime Access". */
  unpaidLabel?: string;
  /** Label to use when logged in + paid. Defaults to "Go to Protocols". */
  paidLabel?: string;
}

/**
 * Single smart CTA used across the landing page. Picks the right destination
 * based on the visitor's auth + payment state.
 *
 * - Not logged in → /signup (encourages account creation first)
 * - Logged in, no purchase → triggers Stripe Checkout via /api/checkout
 * - Logged in + paid → /  (the protocol dashboard)
 */
export default function LandingCTA({
  className = 'btn-primary text-lg py-4 px-8 text-center',
  loggedOutLabel = 'Get Started',
  unpaidLabel = 'Get Lifetime Access',
  paidLabel = 'Go to Protocols',
}: LandingCTAProps) {
  const { user, hasPaid, isLoading } = useAuth();
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return (
      <Link href="/signup" className={className}>
        {loggedOutLabel}
      </Link>
    );
  }

  if (hasPaid) {
    return (
      <Link href="/" className={className}>
        {paidLabel}
      </Link>
    );
  }

  const handleClick = async () => {
    setError(null);
    setWorking(true);
    const errMsg = await startCheckout();
    if (errMsg) {
      setError(errMsg);
      setWorking(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center w-full sm:w-auto">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading || working}
        className={`${className} disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {working ? 'Redirecting…' : unpaidLabel}
      </button>
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
  );
}
