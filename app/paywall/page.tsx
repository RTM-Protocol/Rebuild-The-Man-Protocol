'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Paywall from '@/components/Paywall';

export default function PaywallPage() {
  return (
    <div className="min-h-screen bg-tactical-black flex flex-col">
      <Navigation />
      <main className="flex-1 px-4 py-10 sm:py-16">
        <Paywall />
      </main>
      <Footer />
    </div>
  );
}
