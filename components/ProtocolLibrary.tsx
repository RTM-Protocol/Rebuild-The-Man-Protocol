'use client';

import Link from 'next/link';
import { protocols } from '@/data/protocols';
import ProtocolIcon from '@/components/ProtocolIcon';
import { UserProgress } from '@/types';
import { getProtocolVisualTheme } from '@/lib/protocolVisualTheme';

interface ProtocolLibraryProps {
  activeProtocol?: UserProgress | null;
}

export default function ProtocolLibrary({ activeProtocol }: ProtocolLibraryProps) {
  const browsingAccent = activeProtocol
    ? getProtocolVisualTheme(activeProtocol.protocolId)?.hex ?? '#ff6b35'
    : undefined;

  return (
    <div>
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white uppercase mb-3">
          Protocol Library
        </h2>
        {activeProtocol ? (
          <div
            className="bg-tactical-orange/10 border-l-4 p-4 text-left max-w-4xl mx-auto"
            style={{ borderLeftColor: browsingAccent }}
          >
            <p className="text-tactical-orange text-sm font-bold uppercase mb-1">
              Browsing Mode
            </p>
            <p className="text-gray-300 text-sm">
              You&apos;re currently on{' '}
              <Link 
                href={`/protocol/${activeProtocol.protocolId}`}
                className="font-bold text-white hover:text-tactical-green-bright transition-colors"
              >
                {protocols.find(p => p.id === activeProtocol.protocolId)?.title}
              </Link>
              {' '}(Day {activeProtocol.currentDay}). 
              You can browse other protocols, but must complete or reset your current one to start a new protocol.
            </p>
          </div>
        ) : (
          <p className="text-gray-400 text-lg">
            Choose a protocol to begin your rebuild journey
          </p>
        )}
      </div>

      {/* Featured Protocol */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 w-12 bg-tactical-orange"></div>
          <h3 className="text-sm font-bold text-tactical-orange uppercase tracking-wider">
            Featured Protocol
          </h3>
          <Link
            href="/protocol/rebuild-the-man"
            className="bg-tactical-green text-white px-3 py-1 text-xs font-bold uppercase hover:bg-tactical-green-bright transition-colors cursor-pointer"
          >
            START HERE IF UNSURE
          </Link>
        </div>
        
        <Link
          href="/protocol/rebuild-the-man"
          className="block bg-gradient-to-r from-tactical-darkgray to-tactical-gray border-2 border-tactical-green p-8 group transition-all hover:border-tactical-green-bright"
        >
          <div className="flex flex-col items-center text-center">
          <div className="text-6xl mb-4 breathe-animation">
            <ProtocolIcon protocolId="rebuild-the-man" />
          </div>
            <div className="w-full">
              <h3 className="font-brand text-3xl font-bold group-hover:text-tactical-orange transition-colors uppercase mb-2" style={{ color: '#faf9f5' }}>
                Rebuild The Man
              </h3>
              <p className="text-tactical-green-bright font-mono text-sm mb-4">
                COMPLETE MENTAL RECONSTRUCTION // 14 DAYS
              </p>
              <p className="text-gray-300 leading-relaxed mb-4 max-w-3xl mx-auto">
                Lost your edge? Operating on autopilot? This intensive 14-day protocol reconstructs 
                your mental framework through deliberate action, deep reflection, and progressive challenges.
              </p>
              <div className="flex gap-3 mb-4 justify-center">
                <span className="bg-tactical-gray text-white px-3 py-1 text-xs font-mono border border-tactical-lightgray">
                  14 DAYS
                </span>
                <span className="bg-tactical-gray text-white px-3 py-1 text-xs font-mono border border-tactical-lightgray">
                  MENTAL STRENGTH
                </span>
                <span className="bg-tactical-gray text-white px-3 py-1 text-xs font-mono border border-tactical-lightgray">
                  PROGRESSIVE
                </span>
              </div>
              <div className={`font-bold text-sm uppercase tracking-wider ${
                activeProtocol ? 'text-gray-500' : 'text-tactical-green-bright'
              }`}>
                {activeProtocol ? 'VIEW DETAILS →' : 'START PROTOCOL →'}
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Other Protocols */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 w-12 bg-tactical-green"></div>
          <h3 className="text-sm font-bold text-tactical-green-bright uppercase tracking-wider">
            More Protocols
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {protocols.filter(p => p.id !== 'rebuild-the-man').map((protocol) => (
            <Link
              key={protocol.id}
              href={`/protocol/${protocol.id}`}
              className="protocol-card p-6 group block"
            >
              {/* Icon & Title */}
              <div className="flex flex-col items-center text-center mb-4">
                <div className="text-4xl mb-3 breathe-animation">
                  <ProtocolIcon protocolId={protocol.id} />
                </div>
                <div className="w-full">
                  <h3 className="text-xl font-bold text-white group-hover:text-tactical-green-bright transition-colors uppercase">
                    {protocol.title}
                  </h3>
                  <p className="text-tactical-orange text-sm font-mono mt-1">
                    {protocol.tagline}
                  </p>
                </div>
              </div>

              {/* Problem Description */}
              <div className="mb-4 text-center">
                <p className="text-gray-300 leading-relaxed">
                  {protocol.problem}
                </p>
              </div>

              {/* Duration Options */}
              <div className="flex gap-2 mb-4 justify-center">
                {protocol.durations.map((duration) => (
                  <span
                    key={duration}
                    className="bg-tactical-gray text-white px-3 py-1 text-xs font-mono border border-tactical-lightgray"
                  >
                    {duration} DAYS
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center justify-center text-tactical-green-bright font-bold text-sm uppercase tracking-wider group-hover:text-tactical-orange transition-colors">
                <span>VIEW PROTOCOL</span>
                <span className="ml-2 group-hover:ml-3 transition-all">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Emergency Tools Banner */}
      <div className="mt-16 pt-8 border-t border-tactical-lightgray">
        <div className="bg-red-900/20 border-2 border-red-700 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="text-6xl emergency-light">🚨</span>
              <div>
                <h3 className="text-white font-bold uppercase text-lg mb-1">
                  In Crisis? Need Immediate Help?
                </h3>
                <p className="text-gray-400 text-sm">
                  If you&apos;re in acute distress right now, our emergency protocols provide 
                  3-5 minute relief tools for immediate situations. These are designed for when 
                  you can&apos;t wait for a full protocol.
                </p>
              </div>
            </div>
            <Link
              href="/emergency-tools"
              className="bg-red-900 hover:bg-red-800 text-white font-bold uppercase px-6 py-3 transition-colors flex-shrink-0 whitespace-nowrap"
            >
              Emergency Tools →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
