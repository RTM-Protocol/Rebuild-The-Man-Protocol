'use client';

import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { protocols } from '@/data/protocols';
import { ProtocolDuration } from '@/types';
import Breadcrumbs from '@/components/Breadcrumbs';
import DayNavigation from '@/components/DayNavigation';
import Navigation from '@/components/Navigation';
import { useProgress } from '@/contexts/ProgressContext';
import SetbackModal from '@/components/SetbackModal';
import PreMissionCheckIn from '@/components/PreMissionCheckIn';
import PostMissionCheckIn from '@/components/PostMissionCheckIn';
import MissionFieldNotes from '@/components/MissionFieldNotes';
import CommandersBrief from '@/components/CommandersBrief';
import IntensitySelector from '@/components/IntensitySelector';
import IntensityEscalationPrompt from '@/components/IntensityEscalationPrompt';
import MissedDayPrompt from '@/components/MissedDayPrompt';
import ShareProgress from '@/components/ShareProgress';
import Footer from '@/components/Footer';
import { shouldShowBrief, generateCommandersBrief } from '@/utils/briefGenerator';
import { isDayAccessible, canCompleteDay, getCurrentWorkingDay, getDayBlockReason, getCompletionLimitMessage } from '@/utils/progressUtils';
import StatCard from '@/components/StatCard';
import { getStatsForProtocol } from '@/data/mentalHealthStats';
import { useState, useEffect } from 'react';
import { IntensityMode } from '@/types';

