'use client';

import Link from 'next/link';
import { UserProgress } from '@/types';
import { isDayAccessible } from '@/utils/progressUtils';

interface DayNavigationProps {
  protocolId: string;
  currentDay: number;
  totalDays: number;
  duration: number;
  activeProtocol?: UserProgress | null;
}

export default function DayNavigation({ 
  protocolId, 
  currentDay, 
  totalDays,
  duration,
  activeProtocol
}: DayNavigationProps) {
  const hasPrevious = currentDay > 1;
  const hasNext = currentDay < totalDays;
  
  // Check if next/previous days are accessible
  const previousDayAccessible = hasPrevious && activeProtocol 
    ? isDayAccessible(currentDay - 1, activeProtocol) 
    : hasPrevious;
  const nextDayAccessible = hasNext && activeProtocol 
    ? isDayAccessible(currentDay + 1, activeProtocol) 
    : false; // Next day is locked unless explicitly accessible

  return (
    <div className="flex items-center justify-between gap-4 py-6 border-t border-b border-tactical-lightgray">
      {/* Previous Day */}
      {hasPrevious ? (
        previousDayAccessible ? (
          <Link
            href={`/protocol/${protocolId}/mission/${currentDay - 1}?duration=${duration}`}
            className="flex items-center gap-2 text-tactical-green-bright hover:text-tactical-orange transition-colors font-bold uppercase tracking-wide group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <div>
              <div className="text-xs text-gray-400">Previous</div>
              <div>Day {currentDay - 1}</div>
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-2 text-gray-600 opacity-50 font-bold uppercase tracking-wide">
            <span>←</span>
            <div>
              <div className="text-xs">Previous</div>
              <div>Day {currentDay - 1}</div>
              <div className="text-xs text-tactical-orange">Locked</div>
            </div>
          </div>
        )
      ) : (
        <div className="text-gray-600 opacity-50">
          <div className="text-xs">Previous</div>
          <div>—</div>
        </div>
      )}

      {/* Current Position */}
      <div className="text-center">
        <div className="text-xs text-tactical-orange mb-1">CURRENT DAY</div>
        <div className="text-white text-2xl font-bold">
          {currentDay} / {totalDays}
        </div>
      </div>

      {/* Next Day */}
      {hasNext ? (
        nextDayAccessible ? (
          <Link
            href={`/protocol/${protocolId}/mission/${currentDay + 1}?duration=${duration}`}
            className="flex items-center gap-2 text-tactical-green-bright hover:text-tactical-orange transition-colors font-bold uppercase tracking-wide group text-right"
          >
            <div>
              <div className="text-xs text-gray-400">Next</div>
              <div>Day {currentDay + 1}</div>
            </div>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        ) : (
          <div className="flex items-center gap-2 text-gray-600 opacity-50 font-bold uppercase tracking-wide text-right">
            <div>
              <div className="text-xs">Next</div>
              <div>Day {currentDay + 1}</div>
              <div className="text-xs text-tactical-orange">Locked</div>
            </div>
            <span>→</span>
          </div>
        )
      ) : (
        <div className="text-gray-600 opacity-50 text-right">
          <div className="text-xs">Next</div>
          <div>—</div>
        </div>
      )}
    </div>
  );
}



