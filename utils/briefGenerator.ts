import { UserProgress } from '@/types';
import { protocols } from '@/data/protocols';

export interface CommandersBriefData {
  weekNumber: number;
  protocolName: string;
  protocolId: string;
  missionsCompleted: number;
  totalMissions: number;
  currentStreak: number;
  ratingChange: {
    stress?: number;
    anger?: number;
    focus?: number;
  } | null;
  positives: string[];
  concerns: string[];
  analysis: string;
  nextWeekPreview: string;
  performanceTier: 'elite' | 'solid' | 'struggling' | 'critical';
  completionRate: number;
}

export function shouldShowBrief(day: number): boolean {
  return day === 7 || day === 14 || day === 21 || day === 30;
}

export function generateCommandersBrief(
  activeProtocol: UserProgress,
  currentDay: number
): CommandersBriefData {
  const weekNumber = currentDay / 7;
  const weekStart = currentDay - 6;
  const weekEnd = currentDay;

  const protocol = protocols.find(p => p.id === activeProtocol.protocolId);
  const protocolName = protocol?.title || 'Unknown Protocol';

  // Calculate week-specific completion
  const weekMissions = activeProtocol.completedDays.filter(
    d => d >= weekStart && d <= weekEnd
  );
  const missionsCompleted = weekMissions.length;
  const totalMissions = 7;
  const completionRate = missionsCompleted / totalMissions;

  // Get rating changes
  const weekCheckIns = activeProtocol.checkIns.filter(
    ci => ci.day >= weekStart && ci.day <= weekEnd && ci.preMission
  );

  let ratingChange = null;
  if (weekCheckIns.length >= 2) {
    const firstCheckIn = weekCheckIns[0];
    const lastCheckIn = weekCheckIns[weekCheckIns.length - 1];
    
    if (firstCheckIn.preMission && lastCheckIn.preMission) {
      ratingChange = {
        stress: lastCheckIn.preMission.stressLevel - firstCheckIn.preMission.stressLevel,
        anger: lastCheckIn.preMission.angerLevel - firstCheckIn.preMission.angerLevel,
        focus: lastCheckIn.preMission.focusLevel - firstCheckIn.preMission.focusLevel
      };
    }
  }

  // Determine performance tier
  let performanceTier: CommandersBriefData['performanceTier'];
  if (completionRate >= 0.9 && activeProtocol.streak >= 7) {
    performanceTier = 'elite';
  } else if (completionRate >= 0.7) {
    performanceTier = 'solid';
  } else if (completionRate >= 0.5) {
    performanceTier = 'struggling';
  } else {
    performanceTier = 'critical';
  }

  // Generate positives
  const positives: string[] = [];
  if (completionRate === 1.0) {
    positives.push('Perfect consistency - every mission completed');
  } else if (completionRate >= 0.85) {
    positives.push(`Strong execution - ${missionsCompleted} of ${totalMissions} missions completed`);
  }
  
  if (activeProtocol.streak >= 7) {
    positives.push(`${activeProtocol.streak}-day streak maintained`);
  } else if (activeProtocol.streak >= 3) {
    positives.push(`Current ${activeProtocol.streak}-day streak active`);
  }

  if (ratingChange) {
    const bestImprovement = Math.min(
      ratingChange.stress || 0,
      ratingChange.anger || 0,
      -(ratingChange.focus || 0)
    );
    if (bestImprovement <= -2) {
      const percentage = Math.abs(Math.round((bestImprovement / 10) * 100));
      positives.push(`Baseline metrics improved ${percentage}% from start`);
    }
  }

  const notesCount = activeProtocol.checkIns.filter(
    ci => ci.day >= weekStart && ci.day <= weekEnd && ci.fieldNotes
  ).length;
  if (notesCount >= 5) {
    positives.push('Field notes show real-world application');
  }

  // Generate concerns
  const concerns: string[] = [];
  const missedDays = totalMissions - missionsCompleted;
  if (missedDays >= 3) {
    concerns.push(`Missed ${missedDays} missions this week - below effectiveness threshold`);
  } else if (missedDays >= 1) {
    concerns.push(`Missed ${missedDays} mission${missedDays > 1 ? 's' : ''} - consistency needed`);
  }

  if (activeProtocol.streak < 3 && completionRate < 0.9) {
    concerns.push('Broken streak - protocol requires consecutive execution');
  }

  if (ratingChange) {
    const worstChange = Math.max(
      ratingChange.stress || 0,
      ratingChange.anger || 0,
      -(ratingChange.focus || 0)
    );
    if (worstChange >= 1) {
      concerns.push('Some metrics showing minimal or negative change');
    }
  }

  // Generate analysis based on tier
  const analysis = generateAnalysis(performanceTier, completionRate, missionsCompleted, activeProtocol.streak, weekNumber);

  // Generate next week preview
  const nextWeekPreview = generateNextWeekPreview(protocolName, weekNumber, performanceTier, activeProtocol.duration);

  return {
    weekNumber,
    protocolName,
    protocolId: activeProtocol.protocolId,
    missionsCompleted,
    totalMissions,
    currentStreak: activeProtocol.streak,
    ratingChange,
    positives,
    concerns,
    analysis,
    nextWeekPreview,
    performanceTier,
    completionRate
  };
}

