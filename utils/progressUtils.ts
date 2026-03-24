/**
 * Utility functions for protocol progress and day access control
 */

import { UserProgress } from '@/types';

/**
 * Calculate how many calendar days have passed since protocol start
 */
export function getDaysSinceStart(startDate: string): number {
  const start = new Date(startDate);
  const today = new Date();
  
  // Reset time to midnight for accurate day calculation
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Calculate the maximum day number a user should have access to
 * Based on: days since start + 1, but never beyond completed days + 1
 */
export function getMaxAccessibleDay(progress: UserProgress): number {
  const daysSinceStart = getDaysSinceStart(progress.startDate);
  const daysPassedSinceStart = daysSinceStart + 1; // Day 1 is accessible on start date
  
  // User can access any day up to:
  // - The number of days that have passed since start, OR
  // - One day beyond their highest completed day (to continue)
  // Whichever is lower (prevents skipping ahead)
  
  const highestCompletedDay = Math.max(0, ...progress.completedDays);
  const nextDayToComplete = highestCompletedDay + 1;
  
  // Can't go beyond days that have passed in real time
  const maxAccessible = Math.min(daysPassedSinceStart, nextDayToComplete);
  
  // Can't exceed protocol duration
  return Math.min(maxAccessible, progress.duration);
}

/**
 * Check if a specific day is accessible to view
 * Users can view:
 * - Any completed day (for review)
 * - The next 1-2 incomplete days (for preview/preparation)
 * But not days far in the future (prevents spoilers)
 */
export function isDayAccessible(dayNumber: number, progress: UserProgress): boolean {
  // Already completed days are always accessible (for review)
  if (progress.completedDays.includes(dayNumber)) {
    return true;
  }
  
  // Out of range check
  if (dayNumber < 1 || dayNumber > progress.duration) {
    return false;
  }
  
  // Find the current working day (first incomplete)
  const workingDay = getCurrentWorkingDay(progress);
  
  // Can access working day + next day for preview (up to 2 days ahead)
  return dayNumber <= workingDay + 1;
}

/**
 * Check if user can complete a specific day today
 * (Different from access - they can view completed days but not re-complete them)
 */
export function canCompleteDay(dayNumber: number, progress: UserProgress): boolean {
  // Can't complete if already completed
  if (progress.completedDays.includes(dayNumber)) {
    return false;
  }
  
  // Can't complete if not accessible yet
  if (!isDayAccessible(dayNumber, progress)) {
    return false;
  }
  
  // Check if user already completed a different mission today
  const today = new Date().toISOString().split('T')[0];
  const lastCompleted = progress.lastCompletedDate 
    ? new Date(progress.lastCompletedDate).toISOString().split('T')[0]
    : null;
  
  // If they completed a mission today, they can't complete another
  if (lastCompleted === today) {
    return false;
  }
  
  return true;
}

/**
 * Get the current day the user should be working on
 */
export function getCurrentWorkingDay(progress: UserProgress): number {
  const completedDays = [...progress.completedDays].sort((a, b) => a - b);
  
  // If no days completed, start at Day 1
  if (completedDays.length === 0) {
    return 1;
  }
  
  // Find the first missing day in sequence
  for (let i = 1; i <= progress.duration; i++) {
    if (!completedDays.includes(i)) {
      return i;
    }
  }
  
  // All days completed
  return progress.duration;
}

/**
 * Get reason why a day is not accessible (for UI messaging)
 */
export function getDayBlockReason(dayNumber: number, progress: UserProgress): string | null {
  if (isDayAccessible(dayNumber, progress)) {
    return null;
  }
  
  const currentDay = getCurrentWorkingDay(progress);
  
  // Day is too far ahead (more than 1 day from current working day)
  if (dayNumber > currentDay + 1) {
    return `You can preview up to Day ${currentDay + 1}. Complete Day ${currentDay} to unlock further missions.`;
  }
  
  return 'This mission is not yet accessible.';
}

/**
 * Check if user has already completed a mission today
 */
export function hasCompletedMissionToday(progress: UserProgress): boolean {
  const today = new Date().toISOString().split('T')[0];
  const lastCompleted = progress.lastCompletedDate 
    ? new Date(progress.lastCompletedDate).toISOString().split('T')[0]
    : null;
  
  return lastCompleted === today;
}

/**
 * Get completion limit message for UI
 */
export function getCompletionLimitMessage(progress: UserProgress): string | null {
  if (!hasCompletedMissionToday(progress)) {
    return null;
  }
  
  const lastCompletedDay = progress.completedDays[progress.completedDays.length - 1];
  return `You've already completed Day ${lastCompletedDay} today. Return tomorrow to continue your protocol. One mission per day.`;
}

