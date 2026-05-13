'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  MAILTO_INFO,
  MAILTO_REQUESTS,
  MAILTO_SUPPORT,
  MAILTO_SUPPORT_PRIMARY_CTA,
  EMAIL_LINK_CLASS,
  EMAIL_SUPPORT_BUTTON_CLASS,
} from '@/lib/mailtoUrls';

const commonIssues: { question: string; answer: ReactNode }[] = [
  {
    question: "My progress isn't saving. What should I do?",
    answer: (
      <>
        Your progress is stored on this device first. If cloud sync is enabled, it also syncs in the
        background when you&apos;re online. Try a stable connection, refresh the page, and check that
        you haven&apos;t blocked site storage for your browser. You can use{' '}
        <Link href="/settings" className="text-tactical-orange hover:text-tactical-orange-bright font-bold underline">
          Settings
        </Link>{' '}
        to review your setup. If it still fails, contact{' '}
        <a href={MAILTO_SUPPORT} className={EMAIL_LINK_CLASS}>
          support@rebuildthemanprotocol.com
        </a>
        .
      </>
    ),
  },
  {
    question: "I can't access my data / something looks wrong after I came back to the site.",
    answer: (
      <>
        The app uses device-based access: there is no separate login or password in this version of
        the app. Your progress is saved on your device and, when available, synced to the cloud. If
        something looks off, try refreshing the page or clearing your browser cache for this site, then
        open the app again. Don&apos;t clear site data unless you intend to remove local progress. If the
        issue persists, email{' '}
        <a href={MAILTO_SUPPORT} className={EMAIL_LINK_CLASS}>
          support@rebuildthemanprotocol.com
        </a>
        .
      </>
    ),
  },
  {
    question: "The app isn't loading or is displaying errors.",
    answer: (
      <>
        Try refreshing the page or clearing your browser cache. If you&apos;re on mobile, try
        switching to a desktop browser. If the issue continues, email{' '}
        <a href={MAILTO_SUPPORT} className={EMAIL_LINK_CLASS}>
          support@rebuildthemanprotocol.com
        </a>{' '}
        with a screenshot of the error.
      </>
    ),
  },
  {
    question: 'How do I update my information or exercise my privacy rights?',
    answer: (
      <>
        This app doesn&apos;t offer an in-app profile or email-login account to edit. For privacy
        requests, corrections, or UK GDPR rights (including questions about data we hold if you
        contact us by email), email{' '}
        <a href={MAILTO_REQUESTS} className={EMAIL_LINK_CLASS}>
          requests@rebuildthemanprotocol.com
        </a>{' '}
        with a clear subject line and we&apos;ll respond as set out in our{' '}
        <Link href="/privacy" className="text-tactical-orange hover:text-tactical-orange-bright font-bold underline">
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
  {
    question: 'How do I delete my saved progress and data in the app?',
    answer: (
      <>
        To clear data on this device, use{' '}
        <Link href="/settings" className="text-tactical-orange hover:text-tactical-orange-bright font-bold underline">
          Settings
        </Link>{' '}
        to reset your active protocol or clear all progress, as described there. That removes locally
        stored progress. If you also use cloud sync and need help removing associated data from our
        systems, email{' '}
        <a href={MAILTO_REQUESTS} className={EMAIL_LINK_CLASS}>
          requests@rebuildthemanprotocol.com
        </a>{' '}
        with the subject line &apos;Data Deletion Request&apos;. We will handle personal data we
        process in line with UK GDPR.
      </>
    ),
  },
  {
    question: 'I have feedback or a feature suggestion.',
    answer: (
      <>
        We&apos;d love to hear from you. Email{' '}
        <a href={MAILTO_INFO} className={EMAIL_LINK_CLASS}>
          info@rebuildthemanprotocol.com
        </a>{' '}
        with the subject line &apos;Feedback&apos; and tell us what you think.
      </>
    ),
  },
];

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-tactical-black">
      <Navigation />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-tactical-orange hover:text-tactical-orange-bright text-sm font-bold uppercase tracking-wide transition-colors"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Home</span>
          </Link>
        </div>

        <header className="mb-10 pb-8 border-b border-tactical-lightgray">
          <p className="text-tactical-orange font-mono text-xs sm:text-sm uppercase tracking-widest mb-3">
            Technical help
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4 leading-tight">
            Support
          </h1>
          <p className="font-brand text-lg sm:text-xl">
            <span style={{ color: '#faf9f5' }}>Rebuild The Man</span>{' '}
            <span style={{ color: '#cc6119' }}>Protocol</span>
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white uppercase mb-4 flex items-center gap-2">
            <span aria-hidden="true">❓</span>
            Need Help?
          </h2>
          <p className="text-gray-300 leading-relaxed">
            If you&apos;re experiencing issues with the app, we&apos;re here to help. Before reaching
            out, check the common questions below.
          </p>
        </section>

        <section className="mb-12" aria-labelledby="common-issues-heading">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-8 bg-tactical-orange" />
            <h2 id="common-issues-heading" className="text-2xl font-bold text-white uppercase">
              Common Issues
            </h2>
          </div>

          <div className="space-y-3">
            {commonIssues.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-tactical-darkgray border border-tactical-lightgray overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-tactical-gray transition-colors group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-white font-bold text-base sm:text-lg pr-2 group-hover:text-tactical-orange transition-colors">
                      Q: {item.question}
                    </span>
                    <span
                      className={`text-tactical-orange text-2xl shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-tactical-lightgray">
                      <div className="text-gray-300 leading-relaxed">{item.answer}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-tactical-darkgray border-2 border-tactical-orange p-6 sm:p-8 text-center">
          <h2 className="text-xl font-bold text-white uppercase mb-3">Still Need Help?</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            If your issue isn&apos;t covered above, contact our support team directly.
          </p>
          <a href={MAILTO_SUPPORT_PRIMARY_CTA} className={EMAIL_SUPPORT_BUTTON_CLASS}>
            Email Support
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
