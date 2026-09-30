import type { AssessmentAnswers } from '@/types';

export const DIAGNOSTIC_ANSWERS_KEY = 'diagnostic_answers';

export function parseAssessmentAnswers(raw: unknown): AssessmentAnswers | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const q1 = o.q1;
  const q2 = o.q2;
  const q3 = o.q3;
  const q4 = o.q4;
  const q5 = o.q5;
  const severity = Number(o.severity);
  const confidence = Number(o.confidence);
  if (
    typeof q1 !== 'string' || !q1 ||
    typeof q2 !== 'string' || !q2 ||
    typeof q3 !== 'string' || !q3 ||
    typeof q4 !== 'string' || !q4 ||
    typeof q5 !== 'string' || !q5
  ) {
    return null;
  }
  if (
    !Number.isInteger(severity) || severity < 1 || severity > 10 ||
    !Number.isInteger(confidence) || confidence < 1 || confidence > 10
  ) {
    return null;
  }
  return { q1, q2, q3, q4, q5, severity, confidence };
}

export function loadStoredAssessmentAnswers(): AssessmentAnswers | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(DIAGNOSTIC_ANSWERS_KEY);
    if (!raw) return null;
    return parseAssessmentAnswers(JSON.parse(raw));
  } catch {
    return null;
  }
}