export default function MissionPage() {
  const [showSetbackModal, setShowSetbackModal] = useState(false);
  const [showPreCheckIn, setShowPreCheckIn] = useState(false);
  const [showPostCheckIn, setShowPostCheckIn] = useState(false);
  const [showCommandersBrief, setShowCommandersBrief] = useState(false);
  const [showIntensityChange, setShowIntensityChange] = useState(false);
  const [showEscalationPrompt, setShowEscalationPrompt] = useState(false);
  const [showMissedDayPrompt, setShowMissedDayPrompt] = useState(false);
  const [showShareProgress, setShowShareProgress] = useState(false);
  const [tempIntensity, setTempIntensity] = useState<IntensityMode>('standard');
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { activeProtocol, completeDay, savePreMissionCheckIn, savePostMissionCheckIn, saveFieldNotes, saveWeeklyBrief, changeIntensity, declineEscalation, getCheckIn, setAccountabilityPartner, dismissAccountabilityPrompt } = useProgress();
  
  const protocolId = params.id as string;
  const dayNumber = parseInt(params.day as string);
  const duration = parseInt(searchParams.get('duration') || '7') as ProtocolDuration;
  
  const protocol = protocols.find(p => p.id === protocolId);
  const mission = protocol?.missions[duration]?.[dayNumber - 1];

  const missionCompleted = activeProtocol?.completedDays.includes(dayNumber) || false;
  const progress = activeProtocol;

  // Check day accessibility
  const dayIsAccessible = activeProtocol ? isDayAccessible(dayNumber, activeProtocol) : true;
  const canComplete = activeProtocol ? canCompleteDay(dayNumber, activeProtocol) : false;
  const blockReason = activeProtocol ? getDayBlockReason(dayNumber, activeProtocol) : null;
  const completionLimitMsg = activeProtocol ? getCompletionLimitMessage(activeProtocol) : null;
  const currentWorkingDay = activeProtocol ? getCurrentWorkingDay(activeProtocol) : 1;
  const currentIntensity = activeProtocol?.intensityMode || 'standard';

  // Check if user has done pre-mission check-in for this day
  useEffect(() => {
    if (!activeProtocol || missionCompleted || !canComplete) return;
    
    const checkIn = getCheckIn(dayNumber);
    if (!checkIn || !checkIn.preMission) {
      setShowPreCheckIn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProtocol, dayNumber, missionCompleted, canComplete]);

  // Check if we should prompt the user to escalate intensity
  useEffect(() => {
    if (!activeProtocol || missionCompleted) return;
    if (currentIntensity === 'intensive') return;

    const history = activeProtocol.intensityHistory || [];
    let daysOnCurrent = 0;
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].mode === currentIntensity) daysOnCurrent++;
      else break;
    }

    const DAYS_BEFORE_PROMPT = 5;
    if (daysOnCurrent < DAYS_BEFORE_PROMPT) return;

    if (activeProtocol.declinedEscalation) {
      const declinedDate = new Date(activeProtocol.declinedEscalation.date);
      const daysSinceDecline = (Date.now() - declinedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceDecline < 5) return;
    }

    if (activeProtocol.lastEscalationPrompt) {
      const lastPrompt = new Date(activeProtocol.lastEscalationPrompt);
      const daysSincePrompt = (Date.now() - lastPrompt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSincePrompt < 3) return;
    }

    setShowEscalationPrompt(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProtocol, dayNumber, missionCompleted, currentIntensity]);

  // Detect missed days and show gentle accountability prompt
  useEffect(() => {
    if (!activeProtocol || missionCompleted) return;
    if (activeProtocol.accountabilityPartner?.enabled) return;

    const startDate = new Date(activeProtocol.startDate);
    const daysSinceStart = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceStart < 3) return;

    const expectedCompleted = Math.min(daysSinceStart, activeProtocol.duration);
    const actualCompleted = activeProtocol.completedDays.length;
    const missedCount = expectedCompleted - actualCompleted;
    if (missedCount < 1) return;

    if (activeProtocol.lastAccountabilityPrompt) {
      const lastPrompt = new Date(activeProtocol.lastAccountabilityPrompt);
      const daysSincePrompt = (Date.now() - lastPrompt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSincePrompt < 5) return;
    }

    setShowMissedDayPrompt(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProtocol, dayNumber, missionCompleted]);

  if (!protocol || !mission) {
    return (
      <div className="min-h-screen bg-tactical-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">MISSION NOT FOUND</h1>
          <Link href="/" className="btn-primary inline-block">
            Return to Base
          </Link>
        </div>
      </div>
    );
  }

  // Block access to inaccessible days
  if (!dayIsAccessible && activeProtocol) {
    return (
      <div className="min-h-screen bg-tactical-black">
        <Navigation />
        
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-tactical-darkgray border-2 border-tactical-orange p-8">
            {/* Icon */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🔒</div>
              <h1 className="text-3xl font-bold text-white uppercase mb-2">
                Mission Locked
              </h1>
              <p className="text-tactical-orange font-mono text-sm uppercase">
                Day {dayNumber} - {protocol.title}
              </p>
            </div>

            {/* Block Reason */}
            <div className="bg-tactical-black border-l-4 border-tactical-orange p-6 mb-6">
              <p className="text-white text-lg leading-relaxed">
                {blockReason}
              </p>
            </div>

            {/* Explanation */}
            <div className="mb-6">
              <h2 className="text-white font-bold uppercase text-sm mb-3">
                Why This Restriction?
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                This protocol is designed for <span className="font-bold text-white">one mission per day</span>. 
                Each mission builds on the previous day&apos;s work, and your mind needs time to 
                integrate what you&apos;ve learned.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Rushing through multiple missions defeats the purpose. The protocol works through 
                <span className="font-bold text-white"> repetition and daily practice</span>, not speed.
              </p>
            </div>

            {/* Current Status */}
            <div className="bg-tactical-darkgray p-4 mb-6">
              <h3 className="text-tactical-green-bright font-bold uppercase text-sm mb-3">
                Your Current Status
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Next Mission:</span>
                  <span className="text-white font-bold">Day {currentWorkingDay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Completed Days:</span>
                  <span className="text-white font-bold">{activeProtocol.completedDays.length} / {duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Streak:</span>
                  <span className="text-white font-bold">{activeProtocol.streak} {activeProtocol.streak === 1 ? 'day' : 'days'}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {currentWorkingDay !== dayNumber && (
                <Link
                  href={`/protocol/${protocolId}/mission/${currentWorkingDay}?duration=${duration}`}
                  className="btn-primary text-center"
                >
                  Go to Day {currentWorkingDay} →
                </Link>
              )}
              <Link
                href={`/protocol/${protocolId}`}
                className="btn-secondary text-center"
              >
                Protocol Overview
              </Link>
              <Link
                href="/"
                className="btn-secondary text-center"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleCompleteMission = () => {
    if (!activeProtocol || missionCompleted) return;
    
    // Show post-mission check-in before completing
    setShowPostCheckIn(true);
  };

  const handlePreCheckInComplete = (data: { stressLevel: number; angerLevel: number; focusLevel: number }) => {
    savePreMissionCheckIn(dayNumber, data);
  };

  const handlePostCheckInComplete = (data: { completed: boolean; didHelp: boolean | null }) => {
    if (!activeProtocol) return;

    // Save post-mission check-in data
    savePostMissionCheckIn(dayNumber, data);

    // Only mark mission complete if user confirmed completion
    if (data.completed) {
      // Use progress context to complete the day
      completeDay(dayNumber);

      // Check if we should show Commander's Brief
      if (shouldShowBrief(dayNumber)) {
        setShowCommandersBrief(true);
      } else {
        // Check if this will complete the protocol
        const willCompleteProtocol = activeProtocol.completedDays.length + 1 === duration;

        // If protocol completed, redirect after a short delay
        if (willCompleteProtocol) {
          setTimeout(() => {
            router.push(`/protocol/${protocolId}/complete?duration=${duration}`);
          }, 1500);
        }
      }
    }
  };

  const completionPercentage = progress 
    ? Math.round((progress.completedDays.length / duration) * 100)
    : 0;

  const getIntensityLabel = (mode: IntensityMode) => {
    const labels = {
      light: 'Light Mode (10 min)',
      standard: 'Standard Mode (20 min)',
      intensive: 'Intensive Mode (30 min)'
    };
    return labels[mode];
  };

  const handleIntensityChangeClick = () => {
    setTempIntensity(currentIntensity);
    setShowIntensityChange(true);
  };

  const handleIntensityChangeConfirm = () => {
    changeIntensity(tempIntensity, dayNumber);
    setShowIntensityChange(false);
  };

  // Show Commander's Brief if triggered
  if (showCommandersBrief && activeProtocol) {
    const briefData = generateCommandersBrief(activeProtocol, dayNumber);
    
    // Save the brief for history
    const weekNumber = dayNumber / 7;
    saveWeeklyBrief(weekNumber, dayNumber, briefData);
    
    return (
      <CommandersBrief
        briefData={briefData}
        protocolId={protocolId}
        duration={duration}
        nextDay={dayNumber + 1}
      />
    );
  }

  return (
    <div className="min-h-screen bg-tactical-black">
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <header className="border-b-2 border-tactical-lightgray bg-tactical-darkgray">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: 'Protocols', href: '/' },
              { label: protocol.title, href: `/protocol/${protocolId}` },
              { label: `Day ${dayNumber}` }
            ]}
          />
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white uppercase">
                {protocol.title}
              </h1>
              <p className="text-tactical-green-bright mt-1 font-mono text-sm">
                DAY {dayNumber} OF {duration}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-tactical-orange font-mono text-xs uppercase">
                  {getIntensityLabel(currentIntensity)}
                </span>
                <button
                  onClick={handleIntensityChangeClick}
                  className="text-gray-500 hover:text-tactical-orange text-xs uppercase font-bold transition-colors"
                >
                  [Change]
                </button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-tactical-orange text-sm font-mono mb-1">
                PROGRESS
              </div>
              <div className="text-white text-2xl font-bold">
                {completionPercentage}%
              </div>
              {progress && progress.streak > 0 && (
                <div className="text-tactical-green text-xs font-mono mt-1">
                  STREAK: {progress.streak}
                </div>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="progress-bar mt-4">
            <div 
              className="progress-fill"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Day Navigation */}
        <DayNavigation 
          protocolId={protocolId}
          currentDay={dayNumber}
          totalDays={duration}
          duration={duration}
          activeProtocol={activeProtocol}
        />

        {/* Review Past Missions Link */}
        {activeProtocol && dayNumber > 1 && (
          <div className="mt-6 text-center">
            <Link
              href={`/protocol/${protocolId}/history?duration=${duration}`}
              className="text-tactical-orange hover:text-tactical-orange-bright font-bold uppercase text-sm transition-colors inline-flex items-center gap-2"
            >
              <span>📋</span>
              <span>Review Past Missions & Notes</span>
            </Link>
          </div>
        )}

        {/* Mission Title */}
        <div className="mb-8 mt-8">
          <div className="text-tactical-orange font-mono text-sm mb-2 uppercase tracking-wider">
            Mission {dayNumber}
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 uppercase">
            {mission.title}
          </h2>
          <p className="text-xl text-gray-300">
            {mission.description}
          </p>
        </div>

        {/* Time Estimate */}
        <div className="mb-8 inline-block bg-tactical-darkgray border border-tactical-lightgray px-4 py-2">
          <span className="text-tactical-orange font-mono text-sm mr-2">TIME REQUIRED:</span>
          <span className="text-white font-bold">{mission.estimatedTime}</span>
        </div>

        {/* Instructions */}
        <section className="mb-12 bg-tactical-darkgray border-l-4 border-tactical-orange p-6">
          <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-lg">
            Mission Instructions
          </h3>
          <ol className="space-y-4">
            {mission.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-4">
                <span className="text-tactical-orange font-bold font-mono text-lg flex-shrink-0">
                  {index + 1}.
                </span>
                <span className="text-gray-200 leading-relaxed text-lg">
                  {instruction}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Why It Works */}
        <section className="mb-12 bg-tactical-darkgray p-6">
          <h3 className="text-tactical-green-bright font-bold uppercase tracking-wide mb-4 text-lg flex items-center gap-2">
            <span>🔬</span>
            <span>Why This Works</span>
          </h3>
          <p className="text-gray-200 leading-relaxed text-lg">
            {mission.whyItWorks}
          </p>
        </section>

        {/* Pro Tip */}
        <section className="mb-12 bg-tactical-darkgray border border-tactical-green p-6">
          <h3 className="text-tactical-green-bright font-bold uppercase tracking-wide mb-4 text-lg flex items-center gap-2">
            <span>💡</span>
            <span>Pro Tip</span>
          </h3>
          <p className="text-gray-200 leading-relaxed text-lg">
            {mission.proTip}
          </p>
        </section>

        {/* Affirmation */}
        {mission.affirmation && (
          <section className="mb-12 bg-tactical-darkgray border-l-4 border-tactical-orange p-6">
            <h3 className="text-tactical-orange font-bold uppercase tracking-wide mb-4 text-lg flex items-center gap-2">
              <span>⚡</span>
              <span>Today&apos;s Affirmation</span>
            </h3>
            <p className="text-white leading-relaxed text-xl font-semibold italic">
              &ldquo;{mission.affirmation}&rdquo;
            </p>
          </section>
        )}

        {/* Completion Section */}
        <section className="bg-tactical-black border-2 border-tactical-lightgray p-8">
          {missionCompleted ? (
            <div>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-tactical-green-bright mb-4 uppercase">
                  Mission Complete - Day {dayNumber}
                </h3>
                <p className="text-gray-300">
                  Outstanding work. System calibration in progress.
                </p>
              </div>

              {/* Field Notes Section */}
              <MissionFieldNotes
                existingNotes={getCheckIn(dayNumber)?.fieldNotes || ''}
                onSave={(notes) => {
                  saveFieldNotes(dayNumber, notes);
                }}
                onSkip={() => {}}
              />

              {/* Share with Accountability Partner */}
              {activeProtocol?.accountabilityPartner?.enabled && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowShareProgress(true)}
                    className="inline-flex items-center gap-2 bg-tactical-darkgray border-2 border-tactical-green hover:border-tactical-green-bright text-white font-bold uppercase px-6 py-3 transition-all text-sm"
                  >
                    <span>📤</span>
                    <span>Share Day {dayNumber} with Your Partner</span>
                  </button>
                </div>
              )}
              
              <div className="flex gap-4 justify-center mt-6">
                {dayNumber < duration && (
                  <Link
                    href={`/protocol/${protocolId}/mission/${dayNumber + 1}?duration=${duration}`}
                    className="btn-primary inline-block"
                  >
                    NEXT MISSION →
                  </Link>
                )}
                
                {dayNumber === duration && (
                  <Link
                    href={`/protocol/${protocolId}/complete?duration=${duration}`}
                    className="btn-primary inline-block"
                  >
                    VIEW COMPLETION REPORT
                  </Link>
                )}

                <Link
                  href={`/protocol/${protocolId}`}
                  className="btn-secondary inline-block"
                >
                  PROTOCOL OVERVIEW
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-white font-bold uppercase tracking-wide mb-4 text-xl">
                Mark Mission Complete
              </h3>
              
              {/* Show daily limit message if applicable */}
              {completionLimitMsg ? (
                <div className="bg-tactical-orange/10 border-2 border-tactical-orange p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">⏸️</span>
                    <div>
                      <h4 className="text-white font-bold uppercase text-sm mb-2">
                        Daily Mission Limit Reached
                      </h4>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {completionLimitMsg}
                      </p>
                      <p className="text-gray-400 text-sm">
                        This protocol requires <span className="font-bold text-white">one mission per day</span> to 
                        be effective. Your mind needs time to process and integrate each day&apos;s work.
                      </p>
                    </div>
                  </div>
                </div>
              ) : !canComplete && dayNumber > currentWorkingDay ? (
                <div className="bg-blue-500/10 border-2 border-blue-500 p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">👀</span>
                    <div>
                      <h4 className="text-white font-bold uppercase text-sm mb-2">
                        Preview Mode
                      </h4>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        You&apos;re viewing Day {dayNumber}, but you need to complete Day {currentWorkingDay} first.
                      </p>
                      <p className="text-gray-400 text-sm">
                        Use this preview to prepare mentally for what&apos;s coming. You can complete this mission once you&apos;ve finished your current day.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-300 mb-6">
                  Have you executed all mission instructions? Confirm completion only after finishing all steps.
                </p>
              )}
              
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleCompleteMission}
                  disabled={!canComplete}
                  className={`btn-primary w-full ${!canComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={!canComplete ? 'Cannot complete mission today' : 'Complete mission'}
                >
                  ✓ COMPLETE MISSION
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowSetbackModal(true)}
                    className="bg-red-900 hover:bg-red-800 text-white font-bold uppercase tracking-wide px-4 py-2 transition-colors flex-1"
                  >
                    MARK SETBACK
                  </button>
                  <Link
                    href={`/protocol/${protocolId}`}
                    className="btn-secondary flex-1 text-center"
                  >
                    PROTOCOL OVERVIEW
                  </Link>
                </div>
                <Link
                  href="/"
                  className="btn-secondary text-center"
                >
                  ALL PROTOCOLS
                </Link>
              </div>
              
              <p className="text-tactical-orange text-sm mt-4 font-mono">
                ⚠️ Only mark complete if you&apos;ve done the work. No shortcuts.
              </p>
            </div>
          )}
        </section>

        {/* Research Context - Show on specific days */}
        {[3, 5, 7, 10, 12].includes(dayNumber) && (
          <div className="mt-8">
            <StatCard stats={getStatsForProtocol(protocolId, `day_${dayNumber}`)} />
          </div>
        )}

        {/* Streak Display */}
        {progress && progress.streak > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-tactical-darkgray border-2 border-tactical-green px-6 py-3">
              <div className="text-tactical-green-bright text-sm font-mono mb-1">
                CURRENT STREAK
              </div>
              <div className="text-white text-3xl font-bold">
                {progress.streak} {progress.streak === 1 ? 'DAY' : 'DAYS'}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Pre-Mission Check-In */}
      <PreMissionCheckIn
        isOpen={showPreCheckIn}
        onClose={() => setShowPreCheckIn(false)}
        onComplete={handlePreCheckInComplete}
        accountabilityPartnerEnabled={!!activeProtocol?.accountabilityPartner?.enabled}
        onOpenPartnerShare={() => setShowShareProgress(true)}
        onEnableAccountabilityPartner={() => {
          setAccountabilityPartner(true);
          setShowShareProgress(true);
        }}
      />

      {/* Post-Mission Check-In */}
      <PostMissionCheckIn 
        isOpen={showPostCheckIn}
        onClose={() => setShowPostCheckIn(false)}
        onComplete={handlePostCheckInComplete}
      />

      {/* Intensity Change Selector */}
      {showIntensityChange && protocol && (
        <IntensitySelector
          protocolName={protocol.title}
          selectedMode={tempIntensity}
          onSelect={setTempIntensity}
          onContinue={handleIntensityChangeConfirm}
        />
      )}

      {/* Escalation Prompt */}
      {showEscalationPrompt && activeProtocol && currentIntensity !== 'intensive' && (
        <IntensityEscalationPrompt
          isOpen={showEscalationPrompt}
          currentMode={currentIntensity}
          daysOnCurrentMode={(() => {
            const history = activeProtocol.intensityHistory || [];
            let count = 0;
            for (let i = history.length - 1; i >= 0; i--) {
              if (history[i].mode === currentIntensity) {
                count++;
              } else {
                break;
              }
            }
            return count;
          })()}
          onUpgrade={() => {
            const nextMode = currentIntensity === 'light' ? 'standard' : 'intensive';
            changeIntensity(nextMode, dayNumber);
            setShowEscalationPrompt(false);
          }}
          onDecline={() => {
            const nextMode = currentIntensity === 'light' ? 'standard' : 'intensive';
            declineEscalation(currentIntensity, nextMode);
            setShowEscalationPrompt(false);
          }}
        />
      )}

      {/* Missed Day Accountability Prompt */}
      {activeProtocol && (
        <MissedDayPrompt
          isOpen={showMissedDayPrompt}
          missedCount={(() => {
            const startDate = new Date(activeProtocol.startDate);
            const daysSinceStart = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            const expected = Math.min(daysSinceStart, activeProtocol.duration);
            return Math.max(0, expected - activeProtocol.completedDays.length);
          })()}
          completedCount={activeProtocol.completedDays.length}
          totalDays={duration}
          onAddPartner={() => {
            setAccountabilityPartner(true);
            dismissAccountabilityPrompt();
            setShowMissedDayPrompt(false);
          }}
          onContinueSolo={() => {
            dismissAccountabilityPrompt();
            setShowMissedDayPrompt(false);
          }}
        />
      )}

      {/* Setback Modal */}
      <SetbackModal 
        isOpen={showSetbackModal}
        onClose={() => setShowSetbackModal(false)}
        currentDay={dayNumber}
      />

      {/* Share Progress Modal */}
      {showShareProgress && activeProtocol?.accountabilityPartner?.enabled && (
        <ShareProgress
          completedDays={activeProtocol.completedDays.length}
          totalDays={duration}
          missedDays={Math.max(0,
            Math.min(
              Math.floor((Date.now() - new Date(activeProtocol.startDate).getTime()) / (1000 * 60 * 60 * 24)),
              activeProtocol.duration
            ) - activeProtocol.completedDays.length
          )}
          streak={activeProtocol.streak}
          variant="modal"
          onClose={() => setShowShareProgress(false)}
        />
      )}
      <Footer />
    </div>
  );
}
