import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MAILTO_INFO, MAILTO_REQUESTS, MAILTO_SUPPORT, EMAIL_LINK_CLASS } from '@/lib/mailtoUrls';

export const metadata: Metadata = {
  title: 'Terms of Service — Rebuild The Man Protocol',
  description:
    'The terms and conditions governing your use of Rebuild The Man Protocol, including pricing, the 14-day money-back guarantee, acceptable use, and our limitations of liability.',
};

const LAST_UPDATED = '26.05.26';

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'description', title: '2. Description of Service' },
  { id: 'accounts', title: '3. Accounts and Registration' },
  { id: 'pricing', title: '4. Pricing and Payment' },
  { id: 'refund', title: '5. Refund Policy' },
  { id: 'acceptable-use', title: '6. Acceptable Use' },
  { id: 'intellectual-property', title: '7. Intellectual Property' },
  { id: 'user-data', title: '8. User Data' },
  { id: 'disclaimer', title: '9. Disclaimer of Warranties' },
  { id: 'liability', title: '10. Limitation of Liability' },
  { id: 'changes', title: '11. Changes to Terms' },
  { id: 'governing-law', title: '12. Governing Law' },
  { id: 'contact', title: '13. Contact' },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-tactical-black scroll-smooth">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-tactical-orange hover:text-tactical-orange-bright text-sm font-bold uppercase tracking-wide transition-colors"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10 pb-8 border-b border-tactical-lightgray">
          <p className="text-tactical-orange font-mono text-xs sm:text-sm uppercase tracking-widest mb-3">
            Legal / Terms
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4 leading-tight">
            Terms of Service
          </h1>
          <p className="font-brand text-lg sm:text-xl mb-4">
            <span style={{ color: '#faf9f5' }}>Rebuild The Man</span>{' '}
            <span style={{ color: '#cc6119' }}>Protocol</span>
          </p>
          <p className="text-gray-400 text-sm font-mono uppercase tracking-wide">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        {/* Table of Contents */}
        <nav
          aria-label="Terms of service contents"
          className="mb-12 bg-tactical-darkgray border border-tactical-lightgray p-6"
        >
          <h2 className="text-white font-bold uppercase tracking-wide text-sm mb-4 flex items-center gap-2">
            <span aria-hidden="true">📑</span>
            <span>Contents</span>
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-gray-300 hover:text-tactical-orange transition-colors"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Terms Content */}
        <article className="space-y-12 text-gray-200 leading-relaxed">
          {/* Section 1 */}
          <section id="acceptance" aria-labelledby="acceptance-heading">
            <h2
              id="acceptance-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using Rebuild the Man Protocol (&ldquo;the App&rdquo;), you agree to be
              bound by these Terms of Service. If you do not agree to these terms, do not use the
              App.
            </p>
          </section>

          {/* Section 2 */}
          <section id="description" aria-labelledby="description-heading">
            <h2
              id="description-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              2. Description of Service
            </h2>
            <p className="mb-4">
              Rebuild the Man Protocol is a self-help application that provides structured,
              action-based mental health protocols designed for men. The App offers daily missions
              across multiple protocols including anger regulation, stress management, motivation,
              and imposter syndrome support.
            </p>
            <p>
              The App is a self-help tool designed to complement, not replace, professional mental
              health care. It does not provide medical advice, diagnosis, or treatment. If you are
              experiencing a mental health crisis, please contact emergency services or a qualified
              mental health professional immediately.
            </p>
          </section>

          {/* Section 3 */}
          <section id="accounts" aria-labelledby="accounts-heading">
            <h2
              id="accounts-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              3. Accounts and Registration
            </h2>
            <p>
              To use certain features of the App, you may be required to create an account. You are
              responsible for maintaining the confidentiality of your account credentials and for
              all activity that occurs under your account. You agree to provide accurate and
              complete information when creating your account and to update your information as
              necessary.
            </p>
          </section>

          {/* Section 4 */}
          <section id="pricing" aria-labelledby="pricing-heading">
            <h2
              id="pricing-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              4. Pricing and Payment
            </h2>
            <p className="mb-4">
              Access to the App requires a one-time payment for lifetime access. All prices are
              displayed in GBP (&pound;) and include VAT where applicable. Payment is processed
              securely through our third-party payment provider (Stripe). By making a purchase, you
              agree to Stripe&apos;s terms of service.
            </p>
            <p>
              Your lifetime access includes all current protocols, Emergency Tools, progress
              tracking, and all future protocol additions and feature updates at no additional cost.
            </p>
          </section>

          {/* Section 5 */}
          <section id="refund" aria-labelledby="refund-heading">
            <h2
              id="refund-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              5. Refund Policy
            </h2>
            <p className="mb-4">
              We offer a <strong className="text-white">14-day money-back guarantee</strong> from
              the date of purchase. If you are not satisfied with the App for any reason, you may
              request a full refund within 14 days of your original purchase date.
            </p>

            <h3 className="text-xl font-bold text-tactical-green-bright uppercase tracking-wide mb-3 mt-6">
              How to request a refund
            </h3>
            <ul className="list-disc list-outside pl-6 space-y-2 mb-6">
              <li>
                Email{' '}
                <a href={MAILTO_SUPPORT} className={EMAIL_LINK_CLASS}>
                  support@rebuildthemanprotocol.com
                </a>{' '}
                with the email address associated with your account
              </li>
              <li>
                Include the word &lsquo;Refund&rsquo; in the subject line
              </li>
              <li>
                You may optionally include a reason for your request, but this is not required
              </li>
            </ul>

            <h3 className="text-xl font-bold text-tactical-green-bright uppercase tracking-wide mb-3 mt-6">
              Refund terms
            </h3>
            <ul className="list-disc list-outside pl-6 space-y-2 mb-6">
              <li>
                Refund requests received within 14 days of purchase will be honoured in full, no
                questions asked
              </li>
              <li>Refunds are processed back to the original payment method</li>
              <li>Please allow 5&ndash;10 business days for the refund to appear on your statement</li>
              <li>
                Refund requests received after 14 days from the date of purchase are not eligible
              </li>
            </ul>

            <div className="bg-tactical-darkgray border-l-4 border-tactical-orange p-5">
              <p>
                Upon refund, your access to paid features of the App will be revoked.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="acceptable-use" aria-labelledby="acceptable-use-heading">
            <h2
              id="acceptable-use-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              6. Acceptable Use
            </h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc list-outside pl-6 space-y-2">
              <li>Use the App for any unlawful purpose</li>
              <li>Attempt to gain unauthorised access to the App or its systems</li>
              <li>Reproduce, distribute, or sell any content from the App</li>
              <li>Use the App to harass, abuse, or harm others</li>
              <li>Share your account credentials with others</li>
              <li>Reverse-engineer, decompile, or disassemble the App</li>
              <li>Use automated tools to access or scrape content from the App</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="intellectual-property" aria-labelledby="intellectual-property-heading">
            <h2
              id="intellectual-property-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              7. Intellectual Property
            </h2>
            <p>
              All content within the App &mdash; including protocols, missions, text, graphics,
              logos, icons, and software &mdash; is the property of Rebuild the Man Protocol and is
              protected by copyright and intellectual property laws. You may not reproduce,
              distribute, modify, or create derivative works from any content without prior written
              permission.
            </p>
          </section>

          {/* Section 8 */}
          <section id="user-data" aria-labelledby="user-data-heading">
            <h2
              id="user-data-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              8. User Data
            </h2>
            <p>
              Your use of the App is also governed by our{' '}
              <Link
                href="/privacy"
                className="text-tactical-orange hover:text-tactical-orange-bright underline underline-offset-2 font-semibold transition-colors"
              >
                Privacy Policy
              </Link>
              . By using the App, you consent to the collection and use of your data as described
              in the Privacy Policy.
            </p>
          </section>

          {/* Section 9 */}
          <section id="disclaimer" aria-labelledby="disclaimer-heading">
            <h2
              id="disclaimer-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              9. Disclaimer of Warranties
            </h2>
            <p>
              The App is provided &lsquo;as is&rsquo; and &lsquo;as available&rsquo; without
              warranties of any kind, either express or implied. We do not guarantee that the App
              will be uninterrupted, error-free, or free of harmful components. Results from using
              the App vary based on individual circumstances, commitment, and the nature of
              challenges faced. No specific outcomes are guaranteed.
            </p>
          </section>

          {/* Section 10 */}
          <section id="liability" aria-labelledby="liability-heading">
            <h2
              id="liability-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              10. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Rebuild the Man Protocol and its creator
              shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages arising from your use of the App. Our total liability for any claim arising
              from these Terms shall not exceed the amount you paid for access to the App.
            </p>
          </section>

          {/* Section 11 */}
          <section id="changes" aria-labelledby="changes-heading">
            <h2
              id="changes-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              11. Changes to Terms
            </h2>
            <p>
              We reserve the right to update these Terms of Service at any time. If we make
              material changes, we will notify users via email or through a notice within the App.
              Your continued use of the App after changes are posted constitutes acceptance of the
              updated terms.
            </p>
          </section>

          {/* Section 12 */}
          <section id="governing-law" aria-labelledby="governing-law-heading">
            <h2
              id="governing-law-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              12. Governing Law
            </h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of England and
              Wales. Any disputes arising from these Terms shall be subject to the exclusive
              jurisdiction of the courts of England and Wales.
            </p>
          </section>

          {/* Section 13 */}
          <section id="contact" aria-labelledby="contact-heading">
            <h2
              id="contact-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              13. Contact
            </h2>
            <p className="mb-4">
              For questions about these Terms of Service, contact us:
            </p>
            <dl className="bg-tactical-darkgray border-l-4 border-tactical-green p-5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-tactical-orange font-mono text-sm uppercase sm:min-w-[11rem]">
                  General enquiries:
                </dt>
                <dd>
                  <a href={MAILTO_INFO} className={EMAIL_LINK_CLASS}>
                    info@rebuildthemanprotocol.com
                  </a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-tactical-orange font-mono text-sm uppercase sm:min-w-[11rem]">
                  App support:
                </dt>
                <dd>
                  <a href={MAILTO_SUPPORT} className={EMAIL_LINK_CLASS}>
                    support@rebuildthemanprotocol.com
                  </a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-tactical-orange font-mono text-sm uppercase sm:min-w-[11rem]">
                  Data &amp; privacy:
                </dt>
                <dd>
                  <a href={MAILTO_REQUESTS} className={EMAIL_LINK_CLASS}>
                    requests@rebuildthemanprotocol.com
                  </a>
                </dd>
              </div>
            </dl>
          </section>
        </article>

        {/* Bottom Back Link */}
        <div className="mt-16 pt-8 border-t border-tactical-lightgray flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-tactical-orange hover:text-tactical-orange-bright text-sm font-bold uppercase tracking-wide transition-colors"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Home</span>
          </Link>
          <a
            href="#"
            className="text-gray-400 hover:text-white text-sm font-bold uppercase tracking-wide transition-colors"
          >
            ↑ Back to Top
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
