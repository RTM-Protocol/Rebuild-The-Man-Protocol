'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import StatsOverview from '@/components/StatsOverview';
import RebuildStatus from '@/components/RebuildStatus';
import CheckInHistory from '@/components/CheckInHistory';
import Footer from '@/components/Footer';
import { useProgress } from '@/contexts/ProgressContext';
import { protocols } from '@/data/protocols';

export default function StatsPage() {
  const { activeProtocol, completedProtocols } = useProgress();

  const currentProtocol = activeProtocol 
    ? protocols.find(p => p.id === activeProtocol.protocolId)
    : null;

  return (
    <div className="min-h-screen bg-tactical-black">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-tactical-orange hover:text-tactical-orange-bright text-sm font-bold uppercase">
              ← Back to Protocols
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-white uppercase tracking-tight mb-2">
            Progress Statistics
          </h1>
          <p className="text-gray-400 text-lg">
            Your rebuild journey by the numbers
          </p>
        </div>

        {/* Active Protocol Status */}
        {activeProtocol && currentProtocol && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white uppercase mb-4">
              Current Protocol
            </h2>
            <div className="bg-tactical-darkgray border-l-4 border-tactical-orange p-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-white">
                  {currentProtocol.title}
                </h3>
                <Link
                  href={`/protocol/${activeProtocol.protocolId}/mission/${activeProtocol.currentDay}?duration=${activeProtocol.duration}`}
                  className="btn-primary text-sm"
                >
                  CONTINUE DAY {activeProtocol.currentDay}
                </Link>
              </div>
              <p className="text-gray-300 mb-4">{currentProtocol.tagline}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Duration</div>
                  <div className="text-white font-bold">{activeProtocol.duration} days</div>
                </div>
                <div>
                  <div className="text-gray-400">Started</div>
                  <div className="text-white font-bold">
                    {new Date(activeProtocol.startDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Completed</div>
                  <div className="text-white font-bold">
                    {activeProtocol.completedDays.length} / {activeProtocol.duration}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Last Active</div>
                  <div className="text-white font-bold">
                    {activeProtocol.lastCompletedDate 
                      ? new Date(activeProtocol.lastCompletedDate).toLocaleDateString()
                      : 'Not started'
                    }
                  </div>
                </div>
              </div>
            </div>
            <RebuildStatus />
          </div>
        )}

        {/* Check-In History */}
        {activeProtocol && activeProtocol.checkIns && activeProtocol.checkIns.length > 0 && (
          <CheckInHistory checkIns={activeProtocol.checkIns} />
        )}

        {/* Stats Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white uppercase mb-4">
            Overall Statistics
          </h2>
          <StatsOverview />
        </div>

        {/* Completed Protocols */}
        {completedProtocols.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white uppercase mb-4">
              Completed Protocols ({completedProtocols.length})
            </h2>
            <div className="space-y-4">
              {completedProtocols.map((completed, index) => {
                const protocol = protocols.find(p => p.id === completed.protocolId);
                if (!protocol) return null;
                
                return (
                  <div 
                    key={index}
                    className="bg-tactical-darkgray border-l-4 border-tactical-green p-6 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl breathe-animation">{protocol.icon}</div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {protocol.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {completed.duration} days • Completed {new Date(completed.completedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-tactical-green-bright text-3xl">
                      ✓
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Setbacks Log */}
        {activeProtocol && activeProtocol.setbacks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white uppercase mb-4">
              Setbacks & Learnings
            </h2>
            <div className="bg-tactical-darkgray border border-tactical-lightgray p-6">
              <div className="space-y-4">
                {activeProtocol.setbacks.map((setback, index) => (
                  <div key={index} className="bg-tactical-gray p-4 border-l-4 border-red-600">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-red-500 font-bold text-sm">Day {setback.day}</span>
                        <span className="text-gray-400 text-sm ml-3">
                          {new Date(setback.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {setback.note && (
                      <p className="text-gray-300 text-sm italic">&ldquo;{setback.note}&rdquo;</p>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-tactical-orange text-sm mt-4 font-bold">
                Every setback is data. Use it to rebuild stronger.
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!activeProtocol && completedProtocols.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📊</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              No Stats Yet
            </h2>
            <p className="text-gray-400 mb-8">
              Start a protocol to begin tracking your progress
            </p>
            <Link href="/" className="btn-primary inline-block">
              BROWSE PROTOCOLS
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

