'use client';

import Link from 'next/link';
import { useProgress } from '@/contexts/ProgressContext';
import { protocols } from '@/data/protocols';

export default function ProgressDashboard() {
  const { activeProtocol, completedProtocols } = useProgress();

  if (!activeProtocol && completedProtocols.length === 0) {
    return null;
  }

  const currentProtocol = activeProtocol 
    ? protocols.find(p => p.id === activeProtocol.protocolId)
    : null;

  const completionPercentage = activeProtocol
    ? Math.round((activeProtocol.completedDays.length / activeProtocol.duration) * 100)
    : 0;

  return (
    <div className="bg-tactical-darkgray border-b-2 border-tactical-orange">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Active Protocol Info */}
          {activeProtocol && currentProtocol && (
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs text-tactical-orange font-mono uppercase mb-1">
                  Active Protocol
                </div>
                <div className="text-white font-bold">
                  {currentProtocol.title}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-1">Progress</div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-tactical-gray rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-tactical-green-bright transition-all"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <span className="text-tactical-green-bright text-sm font-bold">
                    {completionPercentage}%
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-1">Current Day</div>
                <div className="text-white font-bold">
                  Day {activeProtocol.currentDay} of {activeProtocol.duration}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-1">Streak</div>
                <div className="text-tactical-orange font-bold">
                  {activeProtocol.streak} {activeProtocol.streak === 1 ? 'day' : 'days'}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/protocol/${activeProtocol.protocolId}/mission/${activeProtocol.currentDay}?duration=${activeProtocol.duration}`}
                  className="btn-primary text-sm py-2 px-4"
                >
                  CONTINUE →
                </Link>
                <Link
                  href="/stats"
                  className="btn-secondary text-sm py-2 px-4"
                >
                  VIEW STATS
                </Link>
              </div>
            </div>
          )}

          {/* Completed Protocols Count */}
          {!activeProtocol && completedProtocols.length > 0 && (
            <div className="flex items-center gap-4">
              <div>
                <div className="text-xs text-tactical-green-bright font-mono uppercase mb-1">
                  Protocols Completed
                </div>
                <div className="text-white font-bold text-2xl">
                  {completedProtocols.length}
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/" className="btn-primary text-sm py-2 px-4">
                  START NEW PROTOCOL
                </Link>
                <Link href="/stats" className="btn-secondary text-sm py-2 px-4">
                  VIEW STATS
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

