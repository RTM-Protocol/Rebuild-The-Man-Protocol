import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MailtoLink from '@/components/MailtoLink';
import { MAILTO_CONTACT, MAILTO_REQUESTS, MAILTO_SUPPORT } from '@/lib/mailtoUrls';

export const metadata: Metadata = {
  title: 'Contact Us | The Rebuild Protocol',
  description: 'Get in touch with The Rebuild Protocol team.',
};

const blocks = [
  {
    icon: '📮',
    heading: 'General Enquiries',
    description:
      'For general information, business enquiries, and partnership opportunities.',
    href: MAILTO_CONTACT,
    email: 'info@rebuildthemanprotocol.com',
  },
  {
    icon: '🆘',
    heading: 'App Support',
    description: 'For app help, technical issues, bug reports, and account questions.',
    href: MAILTO_SUPPORT,
    email: 'support@rebuildthemanprotocol.com',
  },
  {
    icon: '📋',
    heading: 'Requests & Rights',
    description:
      'For privacy policy queries, data access requests, UK GDPR rights, social media enquiries, speaking engagements, and sponsorship.',
    href: MAILTO_REQUESTS,
    email: 'requests@rebuildthemanprotocol.com',
  },
] as const;

export default function ContactPage() {
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
            Get in touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4 leading-tight">
            Contact Us
          </h1>
          <p className="font-brand text-lg sm:text-xl">
            <span style={{ color: '#faf9f5' }}>Rebuild The Man</span>{' '}
            <span style={{ color: '#cc6119' }}>Protocol</span>
          </p>
        </header>

        <div className="space-y-6 mb-10">
          {blocks.map((block) => (
            <section
              key={block.heading}
              className="bg-tactical-darkgray border border-tactical-lightgray p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <span className="text-4xl shrink-0" aria-hidden="true">
                  {block.icon}
                </span>
                <div className="min-w-0 flex-1 space-y-3">
                  <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                    {block.heading}
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {block.description}
                  </p>
                  <div>
                    <MailtoLink
                      href={block.href}
                      className="inline-flex items-center gap-2 text-tactical-orange hover:text-tactical-orange-bright font-bold text-sm sm:text-base underline underline-offset-4"
                    >
                      <span aria-hidden="true">✉️</span>
                      {block.email}
                    </MailtoLink>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <p className="text-gray-400 text-sm text-center border-t border-tactical-lightgray pt-8">
          We aim to respond to all enquiries within 48 hours.
        </p>
      </main>

      <Footer />
    </div>
  );
}
