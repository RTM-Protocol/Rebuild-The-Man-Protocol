'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { PURCHASE_URL } from '@/lib/purchaseUrl';

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
 * - Logged in, no purchase → links out to the landing site's purchase page
 * - Logged in + paid → /  (the protocol dashboard)
 */
export default function LandingCTA({
  className = 'btn-primary text-lg py-4 px-8 text-center',
  loggedOutLabel = 'Get Started',
  unpaidLabel = 'Get Lifetime Access',
  paidLabel = 'Go to Protocols',
}: LandingCTAProps) {
  const { user, hasPaid } = useAuth();

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

  return (
    <a href={PURCHASE_URL} className={className} rel="noopener">
      {unpaidLabel} →
    </a>
  );
}
