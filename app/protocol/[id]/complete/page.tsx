'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { protocols } from '@/data/protocols';
import { ProtocolDuration, UserProgress, AssessmentAnswers, CompletedProtocol } from '@/types';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import StatCard from '@/components/StatCard';
import ProtocolReport from '@/components/ProtocolReport';
import ClosingAssessmentPrompt from '@/components/ClosingAssessmentPrompt';
import QuickDiagnostic from '@/components/QuickDiagnostic';
import { useProgress } from '@/contexts/ProgressContext';
import { getStatsForProtocol } from '@/data/mentalHealthStats';
import { downloadCompletionReportPdf } from '@/utils/exportUtils';
import { useState, useEffect, useMemo } from 'react';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString();
}

function openingStatement(opts: {
  missionsDone: number;
  duration: number;
  checkInsLogged: number;
  hasBaseline: boolean;
  hasClosing: boolean;
}): { body: string; thin?: string } {
  const { missionsDone, duration, checkInsLogged, hasBaseline, hasClosing } = opts;
  const prefix = `You finished. ${missionsDone} of ${duration} missions, ${checkInsLogged} check-ins logged.`;
  let body: string;
  if (hasBaseline && hasClosing) {
    body = `${prefix} The numbers below are yours — what you reported on day one against what you reported today.`;
  } else if (!hasClosing) {
    body = `${prefix} You skipped the closing questions, so this covers your daily scores only.`;
  } else {
    body = `${prefix} Without a starting assessment there's no before-and-after, so what follows is where you are now and how your daily scores moved.`;
  }
  return {
    body,
    thin: checkInsLogged < 2
      ? 'Not enough check-ins logged to show a trend. The comparison above still stands.'
      : undefined,
  };
}

