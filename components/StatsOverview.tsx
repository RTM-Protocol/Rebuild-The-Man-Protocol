'use client';

import { useProgress } from '@/contexts/ProgressContext';
import { getProtocolVisualTheme } from '@/lib/protocolVisualTheme';

export default function StatsOverview() {
  const { activeProtocol, lifetimeStats } = useProgress();

  const activeVisual = activeProtocol
    ? getProtocolVisualTheme(activeProtocol.protocolId)
    : undefined;
  const activeAccent = activeVisual?.hex ?? '#ff6b35';
  const activeProgressGradient =
    activeVisual?.progressGradient;

  const currentStreak = activeProtocol?.streak || 0;
  const protocolLongestStreak = activeProtocol?.longestStreak || 0;
  const globalLongestStreak = lifetimeStats.longestStreak;
  const totalMissions = lifetimeStats.totalMissionsCompleted;
  const totalProtocols = lifetimeStats.totalProtocolsCompleted;
  const currentDayNumber = activeProtocol?.currentDay || 0;

  return (
    <div className="bg-tactical-darkgray border border-tactical-lightgray p-6">
      <h3 className="text-white font-bold uppercase tracking-wide mb-6 text-lg flex items-center gap-2">
        <span>📊</span>
        <span>Your Stats</span>
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Current Streak */}
        <div
          className={`bg-tactical-gray p-4 border-l-4 ${!activeProtocol ? 'border-tactical-orange' : ''}`}
          style={activeProtocol ? { borderLeftColor: activeAccent } : undefined}
        >
          <div
            className={`text-sm font-mono uppercase mb-1 ${!activeProtocol ? 'text-tactical-orange' : ''}`}
            style={activeProtocol ? { color: activeAccent } : undefined}
          >
            Current Streak
          </div>
          <div className="text-white text-3xl font-bold">
            {currentStreak}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            {currentStreak === 1 ? 'day' : 'days'}
          </div>
        </div>

        {/* Longest Streak (Protocol) */}
        <div className="bg-tactical-gray p-4 border-l-4 border-tactical-green">
          <div className="text-tactical-green-bright text-sm font-mono uppercase mb-1">
            Protocol Best
          </div>
          <div className="text-white text-3xl font-bold">
            {protocolLongestStreak}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            {protocolLongestStreak === 1 ? 'day' : 'days'}
          </div>
        </div>

        {/* Longest Streak (All-Time) */}
        <div className="bg-tactical-gray p-4 border-l-4 border-tactical-green-bright">
          <div className="text-tactical-green-bright text-sm font-mono uppercase mb-1">
            All-Time Best
          </div>
          <div className="text-white text-3xl font-bold">
            {globalLongestStreak}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            {globalLongestStreak === 1 ? 'day' : 'days'}
          </div>
        </div>

        {/* Total Missions */}
        <div className="bg-tactical-gray p-4 border-l-4 border-blue-500">
          <div className="text-blue-400 text-sm font-mono uppercase mb-1">
            Total Missions
          </div>
          <div className="text-white text-3xl font-bold">
            {totalMissions}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            completed
          </div>
        </div>

        {/* Total Protocols */}
        <div className="bg-tactical-gray p-4 border-l-4 border-purple-500">
          <div className="text-purple-400 text-sm font-mono uppercase mb-1">
            Protocols Done
          </div>
          <div className="text-white text-3xl font-bold">
            {totalProtocols}
          </div>
          <div className="text-gray-400 text-xs mt-1">
            {totalProtocols === 1 ? 'protocol' : 'protocols'}
          </div>
        </div>

        {/* Current Day */}
        {activeProtocol && (
          <div
            className="bg-tactical-gray p-4 border-l-4"
            style={{ borderLeftColor: activeAccent }}
          >
            <div className="text-sm font-mono uppercase mb-1" style={{ color: activeAccent }}>
              Current Day
            </div>
            <div className="text-white text-3xl font-bold">
              {currentDayNumber}
            </div>
            <div className="text-gray-400 text-xs mt-1">
              of {activeProtocol.duration}
            </div>
          </div>
        )}
      </div>

      {/* Streak Indicators */}
      {currentStreak > 0 && (
        <div className="mt-6 pt-4 border-t border-tactical-lightgray">
          <div className="flex items-center gap-2">
            <div className="flex-1 progress-bar">
              <div 
                className="progress-fill"
                style={{
                  width: `${Math.min((currentStreak / 14) * 100, 100)}%`,
                  ...(activeProgressGradient
                    ? { background: activeProgressGradient }
                    : {}),
                }}
              />
            </div>
            <div className="text-sm font-mono text-gray-400">
              {currentStreak >= 14 ? '🔥 ON FIRE!' : `${14 - currentStreak} to milestone`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



