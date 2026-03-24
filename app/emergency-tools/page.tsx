'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { emergencyProtocols } from '@/data/emergencyProtocols';
import { crisisResources } from '@/data/crisisResources';

export default function EmergencyToolsPage() {
  const [selectedCountry, setSelectedCountry] = useState('US');
  return (
    <div className="min-h-screen bg-tactical-black">
      <Navigation />

      {/* Header */}
      <header className="bg-tactical-darkgray border-b-2 border-red-600">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="mb-4">
            <Link
              href="/"
              className="text-tactical-orange hover:text-tactical-orange-bright text-sm font-bold uppercase transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl emergency-light">🚨</span>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight">
                Emergency Protocols
              </h1>
            </div>
          </div>
          
          <p className="text-xl text-gray-300 max-w-3xl">
            Quick relief tools for when you need help right now. Pick your situation, follow the steps, regain control.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Important Notice */}
        <div className="mb-12 bg-red-900/20 border-l-4 border-red-600 p-6">
          <h2 className="text-red-400 font-bold uppercase text-sm mb-3 flex items-center gap-2">
            <span>⚠️</span>
            <span>When to Use These</span>
          </h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            These are emergency first-aid techniques for acute situations. They&apos;re designed to help you regain control quickly when you&apos;re in distress.
          </p>
          <p className="text-gray-300 leading-relaxed font-bold">
            These are NOT replacements for full protocols or professional care. Use them for immediate relief, then address the root cause with a full protocol.
          </p>
        </div>

        {/* Emergency Protocol Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {emergencyProtocols.map((protocol) => (
            <Link
              key={protocol.id}
              href={`/emergency-tools/${protocol.id}`}
              className="bg-tactical-darkgray border-2 border-tactical-lightgray hover:border-red-600 p-6 transition-all hover:scale-105 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl breathe-animation">
                  {protocol.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white uppercase mb-2 group-hover:text-red-500 transition-colors">
                    {protocol.name}
                  </h3>
                  <div className="text-tactical-orange font-mono text-xs mb-2">
                    ⏱ {protocol.estimatedTime}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-gray-400 text-sm uppercase tracking-wide mb-2">
                  Use When:
                </div>
                <p className="text-gray-300 leading-relaxed italic">
                  {protocol.useWhen}
                </p>
              </div>

              <div className="text-red-500 font-bold uppercase text-sm flex items-center gap-2 group-hover:text-red-400 transition-colors">
                <span>View Protocol</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Crisis Resources */}
        <div className="bg-tactical-darkgray border-2 border-red-600 p-8">
          <h2 className="text-2xl font-bold text-white uppercase mb-4 flex items-center gap-3">
            <span className="text-3xl">🆘</span>
            <span>In Crisis? Get Real Help</span>
          </h2>
          
          <p className="text-gray-300 leading-relaxed mb-6">
            These emergency protocols are for manageable acute situations. If you&apos;re experiencing a crisis (suicidal thoughts, severe mental health symptoms, danger to yourself or others), seek immediate professional help:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Country Selector */}
            <div className="md:col-span-4">
              <label className="text-white font-bold uppercase text-sm mb-3 block">
                Select Your Country:
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-tactical-black border-2 border-tactical-lightgray text-white px-4 py-3 font-bold uppercase text-sm focus:border-red-500 focus:outline-none"
              >
                {crisisResources.map((resource) => (
                  <option key={resource.countryCode} value={resource.countryCode}>
                    {resource.country}
                  </option>
                ))}
              </select>
            </div>

            {/* Crisis Resources Display */}
            <div className="md:col-span-8">
              {(() => {
                const resource = crisisResources.find(r => r.countryCode === selectedCountry);
                if (!resource) return null;

                return (
                  <div className="bg-tactical-gray p-6 border-l-4 border-red-500">
                    <div className="font-bold text-white mb-4 uppercase text-sm">
                      {resource.country} Crisis Resources
                    </div>
                    <div className="text-gray-300 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-red-500 font-bold flex-shrink-0 emergency-light">🚨</span>
                        <div className="text-sm">
                          <div className="text-gray-400">Emergency Services:</div>
                          <div className="text-white font-bold text-lg">{resource.emergency}</div>
                        </div>
                      </div>

                      {resource.suicidePrevention && (
                        <div className="flex items-start gap-3">
                          <span className="text-red-500 font-bold flex-shrink-0">☎️</span>
                          <div className="text-sm">
                            <div className="text-gray-400">Suicide Prevention:</div>
                            <div className="text-white font-bold text-lg">{resource.suicidePrevention}</div>
                          </div>
                        </div>
                      )}

                      {resource.crisisLine && (
                        <div className="flex items-start gap-3">
                          <span className="text-red-500 font-bold flex-shrink-0">📞</span>
                          <div className="text-sm">
                            <div className="text-gray-400">Crisis Line:</div>
                            <div className="text-white font-bold text-lg">{resource.crisisLine}</div>
                          </div>
                        </div>
                      )}

                      {resource.textLine && (
                        <div className="flex items-start gap-3">
                          <span className="text-red-500 font-bold flex-shrink-0">💬</span>
                          <div className="text-sm">
                            <div className="text-gray-400">Text Support:</div>
                            <div className="text-white font-bold">{resource.textLine}</div>
                          </div>
                        </div>
                      )}

                      {resource.additional && resource.additional.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-tactical-lightgray">
                          <div className="text-gray-400 text-xs uppercase mb-2">Additional Resources:</div>
                          {resource.additional.map((add, index) => (
                            <div key={index} className="text-sm mb-1">
                              <span className="text-gray-400">{add.name}:</span>
                              <span className="text-white font-bold ml-2">{add.number}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          <p className="text-red-400 text-sm mt-6 font-bold">
            If you&apos;re in immediate danger, put the phone down and call emergency services. These tools cannot help you in a true crisis.
          </p>
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Need more than emergency relief?
          </p>
          <Link
            href="/"
            className="btn-primary inline-block"
          >
            Browse Full Protocols
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}



