'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import BrandShieldIcon from '@/components/BrandShieldIcon';
import { BRAND_ORANGE_HEX } from '@/lib/protocolVisualTheme';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Paywall from '@/components/Paywall';

interface ProtocolAccessGateProps {
  children: ReactNode;
}

/**
 * Wraps any route that requires login + an active `customers` row.
 *
 * - While auth state is loading: shows a tactical loading screen
 * - Not authenticated: redirects to /login with ?redirect=<current path>
 * - Authenticated but unpaid: renders the Paywall
 * - Authenticated and paid: renders children
 */
export default function ProtocolAccessGate({ children }: ProtocolAccessGateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, hasPaid, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      const redirect = pathname || '/';
      router.replace(`/login?redirect=${encodeURIComponent(redirect)}`);
    }
  }, [isLoading, user, pathname, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-tactical-black flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-4xl mb-4 breathe-animation">
              <BrandShieldIcon title="" strokeColor={BRAND_ORANGE_HEX} />
            </div>
            <p className="text-white font-bold uppercase tracking-widest text-sm">
              {isLoading ? 'Loading…' : 'Redirecting to login…'}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hasPaid) {
    return (
      <div className="min-h-screen bg-tactical-black flex flex-col">
        <Navigation />
        <main className="flex-1 px-4 py-10 sm:py-16">
          <Paywall headline="Unlock All Protocols" embedded />
        </main>
        <Footer />
      </div>
    );
  }

  return <>{children}</>;
}
