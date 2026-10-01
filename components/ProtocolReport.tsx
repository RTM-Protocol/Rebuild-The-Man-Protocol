'use client';

import type { CompletedProtocol } from '@/types';
import { categoricalLabel } from '@/utils/assessmentQuestions';
import {
  computeCheckInTrend,
  computeComparison,
  changeOutcomeLabel,
  FOCUS_DIRECTION_NOTE,
  checkInWindowsOverlap,
} from '@/utils/reportMetrics';

interface ProtocolReportProps {
  record: CompletedProtocol;
  protocolTitle: string;
  missionsCompleted: number;
}

function formatScore(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function MetricRow({
  label,
  before,
  after,
  outcome,
  absoluteChange,
}: {
  label: string;
  before: number;
  after?: number;
  outcome?: string;
  absoluteChange?: number;
}) {
  const delta =
    after === undefined || absoluteChange === undefined
      ? null
      : `${absoluteChange > 0 ? '+' : ''}${formatScore(absoluteChange)}`;

  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 py-3 border-b border-tactical-lightgray/40 last:border-b-0">
      <span className="text-white font-bold">{label}</span>
      <span className="text-gray-300 font-mono text-sm">
        {formatScore(before)}
        {after !== undefined && (
          <>
            {' → '}
            {formatScore(after)}
            {delta && (
              <span className="text-gray-400">
                {' '}
                ({delta}
                {outcome ? `, ${outcome}` : ''})
              </span>
            )}
          </>
        )}
      </span>
    </div>
  );
}

export default function ProtocolReport({
  record,
  protocolTitle,
  missionsCompleted,
}: ProtocolReportProps) {
  const comparison = computeComparison(record.baselineAssessment, record.closingAssessment);
  const showHeadlineChange = !!comparison;
  const showBaselineOnly = !!record.baselineAssessment && !record.closingAssessment;
  const trend = record.checkInSummary ? computeCheckInTrend(record.checkInSummary) : null;
  const showTrend = !!trend;
  const showCategorical = !!record.baselineAssessment && !!record.closingAssessment;

  const checkInsLogged = record.checkInSummary?.checkInsRecorded ?? 0;
  const checkInsExpected = record.checkInSummary?.checkInsExpected;

  return (
    <div className="space-y-10">
      {showHeadlineChange && comparison && (
        <section>
          <h3 className="text-white font-bold uppercase tracking-wide text-xl mb-1">
            Where you started, where you finished
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Your own ratings, day one against today.
          </p>
          <div className="bg-tactical-darkgray border border-tactical-lightgray p-6">
            {comparison.map((m) => (
              <MetricRow
                key={m.id}
                label={m.label}
                before={m.before}
                after={m.after}
                absoluteChange={m.absoluteChange}
                outcome={changeOutcomeLabel(m)}
              />
            ))}
          </div>
        </section>
      )}

      {showBaselineOnly && record.baselineAssessment && (
        <section>
          <h3 className="text-white font-bold uppercase tracking-wide text-xl mb-1">
            Where you started, where you finished
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Your own ratings, day one against today.
          </p>
          <div className="bg-tactical-darkgray border border-tactical-lightgray p-6">
            <MetricRow label="Severity" before={record.baselineAssessment.answers.severity} />
            <MetricRow label="Confidence" before={record.baselineAssessment.answers.confidence} />
          </div>
        </section>
      )}

      {showTrend && trend && record.checkInSummary && (
        <section>
          <h3 className="text-white font-bold uppercase tracking-wide text-xl mb-1">
            Your daily scores
          </h3>
          <p className="text-gray-400 text-sm mb-2">
            First three check-ins against your last three.
          </p>
          <p className="text-gray-500 text-xs mb-4">{FOCUS_DIRECTION_NOTE}</p>
          <div className="bg-tactical-darkgray border border-tactical-lightgray p-6">
            {trend.map((m) => (
              <MetricRow
                key={m.id}
                label={m.label}
                before={m.before}
                after={m.after}
                absoluteChange={m.absoluteChange}
                outcome={changeOutcomeLabel(m)}
              />
            ))}
            <p className="text-gray-500 text-xs mt-4">
              {record.checkInSummary.checkInsRecorded} of {record.checkInSummary.checkInsExpected} expected check-ins.
            </p>
            {checkInWindowsOverlap(record.checkInSummary.checkInsRecorded) && (
              <p className="text-gray-300 text-sm mt-3">
                Not enough check-ins to compare a start against an end — these are the same scores read twice.
              </p>
            )}
          </div>
        </section>
      )}

      {showCategorical && record.baselineAssessment && record.closingAssessment && (
        <section>
          <h3 className="text-white font-bold uppercase tracking-wide text-xl mb-1">
            What changed around you
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Work, relationships, and how long you&apos;d been carrying it.
          </p>
          <div className="bg-tactical-darkgray border border-tactical-lightgray p-6 space-y-4">
            {(['q2', 'q3', 'q4'] as const).map((id) => {
              const from = categoricalLabel(id, record.baselineAssessment!.answers[id]);
              const to = categoricalLabel(id, record.closingAssessment!.answers[id]);
              return (
                <div key={id} className="text-gray-200">
                  {from} → {to}
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h3 className="text-white font-bold uppercase tracking-wide text-xl mb-4">
          The work you did
        </h3>
        <div className="bg-tactical-darkgray border border-tactical-lightgray p-6 text-gray-200 space-y-2">
          <p>{protocolTitle}</p>
          <p>
            {missionsCompleted} of {record.duration} missions
          </p>
          <p>
            {checkInsLogged}
            {checkInsExpected != null ? ` of ${checkInsExpected}` : ''} check-ins logged
          </p>
        </div>
      </section>
    </div>
  );
}
