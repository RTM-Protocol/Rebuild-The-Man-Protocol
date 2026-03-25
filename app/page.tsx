'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import UserDashboard from '@/components/UserDashboard';
import ProtocolLibrary from '@/components/ProtocolLibrary';
import ReminderPrompt from '@/components/ReminderPrompt';
import NewUserLanding from '@/components/NewUserLanding';
import QuickDiagnostic from '@/components/QuickDiagnostic';
import DiagnosticRecommendation from '@/components/DiagnosticRecommendation';
import Footer from '@/components/Footer';
import { useProgress } from '@/contexts/ProgressContext';
import { useRouter } from 'next/navigation';

type OnboardingStep = 'landing' | 'diagnostic' | 'recommendation' | 'complete';

interface DiagnosticAnswer {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
}

export default function Home() {
  const router = useRouter();
  const { activeProtocol, isLoading } = useProgress();
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('landing');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<DiagnosticAnswer | null>(null);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    setShowOnboarding(!hasCompletedOnboarding);
    setCheckingOnboarding(false);
  }, []);

  // Onboarding handlers
  const handleStartDiagnostic = () => {
    setOnboardingStep('diagnostic');
  };

  const handleBrowseProtocols = () => {
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('onboarding_path', 'browse');
    setShowOnboarding(false);
  };

  const handleStartFoundation = () => {
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('onboarding_path', 'foundation');
    setShowOnboarding(false);
    router.push('/protocol/rebuild-the-man');
  };

  const handleDiagnosticComplete = (answers: DiagnosticAnswer) => {
    setDiagnosticAnswers(answers);
    setOnboardingStep('recommendation');
  };

  const handleSkipDiagnostic = () => {
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('onboarding_path', 'skipped-diagnostic');
    setShowOnboarding(false);
  };

  const handleBrowseFromRecommendation = () => {
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('onboarding_path', 'diagnostic-then-browse');
    setShowOnboarding(false);
  };

  // Show loading while checking both progress and onboarding
  if (isLoading || checkingOnboarding) {
    return (
      <div className="min-h-screen bg-tactical-black">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-4xl mb-4">🔨</div>
            <div className="text-white font-bold uppercase">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show onboarding for first-time users
  if (showOnboarding) {
    if (onboardingStep === 'landing') {
      return (
        <NewUserLanding
          onStartDiagnostic={handleStartDiagnostic}
          onBrowseProtocols={handleBrowseProtocols}
          onStartFoundation={handleStartFoundation}
        />
      );
    }

    if (onboardingStep === 'diagnostic') {
      return (
        <QuickDiagnostic
          onComplete={handleDiagnosticComplete}
          onSkip={handleSkipDiagnostic}
        />
      );
    }

    if (onboardingStep === 'recommendation' && diagnosticAnswers) {
      return (
        <DiagnosticRecommendation
          primaryIssue={diagnosticAnswers.q1}
          onBrowseAll={handleBrowseFromRecommendation}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-tactical-black">
      {/* Navigation */}
      <Navigation />

      {/* Hero Header - Only show if no active protocol */}
      {!activeProtocol && (
        <header className="bg-tactical-darkgray border-b-2 border-tactical-orange">
          <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-brand mb-4">
                <span className="block text-5xl font-bold tracking-tight uppercase leading-none" style={{ color: '#faf9f5' }}>Rebuild The Man</span>
                <span className="block text-2xl font-semibold uppercase tracking-[0.25em] leading-tight" style={{ color: '#cc6119' }}>Protocol</span>
              </h1>
              <p className="text-base text-tactical-green-bright leading-relaxed mb-2 uppercase">
                No theory, no fluff, no excuses.
              </p>
              <p className="text-sm text-tactical-orange leading-relaxed mb-6 uppercase">
                14 days to reconstruct your mind, sharpen your edge, and reclaim your drive.
              </p>
              <div className="flex items-center justify-center gap-24 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-tactical-orange font-mono">✓</span>
                  <span className="text-gray-300">Action-Driven</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-tactical-orange font-mono">✓</span>
                  <span className="text-gray-300">10-30 min/day</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-tactical-orange font-mono">✓</span>
                  <span className="text-gray-300">Progressive Build</span>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* User Dashboard - Show if active protocol */}
        {activeProtocol ? (
          <div className="mb-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white uppercase mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-400">
                Continue your rebuild journey
              </p>
            </div>
            
            {/* Reminder Prompt */}
            <ReminderPrompt />
            
            <UserDashboard />

            {/* Browse Other Protocols Section */}
            <div className="mt-16">
              <div className="mb-8 pb-6 border-b border-tactical-lightgray">
                <h2 className="text-2xl font-bold text-white uppercase mb-2">
                  Browse Other Protocols
                </h2>
                <p className="text-gray-400">
                  Explore what&apos;s available for future use. You&apos;ll need to complete or reset your current protocol to start a new one.
                </p>
              </div>
              <ProtocolLibrary activeProtocol={activeProtocol} />
            </div>
          </div>
        ) : (
          <ProtocolLibrary activeProtocol={activeProtocol} />
        )}

        {/* Footer Info - Only show if no active protocol */}
        {!activeProtocol && (
          <div className="mt-16 pt-8 border-t border-tactical-lightgray">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-tactical-orange text-3xl font-bold mb-2">7-30</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">Days per Protocol</div>
              </div>
              <div>
                <div className="text-tactical-green-bright text-3xl font-bold mb-2">10-30</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">Minutes per Day</div>
              </div>
              <div>
                <div className="text-white text-3xl font-bold mb-2">100%</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">Action-Oriented</div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
