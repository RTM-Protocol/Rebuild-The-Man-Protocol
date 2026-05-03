'use client';

import { useProgress } from '@/contexts/ProgressContext';
import { protocols } from '@/data/protocols';
import { getProtocolVisualTheme } from '@/lib/protocolVisualTheme';

export default function RebuildStatus() {
  const { activeProtocol } = useProgress();

  if (!activeProtocol) return null;

  const protocol = protocols.find(p => p.id === activeProtocol.protocolId);
  if (!protocol) return null;

  const visual = getProtocolVisualTheme(protocol.id);
  const accentHex = visual?.hex ?? '#ff6b35';
  const progressFill = visual?.progressGradient;
  const completionPercentage = Math.round(
    (activeProtocol.completedDays.length / activeProtocol.duration) * 100
  );

  const getStatusLevel = () => {
    if (completionPercentage >= 100) return { text: 'COMPLETE', colorClass: 'text-tactical-green-bright' };
    if (completionPercentage >= 75) return { text: 'ADVANCED', colorClass: 'text-tactical-green' };
    if (completionPercentage >= 50) return { text: 'REBUILDING', colorClass: 'text-tactical-orange' };
    if (completionPercentage >= 25) return { text: 'INITIATED', colorClass: 'text-tactical-orange-bright' };
    return { text: 'BEGINNING', colorClass: 'text-gray-400' };
  };

  const status = getStatusLevel();

  return (
    <div
      className="bg-tactical-darkgray border-2 p-6"
      style={{ borderColor: accentHex }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-mono uppercase mb-1" style={{ color: accentHex }}>
            Rebuild Status
          </div>
          <h3 className={`text-2xl font-bold ${status.colorClass} uppercase tracking-wide`}>
            {status.text}
          </h3>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-white">
            {completionPercentage}%
          </div>
          <div className="text-xs text-gray-400 uppercase">
            Complete
          </div>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="mb-4">
        <div className="relative h-8 bg-tactical-gray border-2 border-tactical-lightgray overflow-hidden">
          <div 
            className="progress-fill absolute inset-y-0 left-0"
            style={{
              width: `${completionPercentage}%`,
              ...(progressFill ? { background: progressFill } : {}),
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-sm uppercase tracking-wider z-10 mix-blend-difference">
              {activeProtocol.completedDays.length} / {activeProtocol.duration} Days
            </span>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className={completionPercentage >= 25 ? 'text-tactical-orange' : 'text-gray-600'}>
          <div className="font-bold">25%</div>
          <div>STARTED</div>
        </div>
        <div className={completionPercentage >= 50 ? 'text-tactical-orange' : 'text-gray-600'}>
          <div className="font-bold">50%</div>
          <div>HALFWAY</div>
        </div>
        <div className={completionPercentage >= 75 ? 'text-tactical-green' : 'text-gray-600'}>
          <div className="font-bold">75%</div>
          <div>ADVANCED</div>
        </div>
        <div className={completionPercentage >= 100 ? 'text-tactical-green-bright' : 'text-gray-600'}>
          <div className="font-bold">100%</div>
          <div>COMPLETE</div>
        </div>
      </div>

      {/* Current Stats */}
      <div className="mt-6 pt-4 border-t border-tactical-lightgray grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-tactical-green-bright text-2xl font-bold">
            {activeProtocol.streak}
          </div>
          <div className="text-gray-400 text-xs uppercase">
            Streak
          </div>
        </div>
        <div>
          <div className="text-tactical-orange text-2xl font-bold">
            {activeProtocol.longestStreak}
          </div>
          <div className="text-gray-400 text-xs uppercase">
            Best Streak
          </div>
        </div>
        <div>
          <div className="text-blue-400 text-2xl font-bold">
            {activeProtocol.setbacks.length}
          </div>
          <div className="text-gray-400 text-xs uppercase">
            Setbacks
          </div>
        </div>
      </div>
    </div>
  );
}