export default function ProtocolComplete() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { completedProtocols, activeProtocol, finalizeProtocol, isLoading } = useProgress();
  const [completedData, setCompletedData] = useState<UserProgress | null>(null);
  const [closingUi, setClosingUi] = useState<'prompt' | 'questions' | 'report' | 'pending'>('pending');
  const [pdfError, setPdfError] = useState(false);
  const [justFinalized, setJustFinalized] = useState<CompletedProtocol | null>(null);

  const protocolId = params.id as string;
  const durationParam = parseInt(searchParams.get('duration') || '7', 10) as ProtocolDuration;
  const completedParam = searchParams.get('completed');

  const protocol = protocols.find((p) => p.id === protocolId);

  const awaitingFinalize =
    !!activeProtocol &&
    activeProtocol.protocolId === protocolId &&
    activeProtocol.completedDays.length === activeProtocol.duration;

  useEffect(() => {
    if (activeProtocol && activeProtocol.protocolId === protocolId) {
      setCompletedData(activeProtocol);
    } else {
      try {
        const saved = localStorage.getItem('lastCompletedProtocolData');
        if (saved) {
          const parsed = JSON.parse(saved) as UserProgress;
          if (parsed.protocolId === protocolId) {
            setCompletedData(parsed);
          }
        }
      } catch {
        // Ignore parse errors
      }
    }
  }, [activeProtocol, protocolId]);

  useEffect(() => {
    if (isLoading) return;
    setClosingUi((prev) => {
      if (!awaitingFinalize) return 'report';
      if (prev === 'questions' || prev === 'report') return prev;
      return 'prompt';
    });
  }, [isLoading, awaitingFinalize]);

  const reportRecord: CompletedProtocol | undefined = useMemo(() => {
    if (justFinalized) return justFinalized;
    const forProtocol = completedProtocols.filter((p) => p.protocolId === protocolId);
    if (completedParam) {
      return forProtocol.find((p) => p.completedDate === completedParam) ?? forProtocol[0];
    }
    return [...forProtocol].sort(
      (a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime(),
    )[0];
  }, [completedProtocols, protocolId, completedParam, justFinalized]);

  const handleSkipClosing = () => {
    const record = finalizeProtocol();
    if (record) setJustFinalized(record);
    setClosingUi('report');
  };

  const handleClosingAnswers = (answers: AssessmentAnswers) => {
    const record = finalizeProtocol(answers);
    if (record) setJustFinalized(record);
    setClosingUi('report');
  };

  if (!protocol) {
    return (
      <div className="min-h-screen bg-tactical-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">PROTOCOL NOT FOUND</h1>
          <Link href="/" className="btn-primary inline-block">
            Return to Base
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-tactical-black">
        <Navigation />
      </div>
    );
  }

  const duration = reportRecord?.duration ?? completedData?.duration ?? durationParam;
  const started = reportRecord?.startedDate ?? completedData?.startDate;
  const completedAt = reportRecord?.completedDate;
  const missionsDone = reportRecord?.duration ?? completedData?.completedDays.length ?? duration;
  const checkInsLogged =
    reportRecord?.checkInSummary?.checkInsRecorded ??
    completedData?.checkIns.filter((c) => c.preMission).length ??
    0;
  const hasBaseline = !!(reportRecord?.baselineAssessment ?? completedData?.baselineAssessment);
  const hasClosing = !!reportRecord?.closingAssessment;
  const opening = openingStatement({
    missionsDone,
    duration,
    checkInsLogged,
    hasBaseline,
    hasClosing,
  });

  const showReport = closingUi === 'report' && !!reportRecord;

  return (
    <div className="min-h-screen bg-tactical-black">
      <Navigation />

      {awaitingFinalize && closingUi === 'prompt' && (
        <ClosingAssessmentPrompt
          isOpen
          baselineTaken={!!activeProtocol?.baselineAssessment}
          onAnswer={() => setClosingUi('questions')}
          onSkip={handleSkipClosing}
        />
      )}

      {awaitingFinalize && closingUi === 'questions' && (
        <QuickDiagnostic
          hideSkip
          persistToDiagnosticStorage={false}
          onComplete={handleClosingAnswers}
        />
      )}

      <header className="border-b-2 border-tactical-green bg-tactical-darkgray">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: 'Protocols', href: '/' },
              { label: protocol.title, href: `/protocol/${protocolId}` },
              { label: 'Complete' },
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight text-tactical-green-bright uppercase mt-2">
            Protocol complete.
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4 uppercase">
            Protocol complete.
          </h2>
          <p className="text-tactical-green-bright text-lg font-mono">
            {protocol.title} · {duration} days
            {started && completedAt
              ? ` · ${formatDate(started)} to ${formatDate(completedAt)}`
              : ''}
          </p>
        </div>

        {showReport && (
          <>
            <section className="mb-12 bg-tactical-darkgray border-l-4 border-tactical-green p-8">
              <p className="text-gray-200 leading-relaxed text-lg">{opening.body}</p>
              {opening.thin && (
                <p className="text-gray-200 leading-relaxed text-lg mt-4">{opening.thin}</p>
              )}
            </section>

            <div className="mb-12">
              <ProtocolReport
                record={reportRecord}
                protocolTitle={protocol.title}
                missionsCompleted={missionsDone}
              />
            </div>

            <div className="mb-12">
              <button
                type="button"
                className="btn-secondary"
                onClick={async () => {
                  setPdfError(false);
                  try {
                    await downloadCompletionReportPdf(reportRecord, protocol.title, missionsDone);
                  } catch {
                    setPdfError(true);
                  }
                }}
              >
                Download PDF
              </button>
              {pdfError && (
                <p className="text-red-400 text-sm mt-2">The PDF could not be created. Try again.</p>
              )}
            </div>

            <section className="mb-12">
              <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-xl">
                What now
              </h3>
              <p className="text-gray-200 leading-relaxed mb-4">
                One protocol doesn&apos;t finish the job. It gives you a set of tools and proof you&apos;ll use them.
              </p>
              <p className="text-gray-200 leading-relaxed mb-8">
                The tools work better the second time round — you already know the drill, so you go deeper.
              </p>
              <div className="space-y-4">
                <Link
                  href={`/protocol/${protocolId}`}
                  className="block bg-tactical-gray p-6 border-l-4 border-tactical-orange hover:border-tactical-orange-bright"
                >
                  <h4 className="text-white font-bold mb-1">Run this one again</h4>
                  <p className="text-gray-400 text-sm">
                    Same protocol, fresh baseline. The comparison gets more useful each time.
                  </p>
                </Link>
                <Link
                  href="/"
                  className="block bg-tactical-gray p-6 border-l-4 border-tactical-orange hover:border-tactical-orange-bright"
                >
                  <h4 className="text-white font-bold mb-1">Try a different protocol</h4>
                  <p className="text-gray-400 text-sm">Different problem, same structure.</p>
                </Link>
                <div className="bg-tactical-gray p-6 border-l-4 border-tactical-lightgray opacity-50">
                  <h4 className="text-white font-bold mb-1">Set a reminder</h4>
                  <p className="text-gray-400 text-sm">
                    Put a date in your calendar for the next run.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {reportRecord && completedData?.weeklyBriefs && completedData.weeklyBriefs.length > 0 && (
          <section className="mb-12 bg-tactical-darkgray border-l-4 border-tactical-green p-6">
            <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-xl flex items-center gap-2">
              <span>📊</span>
              <span>Performance Summary</span>
            </h3>
            <p className="text-gray-300 mb-4">
              You completed {completedData.weeklyBriefs.length} weekly performance review
              {completedData.weeklyBriefs.length > 1 ? 's' : ''}.
              {completedData.weeklyBriefs.some((b) => b.briefData.performanceTier === 'elite') && (
                <span className="text-tactical-green-bright font-bold"> Including elite-level execution.</span>
              )}
            </p>
            <Link
              href={`/protocol/${protocolId}/history?duration=${duration}`}
              className="btn-secondary inline-block"
            >
              Review Weekly Briefs & Field Notes
            </Link>
          </section>
        )}

        {reportRecord && completedData?.checkIns &&
          (() => {
            const notesCount = completedData.checkIns.filter(
              (ci) => ci.fieldNotes && ci.fieldNotes.length > 0,
            ).length;
            if (notesCount === 0) return null;
            return (
              <section className="mb-12 bg-tactical-darkgray border-l-4 border-tactical-orange p-6">
                <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-xl flex items-center gap-2">
                  <span>📋</span>
                  <span>Your Field Notes</span>
                </h3>
                <p className="text-gray-300 mb-4">
                  You documented {notesCount} of {duration} missions. These notes are your record—review them anytime.
                </p>
                <Link
                  href={`/protocol/${protocolId}/history?duration=${duration}`}
                  className="btn-secondary inline-block"
                >
                  Review All Field Notes
                </Link>
              </section>
            );
          })()}

        <section className="mb-12">
          <StatCard
            stats={getStatsForProtocol(protocolId, 'completion')}
            title="You Did What Most Men Don't"
          />
        </section>
      </main>
    </div>
  );
}
