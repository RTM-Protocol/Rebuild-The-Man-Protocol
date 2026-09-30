import type { ProtocolDuration } from '@/types';

/**
 * Pre-mission check-in is mandatory on day 1, the final day,
 * and every third day in between (4, 7, 10, …).
 */
export function isPreMissionCheckInMandatory(
  day: number,
  duration: ProtocolDuration,
): boolean {
  if (day < 1 || day > duration) return false;
  if (day === 1 || day === duration) return true;
  return day % 3 === 1;
}

export function mandatoryCheckInDays(duration: ProtocolDuration): number[] {
  const days: number[] = [];
  for (let day = 1; day <= duration; day++) {
    if (isPreMissionCheckInMandatory(day, duration)) days.push(day);
  }
  return days;
}
