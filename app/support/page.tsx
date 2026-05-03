'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MailtoLink from '@/components/MailtoLink';
import { MAILTO_SUPPORT } from '@/lib/mailtoUrls';

const commonIssues: { question: string; answer: string }[] = [
  {
    question: "My progress isn't saving. What should I do?",
    answer:
      "Make sure you have a stable internet connection. If the issue persists, try logging out and logging back in. If it still doesn't work, contact us at support@rebuildthemanprotocol.com.",
  },
  {
    question: "I can't log in to my account.",
    answer:
      "On the login screen, click 'Forgot Password' and enter your email address. You'll receive a reset link within a few minutes. Check your spam folder if it doesn't arrive. If you still can't access your account, email support@rebuildthemanprotocol.com.",
  },
  {
    question: "The app isn't loading or is displaying errors.",
    answer:
      "Try refreshing the page or clearing your browser cache. If you're on mobile, try switching to a desktop browser. If the issue continues, email support@rebuildthemanprotocol.com with a screenshot of the error.",
  },
  {
    question: 'How do I change my email address or account details?',
    answer:
      "Email requests@rebuildthemanprotocol.com with the subject line 'Account Update Request' and let us know what you'd like changed.",
  },
  {
    question: 'How do I delete my account and all my data?',
    answer:
      "Email requests@rebuildthemanprotocol.com with the subject line 'Account Deletion Request'. We will delete all your personal data within 30 days as required by UK GDPR.",
  },
  {
    question: 'I have feedback or a feature suggestion.',
    answer:
      "We'd love to hear from you. Email info@rebuildthemanprotocol.com with the subject line 'Feedback' and tell us what you think.",
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
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">{item.answer}</p>
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
          <MailtoLink
            href={MAILTO_SUPPORT}
            className="btn-primary inline-block text-base sm:text-lg py-4 px-10 uppercase tracking-wide"
          >
            Email Support
          </MailtoLink>
        </section>
      </main>

      <Footer />
    </div>
  );
}
