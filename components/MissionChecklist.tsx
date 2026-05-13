'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useProgress } from '@/contexts/ProgressContext';
import { Protocol, ProtocolDuration } from '@/types';
import { getCurrentWorkingDay, isDayAccessible } from '@/utils/progressUtils';
import { resolveMissionList } from '@/utils/missionUtils';

interface MissionChecklistProps {
  protocol: Protocol;
  duration: ProtocolDuration;
}

export default function MissionChecklist({ protocol, duration }: MissionChecklistProps) {
  const { activeProtocol } = useProgress();
  const [hoveredMission, setHoveredMission] = useState<number | null>(null);
  
  const missions = resolveMissionList(protocol, duration);
  const isActiveProtocol = activeProtocol?.protocolId === protocol.id && activeProtocol?.duration === duration;
  const completedDays = activeProtocol?.completedDays || [];
  const currentWorkingDay = activeProtocol && isActiveProtocol ? getCurrentWorkingDay(activeProtocol) : 1;

  if (missions.length === 0) {
    return null;
  }

  return (
    <div className="bg-tactical-darkgray border border-tactical-lightgray p-6">
      <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-lg">
        Mission Checklist
      </h3>
      
      <div className="space-y-2">
        {missions.map((mission) => {
          const isCompleted = isActiveProtocol && completedDays.includes(mission.day);
          const isCurrent = isActiveProtocol && currentWorkingDay === mission.day;
          const isAccessible = activeProtocol && isActiveProtocol ? isDayAccessible(mission.day, activeProtocol) : false;
          const isLocked = isActiveProtocol && !isAccessible && !isCompleted;
          const isHovered = hoveredMission === mission.day;
          
          return (
            <div
              key={mission.day}
              className="relative"
              onMouseEnter={() => setHoveredMission(mission.day)}
              onMouseLeave={() => setHoveredMission(null)}
            >
              <div
                className={`
                  flex items-center gap-4 p-3 border-l-4 transition-all
                  ${isCompleted 
                    ? 'border-tactical-green bg-tactical-green/5 hover:bg-tactical-green/10 cursor-pointer' 
                    : isCurrent
                    ? 'border-tactical-orange bg-tactical-orange/5 hover:bg-tactical-orange/10 cursor-pointer'
                    : isLocked
                    ? 'border-tactical-lightgray bg-tactical-darkgray/30 opacity-50 cursor-not-allowed'
                    : 'border-tactical-gray bg-tactical-gray/20 hover:bg-tactical-gray/30 cursor-pointer'
                  }
                `}
              >
                {/* Checkbox */}
                <div className={`
                  w-6 h-6 border-2 rounded flex items-center justify-center flex-shrink-0
                  ${isCompleted 
                    ? 'border-tactical-green bg-tactical-green' 
                    : isLocked
                    ? 'border-tactical-lightgray bg-tactical-steel'
                    : 'border-gray-600'
                  }
                `}>
                  {isCompleted && (
                    <span className="text-white text-sm font-bold">✓</span>
                  )}
                  {isLocked && (
                    <span className="text-gray-500 text-sm">🔒</span>
                  )}
                </div>

                {/* Mission Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className={`
                      text-xs font-mono uppercase
                      ${isCompleted 
                        ? 'text-tactical-green-bright' 
                        : isCurrent
                        ? 'text-tactical-orange'
                        : 'text-gray-500'
                      }
                    `}>
                      Day {mission.day}
                    </span>
                    <span className={`
                      font-semibold truncate
                      ${isCompleted 
                        ? 'text-gray-400 line-through' 
                        : isCurrent
                        ? 'text-white'
                        : 'text-gray-300'
                      }
                    `}>
                      {mission.title}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {mission.description}
                  </p>
                </div>

                {/* Time estimate */}
                <div className="text-xs text-gray-500 font-mono flex-shrink-0">
                  {mission.estimatedTime}
                </div>

                {/* Action */}
                {isActiveProtocol && !isCompleted && (
                  isLocked ? (
                    <div className="text-xs font-bold uppercase px-3 py-1 bg-tactical-steel text-gray-500 flex-shrink-0">
                      LOCKED
                    </div>
                  ) : (
                    <Link
                      href={`/protocol/${protocol.id}/mission/${mission.day}?duration=${duration}`}
                      className={`
                        text-xs font-bold uppercase px-3 py-1 transition-colors flex-shrink-0
                        ${isCurrent
                          ? 'bg-tactical-orange text-white hover:bg-tactical-orange-bright'
                          : 'bg-tactical-gray text-gray-300 hover:bg-tactical-lightgray'
                        }
                      `}
                    >
                      {isCurrent ? 'START' : 'VIEW'}
                    </Link>
                  )
                )}
              </div>

              {/* Hover Tooltip - Only for first 3 missions */}
              {isHovered && mission.day <= 3 && (
                <div className="absolute left-0 right-0 top-full mt-2 z-10 animate-fade-in">
                  <div className={`
                    p-3 border-2 shadow-2xl
                    ${isCompleted 
                      ? 'bg-tactical-darkgray border-tactical-green' 
                      : isCurrent
                      ? 'bg-tactical-darkgray border-tactical-orange'
                      : 'bg-tactical-gray border-tactical-lightgray'
                    }
                  `}>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className={`
                          text-xs font-mono uppercase mb-1
                          ${isCompleted 
                            ? 'text-tactical-green-bright' 
                            : isCurrent
                            ? 'text-tactical-orange'
                            : 'text-gray-400'
                          }
                        `}>
                          Mission {mission.day}
                        </div>
                        <div className="text-white font-bold text-sm">
                          {mission.title}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 font-mono whitespace-nowrap">
                        ⏱ {mission.estimatedTime}
                      </div>
                    </div>
                    
                    <div className="text-gray-300 text-xs leading-relaxed">
                      {mission.description}
                    </div>

                    {isCompleted && (
                      <div className="mt-2 pt-2 border-t border-tactical-green/30">
                        <div className="text-tactical-green-bright text-xs font-bold flex items-center gap-2">
                          <span>✓</span>
                          <span>COMPLETED</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      {isActiveProtocol && (
        <div className="mt-4 pt-4 border-t border-tactical-lightgray">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              Progress: {completedDays.length} of {missions.length} completed
            </span>
            <span className="text-tactical-green-bright font-bold">
              {Math.round((completedDays.length / missions.length) * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}



