'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { protocols } from '@/data/protocols';
import { ProtocolDuration } from '@/types';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useProgress } from '@/contexts/ProgressContext';
import ExportModal from '@/components/ExportModal';

export default function ProtocolHistoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { activeProtocol } = useProgress();
  const [showExportModal, setShowExportModal] = useState(false);
  
  const protocolId = params.id as string;
  const duration = parseInt(searchParams.get('duration') || '7') as ProtocolDuration;
  
  const protocol = protocols.find(p => p.id === protocolId);
  const isActiveProtocol = activeProtocol?.protocolId === protocolId && activeProtocol?.duration === duration;

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

  if (!isActiveProtocol || !activeProtocol) {
    return (
      <div className="min-h-screen bg-tactical-black">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl text-white mb-4">NO ACTIVE PROTOCOL</h1>
          <p className="text-gray-400 mb-6">
            Start this protocol to view mission history
          </p>
          <Link href={`/protocol/${protocolId}`} className="btn-primary inline-block">
            View Protocol
          </Link>
        </div>
      </div>
    );
  }

  const missions = protocol.missions[duration] || [];
  const completedDays = activeProtocol.completedDays || [];
  const checkIns = activeProtocol.checkIns || [];
  const weeklyBriefs = activeProtocol.weeklyBriefs || [];

  return (
    <div className="min-h-screen bg-tactical-black">
      <Navigation />

      {/* Header */}
      <header className="border-b-2 border-tactical-lightgray bg-tactical-darkgray">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: 'Protocols', href: '/' },
              { label: protocol.title, href: `/protocol/${protocolId}` },
              { label: 'Mission History' }
            ]}
          />
          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white uppercase">
                Mission History
              </h1>
              <p className="text-tactical-green-bright mt-2 font-mono text-sm">
                {protocol.title} - {completedDays.length}/{duration} Completed
              </p>
            </div>
            <button
              onClick={() => setShowExportModal(true)}
              className="bg-tactical-darkgray hover:bg-tactical-gray border-2 border-tactical-lightgray hover:border-tactical-orange text-white font-bold uppercase px-4 py-2 text-sm transition-colors"
            >
              📤 Export Data
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Weekly Briefs Section */}
        {weeklyBriefs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white uppercase mb-6 flex items-center gap-2">
              <span>📊</span>
              <span>Weekly Performance Reviews</span>
            </h2>
            <div className="space-y-4">
              {weeklyBriefs.map((brief) => (
                <div
                  key={brief.weekNumber}
                  className="bg-tactical-darkgray border-l-4 border-tactical-green p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-white font-bold uppercase text-lg">
                        Week {brief.weekNumber} Review
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Completed Day {brief.day} • {new Date(brief.generatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-tactical-green-bright font-mono text-sm">
                      {brief.briefData.missionsCompleted}/{brief.briefData.totalMissions} Missions
                    </div>
                  </div>
                  
                  <div className="bg-tactical-darkgray p-4 border-l-2 border-tactical-orange">
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {brief.briefData.analysis.substring(0, 200)}
                      {brief.briefData.analysis.length > 200 ? '...' : ''}
                    </p>
                  </div>

                  {brief.briefData.performanceTier === 'elite' && (
                    <div className="mt-3 inline-block bg-tactical-green/20 border border-tactical-green px-3 py-1">
                      <span className="text-tactical-green-bright font-bold uppercase text-xs">
                        ⭐ Elite Performance
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mission List */}
        <h2 className="text-2xl font-bold text-white uppercase mb-6 flex items-center gap-2">
          <span>📋</span>
          <span>Mission Log</span>
        </h2>
        <div className="space-y-6">
          {missions.map((mission) => {
            const isCompleted = completedDays.includes(mission.day);
            const checkIn = checkIns.find(ci => ci.day === mission.day);
            const hasNotes = checkIn?.fieldNotes && checkIn.fieldNotes.length > 0;

            return (
              <div
                key={mission.day}
                className={`
                  bg-tactical-darkgray border-l-4 p-6
                  ${isCompleted ? 'border-tactical-green' : 'border-tactical-gray'}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`
                      text-2xl font-bold font-mono
                      ${isCompleted ? 'text-tactical-green' : 'text-gray-600'}
                    `}>
                      {isCompleted ? '✓' : mission.day}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg uppercase">
                        Day {mission.day} - {mission.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {mission.description}
                      </p>
                    </div>
                  </div>
                  {isCompleted && (
                    <Link
                      href={`/protocol/${protocolId}/mission/${mission.day}?duration=${duration}`}
                      className="text-tactical-orange hover:text-tactical-orange-bright font-bold uppercase text-xs transition-colors"
                    >
                      View →
                    </Link>
                  )}
                </div>

                {/* Field Notes */}
                {hasNotes && (
                  <div className="bg-tactical-black border border-tactical-lightgray p-4 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-tactical-orange">📋</span>
                      <span className="text-tactical-orange font-bold uppercase text-xs">
                        Field Notes
                      </span>
                      {checkIn.fieldNotesEditedAt && (
                        <span className="text-gray-500 text-xs font-mono">
                          • {new Date(checkIn.fieldNotesEditedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-300 font-mono text-sm whitespace-pre-line leading-relaxed">
                      {checkIn.fieldNotes}
                    </div>
                  </div>
                )}

                {isCompleted && !hasNotes && (
                  <div className="mt-4 text-center">
                    <Link
                      href={`/protocol/${protocolId}/mission/${mission.day}?duration=${duration}`}
                      className="text-gray-500 hover:text-tactical-orange text-xs uppercase font-bold transition-colors"
                    >
                      + Add Field Notes
                    </Link>
                  </div>
                )}

                {/* Check-in Data Preview */}
                {checkIn?.preMission && (
                  <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                    <div className="bg-tactical-darkgray p-2 text-center">
                      <div className="text-gray-400">Stress</div>
                      <div className="text-white font-bold">{checkIn.preMission.stressLevel}/10</div>
                    </div>
                    <div className="bg-tactical-darkgray p-2 text-center">
                      <div className="text-gray-400">Anger</div>
                      <div className="text-white font-bold">{checkIn.preMission.angerLevel}/10</div>
                    </div>
                    <div className="bg-tactical-darkgray p-2 text-center">
                      <div className="text-gray-400">Focus</div>
                      <div className="text-white font-bold">{checkIn.preMission.focusLevel}/10</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 flex gap-4">
          <Link
            href={`/protocol/${protocolId}`}
            className="btn-secondary flex-1 text-center"
          >
            ← Protocol Overview
          </Link>
          <Link
            href={`/protocol/${protocolId}/mission/${activeProtocol.currentDay}?duration=${duration}`}
            className="btn-primary flex-1 text-center"
          >
            Continue Current Mission
          </Link>
        </div>
      </main>

      {/* Export Modal */}
      {activeProtocol && (
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          progress={activeProtocol}
        />
      )}
    </div>
  );
}

