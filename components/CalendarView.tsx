'use client';

import { useProgress } from '@/contexts/ProgressContext';
import { Protocol, ProtocolDuration } from '@/types';
import { resolveMissionList } from '@/utils/missionUtils';

interface CalendarViewProps {
  protocol: Protocol;
  duration: ProtocolDuration;
}

export default function CalendarView({ protocol, duration }: CalendarViewProps) {
  const { activeProtocol } = useProgress();
  
  const isActiveProtocol = activeProtocol?.protocolId === protocol.id && activeProtocol?.duration === duration;
  const completedDays = activeProtocol?.completedDays || [];
  const setbacks = activeProtocol?.setbacks || [];
  const missions = resolveMissionList(protocol, duration);

  if (missions.length === 0) {
    return null;
  }

  // Create calendar grid (7 columns for week view)
  const weeks: number[][] = [];
  let currentWeek: number[] = [];
  
  missions.forEach((mission) => {
    currentWeek.push(mission.day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const getDayStatus = (day: number) => {
    const hasSetback = setbacks.some(s => s.day === day);
    const isCompleted = completedDays.includes(day);
    const isCurrent = isActiveProtocol && activeProtocol.currentDay === day;
    
    if (hasSetback) return 'setback';
    if (isCompleted) return 'completed';
    if (isCurrent) return 'current';
    return 'upcoming';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-tactical-green border-tactical-green-bright';
      case 'current': return 'bg-tactical-orange border-tactical-orange-bright';
      case 'setback': return 'bg-red-900 border-red-600';
      case 'upcoming': return 'bg-tactical-gray border-tactical-lightgray';
      default: return 'bg-tactical-gray border-tactical-lightgray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'current': return '→';
      case 'setback': return '✕';
      default: return '';
    }
  };

  return (
    <div className="bg-tactical-darkgray border border-tactical-lightgray p-6">
      <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-lg flex items-center gap-2">
        <span>📅</span>
        <span>Protocol Calendar</span>
      </h3>

      <div className="space-y-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-2">
            {week.map((day) => {
              const status = getDayStatus(day);
              const setback = setbacks.find(s => s.day === day);
              
              return (
                <div
                  key={day}
                  className={`
                    aspect-square rounded border-2 flex flex-col items-center justify-center
                    transition-all hover:scale-105 relative group
                    ${getStatusColor(status)}
                  `}
                >
                  <div className="text-xs font-mono text-gray-400">D{day}</div>
                  <div className="text-lg font-bold text-white">
                    {getStatusIcon(status)}
                  </div>
                  
                  {/* Tooltip on hover */}
                  {setback && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-tactical-gray border border-red-600 p-2 rounded text-xs whitespace-nowrap">
                        <div className="text-red-500 font-bold mb-1">Setback</div>
                        {setback.note && (
                          <div className="text-gray-300">{setback.note}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-tactical-lightgray grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-tactical-green border-2 border-tactical-green-bright"></div>
          <span className="text-gray-300">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-tactical-orange border-2 border-tactical-orange-bright"></div>
          <span className="text-gray-300">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-900 border-2 border-red-600"></div>
          <span className="text-gray-300">Setback</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-tactical-gray border-2 border-tactical-lightgray"></div>
          <span className="text-gray-300">Upcoming</span>
        </div>
      </div>
    </div>
  );
}



