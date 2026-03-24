'use client';

import { MissionCheckIn } from '@/types';

interface CheckInHistoryProps {
  checkIns: MissionCheckIn[];
}

export default function CheckInHistory({ checkIns }: CheckInHistoryProps) {
  if (checkIns.length === 0) {
    return null;
  }

  // Filter check-ins that have pre-mission data
  const completedCheckIns = checkIns.filter(ci => ci.preMission);

  if (completedCheckIns.length === 0) {
    return null;
  }

  // Calculate averages
  const avgStress = Math.round(
    completedCheckIns.reduce((sum, ci) => sum + (ci.preMission?.stressLevel || 0), 0) / completedCheckIns.length
  );
  const avgAnger = Math.round(
    completedCheckIns.reduce((sum, ci) => sum + (ci.preMission?.angerLevel || 0), 0) / completedCheckIns.length
  );
  const avgFocus = Math.round(
    completedCheckIns.reduce((sum, ci) => sum + (ci.preMission?.focusLevel || 0), 0) / completedCheckIns.length
  );

  // Calculate improvement trend (compare first 3 vs last 3 check-ins)
  const getImprovement = (metric: 'stressLevel' | 'angerLevel' | 'focusLevel') => {
    if (completedCheckIns.length < 4) return null;
    
    const firstThree = completedCheckIns.slice(0, 3);
    const lastThree = completedCheckIns.slice(-3);
    
    const firstAvg = firstThree.reduce((sum, ci) => sum + (ci.preMission?.[metric] || 0), 0) / firstThree.length;
    const lastAvg = lastThree.reduce((sum, ci) => sum + (ci.preMission?.[metric] || 0), 0) / lastThree.length;
    
    // For stress and anger, lower is better; for focus, higher is better
    if (metric === 'focusLevel') {
      return lastAvg - firstAvg;
    } else {
      return firstAvg - lastAvg;
    }
  };

  const stressImprovement = getImprovement('stressLevel');
  const angerImprovement = getImprovement('angerLevel');
  const focusImprovement = getImprovement('focusLevel');

  // Count "did help" responses
  const helpfulResponses = checkIns.filter(ci => ci.postMission?.didHelp === true).length;
  const totalResponses = checkIns.filter(ci => ci.postMission?.didHelp !== null && ci.postMission?.didHelp !== undefined).length;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-white uppercase mb-4">
        Mission Check-In Data
      </h2>

      {/* Average Levels */}
      <div className="bg-tactical-darkgray border border-tactical-lightgray p-6 mb-4">
        <h3 className="text-white font-bold uppercase text-sm mb-4">Average Baseline Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Stress</span>
              <span className="text-white font-bold text-xl">{avgStress}/10</span>
            </div>
            <div className="w-full bg-tactical-gray h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-tactical-green via-tactical-orange to-red-500"
                style={{ width: `${avgStress * 10}%` }}
              />
            </div>
            {stressImprovement !== null && (
              <div className={`text-xs mt-1 font-mono ${stressImprovement > 0 ? 'text-tactical-green' : 'text-red-500'}`}>
                {stressImprovement > 0 ? '↓' : '↑'} {Math.abs(stressImprovement).toFixed(1)} from start
              </div>
            )}
          </div>

          {/* Anger */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Anger</span>
              <span className="text-white font-bold text-xl">{avgAnger}/10</span>
            </div>
            <div className="w-full bg-tactical-gray h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-tactical-green via-tactical-orange to-red-500"
                style={{ width: `${avgAnger * 10}%` }}
              />
            </div>
            {angerImprovement !== null && (
              <div className={`text-xs mt-1 font-mono ${angerImprovement > 0 ? 'text-tactical-green' : 'text-red-500'}`}>
                {angerImprovement > 0 ? '↓' : '↑'} {Math.abs(angerImprovement).toFixed(1)} from start
              </div>
            )}
          </div>

          {/* Focus */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Focus</span>
              <span className="text-white font-bold text-xl">{avgFocus}/10</span>
            </div>
            <div className="w-full bg-tactical-gray h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-tactical-orange to-tactical-green"
                style={{ width: `${avgFocus * 10}%` }}
              />
            </div>
            {focusImprovement !== null && (
              <div className={`text-xs mt-1 font-mono ${focusImprovement > 0 ? 'text-tactical-green' : 'text-red-500'}`}>
                {focusImprovement > 0 ? '↑' : '↓'} {Math.abs(focusImprovement).toFixed(1)} from start
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mission Effectiveness */}
      {totalResponses > 0 && (
        <div className="bg-tactical-darkgray border border-tactical-lightgray p-6">
          <h3 className="text-white font-bold uppercase text-sm mb-4">Mission Effectiveness</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Missions marked as helpful</span>
                <span className="text-tactical-green-bright font-bold text-xl">
                  {Math.round((helpfulResponses / totalResponses) * 100)}%
                </span>
              </div>
              <div className="w-full bg-tactical-gray h-3 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-tactical-green"
                  style={{ width: `${(helpfulResponses / totalResponses) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {helpfulResponses} of {totalResponses} missions
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Check-Ins */}
      <div className="mt-4 bg-tactical-darkgray border border-tactical-lightgray p-6">
        <h3 className="text-white font-bold uppercase text-sm mb-4">Recent Check-Ins & Field Notes</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {completedCheckIns.slice().reverse().slice(0, 10).map((checkIn) => (
            <div key={checkIn.day} className="bg-tactical-gray p-3 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-tactical-orange font-mono text-xs">Day {checkIn.day}</span>
                <span className="text-gray-500 text-xs">
                  {new Date(checkIn.date).toLocaleDateString()}
                </span>
              </div>
              
              {/* Field Notes */}
              {checkIn.fieldNotes && (
                <div className="mb-2 bg-tactical-gray p-2 border-l-2 border-tactical-orange">
                  <div className="text-tactical-orange text-xs font-bold mb-1">FIELD NOTES:</div>
                  <div className="text-gray-300 text-xs font-mono whitespace-pre-line">
                    {checkIn.fieldNotes}
                  </div>
                </div>
              )}
              
              {checkIn.preMission && (
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400">Stress:</span>
                    <span className="text-white font-bold ml-1">{checkIn.preMission.stressLevel}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Anger:</span>
                    <span className="text-white font-bold ml-1">{checkIn.preMission.angerLevel}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Focus:</span>
                    <span className="text-white font-bold ml-1">{checkIn.preMission.focusLevel}</span>
                  </div>
                </div>
              )}
              {checkIn.postMission?.didHelp !== null && checkIn.postMission?.didHelp !== undefined && (
                <div className="mt-1 text-xs">
                  <span className={checkIn.postMission.didHelp ? 'text-tactical-green' : 'text-red-400'}>
                    {checkIn.postMission.didHelp ? '✓ Helpful' : '✗ Not helpful'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="text-tactical-orange text-xs mt-4 text-center font-mono">
        Track your objective improvement over time with each mission
      </p>
    </div>
  );
}



