'use client';

import { useRouter } from 'next/navigation';
import { CommandersBriefData } from '@/utils/briefGenerator';

interface CommandersBriefProps {
  briefData: CommandersBriefData;
  protocolId: string;
  duration: number;
  nextDay: number;
}

export default function CommandersBrief({ briefData, protocolId, duration, nextDay }: CommandersBriefProps) {
  const router = useRouter();

  const handleContinue = () => {
    if (nextDay <= duration) {
      router.push(`/protocol/${protocolId}/mission/${nextDay}?duration=${duration}`);
    } else {
      router.push(`/protocol/${protocolId}/complete?duration=${duration}`);
    }
  };

  const getPerformanceColor = () => {
    switch (briefData.performanceTier) {
      case 'elite': return 'border-tactical-green';
      case 'solid': return 'border-tactical-orange';
      case 'struggling': return 'border-yellow-600';
      case 'critical': return 'border-red-600';
      default: return 'border-tactical-lightgray';
    }
  };

  const getTrendIcon = (change: number) => {
    if (change <= -2) return <span className="text-tactical-green">↓↓</span>;
    if (change < 0) return <span className="text-tactical-green">↓</span>;
    if (change === 0) return <span className="text-gray-400">→</span>;
    if (change >= 2) return <span className="text-red-500">↑↑</span>;
    return <span className="text-tactical-orange">↑</span>;
  };

  return (
    <div className="fixed inset-0 z-50 bg-tactical-gray overflow-y-auto">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      <div className="relative min-h-screen flex items-center justify-center p-4 py-12">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className={`bg-tactical-darkgray border-4 ${getPerformanceColor()} p-8 mb-6`}>
            <div className="text-center mb-6">
              <div className="text-tactical-orange font-mono text-sm uppercase mb-2">
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              </div>
              <h1 className="text-5xl font-bold text-white uppercase mb-2">
                WEEK {briefData.weekNumber} COMPLETE
              </h1>
              <p className="text-tactical-green-bright text-xl font-mono uppercase">
                {briefData.protocolName}
              </p>
              <div className="text-tactical-orange font-mono text-sm uppercase mt-2">
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-tactical-gray p-4 text-center">
                <div className="text-gray-400 text-xs uppercase mb-1">Missions</div>
                <div className="text-white text-3xl font-bold">
                  {briefData.missionsCompleted}/{briefData.totalMissions}
                </div>
              </div>
              <div className="bg-tactical-gray p-4 text-center">
                <div className="text-gray-400 text-xs uppercase mb-1">Streak</div>
                <div className="text-tactical-orange text-3xl font-bold">
                  {briefData.currentStreak}
                </div>
              </div>
              <div className="bg-tactical-gray p-4 text-center">
                <div className="text-gray-400 text-xs uppercase mb-1">Completion</div>
                <div className="text-white text-3xl font-bold">
                  {Math.round(briefData.completionRate * 100)}%
                </div>
              </div>
            </div>

            {/* Rating Changes */}
            {briefData.ratingChange && (
              <div className="bg-tactical-gray border-l-4 border-tactical-orange p-4">
                <div className="text-white font-bold uppercase text-xs mb-3">Metric Changes:</div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Stress:</span>
                    <span className="font-bold font-mono">
                      {getTrendIcon(briefData.ratingChange.stress || 0)}
                      {' '}
                      {Math.abs(briefData.ratingChange.stress || 0)} pts
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Anger:</span>
                    <span className="font-bold font-mono">
                      {getTrendIcon(briefData.ratingChange.anger || 0)}
                      {' '}
                      {Math.abs(briefData.ratingChange.anger || 0)} pts
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Focus:</span>
                    <span className="font-bold font-mono">
                      {getTrendIcon(-(briefData.ratingChange.focus || 0))}
                      {' '}
                      {Math.abs(briefData.ratingChange.focus || 0)} pts
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* What's Working */}
          {briefData.positives.length > 0 && (
            <section className="bg-tactical-darkgray border-l-4 border-tactical-green p-6 mb-6">
              <h2 className="text-tactical-green-bright font-bold uppercase text-lg mb-4">
                What&apos;s Working
              </h2>
              <div className="space-y-2">
                {briefData.positives.map((positive, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-tactical-green text-xl flex-shrink-0">✓</span>
                    <p className="text-gray-200 leading-relaxed">{positive}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Needs Attention */}
          {briefData.concerns.length > 0 && (
            <section className="bg-tactical-darkgray border-l-4 border-tactical-orange p-6 mb-6">
              <h2 className="text-tactical-orange font-bold uppercase text-lg mb-4">
                Needs Attention
              </h2>
              <div className="space-y-2">
                {briefData.concerns.map((concern, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-tactical-orange text-xl flex-shrink-0">⚠</span>
                    <p className="text-gray-200 leading-relaxed">{concern}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Analysis */}
          <section className="bg-tactical-gray p-6 mb-6">
            <h2 className="text-white font-bold uppercase text-lg mb-4">
              Analysis
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              {briefData.analysis}
            </p>
          </section>

          {/* Next Week Preview */}
          <section className="bg-tactical-darkgray border-l-4 border-tactical-green p-6 mb-8">
            <h2 className="text-tactical-green-bright font-bold uppercase text-lg mb-4">
              {nextDay > duration ? 'Protocol Complete' : `Week ${briefData.weekNumber + 1} Preview`}
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              {briefData.nextWeekPreview}
            </p>
          </section>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleContinue}
              className="btn-primary flex-1 text-lg py-4"
            >
              {nextDay > duration ? 'View Completion Report' : `Continue to Day ${nextDay}`}
            </button>
            
            {briefData.performanceTier === 'critical' || briefData.performanceTier === 'struggling' ? (
              <button
                onClick={() => router.push('/')}
                className="btn-secondary flex-1 text-lg py-4"
              >
                Review Protocol Options
              </button>
            ) : (
              <button
                onClick={() => router.push(`/protocol/${protocolId}/history?duration=${duration}`)}
                className="btn-secondary flex-1 text-lg py-4"
              >
                Review Full Progress
              </button>
            )}
          </div>

          {/* Performance Badge */}
          <div className="mt-6 text-center">
            {briefData.performanceTier === 'elite' && (
              <div className="inline-block bg-tactical-green/20 border-2 border-tactical-green px-6 py-3">
                <p className="text-tactical-green-bright font-bold uppercase text-sm">
                  ⭐ Elite Execution - Week {briefData.weekNumber}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}






