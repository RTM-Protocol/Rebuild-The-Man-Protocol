import type {
  AssessmentAnswers,
  ProtocolAssessment,
  UserProgress,
  CompletedProtocol,
} from '@/types';
import { mandatoryCheckInDays } from '@/utils/checkInSchedule';

export type MetricDirection = 'down-is-better' | 'up-is-better';

export interface DirectedChange {
  id: string;
  label: string;
  before: number;
  after: number;
  absoluteChange: number;
  percentChange: number | null;
  direction: MetricDirection;
  improved: boolean;
  worsened: boolean;
  unchanged: boolean;
}

export const FOCUS_DIRECTION_NOTE = 'Focus runs the other way — higher is better.';

export const ASSESSMENT_METRIC_DEFS: Array<{
  id: 'severity' | 'confidence';
  label: string;
  direction: MetricDirection;
}> = [
  { id: 'severity', label: 'Severity', direction: 'down-is-better' },
  { id: 'confidence', label: 'Confidence', direction: 'up-is-better' },
];

export const CHECKIN_METRIC_DEFS: Array<{
  id: 'stress' | 'anger' | 'focus';
  label: string;
  direction: MetricDirection;
}> = [
  { id: 'stress', label: 'Stress', direction: 'down-is-better' },
  { id: 'anger', label: 'Anger', direction: 'down-is-better' },
  { id: 'focus', label: 'Focus', direction: 'up-is-better' },
];

export function describeDirectedChange(
  before: number,
  after: number,
  direction: MetricDirection,
): Pick<DirectedChange, 'absoluteChange' | 'percentChange' | 'improved' | 'worsened' | 'unchanged'> {
  const absoluteChange = after - before;
  const percentChange = before === 0 ? null : (absoluteChange / before) * 100;
  const improved = direction === 'down-is-better' ? after < before : after > before;
  const worsened = direction === 'down-is-better' ? after > before : after < before;
  return {
    absoluteChange,
    percentChange,
    improved,
    worsened,
    unchanged: after === before,
  };
}

function directedMetric(
  id: string,
  label: string,
  before: number,
  after: number,
  direction: MetricDirection,
): DirectedChange {
  return {
    id,
    label,
    before,
    after,
    direction,
    ...describeDirectedChange(before, after, direction),
  };
}

function meanLevels(
  entries: Array<{ stressLevel: number; angerLevel: number; focusLevel: number }>,
): { stress: number; anger: number; focus: number } {
  const n = entries.length;
  return {
    stress: entries.reduce((s, e) => s + e.stressLevel, 0) / n,
    anger: entries.reduce((s, e) => s + e.angerLevel, 0) / n,
    focus: entries.reduce((s, e) => s + e.focusLevel, 0) / n,
  };
}

export function preMissionCheckIns(progress: UserProgress) {
  return progress.checkIns
    .filter((c) => c.preMission)
    .sort((a, b) => a.day - b.day)
    .map((c) => c.preMission!);
}

export function checkInWindowsOverlap(recorded: number): boolean {
  return recorded >= 2 && recorded < 6;
}

export function computeCheckInSummary(
  progress: UserProgress,
): CompletedProtocol['checkInSummary'] | null {
  const series = preMissionCheckIns(progress);
  if (series.length < 2) return null;

  const windowSize = Math.min(3, series.length);
  const opening = series.slice(0, windowSize);
  const closing = series.slice(-windowSize);

  return {
    openingAverage: meanLevels(opening),
    closingAverage: meanLevels(closing),
    checkInsRecorded: series.length,
    checkInsExpected: mandatoryCheckInDays(progress.duration).length,
  };
}

export function computeComparison(
  baseline: ProtocolAssessment | AssessmentAnswers | undefined,
  closing: ProtocolAssessment | AssessmentAnswers | undefined,
): DirectedChange[] | null {
  const before = baseline && 'answers' in baseline ? baseline.answers : baseline;
  const after = closing && 'answers' in closing ? closing.answers : closing;
  if (!before || !after) return null;

  return ASSESSMENT_METRIC_DEFS.map((def) =>
    directedMetric(def.id, def.label, before[def.id], after[def.id], def.direction),
  );
}

export function computeCheckInTrend(
  summary: NonNullable<CompletedProtocol['checkInSummary']>,
): DirectedChange[] {
  return CHECKIN_METRIC_DEFS.map((def) =>
    directedMetric(
      def.id,
      def.label,
      summary.openingAverage[def.id],
      summary.closingAverage[def.id],
      def.direction,
    ),
  );
}

export function changeOutcomeLabel(change: DirectedChange): 'better' | 'worse' | 'no change' {
  if (change.improved) return 'better';
  if (change.worsened) return 'worse';
  return 'no change';
}