function generateAnalysis(
  tier: CommandersBriefData['performanceTier'],
  completionRate: number,
  completed: number,
  streak: number,
  weekNumber: number
): string {
  switch (tier) {
    case 'elite':
      return `This is what happens when you do the work consistently. You've proven to yourself that change is possible - not through positive thinking, but through action. Your ${streak}-day streak isn't luck, it's discipline. This kind of execution is what separates guys who rebuild from guys who quit.`;
    
    case 'solid':
      return `You've made progress, but you're leaving results on the table. ${completed} completed missions shows commitment, but the ${7 - completed} you missed means the protocol can't build full momentum. The improvement you're seeing shows the work helps - imagine if you hit all 7. Week ${weekNumber + 1} requires tighter execution.`;
    
    case 'struggling':
      return `Straight talk: ${Math.round(completionRate * 100)}% completion rate means you're getting partial results at best. This protocol works when you work it. You've got ${weekNumber === 1 ? 'time to turn this around' : 'decisions to make'}. Either commit to daily execution or acknowledge this might not be your priority right now. Both are valid, but half-measures waste your time.`;
    
    case 'critical':
      return `Real talk needed: ${completed} out of 7 missions isn't a protocol - it's sporadic effort. These techniques require repetition to rewire patterns. You can't learn to swim by occasionally getting wet. Decision time: restart with genuine commitment, try a different protocol that fits your schedule better, or step back and assess if this is the right time for this work.`;
    
    default:
      return 'Progress assessment in progress.';
  }
}

function generateNextWeekPreview(
  protocolName: string,
  currentWeek: number,
  tier: CommandersBriefData['performanceTier'],
  totalDuration: number
): string {
  const nextWeek = currentWeek + 1;
  const isLastWeek = (nextWeek * 7) >= totalDuration;

  if (isLastWeek) {
    return `Final week ahead. This is where you integrate everything learned and build a sustainable system. Missions shift from learning new techniques to making them permanent. ${tier === 'elite' || tier === 'solid' ? 'Your execution so far has prepared you for this. Finish strong.' : 'This final push requires commitment. Make it count.'}`;
  }

  if (nextWeek === 2) {
    return `Week 2 introduces more advanced techniques that build on Week 1 foundations. ${tier === 'elite' ? 'Your perfect Week 1 execution sets you up well.' : tier === 'struggling' || tier === 'critical' ? 'If you haven\'t built solid foundations (through consistency), Week 2 will be significantly harder. Consider whether you\'re ready.' : 'Missions get more nuanced - maintain your consistency.'} Difficulty increases, but so do results.`;
  }

  if (nextWeek === 3) {
    return `Week 3 covers integration and real-world application. You'll take techniques practiced in controlled settings and deploy them in actual situations. This is where theory becomes skill. ${tier === 'elite' ? 'Two weeks of perfect execution prepared you for this.' : 'This requires the foundations from weeks 1-2 to be solid.'}`;
  }

  return `Week ${nextWeek} builds on previous work. Missions increase in complexity and real-world application. Stay consistent.`;
}

export function getMainMetricChange(
  activeProtocol: UserProgress,
  weekStart: number,
  weekEnd: number
): { metric: string; start: number; current: number; change: number } | null {
  const weekCheckIns = activeProtocol.checkIns.filter(
    ci => ci.day >= weekStart && ci.day <= weekEnd && ci.preMission
  );

  if (weekCheckIns.length < 2) return null;

  const firstCheckIn = weekCheckIns[0];
  const lastCheckIn = weekCheckIns[weekCheckIns.length - 1];

  if (!firstCheckIn.preMission || !lastCheckIn.preMission) return null;

  // Determine which metric changed most
  const stressChange = lastCheckIn.preMission.stressLevel - firstCheckIn.preMission.stressLevel;
  const angerChange = lastCheckIn.preMission.angerLevel - firstCheckIn.preMission.angerLevel;
  const focusChange = firstCheckIn.preMission.focusLevel - lastCheckIn.preMission.focusLevel; // Inverted (higher is better)

  const changes = [
    { metric: 'Stress', start: firstCheckIn.preMission.stressLevel, current: lastCheckIn.preMission.stressLevel, change: -stressChange },
    { metric: 'Anger', start: firstCheckIn.preMission.angerLevel, current: lastCheckIn.preMission.angerLevel, change: -angerChange },
    { metric: 'Focus', start: firstCheckIn.preMission.focusLevel, current: lastCheckIn.preMission.focusLevel, change: focusChange }
  ];

  // Return the metric with best improvement (or worst decline)
  changes.sort((a, b) => b.change - a.change);
  return changes[0];
}






