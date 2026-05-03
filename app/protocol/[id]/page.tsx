'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { protocols } from '@/data/protocols';
import { ProtocolDuration, IntensityMode } from '@/types';
import ConfirmationModal from '@/components/ConfirmationModal';
import IntensitySelector from '@/components/IntensitySelector';
import AccountabilityPartnerPrompt from '@/components/AccountabilityPartnerPrompt';
import Breadcrumbs from '@/components/Breadcrumbs';
import Navigation from '@/components/Navigation';
import { useProgress } from '@/contexts/ProgressContext';
import MissionChecklist from '@/components/MissionChecklist';
import CalendarView from '@/components/CalendarView';
import RebuildStatus from '@/components/RebuildStatus';
import StatCard from '@/components/StatCard';
import { getStatsForProtocol } from '@/data/mentalHealthStats';
import { getCurrentWorkingDay } from '@/utils/progressUtils';
import ActiveProtocolBlocker from '@/components/ActiveProtocolBlocker';
import ShareProgress from '@/components/ShareProgress';
import Footer from '@/components/Footer';

export default function ProtocolDetail() {
  const params = useParams();
  const router = useRouter();
  const protocolId = params.id as string;
  const { startProtocol, activeProtocol, setAccountabilityPartner } = useProgress();
  
  const protocol = protocols.find(p => p.id === protocolId);
  const [selectedDuration, setSelectedDuration] = useState<ProtocolDuration | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showReplaceWarning, setShowReplaceWarning] = useState(false);
  const [showIntensitySelector, setShowIntensitySelector] = useState(false);
  const [showAccountabilityPrompt, setShowAccountabilityPrompt] = useState(false);
  const [showRemovePartnerModal, setShowRemovePartnerModal] = useState(false);
  const [selectedIntensity, setSelectedIntensity] = useState<IntensityMode>('standard');

  // Check if this is the user's active protocol
  const isActiveProtocol = activeProtocol?.protocolId === protocolId;
  const workingDay = activeProtocol && isActiveProtocol ? getCurrentWorkingDay(activeProtocol) : 1;

  // If user has active protocol for this same protocol, set the duration
  useEffect(() => {
    if (activeProtocol && activeProtocol.protocolId === protocolId) {
      setSelectedDuration(activeProtocol.duration);
    }
  }, [activeProtocol, protocolId]);

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

  const handleStartClick = () => {
    if (!selectedDuration) return;
    
    // Check if user already has an active protocol
    if (activeProtocol) {
      // Any active protocol (different or same) - show blocker
      // User must reset progress in settings to start a new protocol
      setShowReplaceWarning(true);
    } else {
      // No active protocol - allow start
      setShowModal(true);
    }
  };

  const handleConfirmStart = () => {
    if (!selectedDuration || !protocol) return;
    setShowModal(false);
    setShowIntensitySelector(true);
  };

  const handleIntensitySelected = () => {
    if (!selectedDuration || !protocol) return;
    setShowIntensitySelector(false);
    setShowAccountabilityPrompt(true);
  };

  const handleStartProtocol = (withAccountabilityPartner?: boolean) => {
    if (!selectedDuration || !protocol) return;
    startProtocol(protocol.id, selectedDuration, selectedIntensity, withAccountabilityPartner);
    router.push(`/protocol/${protocol.id}/mission/1?duration=${selectedDuration}`);
  };

  return (
    <div
      className={`min-h-screen bg-tactical-black ${
        !isActiveProtocol && selectedDuration ? 'pb-24 sm:pb-28' : ''
      }`}
    >
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <header className="border-b-2 border-tactical-lightgray bg-tactical-darkgray">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: 'Protocols', href: '/' },
              { label: protocol.title }
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight text-white uppercase mt-2">
            {protocol.title}
          </h1>
          <p className="text-tactical-green-bright mt-2 font-mono text-sm">
            {protocol.tagline}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={`max-w-4xl mx-auto px-4 py-12 ${
          !isActiveProtocol && selectedDuration ? 'pb-28 sm:pb-32' : ''
        }`}
      >
        {/* Protocol Icon */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 breathe-animation">{protocol.icon}</div>
        </div>

        {/* Problem Statement */}
        <section className="mb-12 bg-tactical-darkgray border-l-4 border-red-600 p-6">
          <h2 className="text-tactical-orange font-bold uppercase tracking-wide mb-3 text-sm">
            ⚠️ SYSTEM STATUS: COMPROMISED
          </h2>
          <p className="text-white text-lg leading-relaxed">
            {protocol.problem}
          </p>
        </section>

        {/* Solution Statement */}
        <section className="mb-12 bg-tactical-darkgray border-l-4 border-tactical-green p-6">
          <h2 className="text-tactical-green-bright font-bold uppercase tracking-wide mb-3 text-sm">
            ✓ REPAIR PROTOCOL
          </h2>
          <p className="text-white text-lg leading-relaxed">
            {protocol.solution}
          </p>
        </section>

        {/* Active Protocol Banner OR Duration Selection */}
        {isActiveProtocol ? (
          <section className="mb-12">
            <div className="bg-tactical-orange/10 border-2 border-tactical-orange p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white font-bold uppercase tracking-wide text-xl mb-2">
                    🔥 Active Protocol
                  </h2>
                  <p className="text-tactical-orange font-mono text-sm uppercase">
                    You&apos;re currently running this protocol
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-tactical-green-bright text-3xl font-bold">
                    Day {workingDay}
                  </div>
                  <div className="text-gray-400 text-sm">
                    of {activeProtocol.duration}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="bg-tactical-black/50 p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {/* Completed Stat */}
                  <div className="group cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-tactical-green/10 p-3 rounded">
                    <div className="text-tactical-green-bright text-2xl font-bold transition-all duration-300 group-hover:scale-125 group-hover:text-tactical-green">
                      {activeProtocol.completedDays.length}
                    </div>
                    <div className="text-gray-400 text-xs uppercase transition-colors duration-300 group-hover:text-tactical-green-bright">
                      Completed
                    </div>
                  </div>
                  
                  {/* Streak Stat */}
                  <div className="group cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-tactical-orange/10 p-3 rounded">
                    <div className="text-tactical-orange text-2xl font-bold transition-all duration-300 group-hover:scale-125 group-hover:text-orange-400">
                      {activeProtocol.streak}
                    </div>
                    <div className="text-gray-400 text-xs uppercase transition-colors duration-300 group-hover:text-tactical-orange">
                      Streak
                    </div>
                  </div>
                  
                  {/* Progress Stat */}
                  <div className="group cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-blue-500/10 p-3 rounded">
                    <div className="text-blue-400 text-2xl font-bold transition-all duration-300 group-hover:scale-125 group-hover:text-blue-300">
                      {Math.round((activeProtocol.completedDays.length / activeProtocol.duration) * 100)}%
                    </div>
                    <div className="text-gray-400 text-xs uppercase transition-colors duration-300 group-hover:text-blue-400">
                      Progress
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="bg-tactical-gray border-l-4 border-tactical-green p-4 mb-6">
                <p className="text-gray-300 leading-relaxed">
                  <span className="font-bold text-white">You&apos;re locked into this protocol.</span> You can view 
                  mission details below for reference, but you cannot restart or change your intensity mode mid-protocol. 
                  To switch protocols, go to <Link href="/settings" className="text-tactical-orange hover:text-tactical-orange-bright font-bold">Settings</Link> and 
                  reset your progress.
                </p>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <Link
                  href={`/protocol/${protocolId}/mission/${workingDay}?duration=${activeProtocol.duration}`}
                  className="btn-primary inline-block text-lg py-4 px-12"
                >
                  CONTINUE TO DAY {workingDay} →
                </Link>
              </div>
            </div>

            {/* Share Progress — only visible if accountability partner is enabled */}
            {activeProtocol.accountabilityPartner?.enabled && (
              <div className="mt-6">
                <ShareProgress
                  completedDays={activeProtocol.completedDays.length}
                  totalDays={activeProtocol.duration}
                  missedDays={Math.max(0,
                    Math.min(
                      Math.floor((Date.now() - new Date(activeProtocol.startDate).getTime()) / (1000 * 60 * 60 * 24)),
                      activeProtocol.duration
                    ) - activeProtocol.completedDays.length
                  )}
                  streak={activeProtocol.streak}
                  variant="inline"
                  onRemovePartner={() => setShowRemovePartnerModal(true)}
                />
              </div>
            )}
          </section>
        ) : (
          <section className="mb-12">
            <h2 className="text-white font-bold uppercase tracking-wide mb-6 text-xl">
              Select Mission Duration
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {protocol.durations.map((duration) => {
                const isAvailable = protocol.missions[duration]?.length > 0;
                const isSelected = selectedDuration === duration;
                
                return (
                  <button
                    key={duration}
                    onClick={() => {
                      if (isAvailable) {
                        setSelectedDuration(isSelected ? null : duration);
                      }
                    }}
                    disabled={!isAvailable}
                    className={`
                      p-6 border-2 transition-all text-center
                      ${isSelected 
                        ? 'border-tactical-orange bg-tactical-orange/10' 
                        : 'border-tactical-lightgray hover:border-tactical-green'
                      }
                      ${!isAvailable ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <div className="text-4xl font-bold text-white mb-2">{duration}</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">Days</div>
                    {!isAvailable && (
                      <div className="text-xs text-tactical-orange mt-2">COMING SOON</div>
                    )}
                    {isSelected && (
                      <div className="text-xs text-tactical-orange mt-2 font-bold">SELECTED • CLICK TO DESELECT</div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Start Button - appears after duration selection */}
            {selectedDuration && (
              <div className="mt-8 border-2 border-tactical-orange bg-tactical-darkgray p-6 text-center">
                <div className="mb-4">
                  <div className="mb-2 font-mono text-sm text-tactical-green-bright">
                    ✓ DURATION SELECTED: {selectedDuration} DAYS
                  </div>
                  <div className="text-sm text-gray-300">
                    Ready to begin? Use the bar at the bottom or continue here.
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-tactical-green-bright">
                    Next — commit to the protocol
                  </p>
                  <button
                    type="button"
                    onClick={handleStartClick}
                    className="btn-primary border-2 border-tactical-orange-bright px-12 py-4 text-lg font-extrabold uppercase tracking-wide shadow-lg shadow-tactical-orange/20 ring-2 ring-tactical-orange/50"
                  >
                    🚀 Quick start protocol →
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Research Context Stats */}
        <section className="mb-12">
          <StatCard stats={getStatsForProtocol(protocolId, 'protocol_start')} />
        </section>

        {/* What to Expect */}
        {selectedDuration && protocol.missions[selectedDuration]?.length > 0 && (
          <>
            <section className="mb-12 bg-tactical-gray p-6">
              <h2 className="text-white font-bold uppercase tracking-wide mb-4 text-xl">
                Mission Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-tactical-orange font-mono mb-1">TOTAL MISSIONS</div>
                  <div className="text-white text-2xl font-bold">{protocol.missions[selectedDuration]?.length || 0}</div>
                </div>
                <div>
                  <div className="text-tactical-orange font-mono mb-1">TIME COMMITMENT</div>
                  <div className="text-white text-2xl font-bold">10-30 min/day</div>
                </div>
                <div>
                  <div className="text-tactical-orange font-mono mb-1">DIFFICULTY</div>
                  <div className="text-white text-2xl font-bold">Moderate</div>
                </div>
                <div>
                  <div className="text-tactical-orange font-mono mb-1">EQUIPMENT NEEDED</div>
                  <div className="text-white text-2xl font-bold">None</div>
                </div>
              </div>
            </section>

            {/* Rebuild Status - only show if active */}
            {activeProtocol && activeProtocol.protocolId === protocolId && (
              <section className="mb-12">
                <RebuildStatus />
              </section>
            )}

            {/* Calendar View */}
            <section className="mb-12">
              <CalendarView protocol={protocol} duration={selectedDuration} />
            </section>

            {/* Mission Checklist */}
            <section className="mb-12">
              <MissionChecklist protocol={protocol} duration={selectedDuration} />
            </section>

            {/* History Link - Show if user has active protocol and completed at least one day */}
            {activeProtocol && activeProtocol.protocolId === protocolId && activeProtocol.completedDays.length > 0 && (
              <section className="mb-12 text-center">
                <Link
                  href={`/protocol/${protocolId}/history?duration=${activeProtocol.duration}`}
                  className="inline-flex items-center gap-2 bg-tactical-darkgray border-2 border-tactical-lightgray hover:border-tactical-orange text-white font-bold uppercase px-6 py-3 transition-all"
                >
                  <span>📋</span>
                  <span>Review Mission History & Notes</span>
                </Link>
              </section>
            )}
          </>
        )}

        {/* Start Button - Only show if NOT active protocol */}
        {!isActiveProtocol && (
          <div className="text-center">
            <div className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-tactical-green-bright">
              {selectedDuration ? 'Next — same action as the fixed bar below' : 'Choose a duration above'}
            </div>
            <button
              type="button"
              onClick={handleStartClick}
              disabled={!selectedDuration}
              className={`
                btn-primary border-2 px-12 py-4 text-lg font-extrabold uppercase tracking-wide
                ${selectedDuration ? 'border-tactical-orange-bright shadow-lg shadow-tactical-orange/20 ring-2 ring-tactical-orange/50' : 'border-transparent'}
                ${!selectedDuration ? 'cursor-not-allowed opacity-40' : ''}
              `}
            >
              {selectedDuration ? 'START PROTOCOL →' : 'SELECT DURATION FIRST'}
            </button>
            
            {selectedDuration && (
              <p className="text-gray-400 text-sm mt-4">
                You&apos;ll begin with Day 1 of {selectedDuration}. Complete daily missions to track progress.
              </p>
            )}
          </div>
        )}

        {/* Warning Box */}
        <div className="mt-12 bg-tactical-darkgray border border-tactical-orange p-6">
          <h3 className="text-tactical-orange font-bold uppercase text-sm mb-3">
            ⚠️ DEPLOYMENT REQUIREMENTS
          </h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>→ Daily execution required. Skipping days compromises the protocol.</li>
            <li>→ This is maintenance work, not a quick fix. Results compound over time.</li>
            <li>→ If you miss a day, restart from Day 1. No exceptions.</li>
            <li>→ Complete each mission fully before marking it done. No half-measures.</li>
          </ul>
        </div>
      </main>

      {/* Sticky next-step bar — visible while scrolling mission details */}
      {!isActiveProtocol && selectedDuration && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-tactical-orange bg-tactical-darkgray/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,0.55)] backdrop-blur-sm">
          <div className="mx-auto flex max-w-4xl flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-tactical-green-bright sm:text-left">
              Next — commit &amp; choose intensity
            </p>
            <button
              type="button"
              onClick={handleStartClick}
              className="btn-primary border-2 border-tactical-orange-bright px-6 py-3 text-sm font-extrabold uppercase tracking-wide shadow-lg shadow-tactical-orange/25 ring-2 ring-tactical-orange/50 sm:shrink-0 sm:px-8 sm:py-3.5"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmStart}
        title="Commit to the Protocol"
        message={`You're about to start the ${selectedDuration}-day ${protocol.title}. This requires daily commitment and honest execution. Are you ready to rebuild?`}
        confirmText="START PROTOCOL"
        cancelText="NOT YET"
      />

      {/* Intensity Selector */}
      {showIntensitySelector && protocol && (
        <IntensitySelector
          protocolName={protocol.title}
          selectedMode={selectedIntensity}
          onSelect={setSelectedIntensity}
          onContinue={handleIntensitySelected}
        />
      )}

      {/* Accountability Partner Prompt */}
      <AccountabilityPartnerPrompt
        isOpen={showAccountabilityPrompt}
        onAccept={() => {
          setShowAccountabilityPrompt(false);
          handleStartProtocol(true);
        }}
        onDecline={() => {
          setShowAccountabilityPrompt(false);
          handleStartProtocol(false);
        }}
      />

      {/* Active Protocol Blocker */}
      {activeProtocol && (
        <ActiveProtocolBlocker
          isOpen={showReplaceWarning}
          onClose={() => setShowReplaceWarning(false)}
          activeProtocolId={activeProtocol.protocolId}
          activeProtocolDay={activeProtocol.currentDay}
          activeProtocolDuration={activeProtocol.duration}
        />
      )}

      {/* Remove Accountability Partner Confirmation */}
      <ConfirmationModal
        isOpen={showRemovePartnerModal}
        onClose={() => setShowRemovePartnerModal(false)}
        onConfirm={() => {
          setAccountabilityPartner(false);
          setShowRemovePartnerModal(false);
        }}
        title="Remove Accountability Partner?"
        message="You'll no longer see the option to share progress with a partner. Your protocol progress won't be affected. You can re-enable this at any time from Settings."
        confirmText="Remove Partner"
        cancelText="Keep Partner"
      />

      <Footer />
    </div>
  );
}
