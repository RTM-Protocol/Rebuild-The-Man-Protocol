import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — Rebuild The Man Protocol',
  description:
    'How Rebuild The Man Protocol collects, uses, stores, and protects your personal data under UK GDPR and the Data Protection Act 2018.',
};

const LAST_UPDATED = '19.04.26';

const sections = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'who-we-are', title: '2. Who We Are' },
  { id: 'data-we-collect', title: '3. What Data We Collect' },
  { id: 'how-we-use-data', title: '4. How We Use Your Data' },
  { id: 'sensitive-data', title: '5. Sensitive Personal Data' },
  { id: 'storage-security', title: '6. Data Storage and Security' },
  { id: 'data-sharing', title: '7. Who We Share Your Data With' },
  { id: 'retention', title: '8. How Long We Keep Your Data' },
  { id: 'your-rights', title: '9. Your Rights' },
  { id: 'cookies', title: '10. Cookies' },
  { id: 'children', title: '11. Children' },
  { id: 'international', title: '12. International Data Transfers' },
  { id: 'changes', title: '13. Changes to This Policy' },
  { id: 'contact', title: '14. Contact Us' },
];

export default function PrivacyPolicyPage() {
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
            Legal / Privacy
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4 leading-tight">
            Privacy Policy
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
          aria-label="Privacy policy contents"
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

        {/* Policy Content */}
        <article className="space-y-12 text-gray-200 leading-relaxed">
          {/* Section 1 */}
          <section id="introduction" aria-labelledby="introduction-heading">
            <h2
              id="introduction-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              1. Introduction
            </h2>
            <p className="mb-4">
              The Rebuild The Man Protocol (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is
              committed to protecting your privacy. This Privacy Policy explains how we collect, use,
              store, and protect your personal data when you use our web application and related
              services (the &ldquo;Service&rdquo;).
            </p>
            <p className="mb-4">
              We understand that you are trusting us with sensitive personal information related to
              your mental health and wellbeing. We take this responsibility seriously. This policy
              is written in plain language so you can understand exactly what happens with your
              data.
            </p>
            <p>
              The Rebuild The Man Protocol is operated from the United Kingdom. We comply with the{' '}
              <strong className="text-white">UK General Data Protection Regulation (UK GDPR)</strong>{' '}
              and the <strong className="text-white">Data Protection Act 2018</strong>.
            </p>
          </section>

          {/* Section 2 */}
          <section id="who-we-are" aria-labelledby="who-we-are-heading">
            <h2
              id="who-we-are-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              2. Who We Are
            </h2>
            <p className="mb-4">
              The Rebuild The Man Protocol is a mental health and personal development application
              designed for men. It provides structured, protocol-based daily missions to help users
              address challenges including anger management, stress, burnout, low motivation, and
              more.
            </p>
            <dl className="bg-tactical-darkgray border-l-4 border-tactical-orange p-5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-tactical-orange font-mono text-sm uppercase sm:w-40">
                  Data Controller:
                </dt>
                <dd className="text-white font-semibold">rebuildthemanprotocol</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-tactical-orange font-mono text-sm uppercase sm:w-40">
                  Contact Email:
                </dt>
                <dd>
                  <a
                    href="mailto:info@rebuildthemanprotocol.com"
                    className="text-white hover:text-tactical-orange transition-colors underline"
                  >
                    info@rebuildthemanprotocol.com
                  </a>
                  <span className="text-gray-400 text-sm">
                    {' '}
                    (general information and business contact)
                  </span>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-tactical-orange font-mono text-sm uppercase sm:w-40">
                  App Support:
                </dt>
                <dd>
                  <a
                    href="mailto:support@rebuildthemanprotocol.com"
                    className="text-white hover:text-tactical-orange transition-colors underline"
                  >
                    support@rebuildthemanprotocol.com
                  </a>
                  <span className="text-gray-400 text-sm">
                    {' '}
                    (app help and technical issues)
                  </span>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-tactical-orange font-mono text-sm uppercase sm:w-40">
                  Website:
                </dt>
                <dd className="text-white">rebuildthemanprotocol.com</dd>
              </div>
            </dl>
          </section>

          {/* Section 3 */}
          <section id="data-we-collect" aria-labelledby="data-we-collect-heading">
            <h2
              id="data-we-collect-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              3. What Data We Collect
            </h2>
            <p className="mb-6">
              We collect the minimum amount of data necessary to provide the Service. Here is
              exactly what we collect and why:
            </p>

            <h3 className="text-xl font-bold text-tactical-green-bright uppercase tracking-wide mb-3 mt-6">
              3.1 Account Information
            </h3>
            <ul className="list-disc list-outside pl-6 space-y-2 mb-6">
              <li>Email address (required for account creation and login)</li>
              <li>Display name (optional)</li>
              <li>
                Authentication data via Google Sign-In if you choose this method (we receive your
                email and name from Google; we do not receive your Google password)
              </li>
            </ul>

            <h3 className="text-xl font-bold text-tactical-green-bright uppercase tracking-wide mb-3 mt-6">
              3.2 Protocol and Progress Data
            </h3>
            <p className="mb-3">
              When you use the app, we collect data that you actively provide as part of your mental
              health protocols:
            </p>
            <ul className="list-disc list-outside pl-6 space-y-2 mb-6">
              <li>Which protocol you are currently enrolled in (e.g. Pressure Valve, System Overload)</li>
              <li>Your selected duration and intensity level</li>
              <li>Your current day and completed days within a protocol</li>
              <li>Daily streak count and longest streak achieved</li>
            </ul>

            <h3 className="text-xl font-bold text-tactical-green-bright uppercase tracking-wide mb-3 mt-6">
              3.3 Self-Assessment Data
            </h3>
            <p className="mb-3">
              Before and after each daily mission, you provide self-assessment scores:
            </p>
            <ul className="list-disc list-outside pl-6 space-y-2 mb-6">
              <li>Pre-mission check-ins: stress level (0–10), anger level (0–10), focus level (0–10)</li>
              <li>Post-mission check-ins: improvement ratings</li>
              <li>Mission rating scores</li>
            </ul>

            <h3 className="text-xl font-bold text-tactical-green-bright uppercase tracking-wide mb-3 mt-6">
              3.4 Field Notes
            </h3>
            <p className="mb-6">
              You may choose to write personal observations and reflections as part of your
              protocol. These are free-text notes written entirely by you. We store them but do not
              read, analyse, or share them.
            </p>

            <h3 className="text-xl font-bold text-tactical-green-bright uppercase tracking-wide mb-3 mt-6">
              3.5 Lifetime Statistics
            </h3>
            <ul className="list-disc list-outside pl-6 space-y-2 mb-6">
              <li>Total protocols completed</li>
              <li>Total missions completed</li>
              <li>All-time longest streak</li>
            </ul>

            <h3 className="text-xl font-bold text-tactical-green-bright uppercase tracking-wide mb-3 mt-6">
              3.6 User Preferences
            </h3>
            <ul className="list-disc list-outside pl-6 space-y-2 mb-6">
              <li>Reminder settings (time, frequency)</li>
              <li>Notification preferences</li>
              <li>Onboarding completion status</li>
            </ul>

            <h3 className="text-xl font-bold text-tactical-green-bright uppercase tracking-wide mb-3 mt-6">
              3.7 Payment Data
            </h3>
            <p className="mb-6">
              Payments are processed by Stripe. We do not store your credit or debit card details.
              Stripe handles all payment information in accordance with PCI-DSS standards. We
              receive only a confirmation of payment, your email address, and a transaction
              reference from Stripe.
            </p>

            <h3 className="text-xl font-bold text-tactical-green-bright uppercase tracking-wide mb-3 mt-6">
              3.8 Technical Data
            </h3>
            <p className="mb-3">We may collect limited technical data to keep the Service running:</p>
            <ul className="list-disc list-outside pl-6 space-y-2 mb-4">
              <li>Browser type and version</li>
              <li>Device type (desktop or mobile)</li>
              <li>IP address (for security purposes only)</li>
              <li>Timestamps of when you access the Service</li>
            </ul>
            <p className="text-tactical-green-bright font-semibold">
              We do not use this data for profiling or advertising.
            </p>
          </section>

          {/* Section 4 */}
          <section id="how-we-use-data" aria-labelledby="how-we-use-data-heading">
            <h2
              id="how-we-use-data-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              4. How We Use Your Data
            </h2>
            <p className="mb-3">We use your data for the following purposes only:</p>
            <ul className="list-disc list-outside pl-6 space-y-2 mb-6">
              <li>To create and manage your account</li>
              <li>To deliver your daily missions and track your protocol progress</li>
              <li>To display your personal statistics and progress data back to you</li>
              <li>To send you reminder notifications (if you have enabled them)</li>
              <li>To process payments via Stripe</li>
              <li>To respond to support enquiries</li>
              <li>To improve the Service based on aggregated, anonymised usage patterns</li>
            </ul>
            <div className="bg-tactical-darkgray border-l-4 border-red-600 p-5">
              <p className="text-white font-bold uppercase tracking-wide text-sm mb-2">
                We do NOT use your data to:
              </p>
              <p>
                sell to third parties, build advertising profiles, train AI models on your personal
                content, or share with employers, insurers, or any other entity.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="sensitive-data" aria-labelledby="sensitive-data-heading">
            <h2
              id="sensitive-data-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              5. Sensitive Personal Data
            </h2>
            <p className="mb-4">
              We recognise that your self-assessment scores, field notes, and protocol progress data
              relate to your mental health and wellbeing. Under UK GDPR, this is classified as{' '}
              <strong className="text-white">special category data</strong> (sensitive personal
              data).
            </p>
            <p className="mb-4">
              Our lawful basis for processing this data is your{' '}
              <strong className="text-white">explicit consent</strong>, which you provide when you
              create an account and begin using the Service. You can withdraw this consent at any
              time by deleting your account (see Section 9).
            </p>
            <p className="mb-3">We apply additional safeguards to protect this data:</p>
            <ul className="list-disc list-outside pl-6 space-y-2">
              <li>
                Row-Level Security (RLS) is enabled on our database, ensuring that your data is
                only accessible to your authenticated account
              </li>
              <li>Your data is encrypted in transit using HTTPS/TLS</li>
              <li>
                Your data is stored in a secure, hosted database (Supabase) within the European
                Union
              </li>
              <li>
                We do not manually access, read, or review your individual field notes or
                self-assessment data unless you specifically ask us to for support purposes
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="storage-security" aria-labelledby="storage-security-heading">
            <h2
              id="storage-security-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              6. Data Storage and Security
            </h2>
            <dl className="space-y-4 mb-6">
              <div>
                <dt className="text-tactical-orange font-bold uppercase tracking-wide text-sm mb-1">
                  Database
                </dt>
                <dd>
                  Your data is stored in Supabase, a hosted PostgreSQL database. Our database
                  instance is located in the EU (London region where available).
                </dd>
              </div>
              <div>
                <dt className="text-tactical-orange font-bold uppercase tracking-wide text-sm mb-1">
                  Authentication
                </dt>
                <dd>
                  Managed by Supabase Auth. Passwords are hashed and never stored in plain text.
                </dd>
              </div>
              <div>
                <dt className="text-tactical-orange font-bold uppercase tracking-wide text-sm mb-1">
                  Payments
                </dt>
                <dd>
                  Processed by Stripe. Card details are handled entirely by Stripe and never touch
                  our servers.
                </dd>
              </div>
              <div>
                <dt className="text-tactical-orange font-bold uppercase tracking-wide text-sm mb-1">
                  Hosting
                </dt>
                <dd>The application is hosted on Vercel.</dd>
              </div>
            </dl>
            <p className="mb-3">We implement the following security measures:</p>
            <ul className="list-disc list-outside pl-6 space-y-2">
              <li>Encrypted connections (HTTPS) for all data transmission</li>
              <li>Row-Level Security ensuring users can only access their own data</li>
              <li>Secure authentication with email verification</li>
              <li>Environment variables for all API keys and secrets (never exposed in code)</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="data-sharing" aria-labelledby="data-sharing-heading">
            <h2
              id="data-sharing-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              7. Who We Share Your Data With
            </h2>
            <p className="mb-4">
              <strong className="text-white">We do not sell your data.</strong> We share data only
              with the following service providers who are necessary to operate the Service:
            </p>
            <ul className="list-disc list-outside pl-6 space-y-2 mb-4">
              <li>
                <strong className="text-white">Supabase</strong> — database hosting and
                authentication (processes your account and progress data)
              </li>
              <li>
                <strong className="text-white">Vercel</strong> — application hosting (processes
                technical data such as IP address)
              </li>
              <li>
                <strong className="text-white">Stripe</strong> — payment processing (processes your
                email and payment information)
              </li>
              <li>
                <strong className="text-white">Google</strong> — only if you choose to sign in via
                Google (provides your email and name to us)
              </li>
              <li>
                <strong className="text-white">Mailchimp</strong> — email marketing (processes your
                email address if you signed up via our waitlist)
              </li>
            </ul>
            <p>
              Each of these providers has their own privacy policy and operates under data
              processing agreements.{' '}
              <strong className="text-white">
                We do not share your self-assessment data, field notes, or protocol progress with
                any of these providers.
              </strong>
            </p>
          </section>

          {/* Section 8 */}
          <section id="retention" aria-labelledby="retention-heading">
            <h2
              id="retention-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              8. How Long We Keep Your Data
            </h2>
            <p className="mb-3">
              We retain your data for as long as you have an active account. If you delete your
              account, we will delete all of your personal data within{' '}
              <strong className="text-white">30 days</strong>, including:
            </p>
            <ul className="list-disc list-outside pl-6 space-y-2 mb-4">
              <li>Your profile and account information</li>
              <li>All protocol progress data</li>
              <li>All self-assessment check-ins</li>
              <li>All field notes</li>
              <li>All lifetime statistics</li>
              <li>All user preferences</li>
            </ul>
            <p>
              We may retain anonymised, aggregated statistical data (e.g. &ldquo;65% of users
              completed the 14-day protocol&rdquo;) that cannot be linked back to any individual. We
              may also retain records of financial transactions as required by UK tax law (typically
              6 years).
            </p>
          </section>

          {/* Section 9 */}
          <section id="your-rights" aria-labelledby="your-rights-heading">
            <h2
              id="your-rights-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              9. Your Rights
            </h2>
            <p className="mb-4">Under UK GDPR, you have the following rights:</p>
            <dl className="space-y-4 mb-6">
              <div>
                <dt className="text-tactical-green-bright font-bold">Right of access</dt>
                <dd className="text-gray-300 mt-1">
                  You can request a copy of all personal data we hold about you.
                </dd>
              </div>
              <div>
                <dt className="text-tactical-green-bright font-bold">Right to rectification</dt>
                <dd className="text-gray-300 mt-1">
                  You can ask us to correct any inaccurate data.
                </dd>
              </div>
              <div>
                <dt className="text-tactical-green-bright font-bold">Right to erasure</dt>
                <dd className="text-gray-300 mt-1">
                  You can ask us to delete your account and all associated data.
                </dd>
              </div>
              <div>
                <dt className="text-tactical-green-bright font-bold">Right to restrict processing</dt>
                <dd className="text-gray-300 mt-1">
                  You can ask us to temporarily stop processing your data.
                </dd>
              </div>
              <div>
                <dt className="text-tactical-green-bright font-bold">Right to data portability</dt>
                <dd className="text-gray-300 mt-1">
                  You can request your data in a machine-readable format (JSON or CSV).
                </dd>
              </div>
              <div>
                <dt className="text-tactical-green-bright font-bold">Right to withdraw consent</dt>
                <dd className="text-gray-300 mt-1">
                  You can withdraw consent at any time by deleting your account.
                </dd>
              </div>
              <div>
                <dt className="text-tactical-green-bright font-bold">Right to complain</dt>
                <dd className="text-gray-300 mt-1">
                  You have the right to lodge a complaint with the Information Commissioner&apos;s
                  Office (ICO) at{' '}
                  <a
                    href="https://ico.org.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tactical-orange hover:text-tactical-orange-bright underline"
                  >
                    ico.org.uk
                  </a>
                  .
                </dd>
              </div>
            </dl>
            <div className="bg-tactical-darkgray border-l-4 border-tactical-orange p-5">
              <p>
                To exercise any of these rights, email us at{' '}
                <a
                  href="mailto:requests@rebuildthemanprotocol.com"
                  className="text-tactical-orange hover:text-tactical-orange-bright font-bold underline"
                >
                  requests@rebuildthemanprotocol.com
                </a>
                . We will respond within 30 days.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="cookies" aria-labelledby="cookies-heading">
            <h2
              id="cookies-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              10. Cookies
            </h2>
            <p className="mb-4">
              We use <strong className="text-white">essential cookies only</strong>. These are
              required for the Service to function (e.g. keeping you logged in). We do not use
              advertising cookies, tracking cookies, or third-party analytics cookies that identify
              you personally.
            </p>
            <p>
              If we introduce analytics in the future (e.g. Plausible Analytics), we will use
              privacy-focused tools that do not use cookies or track individuals.
            </p>
          </section>

          {/* Section 11 */}
          <section id="children" aria-labelledby="children-heading">
            <h2
              id="children-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              11. Children
            </h2>
            <p>
              The Rebuild The Man Protocol is designed for adults{' '}
              <strong className="text-white">aged 18 and over</strong>. We do not knowingly collect
              data from anyone under 18. If we become aware that we have collected data from a
              minor, we will delete it immediately.
            </p>
          </section>

          {/* Section 12 */}
          <section id="international" aria-labelledby="international-heading">
            <h2
              id="international-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              12. International Data Transfers
            </h2>
            <p>
              Our primary data storage is within the European Union / United Kingdom. Some of our
              service providers (Vercel, Stripe) may process data in the United States. Where this
              occurs, appropriate safeguards are in place, including Standard Contractual Clauses
              approved by the UK Information Commissioner&apos;s Office.
            </p>
          </section>

          {/* Section 13 */}
          <section id="changes" aria-labelledby="changes-heading">
            <h2
              id="changes-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              13. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. If we make significant changes,
              we will notify you via email or through a notice in the app. The &ldquo;Last
              updated&rdquo; date at the top of this policy will always reflect the most recent
              version.
            </p>
          </section>

          {/* Section 14 */}
          <section id="contact" aria-labelledby="contact-heading">
            <h2
              id="contact-heading"
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4 scroll-mt-24"
            >
              14. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, your data, or your rights, please
              contact us:
            </p>
            <dl className="bg-tactical-darkgray border-l-4 border-tactical-green p-5 space-y-2 mb-6">
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-tactical-orange font-mono text-sm uppercase sm:min-w-[11rem]">
                  Data &amp; privacy:
                </dt>
                <dd>
                  <a
                    href="mailto:requests@rebuildthemanprotocol.com"
                    className="text-white hover:text-tactical-orange transition-colors underline"
                  >
                    requests@rebuildthemanprotocol.com
                  </a>
                  <span className="text-gray-400 text-sm"> (privacy policy, your data, UK GDPR rights)</span>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-tactical-orange font-mono text-sm uppercase sm:min-w-[11rem]">
                  General contact:
                </dt>
                <dd>
                  <a
                    href="mailto:info@rebuildthemanprotocol.com"
                    className="text-white hover:text-tactical-orange transition-colors underline"
                  >
                    info@rebuildthemanprotocol.com
                  </a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-tactical-orange font-mono text-sm uppercase sm:min-w-[11rem]">
                  App support:
                </dt>
                <dd>
                  <a
                    href="mailto:support@rebuildthemanprotocol.com"
                    className="text-white hover:text-tactical-orange transition-colors underline"
                  >
                    support@rebuildthemanprotocol.com
                  </a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-tactical-orange font-mono text-sm uppercase sm:w-24">
                  Website:
                </dt>
                <dd className="text-white">rebuildthemanprotocol.com</dd>
              </div>
            </dl>
            <p className="mb-3">
              If you are not satisfied with our response, you have the right to contact the{' '}
              <strong className="text-white">Information Commissioner&apos;s Office (ICO)</strong>:
            </p>
            <dl className="bg-tactical-darkgray border-l-4 border-tactical-lightgray p-5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-tactical-orange font-mono text-sm uppercase sm:w-24">
                  Website:
                </dt>
                <dd>
                  <a
                    href="https://ico.org.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-tactical-orange transition-colors underline"
                  >
                    ico.org.uk
                  </a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-tactical-orange font-mono text-sm uppercase sm:w-24">
                  Phone:
                </dt>
                <dd className="text-white">0303 123 1113</dd>
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
