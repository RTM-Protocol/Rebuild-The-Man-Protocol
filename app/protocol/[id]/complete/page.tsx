'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { protocols } from '@/data/protocols';
import { ProtocolDuration, UserProgress } from '@/types';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import StatCard from '@/components/StatCard';
import { useProgress } from '@/contexts/ProgressContext';
import { getStatsForProtocol } from '@/data/mentalHealthStats';
import { useState, useEffect } from 'react';

export default function ProtocolComplete() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { completedProtocols, activeProtocol } = useProgress();
  const [completedData, setCompletedData] = useState<UserProgress | null>(null);
  
  const protocolId = params.id as string;
  const duration = parseInt(searchParams.get('duration') || '7') as ProtocolDuration;
  
  const protocol = protocols.find(p => p.id === protocolId);
  
  // Load the persisted protocol data (saved before activeProtocol was cleared)
  useEffect(() => {
    if (activeProtocol && activeProtocol.protocolId === protocolId) {
      setCompletedData(activeProtocol);
    } else {
      try {
        const saved = localStorage.getItem('lastCompletedProtocolData');
        if (saved) {
          const parsed = JSON.parse(saved) as UserProgress;
          if (parsed.protocolId === protocolId) {
            setCompletedData(parsed);
          }
        }
      } catch {
        // Ignore parse errors
      }
    }
  }, [activeProtocol, protocolId]);

  // Find the most recent completion for this protocol
  const completedProtocol = completedProtocols
    .filter(p => p.protocolId === protocolId)
    .sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime())[0];

  if (!protocol) {
    return (
      <div className="min-h-screen bg-tactical-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">PROTOCOL NOT FOUND</h1>
          <Link href="/" className="btn-primary inline-block">
            Return to Base
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tactical-black">
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <header className="border-b-2 border-tactical-green bg-tactical-darkgray">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: 'Protocols', href: '/' },
              { label: protocol.title, href: `/protocol/${protocolId}` },
              { label: 'Complete' }
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight text-tactical-green-bright uppercase mt-2">
            Protocol Complete
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-6">✓</div>
          <h2 className="text-4xl font-bold text-white mb-4 uppercase">
            {protocol.title}
          </h2>
          <p className="text-tactical-green-bright text-xl font-mono">
            {duration}-DAY PROTOCOL COMPLETED
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-tactical-darkgray border-2 border-tactical-green p-6 text-center">
            <div className="text-tactical-green-bright text-4xl font-bold mb-2">
              {duration}
            </div>
            <div className="text-gray-400 text-sm uppercase tracking-wide">
              Days Completed
            </div>
          </div>
          
          <div className="bg-tactical-darkgray border-2 border-tactical-green p-6 text-center">
            <div className="text-tactical-green-bright text-4xl font-bold mb-2">
              {completedProtocols.length}
            </div>
            <div className="text-gray-400 text-sm uppercase tracking-wide">
              Total Completed
            </div>
          </div>
          
          <div className="bg-tactical-darkgray border-2 border-tactical-green p-6 text-center">
            <div className="text-tactical-green-bright text-4xl font-bold mb-2">
              100%
            </div>
            <div className="text-gray-400 text-sm uppercase tracking-wide">
              Completion Rate
            </div>
          </div>
        </div>

        {/* Message */}
        <section className="mb-12 bg-tactical-darkgray border-l-4 border-tactical-green p-8">
          <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-xl">
            System Status: Operational
          </h3>
          <p className="text-gray-200 leading-relaxed text-lg mb-4">
            You&apos;ve completed all {duration} missions. The work you put in has recalibrated your system. 
            Changes compound over time - what you&apos;ve built here continues to run in the background.
          </p>
          <p className="text-gray-200 leading-relaxed text-lg">
            This isn&apos;t a one-time fix. Mental maintenance is ongoing. When you notice the same 
            system starting to degrade, run this protocol again. Or deploy a different one.
          </p>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <h3 className="text-white font-bold uppercase tracking-wide mb-6 text-xl">
            Next Steps
          </h3>
          
          <div className="space-y-4">
            <div className="bg-tactical-gray p-6 border-l-4 border-tactical-orange">
              <h4 className="text-tactical-orange font-bold mb-2 uppercase text-sm">
                Option 1: Maintain Current System
              </h4>
              <p className="text-gray-200">
                Continue the habits that worked. Keep the pressure valves installed. 
                Monitor for degradation.
              </p>
            </div>
            
            <div className="bg-tactical-gray p-6 border-l-4 border-tactical-orange">
              <h4 className="text-tactical-orange font-bold mb-2 uppercase text-sm">
                Option 2: Deploy Another Protocol
              </h4>
              <p className="text-gray-200">
                Different systems need different repairs. Choose your next protocol.
              </p>
            </div>
            
            <div className="bg-tactical-gray p-6 border-l-4 border-tactical-orange">
              <h4 className="text-tactical-orange font-bold mb-2 uppercase text-sm">
                Option 3: Extended Mission
              </h4>
              <p className="text-gray-200">
                Run this same protocol for a longer duration to deepen the calibration.
              </p>
            </div>
          </div>
        </section>

        {/* Performance Summary */}
        {completedProtocol && completedData?.weeklyBriefs && completedData.weeklyBriefs.length > 0 && (
          <section className="mb-12 bg-tactical-darkgray border-l-4 border-tactical-green p-6">
            <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-xl flex items-center gap-2">
              <span>📊</span>
              <span>Performance Summary</span>
            </h3>
            <p className="text-gray-300 mb-4">
              You completed {completedData.weeklyBriefs.length} weekly performance review{completedData.weeklyBriefs.length > 1 ? 's' : ''}. 
              {completedData.weeklyBriefs.some(b => b.briefData.performanceTier === 'elite') && (
                <span className="text-tactical-green-bright font-bold"> Including elite-level execution.</span>
              )}
            </p>
            <Link
              href={`/protocol/${protocolId}/history?duration=${duration}`}
              className="btn-secondary inline-block"
            >
              Review Weekly Briefs & Field Notes
            </Link>
          </section>
        )}

        {/* Field Notes Summary */}
        {completedProtocol && completedData?.checkIns && (
          (() => {
            const notesCount = completedData.checkIns.filter(ci => ci.fieldNotes && ci.fieldNotes.length > 0).length;
            if (notesCount > 0) {
              return (
                <section className="mb-12 bg-tactical-darkgray border-l-4 border-tactical-orange p-6">
                  <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-xl flex items-center gap-2">
                    <span>📋</span>
                    <span>Your Field Notes</span>
                  </h3>
                  <p className="text-gray-300 mb-4">
                    You documented {notesCount} of {duration} missions. These notes are your record—review them anytime.
                  </p>
                  <Link
                    href={`/protocol/${protocolId}/history?duration=${duration}`}
                    className="btn-secondary inline-block"
                  >
                    Review All Field Notes
                  </Link>
                </section>
              );
            }
            return null;
          })()
        )}

        {/* Research Context - Completion Stats */}
        <section className="mb-12">
          <StatCard 
            stats={getStatsForProtocol(protocolId, 'completion')} 
            title="You Did What Most Men Don't"
          />
        </section>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="btn-primary flex-1 text-center"
          >
            BROWSE PROTOCOLS
          </Link>
          
          <Link
            href={`/protocol/${protocolId}`}
            className="btn-secondary flex-1 text-center"
          >
            RUN AGAIN
          </Link>
        </div>

        {/* Final Message */}
        <div className="mt-12 bg-tactical-black border-2 border-tactical-green p-6 text-center">
          <p className="text-tactical-green-bright font-bold text-lg uppercase tracking-wide">
            Outstanding execution. Systems nominal.
          </p>
        </div>
      </main>
    </div>
  );
}
