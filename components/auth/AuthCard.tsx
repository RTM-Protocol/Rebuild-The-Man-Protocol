'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import BrandShieldIcon from '@/components/BrandShieldIcon';
import { BRAND_ORANGE_HEX } from '@/lib/protocolVisualTheme';
import Footer from '@/components/Footer';

interface AuthCardProps {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  /** Footer row beneath the form (e.g. "Already have an account? Log in"). */
  footer?: ReactNode;
}

/**
 * Shared visual shell for /login, /signup, /forgot-password, /reset-password.
 * Matches the tactical aesthetic used in /privacy and /terms — dark bg,
 * orange accents, mono eyebrow, branded heading.
 */
export default function AuthCard({ eyebrow, title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-tactical-black flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 flex items-center justify-center gap-3 group"
            aria-label="Rebuild The Man Protocol home"
          >
            <span className="text-2xl leading-none" aria-hidden>
              <BrandShieldIcon title="" strokeColor={BRAND_ORANGE_HEX} />
            </span>
            <div className="font-brand text-center">
              <span
                className="block text-lg font-bold uppercase tracking-tight leading-none group-hover:text-tactical-orange transition-colors"
                style={{ color: '#faf9f5' }}
              >
                Rebuild The Man
              </span>
              <span
                className="block text-[10px] font-semibold uppercase tracking-[0.25em] leading-tight"
                style={{ color: '#cc6119' }}
              >
                Protocol
              </span>
            </div>
          </Link>

          <div className="bg-tactical-darkgray border-2 border-tactical-lightgray p-6 sm:p-8">
            <p className="text-tactical-orange font-mono text-xs sm:text-sm uppercase tracking-widest mb-3">
              {eyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-3 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <div className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                {subtitle}
              </div>
            )}

            {children}
          </div>

          {footer && (
            <div className="mt-6 text-center text-sm text-gray-400">{footer}</div>
          )}

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-gray-500 hover:text-tactical-orange text-xs font-bold uppercase tracking-wide transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
