'use client';

import Link from 'next/link';
import { useProgress } from '@/contexts/ProgressContext';
import { protocols } from '@/data/protocols';
import ProtocolIcon from '@/components/ProtocolIcon';
import { getProtocolVisualTheme } from '@/lib/protocolVisualTheme';
import { getCurrentWorkingDay, canCompleteDay, hasCompletedMissionToday } from '@/utils/progressUtils';
import { getMissionForProtocolDay } from '@/utils/missionUtils';

export default function UserDashboard() {
  const { activeProtocol } = useProgress();

  if (!activeProtocol) {
    return null;
  }

  const protocol = protocols.find(p => p.id === activeProtocol.protocolId);
  if (!protocol) return null;

  // Get the actual current working day (first incomplete day)
  const workingDay = getCurrentWorkingDay(activeProtocol);
  const canComplete = canCompleteDay(workingDay, activeProtocol);
  const completedToday = hasCompletedMissionToday(activeProtocol);
  
  const todaysMission = getMissionForProtocolDay(protocol, activeProtocol.duration, workingDay);
  const completionPercentage = Math.round(
    (activeProtocol.completedDays.length / activeProtocol.duration) * 100
  );

  const daysRemaining = activeProtocol.duration - activeProtocol.completedDays.length;
  const startDate = new Date(activeProtocol.startDate);
  const daysElapsed = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const visual = getProtocolVisualTheme(protocol.id);
  const accentHex = visual?.hex ?? '#ff6b35';
  const progressFill = visual?.progressGradient;

  return (
    <div
      className="bg-tactical-darkgray border-2"
      style={{ borderColor: accentHex }}
    >
      {/* Header Section */}
      <div
        className="bg-gradient-to-r from-tactical-darkgray to-tactical-gray p-6 border-b-2"
        style={{ borderBottomColor: accentHex }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="text-xs font-mono uppercase mb-2" style={{ color: accentHex }}>
              ACTIVE PROTOCOL
            </div>
            <h2 className="text-3xl font-bold text-white uppercase tracking-tight mb-2">
              {protocol.title}
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              {protocol.tagline}
            </p>
          </div>
          <div className="text-6xl breathe-animation">
            <ProtocolIcon protocolId={protocol.id} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Overall Progress</span>
            <span className="text-sm font-bold text-tactical-green-bright">
              {completionPercentage}% Complete
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{
                width: `${completionPercentage}%`,
                ...(progressFill ? { background: progressFill } : {}),
              }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 text-center">
          {/* Streak Stat */}
          <div className="bg-tactical-gray/50 p-3 rounded group cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-tactical-green/10">
            <div className="text-tactical-green-bright text-xl font-bold transition-all duration-300 group-hover:scale-125 group-hover:text-tactical-green">
              {activeProtocol.streak}
            </div>
            <div className="text-xs text-gray-400 uppercase transition-colors duration-300 group-hover:text-tactical-green-bright">
              Streak
            </div>
          </div>
          
          {/* Current Day Stat */}
          <div className="bg-tactical-black/50 p-3 rounded group cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-tactical-orange/10">
            <div className="text-tactical-orange text-xl font-bold transition-all duration-300 group-hover:scale-125 group-hover:text-orange-400">
              Day {workingDay}
            </div>
            <div className="text-xs text-gray-400 uppercase transition-colors duration-300 group-hover:text-tactical-orange">
              of {activeProtocol.duration}
            </div>
          </div>
          
          {/* Days Left Stat */}
          <div className="bg-tactical-black/50 p-3 rounded group cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-blue-500/10">
            <div className="text-blue-400 text-xl font-bold transition-all duration-300 group-hover:scale-125 group-hover:text-blue-300">
              {daysRemaining}
            </div>
            <div className="text-xs text-gray-400 uppercase transition-colors duration-300 group-hover:text-blue-400">
              Days Left
            </div>
          </div>
          
          {/* Days In Stat */}
          <div className="bg-tactical-black/50 p-3 rounded group cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-purple-500/10">
            <div className="text-purple-400 text-xl font-bold transition-all duration-300 group-hover:scale-125 group-hover:text-purple-300">
              {daysElapsed}
            </div>
            <div className="text-xs text-gray-400 uppercase transition-colors duration-300 group-hover:text-purple-400">
              Days In
            </div>
          </div>
        </div>
      </div>

      {/* Today's Mission Section */}
      {todaysMission && (
        <div className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-white uppercase">
                {completedToday ? "Today's Mission (Completed)" : 'Next Mission'}
              </h3>
              <span
                className="text-xs text-white px-3 py-1 font-mono uppercase"
                style={{ backgroundColor: accentHex }}
              >
                Day {workingDay}
              </span>
            </div>
            
            {completedToday && (
              <div className="bg-tactical-green/10 border-l-4 border-tactical-green p-4 mb-4">
                <p className="text-tactical-green-bright text-sm font-bold uppercase mb-1">
                  ✓ Mission Complete
                </p>
                <p className="text-gray-300 text-sm">
                  You&apos;ve completed today&apos;s mission. Return tomorrow to continue your protocol. One mission per day.
                </p>
              </div>
            )}
            
            <div
              className="bg-tactical-gray border-l-4 p-4 mb-4"
              style={{ borderLeftColor: accentHex }}
            >
              <h4 className="text-lg font-bold text-white mb-2">
                {todaysMission.title}
              </h4>
              <p className="text-gray-300 mb-3">
                {todaysMission.description}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="font-mono" style={{ color: accentHex }}>
                  ⏱️ {todaysMission.estimatedTime}
                </div>
                {activeProtocol.completedDays.includes(workingDay) && (
                  <div className="text-tactical-green-bright font-bold">
                    ✓ COMPLETED
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href={`/protocol/${activeProtocol.protocolId}/mission/${workingDay}?duration=${activeProtocol.duration}`}
                className="btn-primary text-center py-4 text-lg"
              >
                {activeProtocol.completedDays.includes(workingDay) 
                  ? 'REVIEW MISSION' 
                  : completedToday
                    ? 'VIEW MISSION'
                    : 'START MISSION →'
                }
              </Link>
              <Link
                href={`/protocol/${activeProtocol.protocolId}`}
                className="btn-secondary text-center py-4"
              >
                PROTOCOL OVERVIEW
              </Link>
            </div>
          </div>

          {/* Emergency Access */}
          <div className="pt-4 border-t border-tactical-lightgray mb-4">
            <Link
              href="/emergency-tools"
              className="block w-full bg-red-900/30 border-2 border-red-700 hover:border-red-500 hover:bg-red-900/50 p-4 text-center transition-all group"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl emergency-light">🚨</span>
                <div>
                  <div className="text-white font-bold uppercase">Emergency Tools</div>
                  <div className="text-red-400 text-xs">Quick relief for acute situations</div>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-tactical-lightgray">
            <Link
              href="/stats"
              className="text-center py-2 text-sm text-gray-400 hover:text-tactical-orange transition-colors uppercase font-bold"
            >
              📊 Stats
            </Link>
            <Link
              href="/"
              className="text-center py-2 text-sm text-gray-400 hover:text-tactical-orange transition-colors uppercase font-bold"
            >
              🗂️ Protocols
            </Link>
            <Link
              href={`/protocol/${activeProtocol.protocolId}`}
              className="text-center py-2 text-sm text-gray-400 hover:text-tactical-orange transition-colors uppercase font-bold"
            >
              📅 Calendar
            </Link>
          </div>
        </div>
      )}

      {/* No Mission Available */}
      {!todaysMission && (
        <div className="p-6 text-center">
          <p className="text-gray-400 mb-4">
            No mission available for Day {activeProtocol.currentDay}
          </p>
          <Link
            href={`/protocol/${activeProtocol.protocolId}`}
            className="btn-secondary inline-block"
          >
            VIEW PROTOCOL
          </Link>
        </div>
      )}
    </div>
  );
}

