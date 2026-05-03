import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { protocols } from '@/data/protocols';
import { emergencyProtocols } from '@/data/emergencyProtocols';

export const metadata: Metadata = {
  title: 'Sitemap | The Rebuild Protocol',
  description: 'Navigate all pages of The Rebuild Protocol.',
};

function LinkList({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.href + item.label}>
          <Link
            href={item.href}
            className="text-tactical-orange hover:text-tactical-orange-bright font-semibold text-sm sm:text-base transition-colors"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SitemapPage() {
  const protocolLinks = protocols.flatMap((p) => {
    const d = p.durations[0];
    return [
      { href: `/protocol/${p.id}`, label: `${p.title} — Overview` },
      {
        href: `/protocol/${p.id}/mission/1?duration=${d}`,
        label: `${p.title} — Example: Day 1 mission`,
      },
      {
        href: `/protocol/${p.id}/history?duration=${d}`,
        label: `${p.title} — Mission history`,
      },
      {
        href: `/protocol/${p.id}/complete?duration=${d}`,
        label: `${p.title} — Completion summary`,
      },
    ];
  });

  const emergencyLinks = [
    { href: '/emergency-tools', label: 'Emergency tools — Index' },
    ...emergencyProtocols.map((e) => ({
      href: `/emergency-tools/${e.id}`,
      label: `Emergency — ${e.name}`,
    })),
  ];

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
            Navigation
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4 leading-tight">
            Sitemap
          </h1>
          <p className="font-brand text-lg sm:text-xl">
            <span style={{ color: '#faf9f5' }}>Rebuild The Man</span>{' '}
            <span style={{ color: '#cc6119' }}>Protocol</span>
          </p>
        </header>

        <div className="space-y-10 text-gray-200">
          <section className="bg-tactical-darkgray border border-tactical-lightgray p-6">
            <h2 className="text-white font-bold uppercase text-lg mb-4 flex items-center gap-2">
              <span className="text-tactical-orange">▸</span> Main
            </h2>
            <LinkList
              items={[
                { href: '/', label: 'Home (dashboard & protocols)' },
                { href: '/landing', label: 'Landing / Marketing' },
                { href: '/stats', label: 'Stats & progress' },
              ]}
            />
          </section>

          <section className="bg-tactical-darkgray border border-tactical-lightgray p-6">
            <h2 className="text-white font-bold uppercase text-lg mb-4 flex items-center gap-2">
              <span className="text-tactical-orange">▸</span> Protocols
            </h2>
            <LinkList items={protocolLinks} />
          </section>

          <section className="bg-tactical-darkgray border border-tactical-lightgray p-6">
            <h2 className="text-white font-bold uppercase text-lg mb-4 flex items-center gap-2">
              <span className="text-tactical-orange">▸</span> Emergency
            </h2>
            <LinkList items={emergencyLinks} />
          </section>

          <section className="bg-tactical-darkgray border border-tactical-lightgray p-6">
            <h2 className="text-white font-bold uppercase text-lg mb-4 flex items-center gap-2">
              <span className="text-tactical-orange">▸</span> Account
            </h2>
            <LinkList items={[{ href: '/settings', label: 'Settings' }]} />
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              This build does not expose separate login or sign-up URLs; access is through your
              browser session and local progress storage. Use <strong className="text-gray-300">Settings</strong> to manage the app.
            </p>
          </section>

          <section className="bg-tactical-darkgray border border-tactical-lightgray p-6">
            <h2 className="text-white font-bold uppercase text-lg mb-4 flex items-center gap-2">
              <span className="text-tactical-orange">▸</span> Help &amp; Information
            </h2>
            <LinkList
              items={[
                { href: '/faq', label: 'FAQs' },
                { href: '/support', label: 'Support (technical help)' },
                { href: '/contact', label: 'Contact' },
                { href: '/emergency-tools', label: 'Emergency tools' },
                { href: '/sitemap-page', label: 'Sitemap (this page)' },
              ]}
            />
          </section>

          <section className="bg-tactical-darkgray border border-tactical-lightgray p-6">
            <h2 className="text-white font-bold uppercase text-lg mb-4 flex items-center gap-2">
              <span className="text-tactical-orange">▸</span> Legal
            </h2>
            <LinkList items={[{ href: '/privacy', label: 'Privacy Policy' }]} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
